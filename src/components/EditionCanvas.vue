<script setup lang="ts">
import {ref} from "vue";
import {PageBlock} from "../instances/PageBlock";
import {openModal} from "lkt-modal";
import EditionBlock from "./EditionBlock.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
}>(), {
    modelValue: [],
});


const content = ref(props.modelValue);

const onClickAddBlock = () => {
    openModal('lkt-page-editor-block-picker', '_', {
        onPicked: (block) => content.value.push(block),
    });
};
</script>

<template>
<div class="lkt-page-editor-canvas lkt-grid-1">
    <edition-block v-for="(_, i) in content" v-model="content[i]"/>

    <div class="lkt-page-editor-canvas-nav">
        <lkt-button text="Add block" @click="onClickAddBlock"/>
    </div>
</div>
</template>

<style scoped>

</style>