<script setup lang="ts">
import {computed, ref} from "vue";
import {PageBlock} from "../instances/PageBlock";
import {openModal} from "lkt-modal";
import EditionBlock from "./EditionBlock.vue";

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

const onClickAddBlock = () => {
    openModal('lkt-page-editor-block-picker', '_', {
        onPicked: (block) => content.value.push(block),
    });
};

const computedColumnClass = computed(() => {
    return 'lkt-grid-' + props.columns;
});
</script>

<template>
<div class="lkt-page-editor-canvas lkt-grid-1">
    <div :class="computedColumnClass">
        <edition-block v-for="(_, i) in content" v-model="content[i]" :edit-mode="editMode"/>
    </div>

    <div class="lkt-page-editor-canvas-nav">
        <lkt-button text="Add block" @click="onClickAddBlock"/>
    </div>
</div>
</template>

<style scoped>

</style>