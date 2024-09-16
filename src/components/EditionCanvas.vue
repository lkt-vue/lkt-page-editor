<script setup lang="ts">
import {computed, ref} from "vue";
import {PageBlock} from "../instances/PageBlock";
import EditionBlock from "./EditionBlock.vue";
import {Settings} from "../settings/Settings";

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
    columns?: number
    editMode?: boolean
    canvasLevel: number
}>(), {
    modelValue: [],
    columns: 1,
    editMode: false,
    canvasLevel: 0
});


const content = ref(props.modelValue);

const computedColumnClass = computed(() => {
    return 'lkt-grid-' + props.columns;
});

const computedCustomItemTypes = computed(() => Settings.customItemTypes);
const computedCustomBasicBlocks = computed(() => Settings.customBasicBlocks);

const onDropBlock = (index: number) => {
    content.value.splice(index, 1);
}
</script>

<template>
<div class="lkt-page-editor-canvas lkt-grid-1">
    <div :class="computedColumnClass" v-if="content.length > 0">
        <edition-block v-for="(_, i) in content" v-model="content[i]" :edit-mode="editMode" :canvas-level="canvasLevel" :index="i" @drop="onDropBlock"/>
    </div>

    <div class="lkt-page-editor-canvas-nav">
        <lkt-button
            text="Add block"
            tooltip-window-margin="30"
            tooltip-referrer-margin="7"
            split
            split-class="lkt-page-editor-menu-tooltip"
        >
            <template #split="{doClose}">
                <div class="lkt-page-editor-add-menu">
                    <div class="lkt-page-editor-add-menu-title">Basic blocks</div>
                    <lkt-button
                        class="lkt-page-editor-add-menu-button"
                        icon="pagetor-icon-fontsize"
                        text="Text"
                        @click="() => {doClose(); content.push(PageBlock.createTextEditor())}"
                    />
                    <lkt-button
                        class="lkt-page-editor-add-menu-button"
                        icon="pagetor-icon-header"
                        text="Heading 1"
                        @click="() => {doClose(); content.push(PageBlock.createHeadingOneEditor())}"
                    />
                    <lkt-button
                        class="lkt-page-editor-add-menu-button"
                        icon="pagetor-icon-header"
                        text="Heading 2"
                        @click="() => {doClose(); content.push(PageBlock.createHeadingTwoEditor())}"
                    />
                    <lkt-button
                        class="lkt-page-editor-add-menu-button"
                        icon="pagetor-icon-header"
                        text="Heading 3"
                        @click="() => {doClose(); content.push(PageBlock.createHeadingThreeEditor())}"
                    />
                    <lkt-button
                        v-for="customBlock in computedCustomBasicBlocks"
                        class="lkt-page-editor-add-menu-button"
                        :icon="customBlock.icon"
                        :text="customBlock.text"
                        @click="() => {doClose(); content.push(PageBlock.createBasicBlock(customBlock.component))}"
                    />




                    <div v-if="canvasLevel === 0" class="lkt-page-editor-add-menu-title">Containers</div>
                    <lkt-button
                        v-if="canvasLevel === 0"
                        class="lkt-page-editor-add-menu-button"
                        icon="pagetor-icon-layers"
                        text="Accordion"
                        @click="() => {doClose(); content.push(PageBlock.createLktAccordion())}"
                    />

                    <lkt-button
                        v-if="canvasLevel === 0"
                        class="lkt-page-editor-add-menu-button"
                        icon="pagetor-icon-box"
                        text="Box"
                        @click="() => {doClose(); content.push(PageBlock.createLktBox())}"
                    />

                    <lkt-button
                        v-if="canvasLevel === 0"
                        class="lkt-page-editor-add-menu-button"
                        icon="pagetor-icon-columns"
                        text="Columns"
                        @click="() => {doClose(); content.push(PageBlock.createColumnEngine())}"
                    />




                    <div v-if="computedCustomItemTypes.length > 0" class="lkt-page-editor-add-menu-title">Item Reference</div>
                    <lkt-button
                        v-for="customItemType in computedCustomItemTypes"
                        class="lkt-page-editor-add-menu-button"
                        :icon="customItemType.icon"
                        :text="customItemType.text"
                        @click="() => {doClose(); content.push(PageBlock.createItemEditor(customItemType.component))}"
                    />
                </div>
            </template>
        </lkt-button>
    </div>
</div>
</template>

<style scoped>
.lkt-page-editor-add-menu {
    width: 150px;
}
</style>