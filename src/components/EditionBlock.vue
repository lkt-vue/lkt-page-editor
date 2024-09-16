<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import TextEditor from "../edition-components/TextEditor.vue";
import ItemEditor from "../edition-components/ItemEditor.vue";
import ContainerEditor from "../edition-components/ContainerEditor.vue";
import BlockButtons from "./BlockButtons.vue";

const emit = defineEmits(['drop']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
    canvasLevel: number
    index: number
}>(), {
    modelValue: [],
    editMode: false,
    index: -1
});

const item = ref(props.modelValue);

const computedRenderEditor = computed(() => {
        switch (item.value.component) {
            case 'text':
            case 'basic-block':
            case 'h1':
            case 'h2':
            case 'h3':
                return 0;

            case 'item':
                return 1;

            case 'lkt-accordion':
            case 'lkt-box':
            case 'columns':
                return 2;
        }
    });

const onDropEditor = () => {
    emit('drop', props.index);
}


</script>

<template>
    <div class="lkt-page-editor-block">

        <block-buttons/>

        <div class="lkt-page-editor-block-content">
            <text-editor v-if="computedRenderEditor === 0" v-model="item" :edit-mode="editMode" @drop="onDropEditor"/>
            <item-editor v-if="computedRenderEditor === 1" v-model="item" :edit-mode="editMode"/>
            <container-editor v-if="computedRenderEditor === 2" v-model="item" :edit-mode="editMode" :canvas-level="canvasLevel"/>
        </div>
    </div>
</template>

<style scoped>

</style>