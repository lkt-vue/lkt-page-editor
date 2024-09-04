import { defineComponent, ref, resolveComponent, openBlock, createElementBlock, Fragment, renderList, createElementVNode, createVNode, createCommentVNode, createBlock, normalizeClass, withCtx, resolveDynamicComponent } from "vue";
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
}
const _hoisted_1$1 = { class: "lkt-page-editor-canvas" };
const _hoisted_2$1 = {
  class: "lmm-block-config",
  style: { "background": "#00001E", "color": "#ffffff", "padding": "15px" }
};
const _hoisted_3$1 = { key: 0 };
const _hoisted_4$1 = { class: "lkt-page-editor-canvas-nav" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EditionCanvas",
  props: {
    modelValue: { default: [] }
  },
  setup(__props) {
    const props = __props;
    const content = ref(props.modelValue);
    const onClickAddBlock = () => {
    };
    return (_ctx, _cache) => {
      const _component_lkt_field_select = resolveComponent("lkt-field-select");
      const _component_edition_canvas = resolveComponent("edition-canvas", true);
      const _component_lkt_box = resolveComponent("lkt-box");
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(content.value, (block) => {
          return openBlock(), createElementBlock(Fragment, null, [
            createElementVNode("div", _hoisted_2$1, [
              _cache[0] || (_cache[0] = createElementVNode("div", null, "Block config", -1)),
              block.classNameOpts && block.classNameOpts.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
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
            }, 1032, ["class"])) : block.component === "lkt-accordion" ? (openBlock(), createBlock(_component_lkt_box, {
              key: 1,
              class: normalizeClass(block.className)
            }, {
              default: withCtx(() => [
                createVNode(_component_edition_canvas, {
                  modelValue: block.blocks,
                  "onUpdate:modelValue": ($event) => block.blocks = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(block.component), { key: 2 }))
          ], 64);
        }), 256)),
        createElementVNode("div", _hoisted_4$1, [
          createVNode(_component_lkt_button, {
            text: "Add block",
            onClick: onClickAddBlock
          })
        ])
      ]);
    };
  }
});
const _hoisted_1 = { class: "lmm-page-editor" };
const _hoisted_2 = { class: "lmm-page-editor-writer" };
const _hoisted_3 = {
  class: "lmm-block-config",
  style: { "background": "#00001E", "color": "#ffffff", "padding": "15px" }
};
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "lmm-page-editor-nav" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktPageEditor",
  props: {
    modelValue: { default: [] }
  },
  setup(__props) {
    const content = ref([]);
    const addLktBox = () => {
      content.value.push(new PageBlock({
        component: "lkt-box",
        classNameOpts: [
          { value: "info-box", label: "Info Box" },
          { value: "info-box with-header", label: "Info Box (header)" },
          { value: "warning-box", label: "Warning Box" }
        ]
      }));
    };
    const addLktAccordion = () => {
      content.value.push(new PageBlock({
        component: "lkt-accordion",
        classNameOpts: []
      }));
    };
    return (_ctx, _cache) => {
      const _component_lkt_field_select = resolveComponent("lkt-field-select");
      const _component_lkt_field_editor = resolveComponent("lkt-field-editor");
      const _component_lkt_box = resolveComponent("lkt-box");
      const _component_lkt_button = resolveComponent("lkt-button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(content.value, (block) => {
            return openBlock(), createElementBlock(Fragment, null, [
              createElementVNode("div", _hoisted_3, [
                _cache[1] || (_cache[1] = createElementVNode("div", null, "Block config", -1)),
                block.classNameOpts && block.classNameOpts.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
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
                  createVNode(_component_lkt_field_editor, {
                    modelValue: block.content,
                    "onUpdate:modelValue": ($event) => block.content = $event,
                    placeholder: "Content"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1032, ["class"])) : block.component === "lkt-accordion" ? (openBlock(), createBlock(_component_lkt_box, {
                key: 1,
                class: normalizeClass(block.className)
              }, {
                default: withCtx(() => [
                  createVNode(_component_lkt_field_editor, {
                    modelValue: block.content,
                    "onUpdate:modelValue": ($event) => block.content = $event,
                    placeholder: "Content"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1032, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(block.component), { key: 2 }))
            ], 64);
          }), 256))
        ]),
        createElementVNode("div", _hoisted_5, [
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
        ]),
        createVNode(_sfc_main$1, {
          modelValue: content.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => content.value = $event)
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
const LktPageEditor = {
  install: (app) => {
    if (app.component("lkt-page-editor") === void 0) app.component("lkt-page-editor", _sfc_main);
  }
};
export {
  LktPageEditor as default
};
