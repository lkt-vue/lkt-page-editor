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
</script>

<template>
<div class="lkt-page-editor-canvas lkt-grid-1">
    <div :class="computedColumnClass">
        <edition-block v-for="(_, i) in content" v-model="content[i]" :edit-mode="editMode" :canvas-level="canvasLevel"/>
    </div>

    <div class="lkt-page-editor-canvas-nav">
        <lkt-button
            text="Add block"
            tooltip-window-margin="30"
            tooltip-referrer-margin="7"
            split
        >
            <template #split="{doClose}">
                <div class="lkt-page-editor-add-menu">
                    <h2>Basic blocks</h2>
                    <lkt-button
                        class="tooltip-menu-button"
                        text="Text"
                        @click="() => {doClose(); content.push(PageBlock.createTextEditor())}"
                    />
                    <lkt-button
                        class="tooltip-menu-button"
                        text="Heading 1"
                        @click="() => {doClose(); content.push(PageBlock.createHeadingOneEditor())}"
                    />
                    <lkt-button
                        class="tooltip-menu-button"
                        text="Heading 2"
                        @click="() => {doClose(); content.push(PageBlock.createHeadingTwoEditor())}"
                    />
                    <lkt-button
                        class="tooltip-menu-button"
                        text="Heading 3"
                        @click="() => {doClose(); content.push(PageBlock.createHeadingThreeEditor())}"
                    />
                    <lkt-button
                        v-for="customBlock in computedCustomBasicBlocks"
                        class="tooltip-menu-button"
                        :text="customBlock.text"
                        @click="() => {doClose(); content.push(PageBlock.createBasicBlock(customBlock.component))}"
                    />

                    <h2>Containers</h2>
                    <lkt-button
                        v-if="canvasLevel === 0"
                        class="tooltip-menu-button"
                        text="Accordion"
                        @click="() => {doClose(); content.push(PageBlock.createLktAccordion())}"
                    />

                    <lkt-button
                        v-if="canvasLevel === 0"
                        class="tooltip-menu-button"
                        text="Box"
                        @click="() => {doClose(); content.push(PageBlock.createLktBox())}"
                    />

                    <lkt-button
                        v-if="canvasLevel === 0"
                        class="tooltip-menu-button"
                        text="Columns"
                        @click="() => {doClose(); content.push(PageBlock.createColumnEngine())}"
                    />

                    <h2>Related</h2>
                    <lkt-button
                        v-for="customItemType in computedCustomItemTypes"
                        class="tooltip-menu-button"
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