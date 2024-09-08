<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import EditionCanvas from "./EditionCanvas.vue";
import TextEditor from "../edition-components/TextEditor.vue";
import ItemEditor from "../edition-components/ItemEditor.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
});

const item = ref(props.modelValue);

const computedRenderEditor = computed(() => {
        switch (item.value.component) {
            case 'text':
            case 'h1':
            case 'h2':
            case 'h3':
                return 0;

            case 'item':
                return 1;
        }
    });


</script>

<template>
    <div class="lkt-page-editor-block">
        <text-editor v-if="computedRenderEditor === 0" v-model="item" :edit-mode="editMode"/>
        <item-editor v-if="computedRenderEditor === 1" v-model="item" :edit-mode="editMode"/>
    </div>
</template>

<style scoped>

</style>