import { defineComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, Fragment, renderList, unref, createCommentVNode, createBlock, normalizeClass, withCtx, resolveDynamicComponent } from "vue";
const _hoisted_1 = { class: "lmm-page-editor" };
const _hoisted_2 = { class: "lmm-page-editor-nav" };
const _hoisted_3 = { class: "lmm-page-editor-writer" };
const _hoisted_4 = {
  class: "lmm-block-config",
  style: { "background": "#00001E", "color": "#ffffff", "padding": "15px" }
};
const _hoisted_5 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktPageEditor",
  props: {
    modelValue: { default: [] }
  },
  setup(__props) {
    const content = ref([]);
    const addLktBox = () => {
      content.value.push({
        component: "lkt-box",
        content: "",
        className: "",
        classNameOpts: [
          { value: "info-box", label: "Info Box" },
          { value: "info-box with-header", label: "Info Box (header)" },
          { value: "warning-box", label: "Warning Box" }
        ],
        props: {
          title: ""
        },
        config: {
          onlyContent: false
        }
      });
    };
    const addLktAccordion = () => {
      content.value.push({
        component: "lkt-accordion",
        content: "",
        className: "",
        classNameOpts: [],
        props: {
          title: ""
        },
        config: {
          onlyContent: false,
          alwaysOpen: false
        }
      });
    };
    return (_ctx, _cache) => {
      const _component_lkt_button = resolveComponent("lkt-button");
      const _component_lkt_field_select = resolveComponent("lkt-field-select");
      const _component_lkt_field_editor = resolveComponent("lkt-field-editor");
      const _component_lkt_box = resolveComponent("lkt-box");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_lkt_button, {
            text: "LKT Box",
            onClick: addLktBox
          }),
          createVNode(_component_lkt_button, {
            text: "LKT Accordion",
            onClick: addLktAccordion
          })
        ]),
        createElementVNode("div", _hoisted_3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(content), (block) => {
            return openBlock(), createElementBlock(Fragment, null, [
              createElementVNode("div", _hoisted_4, [
                _cache[0] || (_cache[0] = createElementVNode("div", null, "Block config", -1)),
                block.classNameOpts && block.classNameOpts.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5, [
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
        ])
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
