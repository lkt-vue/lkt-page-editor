<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import EditionCanvas from "../components/EditionCanvas.vue";
import {BlockComponentType} from "../enums/BlockComponentType";
import {__} from "lkt-i18n";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
    canvasLevel: number
}>(), {
    modelValue: [],
    editMode: false,
});

const container = ref(null);
const editor = ref(null);
const item = ref(props.modelValue);

const computedClass = computed(() => {
        let r = [];
        if (item.value.component === BlockComponentType.LktAccordion) r.push('is-accordion');
        if (item.value.component === BlockComponentType.LktBox) r.push('is-box');
        if (item.value.component === BlockComponentType.Columns) r.push('is-columns');
        return r.join(' ');
    });

const computedCanvasLevel = computed(() => {
    if (item.value.component === 'columns') return 0;
    return props.canvasLevel + 1;
})

const computedTitle = computed(() => {
    if (props.editMode) return '';
    if (item.value.i18nMode) return __(item.value.i18nTitle);
    return item.value.title;
})

const computedComponent = computed(() => {
    if ([BlockComponentType.LktAccordion, BlockComponentType.LktBox].includes(item.value.component)) return item.value.component;

    return 'div';
})


watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});

</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-container-editor" :class="computedClass">
        <component
            :is="computedComponent"
            :title="computedTitle"
            :icon="item.icon"
            style="display: flex; width: 100%;">
            <div class="lkt-container-editor-canvas">
                <edition-canvas
                    v-model="item.blocks"
                    :edit-mode="editMode"
                    :canvas-level="computedCanvasLevel"
                    :columns="item.columns"/>
            </div>
        </component>
    </div>
</template>