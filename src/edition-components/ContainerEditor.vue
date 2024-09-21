<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import BlockButtons from "../components/BlockButtons.vue";
import {Settings} from "../settings/Settings";
import EditionCanvas from "../components/EditionCanvas.vue";
import BlockHeader from "../components/BlockHeader.vue";
import {BlockComponentType} from "../enums/BlockComponentType";

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
            :title="item.title"
            style="display: flex; width: 100%;">
            <div class="lkt-container-editor-canvas">
                <edition-canvas
                    v-model="item.blocks"
                    :edit-mode="editMode"
                    :canvas-level="computedCanvasLevel"
                    :columns="item.columns"/>
            </div>
        </component>

        <div
            v-if="false"
            ref="blockHeader"
            class="lkt-page-editor-block-header-container"
            @click="showToolbar = !showToolbar">
            <block-header>
                <i :class="computedIcon"/>
                {{computedBlockTitle}}
            </block-header>
        </div>

        <div v-if="false" class="lkt-container-editor-canvas">
            <edition-canvas
                v-model="item.blocks"
                :edit-mode="editMode"
                :canvas-level="computedCanvasLevel"
                :columns="item.columns"/>
        </div>


        <lkt-tooltip
            v-if="false"
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="blockHeader"
            location-y="bottom"
            referrer-width
        >
            <template #default="{doClose}">
                <div class="lkt-editor-block-grid">
                    <lkt-field-text
                        v-model="item.title"
                        label="Title"
                    />

                    <lkt-field-text
                        v-model="item.columns"
                        label="Columns"
                        is-number
                        :min="1"
                        :max="10"
                    />
                </div>
            </template>
        </lkt-tooltip>
    </div>
</template>