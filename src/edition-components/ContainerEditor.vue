<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import BlockButtons from "../components/BlockButtons.vue";
import {Settings} from "../settings/Settings";
import EditionCanvas from "../components/EditionCanvas.vue";
import BlockHeader from "../components/BlockHeader.vue";
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
const blockHeader = ref(null);
const item = ref(props.modelValue);
const showToolbar = ref(false);

const computedClass = computed(() => {
        let r = [];
        if (item.value.component === BlockComponentType.LktAccordion) r.push('is-accordion');
        if (item.value.component === BlockComponentType.LktBox) r.push('is-box');
        if (item.value.component === BlockComponentType.Columns) r.push('is-columns');
        return r.join(' ');
    });

const customItemType = computed(() => {
    let found = Settings.customItemTypes.find(z => z.component === item.value.itemType);
    if (found) return found;
    return undefined;
});

const computedIcon = computed(() => {

    if (typeof customItemType.value === 'undefined') {
        switch (item.value.component) {
            case BlockComponentType.LktAccordion:
                return 'pagetor-icon-layers';

            case BlockComponentType.LktBox:
                return 'pagetor-icon-box';

            case BlockComponentType.Columns:
                return 'pagetor-icon-columns';

            default:
                return 'icon-cog';
        }
    }
    if (customItemType.value.icon) return customItemType.value.icon;
    return 'icon-cog';
});

const computedCanvasLevel = computed(() => {
    if (item.value.component === 'columns') return 0;
    return props.canvasLevel + 1;
})

const computedBlockTitle = computed(() => {
    if (item.value.component === BlockComponentType.Columns) {
        return 'Column engine (' + item.value.columns + ' columns)'
    }

    return item.value.component;
});

const computedTitle = computed(() => {
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