<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import TextEditor from "../edition-components/TextEditor.vue";
import ItemEditor from "../edition-components/ItemEditor.vue";
import ContainerEditor from "../edition-components/ContainerEditor.vue";
import BlockButtons from "./BlockButtons.vue";
import {BlockComponentType} from "../enums/BlockComponentType";
import ListEditor from "../edition-components/ListEditor.vue";

const emit = defineEmits(['drop', 'update:modelValue']);

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
            case BlockComponentType.Text:
            case BlockComponentType.Header1:
            case BlockComponentType.Header2:
            case BlockComponentType.Header3:
            case BlockComponentType.ListItem:
            case BlockComponentType.LktIcon:
                return 0;

            case BlockComponentType.Item:
                return 1;

            case BlockComponentType.LktAccordion:
            case BlockComponentType.LktBox:
            case BlockComponentType.Columns:
                return 2;

            case BlockComponentType.BulletList:
                return 3;
        }

        if (item.value.component.startsWith('item:')) return 1;
        if (item.value.component.startsWith('basic:')) return 0;
    });

const onDropEditor = () => {
    emit('drop', props.index);
}

const onAppend = (component) => {
    emit('append', props.index, component);
}

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});
</script>

<template>
    <div class="lkt-page-editor-block">

        <block-buttons v-show="editMode" v-model="item" @drop="onDropEditor"/>

        <div class="lkt-page-editor-block-content">
            <text-editor v-if="computedRenderEditor === 0" v-model="item" :edit-mode="editMode" @drop="onDropEditor" @append="onAppend"/>
            <item-editor v-if="computedRenderEditor === 1" v-model="item" :edit-mode="editMode"/>
            <container-editor v-if="computedRenderEditor === 2" v-model="item" :edit-mode="editMode" :canvas-level="canvasLevel"/>
            <list-editor v-if="computedRenderEditor === 3" v-model="item" :edit-mode="editMode" :canvas-level="canvasLevel"/>
        </div>
    </div>
</template>