import { openBlock, createElementBlock, createElementVNode, defineComponent, ref, onMounted, computed, resolveComponent, normalizeClass, createVNode, createTextVNode, toDisplayString, createCommentVNode, withDirectives, vShow, withCtx, Fragment, createBlock, resolveDynamicComponent, renderList, unref } from "vue";
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
    this.blocks = [];
    this.columns = 1;
    this.className = "";
    this.config = {};
    for (let k in data) {
      if (this.hasOwnProperty(k)) {
        this[k] = data[k];
      }
    }
  }
  static createBasicBlock(itemType) {
    return new PageBlock({
      component: "basic-block",
      itemType
    });
  }
  static createItemEditor(itemType) {
    return new PageBlock({
      component: "item",
      itemType
    });
  }
  static createTextEditor() {
    return new PageBlock({
      component: "text"
    });
  }
  static createHeadingOneEditor() {
    return new PageBlock({
      component: "h1"
    });
  }
  static createHeadingTwoEditor() {
    return new PageBlock({
      component: "h2"
    });
  }
  static createHeadingThreeEditor() {
    return new PageBlock({
      component: "h3"
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
      component: "columns",
      columns: 2,
      config: new ColumnsConfig()
    });
  }
  static createLktBox() {
    return new PageBlock({
      component: "lkt-box",
      config: new BoxConfig()
    });
  }
  static createLktAccordion() {
    return new PageBlock({
      component: "lkt-accordion",
      config: new AccordionConfig()
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$6 = {};
const _hoisted_1$6 = { class: "lkt-page-editor-block-buttons" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, _cache[0] || (_cache[0] = [
    createElementVNode("div", { class: "drag-indicator" }, null, -1)
  ]));
}
const BlockButtons = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render], ["__scopeId", "data-v-d529b354"]]);
const _Settings = class _Settings {
};
_Settings.defaultIcon = void 0;
_Settings.customItemTypes = [];
_Settings.customBasicBlocks = [];
let Settings = _Settings;
const _hoisted_1$5 = { class: "lkt-grid-1" };
const _hoisted_2$3 = ["placeholder", "contenteditable", "innerHTML"];
const _hoisted_3$1 = { class: "" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TextEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const editor = ref(null);
    const container = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const onSelectedText = () => {
      if (!props.editMode) return;
      let text = getSelectionText();
      showToolbar.value = text.length > 0;
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
      if (item.value.component === "text") r.push("is-text");
      if (item.value.component === "h1") r.push("is-h1");
      if (item.value.component === "h2") r.push("is-h2");
      if (item.value.component === "h3") r.push("is-h3");
      return r.join(" ");
    }), computedPlaceholder = computed(() => {
      switch (item.value.component) {
        case "h1":
          return "Heading 1";
        case "h2":
          return "Heading 2";
        case "h3":
          return "Heading 3";
        case "text":
          return "Time to write something";
        default:
          return "Time to write something";
      }
    });
    const customBasicBlock = computed(() => {
      let found = Settings.customBasicBlocks.find((z) => z.component === item.value.itemType);
      if (found) return found;
      return void 0;
    });
    const computedIcon = computed(() => {
      if (typeof customBasicBlock.value === "undefined") return "icon-cog";
      if (customBasicBlock.value.icon) return customBasicBlock.value.icon;
      return "icon-cog";
    });
    const computedBlockTitle = computed(() => {
      var _a;
      return (_a = customBasicBlock.value) == null ? void 0 : _a.text;
    });
    const computedDisplayContentEdition = computed(() => {
      console.log("computedDisplayContentEdition: ", customBasicBlock.value);
      if (typeof customBasicBlock.value === "undefined") return true;
      return customBasicBlock.value.contentEnabled;
    });
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass(["lkt-editor-block lkt-text-editor", computedClass.value])
      }, [
        createVNode(BlockButtons),
        createElementVNode("div", _hoisted_1$5, [
          customBasicBlock.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "lkt-container-editor-content",
            onClick: _cache[0] || (_cache[0] = ($event) => showToolbar.value = !showToolbar.value)
          }, [
            createElementVNode("i", {
              class: normalizeClass(computedIcon.value)
            }, null, 2),
            createTextVNode(" " + toDisplayString(computedBlockTitle.value), 1)
          ])) : createCommentVNode("", true),
          withDirectives(createElementVNode("div", {
            class: "lkt-text-editor-content",
            ref_key: "editor",
            ref: editor,
            placeholder: computedPlaceholder.value,
            contenteditable: _ctx.editMode,
            innerHTML: item.value.content
          }, null, 8, _hoisted_2$3), [
            [vShow, computedDisplayContentEdition.value]
          ])
        ]),
        createVNode(_component_lkt_tooltip, {
          class: "lkt-editor-toolbar",
          modelValue: showToolbar.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => showToolbar.value = $event),
          referrer: container.value,
          "location-y": "top"
        }, {
          default: withCtx(({ doClose }) => [
            createElementVNode("div", _hoisted_3$1, [
              createVNode(_component_lkt_button, {
                text: "bold",
                onClick: _cache[1] || (_cache[1] = () => execDefaultAction("bold"))
              }),
              createVNode(_component_lkt_button, {
                text: "italic",
                onClick: _cache[2] || (_cache[2] = () => execDefaultAction("italic"))
              }),
              createVNode(_component_lkt_button, {
                text: "underline",
                onClick: _cache[3] || (_cache[3] = () => execDefaultAction("underline"))
              }),
              createVNode(_component_lkt_button, {
                text: "strike-through",
                onClick: _cache[4] || (_cache[4] = () => execDefaultAction("strikeThrough"))
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "referrer"])
      ], 2);
    };
  }
});
const TextEditor = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-59ee9eb4"]]);
const _hoisted_1$4 = { class: "" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ItemEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const editor = ref(null);
    const itemPicker = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const computedClass = computed(() => {
      let r = [];
      if (item.value.component === "item") r.push("is-item");
      return r.join(" ");
    });
    const customItemType = computed(() => {
      let found = Settings.customItemTypes.find((z) => z.component === item.value.itemType);
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
    return (_ctx, _cache) => {
      var _a;
      const _component_lkt_field_select = resolveComponent("lkt-field-select");
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["lkt-editor-block lkt-item-editor", computedClass.value])
      }, [
        createVNode(BlockButtons),
        createElementVNode("div", {
          class: "lkt-item-editor-content",
          onClick: _cache[0] || (_cache[0] = ($event) => showToolbar.value = !showToolbar.value)
        }, [
          createElementVNode("i", {
            class: normalizeClass(computedIcon.value)
          }, null, 2),
          item.value.itemId <= 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(" Pick an item ")
          ], 64)) : ((_a = customItemType.value) == null ? void 0 : _a.slot) ? (openBlock(), createBlock(resolveDynamicComponent(customItemType.value.slot), {
            key: 1,
            item: item.value.item
          }, null, 8, ["item"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createTextVNode(toDisplayString(item.value.item.label), 1)
          ], 64))
        ]),
        createVNode(_component_lkt_tooltip, {
          class: "lkt-editor-toolbar",
          modelValue: showToolbar.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => showToolbar.value = $event),
          referrer: editor.value,
          "location-y": "bottom"
        }, {
          default: withCtx(({ doClose }) => {
            var _a2, _b;
            return [
              createElementVNode("div", _hoisted_1$4, [
                createVNode(_component_lkt_field_select, {
                  ref_key: "itemPicker",
                  ref: itemPicker,
                  modelValue: item.value.itemId,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value.itemId = $event),
                  label: "Select item",
                  searchable: "",
                  resource: (_a2 = customItemType.value) == null ? void 0 : _a2.resource,
                  "resource-data": (_b = customItemType.value) == null ? void 0 : _b.resourceData,
                  onSelectedOption
                }, null, 8, ["modelValue", "resource", "resource-data"])
              ])
            ];
          }),
          _: 1
        }, 8, ["modelValue", "referrer"])
      ], 2);
    };
  }
});
const ItemEditor = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-2d8bda8a"]]);
const _hoisted_1$3 = { class: "" };
const _hoisted_2$2 = { class: "lkt-container-editor-canvas" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ContainerEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false },
    canvasLevel: {}
  },
  setup(__props) {
    const props = __props;
    const editor = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const computedClass = computed(() => {
      let r = [];
      if (item.value.component === "lkt-accordion") r.push("is-accordion");
      return r.join(" ");
    });
    const customItemType = computed(() => {
      let found = Settings.customItemTypes.find((z) => z.component === item.value.itemType);
      if (found) return found;
      return void 0;
    });
    const computedIcon = computed(() => {
      if (typeof customItemType.value === "undefined") return "icon-cog";
      if (customItemType.value.icon) return customItemType.value.icon;
      return "icon-cog";
    });
    const computedCanvasLevel = computed(() => {
      if (item.value.component === "columns") return 0;
      return props.canvasLevel + 1;
    });
    const computedBlockTitle = computed(() => {
      if (item.value.component === "columns") {
        return "Column engine (" + item.value.columns + " columns)";
      }
      return item.value.component;
    });
    return (_ctx, _cache) => {
      const _component_lkt_field_text = resolveComponent("lkt-field-text");
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", {
          class: normalizeClass(["lkt-editor-block lkt-container-editor", computedClass.value])
        }, [
          createVNode(BlockButtons),
          createElementVNode("div", {
            class: "lkt-container-editor-content",
            onClick: _cache[0] || (_cache[0] = ($event) => showToolbar.value = true)
          }, [
            createElementVNode("i", {
              class: normalizeClass(computedIcon.value)
            }, null, 2),
            createTextVNode(" " + toDisplayString(computedBlockTitle.value), 1)
          ]),
          createVNode(_component_lkt_tooltip, {
            class: "lkt-editor-toolbar",
            modelValue: showToolbar.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => showToolbar.value = $event),
            referrer: editor.value,
            "location-y": "bottom"
          }, {
            default: withCtx(({ doClose }) => [
              createElementVNode("div", _hoisted_1$3, [
                createVNode(_component_lkt_field_text, {
                  modelValue: item.value.title,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value.title = $event),
                  label: "Title"
                }, null, 8, ["modelValue"]),
                createVNode(_component_lkt_field_text, {
                  modelValue: item.value.columns,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => item.value.columns = $event),
                  label: "Columns",
                  "is-number": "",
                  min: 1,
                  max: 10
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "referrer"])
        ], 2),
        createElementVNode("div", _hoisted_2$2, [
          createVNode(EditionCanvas, {
            modelValue: item.value.blocks,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => item.value.blocks = $event),
            "edit-mode": _ctx.editMode,
            "canvas-level": computedCanvasLevel.value,
            columns: item.value.columns
          }, null, 8, ["modelValue", "edit-mode", "canvas-level", "columns"])
        ])
      ], 64);
    };
  }
});
const ContainerEditor = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4537cab7"]]);
const _hoisted_1$2 = { class: "lkt-page-editor-block" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditionBlock",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false },
    canvasLevel: {}
  },
  setup(__props) {
    const props = __props;
    const item = ref(props.modelValue);
    const computedRenderEditor = computed(() => {
      switch (item.value.component) {
        case "text":
        case "basic-block":
        case "h1":
        case "h2":
        case "h3":
          return 0;
        case "item":
          return 1;
        case "lkt-accordion":
        case "lkt-box":
        case "columns":
          return 2;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        computedRenderEditor.value === 0 ? (openBlock(), createBlock(TextEditor, {
          key: 0,
          modelValue: item.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => item.value = $event),
          "edit-mode": _ctx.editMode
        }, null, 8, ["modelValue", "edit-mode"])) : createCommentVNode("", true),
        computedRenderEditor.value === 1 ? (openBlock(), createBlock(ItemEditor, {
          key: 1,
          modelValue: item.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value = $event),
          "edit-mode": _ctx.editMode
        }, null, 8, ["modelValue", "edit-mode"])) : createCommentVNode("", true),
        computedRenderEditor.value === 2 ? (openBlock(), createBlock(ContainerEditor, {
          key: 2,
          modelValue: item.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => item.value = $event),
          "edit-mode": _ctx.editMode,
          "canvas-level": _ctx.canvasLevel
        }, null, 8, ["modelValue", "edit-mode", "canvas-level"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "lkt-page-editor-canvas lkt-grid-1" };
const _hoisted_2$1 = { class: "lkt-page-editor-canvas-nav" };
const _hoisted_3 = { class: "lkt-page-editor-add-menu" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EditionCanvas",
  props: {
    modelValue: { default: [] },
    columns: { default: 1 },
    editMode: { type: Boolean, default: false },
    canvasLevel: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const content = ref(props.modelValue);
    const computedColumnClass = computed(() => {
      return "lkt-grid-" + props.columns;
    });
    const computedCustomItemTypes = computed(() => Settings.customItemTypes);
    const computedCustomBasicBlocks = computed(() => Settings.customBasicBlocks);
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createElementVNode("div", {
          class: normalizeClass(computedColumnClass.value)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(content.value, (_, i) => {
            return openBlock(), createBlock(_sfc_main$2, {
              modelValue: content.value[i],
              "onUpdate:modelValue": ($event) => content.value[i] = $event,
              "edit-mode": _ctx.editMode,
              "canvas-level": _ctx.canvasLevel
            }, null, 8, ["modelValue", "onUpdate:modelValue", "edit-mode", "canvas-level"]);
          }), 256))
        ], 2),
        createElementVNode("div", _hoisted_2$1, [
          createVNode(_component_lkt_button, {
            text: "Add block",
            "tooltip-window-margin": "30",
            "tooltip-referrer-margin": "7",
            split: ""
          }, {
            split: withCtx(({ doClose }) => [
              createElementVNode("div", _hoisted_3, [
                _cache[0] || (_cache[0] = createElementVNode("h2", null, "Basic blocks", -1)),
                createVNode(_component_lkt_button, {
                  class: "tooltip-menu-button",
                  text: "Text",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createTextEditor());
                  }
                }, null, 8, ["onClick"]),
                createVNode(_component_lkt_button, {
                  class: "tooltip-menu-button",
                  text: "Heading 1",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createHeadingOneEditor());
                  }
                }, null, 8, ["onClick"]),
                createVNode(_component_lkt_button, {
                  class: "tooltip-menu-button",
                  text: "Heading 2",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createHeadingTwoEditor());
                  }
                }, null, 8, ["onClick"]),
                createVNode(_component_lkt_button, {
                  class: "tooltip-menu-button",
                  text: "Heading 3",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createHeadingThreeEditor());
                  }
                }, null, 8, ["onClick"]),
                (openBlock(true), createElementBlock(Fragment, null, renderList(computedCustomBasicBlocks.value, (customBlock) => {
                  return openBlock(), createBlock(_component_lkt_button, {
                    class: "tooltip-menu-button",
                    text: customBlock.text,
                    onClick: () => {
                      doClose();
                      content.value.push(unref(PageBlock).createBasicBlock(customBlock.component));
                    }
                  }, null, 8, ["text", "onClick"]);
                }), 256)),
                _cache[1] || (_cache[1] = createElementVNode("h2", null, "Containers", -1)),
                _ctx.canvasLevel === 0 ? (openBlock(), createBlock(_component_lkt_button, {
                  key: 0,
                  class: "tooltip-menu-button",
                  text: "Accordion",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createLktAccordion());
                  }
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
                _ctx.canvasLevel === 0 ? (openBlock(), createBlock(_component_lkt_button, {
                  key: 1,
                  class: "tooltip-menu-button",
                  text: "Box",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createLktBox());
                  }
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
                _ctx.canvasLevel === 0 ? (openBlock(), createBlock(_component_lkt_button, {
                  key: 2,
                  class: "tooltip-menu-button",
                  text: "Columns",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createColumnEngine());
                  }
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
                _cache[2] || (_cache[2] = createElementVNode("h2", null, "Related", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(computedCustomItemTypes.value, (customItemType) => {
                  return openBlock(), createBlock(_component_lkt_button, {
                    class: "tooltip-menu-button",
                    text: customItemType.text,
                    onClick: () => {
                      doClose();
                      content.value.push(unref(PageBlock).createItemEditor(customItemType.component));
                    }
                  }, null, 8, ["text", "onClick"]);
                }), 256))
              ])
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const EditionCanvas = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9539d9af"]]);
const _hoisted_1 = { class: "lkt-page-editor-container" };
const _hoisted_2 = { class: "lkt-page-editor" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktPageEditor",
  props: {
    modelValue: { default: [] }
  },
  setup(__props) {
    const content = ref([]);
    const editMode = ref(true);
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
          createVNode(EditionCanvas, {
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
