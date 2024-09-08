<script setup lang="ts">
import {computed, ref} from "vue";
import {PageBlock} from "../instances/PageBlock";
import EditionBlock from "./EditionBlock.vue";
import {Settings} from "../settings/Settings";

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
    columns?: number
    editMode?: boolean
}>(), {
    modelValue: [],
    columns: 1,
    editMode: false,
});


const content = ref(props.modelValue);

const computedColumnClass = computed(() => {
    return 'lkt-grid-' + props.columns;
});

const computedCustomItemTypes = computed(() => Settings.customItemTypes);
</script>

<template>
<div class="lkt-page-editor-canvas lkt-grid-1">
    <div :class="computedColumnClass">
        <edition-block v-for="(_, i) in content" v-model="content[i]" :edit-mode="editMode"/>
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
                    <lkt-button
                        class="tooltip-menu-button"
                        text="Text Paragraph"
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