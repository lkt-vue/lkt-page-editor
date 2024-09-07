import { defineComponent, ref, computed, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, createElementBlock, createVNode, createCommentVNode, normalizeClass, resolveDynamicComponent, Fragment, renderList } from "vue";
import { openModal, closeModal, addModal } from "lkt-modal";
const _hoisted_1$3 = { class: "lkt-page-editor-block-config" };
const _hoisted_2$2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "EditionBlock",
  props: {
    modelValue: { default: [] },
    editMode: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const item = ref(props.modelValue);
    const computedBlockTitle = computed(() => {
      switch (item.value.component) {
        case "lkt-box":
          return "LKT Box";
        case "lkt-accordion":
          return "LKT Accordion";
        case "lkt-field-editor":
          return "LKT Text Editor";
        case "lkt-field-textarea":
          return "LKT Text Area";
        case "lkt-banner-box":
          return "LKT Banner Box";
        default:
          return "";
      }
    }), computedBlockIcon = computed(() => {
      switch (item.value.component) {
        case "lkt-box":
          return "";
        case "lkt-accordion":
          return "";
        case "lkt-field-editor":
          return "";
        case "lkt-field-textarea":
          return "";
        case "lkt-banner-box":
          return "";
        default:
          return "";
      }
    });
    return (_ctx, _cache) => {
      const _component_lkt_field_select = resolveComponent("lkt-field-select");
      const _component_lmm_multimedia = resolveComponent("lmm-multimedia");
      const _component_lkt_field_text = resolveComponent("lkt-field-text");
      const _component_lkt_box = resolveComponent("lkt-box");
      const _component_lkt_field_editor = resolveComponent("lkt-field-editor");
      const _component_lkt_field_textarea = resolveComponent("lkt-field-textarea");
      const _component_lkt_banner_box = resolveComponent("lkt-banner-box");
      const _component_lkt_accordion = resolveComponent("lkt-accordion");
      return openBlock(), createBlock(_component_lkt_accordion, {
        class: "lkt-page-editor-block",
        title: computedBlockTitle.value,
        icon: computedBlockIcon.value,
        "model-value": true,
        "toggle-mode": "display"
      }, {
        intro: withCtx(() => [
          createElementVNode("div", _hoisted_1$3, [
            _cache[9] || (_cache[9] = createElementVNode("div", null, "Block config", -1)),
            item.value.classNameOpts && item.value.classNameOpts.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
              createVNode(_component_lkt_field_select, {
                modelValue: item.value.className,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => item.value.className = $event),
                options: item.value.classNameOpts
              }, null, 8, ["modelValue", "options"])
            ])) : createCommentVNode("", true),
            item.value.component === "lkt-banner-box" ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createVNode(_component_lmm_multimedia, {
                modelValue: item.value.backgroundImageId,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => item.value.backgroundImageId = $event),
                data: item.value.backgroundImage,
                "onUpdate:data": _cache[2] || (_cache[2] = ($event) => item.value.backgroundImage = $event),
                label: "Background image",
                "read-mode": false,
                "resource-data": { _lmm_type: "multimedia" },
                "field-name": "_lmm_block"
              }, null, 8, ["modelValue", "data"])
            ])) : createCommentVNode("", true),
            createElementVNode("div", null, [
              item.value.component === "lkt-box" || item.value.component === "lkt-accordion" ? (openBlock(), createBlock(_component_lkt_field_text, {
                key: 0,
                modelValue: item.value.config.amountOfColumns,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => item.value.config.amountOfColumns = $event),
                label: "Default amount of columns",
                "is-number": "",
                min: 1,
                max: 12
              }, null, 8, ["modelValue"])) : createCommentVNode("", true)
            ])
          ])
        ]),
        default: withCtx(() => [
          item.value.component === "lkt-box" ? (openBlock(), createBlock(_component_lkt_box, {
            key: 0,
            class: normalizeClass(item.value.className)
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$2, {
                modelValue: item.value.blocks,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => item.value.blocks = $event),
                columns: item.value.config.amountOfColumns,
                "edit-mode": _ctx.editMode
              }, null, 8, ["modelValue", "columns", "edit-mode"])
            ]),
            _: 1
          }, 8, ["class"])) : item.value.component === "lkt-field-editor" ? (openBlock(), createBlock(_component_lkt_field_editor, {
            key: 1,
            class: normalizeClass(item.value.className),
            modelValue: item.value.content,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => item.value.content = $event),
            "read-mode": !_ctx.editMode
          }, null, 8, ["class", "modelValue", "read-mode"])) : item.value.component === "lkt-field-textarea" ? (openBlock(), createBlock(_component_lkt_field_textarea, {
            key: 2,
            class: normalizeClass(item.value.className),
            modelValue: item.value.content,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => item.value.content = $event),
            "read-mode": !_ctx.editMode
          }, null, 8, ["class", "modelValue", "read-mode"])) : item.value.component === "lkt-banner-box" ? (openBlock(), createBlock(_component_lkt_banner_box, {
            key: 3,
            class: normalizeClass(item.value.className),
            modelValue: item.value.content,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => item.value.content = $event)
          }, null, 8, ["class", "modelValue"])) : item.value.component === "lkt-accordion" ? (openBlock(), createBlock(_component_lkt_accordion, {
            key: 4,
            class: normalizeClass(item.value.className),
            "model-value": true,
            "toggle-mode": "display"
          }, {
            header: withCtx(() => [
              createVNode(_component_lkt_field_text, { placeholder: "Title" })
            ]),
            default: withCtx(() => [
              createVNode(_sfc_main$2, {
                modelValue: item.value.blocks,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => item.value.blocks = $event),
                columns: item.value.config.amountOfColumns,
                "edit-mode": _ctx.editMode
              }, null, 8, ["modelValue", "columns", "edit-mode"])
            ]),
            _: 1
          }, 8, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(item.value.component), { key: 5 }))
        ]),
        _: 1
      }, 8, ["title", "icon"]);
    };
  }
});
const _hoisted_1$2 = { class: "lkt-page-editor-canvas lkt-grid-1" };
const _hoisted_2$1 = { class: "lkt-page-editor-canvas-nav" };
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
    const onClickAddBlock = () => {
      openModal("lkt-page-editor-block-picker", "_", {
        onPicked: (block) => content.value.push(block)
      });
    };
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
            onClick: onClickAddBlock
          })
        ])
      ]);
    };
  }
});
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
          createVNode(_sfc_main$2, {
            modelValue: content.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => content.value = $event),
            "edit-mode": editMode.value
          }, null, 8, ["modelValue", "edit-mode"])
        ])
      ]);
    };
  }
});
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
