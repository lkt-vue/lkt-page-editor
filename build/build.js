import { openBlock, createElementBlock, createElementVNode, defineComponent, ref, onMounted, computed, resolveComponent, normalizeClass, createVNode, withCtx, createBlock, createCommentVNode, Fragment, renderList, unref } from "vue";
import { closeModal, addModal } from "lkt-modal";
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
    this.component = "lkt-box";
    this.itemType = "";
    this.itemId = 0;
    this.item = {};
    this.items = [];
    this.itemsIds = [];
    this.content = "";
    this.blocks = [];
    this.columns = 1;
    this.className = "";
    this.classNameOpts = [
      { value: "info-box", label: "Info Box" },
      { value: "info-box with-header", label: "Info Box (header)" },
      { value: "warning-box", label: "Warning Box" }
    ];
    this.props = {
      title: ""
    };
    this.config = {
      onlyContent: false,
      alwaysOpen: false
    };
    for (let k in data) {
      if (this.hasOwnProperty(k)) {
        this[k] = data[k];
      }
    }
  }
  static createItemEditor(itemType) {
    return new PageBlock({
      component: "item",
      itemType,
      classNameOpts: []
    });
  }
  static createTextEditor() {
    return new PageBlock({
      component: "text",
      classNameOpts: []
    });
  }
  static createHeadingOneEditor() {
    return new PageBlock({
      component: "h1",
      classNameOpts: []
    });
  }
  static createHeadingTwoEditor() {
    return new PageBlock({
      component: "h2",
      classNameOpts: []
    });
  }
  static createHeadingThreeEditor() {
    return new PageBlock({
      component: "h3",
      classNameOpts: []
    });
  }
  static createLktFieldEditor() {
    return new PageBlock({
      component: "lkt-field-editor",
      classNameOpts: []
    });
  }
  static createLktFieldTextarea() {
    return new PageBlock({
      component: "lkt-field-textarea",
      classNameOpts: []
    });
  }
  static createLktBannerBox() {
    return new PageBlock({
      component: "lkt-banner-box",
      classNameOpts: [],
      config: new BannerBoxConfig()
    });
  }
  static createColumnEngine() {
    return new PageBlock({
      component: "edition-columns",
      classNameOpts: [],
      config: new ColumnsConfig()
    });
  }
  static createLktBox() {
    return new PageBlock({
      component: "lkt-box",
      classNameOpts: [
        { value: "info-box", label: "Info Box" },
        { value: "info-box with-header", label: "Info Box (header)" },
        { value: "warning-box", label: "Warning Box" }
      ],
      config: new BoxConfig()
    });
  }
  static createLktAccordion() {
    return new PageBlock({
      component: "lkt-accordion",
      classNameOpts: [],
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
const _hoisted_1$5 = { class: "lkt-page-editor-block-buttons" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, _cache[0] || (_cache[0] = [
    createElementVNode("div", { class: "drag-indicator" }, null, -1)
  ]));
}
const BlockButtons = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render], ["__scopeId", "data-v-d529b354"]]);
const _hoisted_1$4 = ["placeholder", "contenteditable", "innerHTML"];
const _hoisted_2$2 = { class: "" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TextEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const editor = ref(null);
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
      }
      return "";
    });
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["lkt-editor-block lkt-text-editor", computedClass.value])
      }, [
        createVNode(BlockButtons),
        createElementVNode("div", {
          class: "lkt-text-editor-content",
          ref_key: "editor",
          ref: editor,
          placeholder: computedPlaceholder.value,
          contenteditable: _ctx.editMode,
          innerHTML: item.value.content
        }, null, 8, _hoisted_1$4),
        createVNode(_component_lkt_tooltip, {
          class: "lkt-editor-toolbar",
          modelValue: showToolbar.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => showToolbar.value = $event),
          referrer: editor.value,
          "location-y": "top"
        }, {
          default: withCtx(({ doClose }) => [
            createElementVNode("div", _hoisted_2$2, [
              createVNode(_component_lkt_button, {
                text: "bold",
                onClick: _cache[0] || (_cache[0] = () => execDefaultAction("bold"))
              }),
              createVNode(_component_lkt_button, {
                text: "italic",
                onClick: _cache[1] || (_cache[1] = () => execDefaultAction("italic"))
              }),
              createVNode(_component_lkt_button, {
                text: "underline",
                onClick: _cache[2] || (_cache[2] = () => execDefaultAction("underline"))
              }),
              createVNode(_component_lkt_button, {
                text: "strike-through",
                onClick: _cache[3] || (_cache[3] = () => execDefaultAction("strikeThrough"))
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "referrer"])
      ], 2);
    };
  }
});
const TextEditor = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-6c474beb"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ItemEditor",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const editor = ref(null);
    const item = ref(props.modelValue);
    const showToolbar = ref(false);
    const computedClass = computed(() => {
      let r = [];
      if (item.value.component === "text") r.push("is-text");
      if (item.value.component === "h1") r.push("is-h1");
      if (item.value.component === "h2") r.push("is-h2");
      if (item.value.component === "h3") r.push("is-h3");
      return r.join(" ");
    });
    return (_ctx, _cache) => {
      const _component_lkt_tooltip = resolveComponent("lkt-tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["lkt-editor-block lkt-item-editor", computedClass.value])
      }, [
        createVNode(BlockButtons),
        createElementVNode("div", {
          class: "lkt-item-editor-content",
          ref_key: "editor",
          ref: editor
        }, " Pick an item ", 512),
        createVNode(_component_lkt_tooltip, {
          class: "lkt-editor-toolbar",
          modelValue: showToolbar.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => showToolbar.value = $event),
          referrer: editor.value,
          "location-y": "top"
        }, {
          default: withCtx(({ doClose }) => _cache[1] || (_cache[1] = [
            createElementVNode("div", { class: "" }, " holiii ", -1)
          ])),
          _: 1
        }, 8, ["modelValue", "referrer"])
      ], 2);
    };
  }
});
const ItemEditor = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-41437320"]]);
const _hoisted_1$3 = { class: "lkt-page-editor-block" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "EditionBlock",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const item = ref(props.modelValue);
    const computedRenderEditor = computed(() => {
      switch (item.value.component) {
        case "text":
        case "h1":
        case "h2":
        case "h3":
          return 0;
        case "item":
          return 1;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
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
        }, null, 8, ["modelValue", "edit-mode"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$2 = { class: "lkt-page-editor-canvas lkt-grid-1" };
const _hoisted_2$1 = { class: "lkt-page-editor-canvas-nav" };
const _hoisted_3 = { class: "lkt-page-editor-add-menu" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditionCanvas",
  props: {
    modelValue: { default: [] },
    columns: { default: 1 },
    editMode: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const content = ref(props.modelValue);
    const computedColumnClass = computed(() => {
      return "lkt-grid-" + props.columns;
    });
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", {
          class: normalizeClass(computedColumnClass.value)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(content.value, (_, i) => {
            return openBlock(), createBlock(_sfc_main$3, {
              modelValue: content.value[i],
              "onUpdate:modelValue": ($event) => content.value[i] = $event,
              "edit-mode": _ctx.editMode
            }, null, 8, ["modelValue", "onUpdate:modelValue", "edit-mode"]);
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
                createVNode(_component_lkt_button, {
                  class: "tooltip-menu-button",
                  text: "Text Paragraph",
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
                createVNode(_component_lkt_button, {
                  class: "tooltip-menu-button",
                  text: "Project",
                  onClick: () => {
                    doClose();
                    content.value.push(unref(PageBlock).createItemEditor("project"));
                  }
                }, null, 8, ["onClick"])
              ])
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const EditionCanvas = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-191b32ba"]]);
const _hoisted_1$1 = { class: "lkt-page-editor-container" };
const _hoisted_2 = { class: "lkt-page-editor" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LktPageEditor",
  props: {
    modelValue: { default: [] }
  },
  setup(__props) {
    const content = ref([]);
    const editMode = ref(true);
    return (_ctx, _cache) => {
      const _component_lkt_field_switch = resolveComponent("lkt-field-switch");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
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
            "edit-mode": editMode.value
          }, null, 8, ["modelValue", "edit-mode"])
        ])
      ]);
    };
  }
});
const _hoisted_1 = { class: "lkt-grid-1" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlockPickerModal",
  props: {
    modalName: { default: "" },
    modalKey: { default: "_" },
    zIndex: { default: 500 },
    onPicked: {}
  },
  setup(__props) {
    const props = __props;
    const addLktBox = () => {
      if (typeof props.onPicked === "function") {
        props.onPicked(PageBlock.createLktBox());
      }
      closeModal(props.modalName, props.modalKey);
    };
    const addLktAccordion = () => {
      if (typeof props.onPicked === "function") {
        props.onPicked(PageBlock.createLktAccordion());
      }
      closeModal(props.modalName, props.modalKey);
    };
    const addLktFieldEditor = () => {
      if (typeof props.onPicked === "function") {
        props.onPicked(PageBlock.createLktFieldEditor());
      }
      closeModal(props.modalName, props.modalKey);
    };
    const addLktFieldTextarea = () => {
      if (typeof props.onPicked === "function") {
        props.onPicked(PageBlock.createLktFieldTextarea());
      }
      closeModal(props.modalName, props.modalKey);
    };
    const addLktBannerBox = () => {
      if (typeof props.onPicked === "function") {
        props.onPicked(PageBlock.createLktBannerBox());
      }
      closeModal(props.modalName, props.modalKey);
    };
    const addColumnEngine = () => {
      if (typeof props.onPicked === "function") {
        props.onPicked(PageBlock.createColumnEngine());
      }
      closeModal(props.modalName, props.modalKey);
    };
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      const _component_lkt_accordion = resolveComponent("lkt-accordion");
      const _component_lkt_modal = resolveComponent("lkt-modal");
      return openBlock(), createBlock(_component_lkt_modal, {
        title: "",
        "modal-name": _ctx.modalName,
        "modal-key": _ctx.modalKey,
        "z-index": _ctx.zIndex
      }, {
        default: withCtx(() => [
          createVNode(_component_lkt_accordion, {
            title: "LKT Components",
            icon: "",
            "model-value": true,
            "always-open": "",
            "toggle-mode": "display"
          }, {
            default: withCtx(() => [
              createElementVNode("div", _hoisted_1, [
                createVNode(_component_lkt_button, {
                  text: "LKT Text Editor",
                  onClick: addLktFieldEditor
                }),
                createVNode(_component_lkt_button, {
                  text: "LKT Text Area",
                  onClick: addLktFieldTextarea
                }),
                createVNode(_component_lkt_button, {
                  text: "LKT Box",
                  onClick: addLktBox
                }),
                createVNode(_component_lkt_button, {
                  text: "LKT Accordion",
                  onClick: addLktAccordion
                }),
                createVNode(_component_lkt_button, {
                  text: "LKT Banner",
                  onClick: addLktBannerBox
                }),
                createVNode(_component_lkt_button, {
                  text: "Column System",
                  onClick: addColumnEngine
                })
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modal-name", "title", "modal-key", "z-index"]);
    };
  }
});
const LktPageEditor = {
  install: (app) => {
    if (app.component("lkt-page-editor") === void 0) app.component("lkt-page-editor", _sfc_main$1);
    addModal("lkt-page-editor-block-picker", _sfc_main);
  }
};
export {
  LktPageEditor as default
};
