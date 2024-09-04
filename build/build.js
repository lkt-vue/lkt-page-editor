import { defineComponent, ref, resolveComponent, openBlock, createElementBlock, Fragment, renderList, createElementVNode, createVNode, createCommentVNode, createBlock, normalizeClass, withCtx, resolveDynamicComponent } from "vue";
import { openModal, closeModal, addModal } from "lkt-modal";
const _hoisted_1$2 = { class: "lkt-page-editor-canvas" };
const _hoisted_2 = {
  class: "lmm-block-config",
  style: { "background": "#00001E", "color": "#ffffff", "padding": "15px" }
};
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { class: "lkt-page-editor-canvas-nav" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditionCanvas",
  props: {
    modelValue: { default: [] }
  },
  setup(__props) {
    const props = __props;
    const content = ref(props.modelValue);
    const onClickAddBlock = () => {
      openModal("lkt-page-editor-block-picker", "_", {
        onPicked: (block) => content.value.push(block)
      });
    };
    return (_ctx, _cache) => {
      const _component_lkt_field_select = resolveComponent("lkt-field-select");
      const _component_edition_canvas = resolveComponent("edition-canvas", true);
      const _component_lkt_box = resolveComponent("lkt-box");
      const _component_lkt_field_editor = resolveComponent("lkt-field-editor");
      const _component_lkt_field_text = resolveComponent("lkt-field-text");
      const _component_lkt_accordion = resolveComponent("lkt-accordion");
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(content.value, (block) => {
          return openBlock(), createElementBlock(Fragment, null, [
            createElementVNode("div", _hoisted_2, [
              _cache[0] || (_cache[0] = createElementVNode("div", null, "Block config", -1)),
              block.classNameOpts && block.classNameOpts.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
                createVNode(_component_lkt_field_select, {
                  modelValue: block.className,
                  "onUpdate:modelValue": ($event) => block.className = $event,
                  options: block.classNameOpts
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ])) : createCommentVNode("", true)
            ]),
            block.component === "lkt-box" ? (openBlock(), createBlock(_component_lkt_box, {
              key: 0,
              class: normalizeClass(block.className)
            }, {
              default: withCtx(() => [
                createVNode(_component_edition_canvas, {
                  modelValue: block.blocks,
                  "onUpdate:modelValue": ($event) => block.blocks = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["class"])) : block.component === "lkt-field-editor" ? (openBlock(), createBlock(_component_lkt_field_editor, {
              key: 1,
              class: normalizeClass(block.className),
              modelValue: block.content,
              "onUpdate:modelValue": ($event) => block.content = $event
            }, null, 8, ["class", "modelValue", "onUpdate:modelValue"])) : block.component === "lkt-accordion" ? (openBlock(), createBlock(_component_lkt_accordion, {
              key: 2,
              class: normalizeClass(block.className)
            }, {
              header: withCtx(() => [
                createVNode(_component_lkt_field_text, { placeholder: "Title" })
              ]),
              default: withCtx(() => [
                createVNode(_component_edition_canvas, {
                  modelValue: block.blocks,
                  "onUpdate:modelValue": ($event) => block.blocks = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(block.component), { key: 3 }))
          ], 64);
        }), 256)),
        createElementVNode("div", _hoisted_4, [
          createVNode(_component_lkt_button, {
            text: "Add block",
            onClick: onClickAddBlock
          })
        ])
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "lmm-page-editor" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LktPageEditor",
  props: {
    modelValue: { default: [] }
  },
  setup(__props) {
    const content = ref([]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_sfc_main$2, {
          modelValue: content.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => content.value = $event)
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
class PageBlock {
  constructor(data = {}) {
    this.id = 0;
    this.component = "lkt-box";
    this.content = "";
    this.blocks = [];
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
  static createLktFieldEditor() {
    return new PageBlock({
      component: "lkt-field-editor",
      classNameOpts: []
    });
  }
  static createLktBox() {
    return new PageBlock({
      component: "lkt-box",
      classNameOpts: [
        { value: "info-box", label: "Info Box" },
        { value: "info-box with-header", label: "Info Box (header)" },
        { value: "warning-box", label: "Warning Box" }
      ]
    });
  }
  static createLktAccordion() {
    return new PageBlock({
      component: "lkt-accordion",
      classNameOpts: []
    });
  }
}
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
                  text: "LKT Box",
                  onClick: addLktBox
                }),
                createVNode(_component_lkt_button, {
                  text: "LKT Accordion",
                  onClick: addLktAccordion
                }),
                createVNode(_component_lkt_button, {
                  text: "LKT Banner",
                  onClick: addLktAccordion
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
