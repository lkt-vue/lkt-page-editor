<script setup lang="ts">

import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import {Settings} from "../settings/Settings";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
    canvasLevel: number
    doClose: Function
}>(), {
    modelValue: [],
    canvasLevel: 0
});

const content = ref(props.modelValue);

watch(() => props.modelValue, v => content.value = v, {deep: true});
watch(content, v => emit('update:modelValue', v), {deep: true});

const computedCustomItemTypes = computed(() => Settings.customItemTypes);
const computedCustomBasicBlocks = computed(() => Settings.customBasicBlocks);
</script>

<template>
    <div class="lkt-page-editor-add-menu">
        <div class="lkt-page-editor-add-menu-title" v-if="canvasLevel !== -2">Basic blocks</div>
        <lkt-button
            v-if="canvasLevel !== -2"
            class="lkt-page-editor-add-menu-button"
            icon="pagetor-icon-fontsize"
            text="Text"
            @click="() => {doClose(); content.push(PageBlock.createTextEditor())}"
        />
        <lkt-button
            v-if="canvasLevel !== -2"
            class="lkt-page-editor-add-menu-button"
            icon="pagetor-icon-header"
            text="Heading 1"
            @click="() => {doClose(); content.push(PageBlock.createHeadingOneEditor())}"
        />
        <lkt-button
            v-if="canvasLevel !== -2"
            class="lkt-page-editor-add-menu-button"
            icon="pagetor-icon-header"
            text="Heading 2"
            @click="() => {doClose(); content.push(PageBlock.createHeadingTwoEditor())}"
        />
        <lkt-button
            v-if="canvasLevel !== -2"
            class="lkt-page-editor-add-menu-button"
            icon="pagetor-icon-header"
            text="Heading 3"
            @click="() => {doClose(); content.push(PageBlock.createHeadingThreeEditor())}"
        />
        <lkt-button
            v-if="canvasLevel !== -2"
            class="lkt-page-editor-add-menu-button"
            icon="pagetor-icon-fontsize"
            text="LKT Icon"
            @click="() => {doClose(); content.push(PageBlock.createLktIcon())}"
        />
        <lkt-button
            v-if="canvasLevel !== -2"
            v-for="customBlock in computedCustomBasicBlocks"
            class="lkt-page-editor-add-menu-button"
            :icon="customBlock.icon"
            :text="customBlock.text"
            @click="() => {doClose(); content.push(PageBlock.createBasicBlock(customBlock.component))}"
        />

        <div class="lkt-page-editor-add-menu-title">Lists</div>
        <lkt-button
            v-if="canvasLevel !== -2"
            class="lkt-page-editor-add-menu-button"
            icon="pagetor-icon-list-bullet"
            text="Bullet list"
            @click="() => {doClose(); content.push(PageBlock.createBulletList())}"
        />
        <lkt-button
            v-if="canvasLevel === -2"
            class="lkt-page-editor-add-menu-button"
            icon="pagetor-icon-fontsize"
            text="List Item"
            @click="() => {doClose(); content.push(PageBlock.createListItem())}"
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




        <div v-if="canvasLevel !== -2 && computedCustomItemTypes.length > 0" class="lkt-page-editor-add-menu-title">Item Reference</div>
        <lkt-button
            v-if="canvasLevel !== -2"
            v-for="customItemType in computedCustomItemTypes"
            class="lkt-page-editor-add-menu-button"
            :icon="customItemType.icon"
            :text="customItemType.text"
            @click="() => {doClose(); content.push(PageBlock.createItemEditor(customItemType.component))}"
        />
    </div>
</template>

<style scoped>
.lkt-page-editor-add-menu {
    width: 150px;
}
</style>