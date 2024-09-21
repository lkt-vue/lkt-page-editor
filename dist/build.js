import { openBlock, createElementBlock, renderSlot, defineComponent, ref, onMounted, computed, watch, resolveComponent, normalizeClass, createElementVNode, withDirectives, createBlock, withCtx, createTextVNode, toDisplayString, resolveDynamicComponent, vShow, setBlockTracking, createVNode, nextTick, Fragment, renderList, createCommentVNode, unref } from "vue";
import { trim, generateRandomString } from "lkt-string-tools";
import Sortable from "sortablejs";
import { time } from "lkt-date-tools";
class AbstractConfig {
  constructor(data = {}) {
    this.amountOfColumns = 1;
    for (let k in data) {
      if (this.hasOwnProperty(k)) {
        this[k] = data[k];
      }
    }
  }
}
class AccordionConfig extends AbstractConfig {
  constructor() {
    super(...arguments);
    this.onlyContent = false;
    this.alwaysOpen = false;
  }
}
class BoxConfig extends AbstractConfig {
  constructor() {
    super(...arguments);
    this.onlyContent = false;
  }
}
class BannerBoxConfig extends AbstractConfig {
  constructor() {
    super(...arguments);
    this.backgroundImage = {};
    this.backgroundImageId = 0;
  }
}
class ColumnsConfig extends AbstractConfig {
}
var BlockComponentType = /* @__PURE__ */ ((BlockComponentType2) => {
  BlockComponentType2["LktBox"] = "lkt-box";
  BlockComponentType2["LktAccordion"] = "lkt-accordion";
  BlockComponentType2["LktIcon"] = "lkt-icon";
  BlockComponentType2["Columns"] = "columns";
  BlockComponentType2["Header1"] = "h1";
  BlockComponentType2["Header2"] = "h2";
  BlockComponentType2["Header3"] = "h3";
  BlockComponentType2["Text"] = "text";
  BlockComponentType2["BulletList"] = "ul";
  BlockComponentType2["ListItem"] = "li";
  BlockComponentType2["Item"] = "item";
  BlockComponentType2["Basic"] = "basic";
  return BlockComponentType2;
})(BlockComponentType || {});
class PageBlock {
  constructor(data = {}) {
    this.id = 0;
    this.component = "text";
    this.itemType = "";
    this.itemId = 0;
    this.item = {};
    this.items = [];
    this.itemsIds = [];
    this.content = "";
    this.title = "";
    this.icon = "";
    this.blocks = [];
    this.columns = 1;
    this.className = "";
    this.config = {};
    for (let k in data) {
      if (this.hasOwnProperty(k)) {
        this[k] = data[k];
      }
    }
    if (Array.isArray(data.item) && data.item.length === 0) {
      this.item = {};
    }
    if (Array.isArray(data.config) && data.config.length === 0) {
      this.config = {};
    }
  }
  static convertBlock(block, component) {
    block.component = component;
    return block;
  }
  static createBasicBlock(itemType) {
    return new PageBlock({
      component: "basic:" + itemType
      // component: 'basic-block',
      // itemType,
    });
  }
  static createItemEditor(itemType) {
    return new PageBlock({
      component: "item:" + itemType
    });
  }
  static createTextEditor() {
    return new PageBlock({
      component: BlockComponentType.Text
    });
  }
  static createHeadingOneEditor() {
    return new PageBlock({
      component: BlockComponentType.Header1
    });
  }
  static createHeadingTwoEditor() {
    return new PageBlock({
      component: BlockComponentType.Header2
    });
  }
  static createHeadingThreeEditor() {
    return new PageBlock({
      component: BlockComponentType.Header3
    });
  }
  static createLktBannerBox() {
    return new PageBlock({
      component: "lkt-banner-box",
      config: new BannerBoxConfig()
    });
  }
  static createColumnEngine() {
    return new PageBlock({
      component: BlockComponentType.Columns,
      columns: 2,
      config: new ColumnsConfig()
    });
  }
  static createLktBox() {
    return new PageBlock({
      component: BlockComponentType.LktBox,
      config: new BoxConfig()
    });
  }
  static createLktAccordion() {
    return new PageBlock({
      component: BlockComponentType.LktAccordion,
      config: new AccordionConfig()
    });
  }
  static createLktIcon() {
    return new PageBlock({
      component: BlockComponentType.LktIcon
    });
  }
  static createBulletList() {
    return new PageBlock({
      component: BlockComponentType.BulletList,
      blocks: [PageBlock.createListItem()]
    });
  }
  static createListItem() {
    return new PageBlock({
      component: BlockComponentType.ListItem
    });
  }
}
const getSelectionText = () => {
  var text = "";
  let activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (activeElTagName == "textarea" || activeElTagName == "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type) && typeof activeEl.selectionStart == "number") {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
};
const _Settings = class _Settings {
};
_Settings.defaultIcon = void 0;
_Settings.customItemTypes = [];
_Settings.customBasicBlocks = [];
let Settings = _Settings;
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$9 = {};
const _hoisted_1$9 = { class: "lkt-page-editor-block-header" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const BlockHeader = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render]]);
const _hoisted_1$8 = { class: "lkt-grid-1" };
const _hoisted_2$6 = { class: "toolbar-actions" };
const _hoisted_3$2 = { class: "lkt-editor-block-grid" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "TextEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  emits: ["drop", "append", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const editor = ref(null);
    const container = ref(null);
    const blockHeader = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const showCustomToolbar = ref(false);
    const latestTextLengthOnBackspace = ref(-1);
    const onSelectedText = () => {
      if (!props.editMode) return;
      let text = trim(getSelectionText());
      nextTick(() => {
        showToolbar.value = text.length > 0;
      });
    };
    function execDefaultAction(action) {
      document.execCommand(action, false);
      item.value.content = document.activeElement.innerHTML;
    }
    onMounted(() => {
      editor.value.addEventListener("mouseup", onSelectedText);
      editor.value.addEventListener("keyup", onSelectedText);
      editor.value.addEventListener("selectionchange", onSelectedText);
    });
    const computedClass = computed(() => {
      let r = [];
      if (item.value.component === BlockComponentType.Text) r.push("is-text");
      if (item.value.component === BlockComponentType.Header1) r.push("is-h1");
      if (item.value.component === BlockComponentType.Header2) r.push("is-h2");
      if (item.value.component === BlockComponentType.Header3) r.push("is-h3");
      if (item.value.component === BlockComponentType.ListItem) r.push("is-li");
      if (item.value.component === BlockComponentType.LktIcon) r.push("is-lkt-icon");
      return r.join(" ");
    }), computedPlaceholder = computed(() => {
      switch (item.value.component) {
        case BlockComponentType.Header1:
          return "Heading 1";
        case BlockComponentType.Header2:
          return "Heading 2";
        case BlockComponentType.Header3:
          return "Heading 3";
        case BlockComponentType.Text:
          return "Time to write something";
        default:
          return "Time to write something";
      }
    });
    const customBasicBlock = computed(() => {
      let searchType = item.value.component.split(":")[1];
      let found = Settings.customBasicBlocks.find((z) => z.component === searchType);
      if (found) return found;
      return void 0;
    });
    const computedIcon = computed(() => {
      if (item.value.component === BlockComponentType.LktIcon) return "pagetor-icon-crown";
      if (typeof customBasicBlock.value === "undefined") return "icon-cog";
      if (customBasicBlock.value.icon) return customBasicBlock.value.icon;
      return "icon-cog";
    });
    const computedBlockTitle = computed(() => {
      var _a;
      if (item.value.component === BlockComponentType.LktIcon) return "LKT Icon";
      return (_a = customBasicBlock.value) == null ? void 0 : _a.text;
    });
    const computedDisplayContentEdition = computed(() => {
      if (item.value.component === BlockComponentType.LktIcon) return false;
      if (typeof customBasicBlock.value === "undefined") return true;
      return customBasicBlock.value.contentEnabled;
    });
    const computedDisplayBlockHeader = computed(() => {
      if (item.value.component === BlockComponentType.LktIcon) return true;
      return customBasicBlock.value;
    });
    const onEditorKeyUp = (event) => {
      if (event.key !== "Enter") {
        item.value.content = editor.value.innerHTML;
      }
      if (event.key === "Backspace") {
        let text = trim(item.value.content);
        let l = text.length;
        if (latestTextLengthOnBackspace.value === 0 && l === 0) {
          emit("drop");
        } else {
          latestTextLengthOnBackspace.value = l;
        }
      } else if (event.key === "Enter") {
        const clearLineBreakEvent = new KeyboardEvent("keydown", {
          key: "Backspace"
        });
        emit(
          "append",
          item.value.component === BlockComponentType.ListItem ? item.value.component === BlockComponentType.ListItem : item.value.component === BlockComponentType.Text
        );
        editor.value.dispatchEvent(clearLineBreakEvent);
      }
    };
    function pasteEvent(e) {
      e.preventDefault();
      let text = (e.originalEvent || e).clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    }
    onMounted(() => {
      editor.value.addEventListener("paste", pasteEvent);
    });
    watch(() => props.modelValue, (v) => item.value = v, { deep: true });
    watch(item, (v) => emit("update:modelValue", v), { deep: true });
    return (_ctx, _cache) => {
      var _a;
      const _component_lkt_button = resolveComponent("lkt-button");
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      const _component_lkt_field_text = resolveComponent("lkt-field-text");
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass(["lkt-editor-block lkt-text-editor", computedClass.value])
      }, [
        createElementVNode("div", _hoisted_1$8, [
          withDirectives(createElementVNode("div", {
            ref_key: "blockHeader",
            ref: blockHeader,
            class: "lkt-page-editor-block-header-container",
            onClick: _cache[0] || (_cache[0] = ($event) => showCustomToolbar.value = !showCustomToolbar.value)
          }, [
            item.value.itemId <= 0 ? (openBlock(), createBlock(BlockHeader, { key: 0 }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass(computedIcon.value)
                }, null, 2),
                createTextVNode(" " + toDisplayString(computedBlockTitle.value), 1)
              ]),
              _: 1
            })) : ((_a = customBasicBlock.value) == null ? void 0 : _a.slot) ? (openBlock(), createBlock(BlockHeader, { key: 1 }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(customBasicBlock.value.slot), {
                  item: item.value.item
                }, null, 8, ["item"]))
              ]),
              _: 1
            })) : (openBlock(), createBlock(BlockHeader, { key: 2 }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass(computedIcon.value)
                }, null, 2),
                createTextVNode(" " + toDisplayString(computedBlockTitle.value), 1)
              ]),
              _: 1
            }))
          ], 512), [
            [vShow, computedDisplayBlockHeader.value]
          ]),
          _cache[1] || (setBlockTracking(-1), (_cache[1] = withDirectives(createElementVNode("div", {
            class: "lkt-text-editor-content",
            ref_key: "editor",
            ref: editor,
            placeholder: computedPlaceholder.value,
            contenteditable: _ctx.editMode,
            innerHTML: item.value.content,
            onKeyup: onEditorKeyUp
          }, null, 40, ["placeholder", "contenteditable", "innerHTML"]), [
            [vShow, computedDisplayContentEdition.value]
          ])).cacheIndex = 1, setBlockTracking(1), _cache[1])
        ]),
        createVNode(_component_lkt_tooltip, {
          class: "lkt-editor-toolbar",
          modelValue: showToolbar.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => showToolbar.value = $event),
          referrer: container.value,
          "location-y": "top",
          "referrer-margin": "5"
        }, {
          default: withCtx(({ doClose }) => [
            createElementVNode("div", _hoisted_2$6, [
              createVNode(_component_lkt_button, {
                class: "text-format-button",
                icon: "pagetor-icon-bold",
                onClick: _cache[2] || (_cache[2] = () => execDefaultAction("bold"))
              }),
              createVNode(_component_lkt_button, {
                class: "text-format-button",
                icon: "pagetor-icon-italic",
                onClick: _cache[3] || (_cache[3] = () => execDefaultAction("italic"))
              }),
              createVNode(_component_lkt_button, {
                class: "text-format-button",
                icon: "pagetor-icon-underline",
                onClick: _cache[4] || (_cache[4] = () => execDefaultAction("underline"))
              }),
              createVNode(_component_lkt_button, {
                class: "text-format-button",
                icon: "pagetor-icon-strike",
                onClick: _cache[5] || (_cache[5] = () => execDefaultAction("strikeThrough"))
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "referrer"]),
        createVNode(_component_lkt_tooltip, {
          class: "lkt-editor-toolbar",
          modelValue: showCustomToolbar.value,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => showCustomToolbar.value = $event),
          referrer: blockHeader.value,
          "location-y": "bottom",
          "referrer-width": ""
        }, {
          default: withCtx(({ doClose }) => [
            createElementVNode("div", _hoisted_3$2, [
              createVNode(_component_lkt_field_text, {
                modelValue: item.value.title,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => item.value.title = $event),
                label: "Title"
              }, null, 8, ["modelValue"]),
              createVNode(_component_lkt_field_text, {
                modelValue: item.value.icon,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => item.value.icon = $event),
                label: "Icon"
              }, null, 8, ["modelValue"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "referrer"])
      ], 2);
    };
  }
});
const _hoisted_1$7 = { class: "lkt-editor-block-grid" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ItemEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    ref(null);
    const container = ref(null);
    const blockHeader = ref(null);
    const itemPicker = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const computedClass = computed(() => {
      let r = [];
      if (item.value.component === "item") r.push("is-item");
      return r.join(" ");
    });
    const customItemType = computed(() => {
      let searchType = item.value.component.split(":")[1];
      let found = Settings.customItemTypes.find((z) => z.component === searchType);
      if (found) return found;
      return void 0;
    });
    const computedIcon = computed(() => {
      if (typeof customItemType.value === "undefined") return "icon-cog";
      if (customItemType.value.icon) return customItemType.value.icon;
      return "icon-cog";
    });
    const onSelectedOption = (opt) => {
      item.value.item = opt;
      showToolbar.value = false;
    };
    watch(() => props.modelValue, (v) => item.value = v, { deep: true });
    watch(item, (v) => emit("update:modelValue", v), { deep: true });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      const _component_lkt_field_select = resolveComponent("lkt-field-select");
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass(["lkt-editor-block lkt-item-editor", computedClass.value])
      }, [
        createElementVNode("div", {
          ref_key: "blockHeader",
          ref: blockHeader,
          class: "lkt-page-editor-block-header-container",
          onClick: _cache[0] || (_cache[0] = ($event) => showToolbar.value = !showToolbar.value)
        }, [
          ((_a = customItemType.value) == null ? void 0 : _a.type) === "item" ? (openBlock(), createBlock(BlockHeader, { key: 0 }, {
            default: withCtx(() => {
              var _a2;
              return [
                item.value.itemId <= 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createElementVNode("i", {
                    class: normalizeClass(computedIcon.value)
                  }, null, 2),
                  _cache[4] || (_cache[4] = createTextVNode(" Pick an item "))
                ], 64)) : ((_a2 = customItemType.value) == null ? void 0 : _a2.slot) ? (openBlock(), createBlock(resolveDynamicComponent(customItemType.value.slot), {
                  key: 1,
                  item: item.value.item
                }, null, 8, ["item"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createElementVNode("i", {
                    class: normalizeClass(computedIcon.value)
                  }, null, 2),
                  createTextVNode(" " + toDisplayString(item.value.item.label), 1)
                ], 64))
              ];
            }),
            _: 1
          })) : ((_b = customItemType.value) == null ? void 0 : _b.type) === "items" ? (openBlock(), createBlock(BlockHeader, { key: 1 }, {
            default: withCtx(() => {
              var _a2;
              return [
                item.value.itemsIds.length === 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createElementVNode("i", {
                    class: normalizeClass(computedIcon.value)
                  }, null, 2),
                  _cache[5] || (_cache[5] = createTextVNode(" Pick some items "))
                ], 64)) : ((_a2 = customItemType.value) == null ? void 0 : _a2.slot) ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(item.value.items, (pickedItem) => {
                  return openBlock(), createBlock(resolveDynamicComponent(customItemType.value.slot), { item: pickedItem }, null, 8, ["item"]);
                }), 256)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createElementVNode("i", {
                    class: normalizeClass(computedIcon.value)
                  }, null, 2),
                  createTextVNode(" " + toDisplayString(item.value.itemsIds.length) + " items picked ", 1)
                ], 64))
              ];
            }),
            _: 1
          })) : ((_c = customItemType.value) == null ? void 0 : _c.type) === "auto" ? (openBlock(), createBlock(BlockHeader, { key: 2 }, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass(computedIcon.value)
              }, null, 2),
              createTextVNode(" " + toDisplayString(customItemType.value.text), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ], 512),
        ((_d = customItemType.value) == null ? void 0 : _d.type) !== "auto" ? (openBlock(), createBlock(_component_lkt_tooltip, {
          key: 0,
          class: "lkt-editor-toolbar",
          modelValue: showToolbar.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => showToolbar.value = $event),
          referrer: blockHeader.value,
          "location-y": "bottom",
          "referrer-width": ""
        }, {
          default: withCtx(({ doClose }) => {
            var _a2, _b2, _c2, _d2, _e, _f;
            return [
              createElementVNode("div", _hoisted_1$7, [
                ((_a2 = customItemType.value) == null ? void 0 : _a2.type) === "item" ? (openBlock(), createBlock(_component_lkt_field_select, {
                  key: 0,
                  ref_key: "itemPicker",
                  ref: itemPicker,
                  modelValue: item.value.itemId,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value.itemId = $event),
                  label: "Select item",
                  searchable: "",
                  resource: (_b2 = customItemType.value) == null ? void 0 : _b2.resource,
                  "resource-data": (_c2 = customItemType.value) == null ? void 0 : _c2.resourceData,
                  onSelectedOption
                }, null, 8, ["modelValue", "resource", "resource-data"])) : ((_d2 = customItemType.value) == null ? void 0 : _d2.type) === "items" ? (openBlock(), createBlock(_component_lkt_field_select, {
                  key: 1,
                  ref_key: "itemPicker",
                  ref: itemPicker,
                  modelValue: item.value.itemsIds,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => item.value.itemsIds = $event),
                  options: item.value.items,
                  label: "Select item",
                  searchable: "",
                  multiple: "",
                  resource: (_e = customItemType.value) == null ? void 0 : _e.resource,
                  "resource-data": (_f = customItemType.value) == null ? void 0 : _f.resourceData,
                  onSelectedOption
                }, null, 8, ["modelValue", "options", "resource", "resource-data"])) : createCommentVNode("", true)
              ])
            ];
          }),
          _: 1
        }, 8, ["modelValue", "referrer"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _hoisted_1$6 = { class: "lkt-container-editor-canvas" };
const _hoisted_2$5 = { class: "lkt-editor-block-grid" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ContainerEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false },
    canvasLevel: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const container = ref(null);
    ref(null);
    const blockHeader = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const computedClass = computed(() => {
      let r = [];
      if (item.value.component === BlockComponentType.LktAccordion) r.push("is-accordion");
      if (item.value.component === BlockComponentType.LktBox) r.push("is-box");
      if (item.value.component === BlockComponentType.Columns) r.push("is-columns");
      return r.join(" ");
    });
    const customItemType = computed(() => {
      let found = Settings.customItemTypes.find((z) => z.component === item.value.itemType);
      if (found) return found;
      return void 0;
    });
    const computedIcon = computed(() => {
      if (typeof customItemType.value === "undefined") {
        switch (item.value.component) {
          case BlockComponentType.LktAccordion:
            return "pagetor-icon-layers";
          case BlockComponentType.LktBox:
            return "pagetor-icon-box";
          case BlockComponentType.Columns:
            return "pagetor-icon-columns";
          default:
            return "icon-cog";
        }
      }
      if (customItemType.value.icon) return customItemType.value.icon;
      return "icon-cog";
    });
    const computedCanvasLevel = computed(() => {
      if (item.value.component === "columns") return 0;
      return props.canvasLevel + 1;
    });
    const computedBlockTitle = computed(() => {
      if (item.value.component === BlockComponentType.Columns) {
        return "Column engine (" + item.value.columns + " columns)";
      }
      return item.value.component;
    });
    watch(() => props.modelValue, (v) => item.value = v, { deep: true });
    watch(item, (v) => emit("update:modelValue", v), { deep: true });
    return (_ctx, _cache) => {
      const _component_lkt_field_text = resolveComponent("lkt-field-text");
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass(["lkt-editor-block lkt-container-editor", computedClass.value])
      }, [
        createElementVNode("div", {
          ref_key: "blockHeader",
          ref: blockHeader,
          class: "lkt-page-editor-block-header-container",
          onClick: _cache[0] || (_cache[0] = ($event) => showToolbar.value = !showToolbar.value)
        }, [
          createVNode(BlockHeader, null, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass(computedIcon.value)
              }, null, 2),
              createTextVNode(" " + toDisplayString(computedBlockTitle.value), 1)
            ]),
            _: 1
          })
        ], 512),
        createElementVNode("div", _hoisted_1$6, [
          createVNode(_sfc_main$1, {
            modelValue: item.value.blocks,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value.blocks = $event),
            "edit-mode": _ctx.editMode,
            "canvas-level": computedCanvasLevel.value,
            columns: item.value.columns
          }, null, 8, ["modelValue", "edit-mode", "canvas-level", "columns"])
        ]),
        createVNode(_component_lkt_tooltip, {
          class: "lkt-editor-toolbar",
          modelValue: showToolbar.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => showToolbar.value = $event),
          referrer: blockHeader.value,
          "location-y": "bottom",
          "referrer-width": ""
        }, {
          default: withCtx(({ doClose }) => [
            createElementVNode("div", _hoisted_2$5, [
              createVNode(_component_lkt_field_text, {
                modelValue: item.value.title,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => item.value.title = $event),
                label: "Title"
              }, null, 8, ["modelValue"]),
              createVNode(_component_lkt_field_text, {
                modelValue: item.value.columns,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => item.value.columns = $event),
                label: "Columns",
                "is-number": "",
                min: 1,
                max: 10
              }, null, 8, ["modelValue"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "referrer"])
      ], 2);
    };
  }
});
const _hoisted_1$5 = { class: "lkt-page-editor-block-buttons" };
const _hoisted_2$4 = { class: "lkt-page-editor-add-menu" };
const _hoisted_3$1 = { class: "lkt-page-editor-add-menu" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BlockButtons",
  props: {
    modelValue: { default: [] }
  },
  emits: ["drop"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const item = ref(props.modelValue);
    const onClickDrop = () => {
      emit("drop");
    };
    const computedDisplaySwitchBetweenBasicBlocks = computed(() => {
      return [
        BlockComponentType.Text,
        BlockComponentType.Header1,
        BlockComponentType.Header2,
        BlockComponentType.Header3
      ].includes(item.value.component);
    });
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        _cache[1] || (_cache[1] = createElementVNode("div", { class: "drag-indicator" }, null, -1)),
        createVNode(_component_lkt_button, {
          icon: "icon-cog",
          tooltip: "",
          "tooltip-class": "lkt-page-editor-menu-tooltip"
        }, {
          tooltip: withCtx(({ doClose }) => [
            createElementVNode("div", _hoisted_2$4, [
              _cache[0] || (_cache[0] = createElementVNode("div", { class: "lkt-page-editor-add-menu-title" }, "Block Options", -1)),
              createVNode(_component_lkt_button, {
                class: "lkt-page-editor-add-menu-button",
                icon: "pagetor-icon-fontsize",
                text: "Convert To",
                onClick: () => {
                  doClose();
                },
                tooltip: "",
                "tooltip-class": "lkt-page-editor-menu-tooltip"
              }, {
                tooltip: withCtx(({ doClose: doClose2 }) => [
                  createElementVNode("div", _hoisted_3$1, [
                    computedDisplaySwitchBetweenBasicBlocks.value ? (openBlock(), createBlock(_component_lkt_button, {
                      key: 0,
                      class: "lkt-page-editor-add-menu-button",
                      icon: "pagetor-icon-fontsize",
                      text: "Text",
                      onClick: () => {
                        doClose2();
                        unref(PageBlock).convertBlock(item.value, unref(BlockComponentType).Text);
                      }
                    }, null, 8, ["onClick"])) : createCommentVNode("", true),
                    computedDisplaySwitchBetweenBasicBlocks.value ? (openBlock(), createBlock(_component_lkt_button, {
                      key: 1,
                      class: "lkt-page-editor-add-menu-button",
                      icon: "pagetor-icon-fontsize",
                      text: "Header 1",
                      onClick: () => {
                        doClose2();
                        unref(PageBlock).convertBlock(item.value, unref(BlockComponentType).Header1);
                      }
                    }, null, 8, ["onClick"])) : createCommentVNode("", true),
                    computedDisplaySwitchBetweenBasicBlocks.value ? (openBlock(), createBlock(_component_lkt_button, {
                      key: 2,
                      class: "lkt-page-editor-add-menu-button",
                      icon: "pagetor-icon-fontsize",
                      text: "Header 2",
                      onClick: () => {
                        doClose2();
                        unref(PageBlock).convertBlock(item.value, unref(BlockComponentType).Header2);
                      }
                    }, null, 8, ["onClick"])) : createCommentVNode("", true),
                    computedDisplaySwitchBetweenBasicBlocks.value ? (openBlock(), createBlock(_component_lkt_button, {
                      key: 3,
                      class: "lkt-page-editor-add-menu-button",
                      icon: "pagetor-icon-fontsize",
                      text: "Header 3",
                      onClick: () => {
                        doClose2();
                        unref(PageBlock).convertBlock(item.value, unref(BlockComponentType).Header3);
                      }
                    }, null, 8, ["onClick"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"]),
              createVNode(_component_lkt_button, {
                class: "lkt-page-editor-add-menu-button",
                icon: "pagetor-icon-language",
                text: "I18n mode",
                onClick: () => {
                  doClose();
                }
              }, null, 8, ["onClick"]),
              createVNode(_component_lkt_button, {
                class: "lkt-page-editor-add-menu-button",
                icon: "pagetor-icon-language",
                text: "Translate",
                onClick: () => {
                  doClose();
                }
              }, null, 8, ["onClick"]),
              createVNode(_component_lkt_button, {
                class: "lkt-page-editor-add-menu-button",
                icon: "pagetor-icon-erase",
                text: "Remove",
                onClick: () => {
                  doClose();
                  onClickDrop();
                }
              }, null, 8, ["onClick"])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const BlockButtons = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-42cf4c46"]]);
const _hoisted_1$4 = { class: "lkt-container-editor-canvas" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ListEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false },
    canvasLevel: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const container = ref(null);
    ref(null);
    const blockHeader = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const computedClass = computed(() => {
      let r = [];
      if (item.value.component === "ul") r.push("is-ul");
      return r.join(" ");
    });
    const customItemType = computed(() => {
      let found = Settings.customItemTypes.find((z) => z.component === item.value.itemType);
      if (found) return found;
      return void 0;
    });
    const computedIcon = computed(() => {
      if (typeof customItemType.value === "undefined") {
        switch (item.value.component) {
          case BlockComponentType.BulletList:
            return "pagetor-icon-list-bullet";
          default:
            return "icon-cog";
        }
      }
      if (customItemType.value.icon) return customItemType.value.icon;
      return "icon-cog";
    });
    const computedBlockTitle = computed(() => {
      if (item.value.component === BlockComponentType.BulletList) {
        return "Bullet list";
      }
      return item.value.component;
    });
    watch(() => props.modelValue, (v) => item.value = v, { deep: true });
    watch(item, (v) => emit("update:modelValue", v), { deep: true });
    return (_ctx, _cache) => {
      resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass(["lkt-editor-block lkt-list-editor", computedClass.value])
      }, [
        createElementVNode("div", {
          ref_key: "blockHeader",
          ref: blockHeader,
          class: "lkt-page-editor-block-header-container",
          onClick: _cache[0] || (_cache[0] = ($event) => showToolbar.value = !showToolbar.value)
        }, [
          createVNode(BlockHeader, null, {
            default: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass(computedIcon.value)
              }, null, 2),
              createTextVNode(" " + toDisplayString(computedBlockTitle.value), 1)
            ]),
            _: 1
          })
        ], 512),
        createElementVNode("div", _hoisted_1$4, [
          createVNode(_sfc_main$1, {
            modelValue: item.value.blocks,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value.blocks = $event),
            "edit-mode": _ctx.editMode,
            "canvas-level": -2,
            columns: item.value.columns
          }, null, 8, ["modelValue", "edit-mode", "columns"])
        ]),
        createCommentVNode("", true)
      ], 2);
    };
  }
});
const _hoisted_1$3 = { class: "lkt-page-editor-block" };
const _hoisted_2$3 = { class: "lkt-page-editor-block-content" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "EditionBlock",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false },
    canvasLevel: {},
    index: { default: -1 }
  },
  emits: ["drop", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const item = ref(props.modelValue);
    const computedRenderEditor = computed(() => {
      switch (item.value.component) {
        case BlockComponentType.Text:
        case BlockComponentType.Header1:
        case BlockComponentType.Header2:
        case BlockComponentType.Header3:
        case BlockComponentType.ListItem:
        case BlockComponentType.LktIcon:
          return 0;
        case BlockComponentType.Item:
          return 1;
        case BlockComponentType.LktAccordion:
        case BlockComponentType.LktBox:
        case BlockComponentType.Columns:
          return 2;
        case BlockComponentType.BulletList:
          return 3;
      }
      if (item.value.component.startsWith("item:")) return 1;
      if (item.value.component.startsWith("basic:")) return 0;
    });
    const onDropEditor = () => {
      emit("drop", props.index);
    };
    const onAppend = (component) => {
      emit("append", props.index, component);
    };
    watch(() => props.modelValue, (v) => item.value = v, { deep: true });
    watch(item, (v) => emit("update:modelValue", v), { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        withDirectives(createVNode(BlockButtons, {
          modelValue: item.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => item.value = $event),
          onDrop: onDropEditor
        }, null, 8, ["modelValue"]), [
          [vShow, _ctx.editMode]
        ]),
        createElementVNode("div", _hoisted_2$3, [
          computedRenderEditor.value === 0 ? (openBlock(), createBlock(_sfc_main$8, {
            key: 0,
            modelValue: item.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value = $event),
            "edit-mode": _ctx.editMode,
            onDrop: onDropEditor,
            onAppend
          }, null, 8, ["modelValue", "edit-mode"])) : createCommentVNode("", true),
          computedRenderEditor.value === 1 ? (openBlock(), createBlock(_sfc_main$7, {
            key: 1,
            modelValue: item.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => item.value = $event),
            "edit-mode": _ctx.editMode
          }, null, 8, ["modelValue", "edit-mode"])) : createCommentVNode("", true),
          computedRenderEditor.value === 2 ? (openBlock(), createBlock(_sfc_main$6, {
            key: 2,
            modelValue: item.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => item.value = $event),
            "edit-mode": _ctx.editMode,
            "canvas-level": _ctx.canvasLevel
          }, null, 8, ["modelValue", "edit-mode", "canvas-level"])) : createCommentVNode("", true),
          computedRenderEditor.value === 3 ? (openBlock(), createBlock(_sfc_main$4, {
            key: 3,
            modelValue: item.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => item.value = $event),
            "edit-mode": _ctx.editMode,
            "canvas-level": _ctx.canvasLevel
          }, null, 8, ["modelValue", "edit-mode", "canvas-level"])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const _hoisted_1$2 = { class: "lkt-page-editor-add-menu" };
const _hoisted_2$2 = {
  key: 0,
  class: "lkt-page-editor-add-menu-title"
};
const _hoisted_3 = {
  key: 9,
  class: "lkt-page-editor-add-menu-title"
};
const _hoisted_4 = {
  key: 13,
  class: "lkt-page-editor-add-menu-title"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AddBlockMenu",
  props: {
    modelValue: { default: [] },
    canvasLevel: { default: 0 },
    doClose: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const content = ref(props.modelValue);
    watch(() => props.modelValue, (v) => content.value = v, { deep: true });
    watch(content, (v) => emit("update:modelValue", v), { deep: true });
    const computedCustomItemTypes = computed(() => Settings.customItemTypes);
    const computedCustomBasicBlocks = computed(() => Settings.customBasicBlocks);
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _ctx.canvasLevel !== -2 ? (openBlock(), createElementBlock("div", _hoisted_2$2, "Basic blocks")) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 1,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-fontsize",
          text: "Text",
          onClick: _cache[0] || (_cache[0] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createTextEditor());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 2,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-header",
          text: "Heading 1",
          onClick: _cache[1] || (_cache[1] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createHeadingOneEditor());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 3,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-header",
          text: "Heading 2",
          onClick: _cache[2] || (_cache[2] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createHeadingTwoEditor());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 4,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-header",
          text: "Heading 3",
          onClick: _cache[3] || (_cache[3] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createHeadingThreeEditor());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 5,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-fontsize",
          text: "LKT Icon",
          onClick: _cache[4] || (_cache[4] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createLktIcon());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 ? (openBlock(true), createElementBlock(Fragment, { key: 6 }, renderList(computedCustomBasicBlocks.value, (customBlock) => {
          return openBlock(), createBlock(_component_lkt_button, {
            class: "lkt-page-editor-add-menu-button",
            icon: customBlock.icon,
            text: customBlock.text,
            onClick: () => {
              _ctx.doClose();
              content.value.push(unref(PageBlock).createBasicBlock(customBlock.component));
            }
          }, null, 8, ["icon", "text", "onClick"]);
        }), 256)) : createCommentVNode("", true),
        _cache[10] || (_cache[10] = createElementVNode("div", { class: "lkt-page-editor-add-menu-title" }, "Lists", -1)),
        _ctx.canvasLevel !== -2 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 7,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-list-bullet",
          text: "Bullet list",
          onClick: _cache[5] || (_cache[5] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createBulletList());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel === -2 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 8,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-fontsize",
          text: "List Item",
          onClick: _cache[6] || (_cache[6] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createListItem());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel === 0 ? (openBlock(), createElementBlock("div", _hoisted_3, "Containers")) : createCommentVNode("", true),
        _ctx.canvasLevel === 0 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 10,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-layers",
          text: "Accordion",
          onClick: _cache[7] || (_cache[7] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createLktAccordion());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel === 0 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 11,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-box",
          text: "Box",
          onClick: _cache[8] || (_cache[8] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createLktBox());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel === 0 ? (openBlock(), createBlock(_component_lkt_button, {
          key: 12,
          class: "lkt-page-editor-add-menu-button",
          icon: "pagetor-icon-columns",
          text: "Columns",
          onClick: _cache[9] || (_cache[9] = () => {
            _ctx.doClose();
            content.value.push(unref(PageBlock).createColumnEngine());
          })
        })) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 && computedCustomItemTypes.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4, "Item Reference")) : createCommentVNode("", true),
        _ctx.canvasLevel !== -2 ? (openBlock(true), createElementBlock(Fragment, { key: 14 }, renderList(computedCustomItemTypes.value, (customItemType) => {
          return openBlock(), createBlock(_component_lkt_button, {
            class: "lkt-page-editor-add-menu-button",
            icon: customItemType.icon,
            text: customItemType.text,
            onClick: () => {
              _ctx.doClose();
              content.value.push(unref(PageBlock).createItemEditor(customItemType.component));
            }
          }, null, 8, ["icon", "text", "onClick"]);
        }), 256)) : createCommentVNode("", true)
      ]);
    };
  }
});
const AddBlockMenu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b68d7e73"]]);
const _hoisted_1$1 = { class: "lkt-page-editor-canvas lkt-grid-1" };
const _hoisted_2$1 = { class: "lkt-page-editor-canvas-nav" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EditionCanvas",
  props: {
    modelValue: { default: [] },
    columns: { default: 1 },
    editMode: { type: Boolean, default: false },
    canvasLevel: { default: 0 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const content = ref(props.modelValue);
    const sortable = ref(void 0);
    const dragArea = ref(null);
    const updateTimeStamp = ref(0);
    const uniqueId = generateRandomString(12);
    const computedColumnClass = computed(() => {
      return "lkt-grid-1";
    });
    const onDropBlock = (index) => {
      content.value.splice(index, 1);
      updateTimeStamp.value = time();
    };
    const onAppend = (index, component) => {
      let block = component === BlockComponentType.ListItem ? PageBlock.createListItem() : PageBlock.createTextEditor();
      content.value.splice(index + 1, 0, block);
      updateTimeStamp.value = time();
    };
    const getBlockKey = (index) => {
      let r = [updateTimeStamp.value, uniqueId, "row", index];
      return r.join("-");
    };
    onMounted(() => {
      nextTick(() => {
        sortable.value = new Sortable(dragArea.value, {
          group: "group-" + time(),
          handle: ".drag-indicator",
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          onEnd: function(evt) {
            let oldIndex = evt.oldIndex;
            let newIndex = evt.newIndex;
            content.value.splice(newIndex, 0, content.value.splice(oldIndex, 1)[0]);
            updateTimeStamp.value = time();
          }
        });
      });
    });
    watch(() => props.modelValue, (v) => content.value = v, { deep: true });
    watch(content, (v) => emit("update:modelValue", v), { deep: true });
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        withDirectives(createElementVNode("div", {
          ref_key: "dragArea",
          ref: dragArea,
          class: normalizeClass(["lkt-page-editor-drag-area", computedColumnClass.value])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(content.value, (_, i) => {
            return openBlock(), createBlock(_sfc_main$3, {
              modelValue: content.value[i],
              "onUpdate:modelValue": ($event) => content.value[i] = $event,
              key: getBlockKey(i),
              "edit-mode": _ctx.editMode,
              "canvas-level": _ctx.canvasLevel,
              index: i,
              onDrop: onDropBlock,
              onAppend
            }, null, 8, ["modelValue", "onUpdate:modelValue", "edit-mode", "canvas-level", "index"]);
          }), 128))
        ], 2), [
          [vShow, content.value.length > 0]
        ]),
        createElementVNode("div", _hoisted_2$1, [
          createVNode(_component_lkt_button, {
            text: "Add block",
            "tooltip-window-margin": "30",
            "tooltip-referrer-margin": "7",
            split: "",
            "split-class": "lkt-page-editor-menu-tooltip"
          }, {
            split: withCtx(({ doClose }) => [
              createVNode(AddBlockMenu, {
                modelValue: content.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => content.value = $event),
                "canvas-level": _ctx.canvasLevel,
                "do-close": doClose
              }, null, 8, ["modelValue", "canvas-level", "do-close"])
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const _hoisted_1 = { class: "lkt-page-editor-container" };
const _hoisted_2 = { class: "lkt-page-editor" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktPageEditor",
  props: {
    modelValue: { default: [] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const content = ref(props.modelValue);
    const editMode = ref(true);
    watch(() => props.modelValue, (v) => content.value = v);
    watch(content, (v) => emit("update:modelValue", v));
    return (_ctx, _cache) => {
      const _component_lkt_field_switch = resolveComponent("lkt-field-switch");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[2] || (_cache[2] = createElementVNode("div", { class: "like-lkt-field-label" }, "Page content", -1)),
        createVNode(_component_lkt_field_switch, {
          label: "edit mode",
          modelValue: editMode.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editMode.value = $event)
        }, null, 8, ["modelValue"]),
        createElementVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, {
            modelValue: content.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => content.value = $event),
            "edit-mode": editMode.value,
            "canvas-level": 0
          }, null, 8, ["modelValue", "edit-mode"])
        ])
      ]);
    };
  }
});
class CustomItemType {
  constructor(data = {}) {
    this.component = "";
    this.text = "";
    this.resource = "";
    this.icon = "";
    this.slot = "";
    this.resourceData = {};
    this.type = "item";
    for (let k in data) {
      if (this.hasOwnProperty(k)) {
        this[k] = data[k];
      }
    }
  }
}
class CustomBasicBlock {
  //Campos extra para agregar a la configuración
  // config: {value: 'title', label: '', type: 'lkt-field-text'} // Y agregar también al configuración extra necesaria en caso de que tengamos un campo de tipo item picker
  constructor(data = {}) {
    this.component = "";
    this.text = "";
    this.icon = "";
    this.slot = "";
    this.contentEnabled = true;
    this.config = {};
    for (let k in data) {
      if (this.hasOwnProperty(k)) {
        this[k] = data[k];
      }
    }
  }
}
const LktPageEditor = {
  install: (app) => {
    if (app.component("lkt-page-editor") === void 0) app.component("lkt-page-editor", _sfc_main);
  }
};
const addItemTypeToEditor = (config) => {
  Settings.customItemTypes.push(config);
};
const addBasicBlockToEditor = (config) => {
  Settings.customBasicBlocks.push(config);
};
export {
  CustomBasicBlock,
  CustomItemType,
  addBasicBlockToEditor,
  addItemTypeToEditor,
  LktPageEditor as default
};
