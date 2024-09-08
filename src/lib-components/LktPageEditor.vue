<script setup lang="ts">
import {ref} from "vue";
import {PageBlock} from "../instances/PageBlock";
import EditionCanvas from "../components/EditionCanvas.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
}>(), {
    modelValue: [],
});
const content = ref([]);

const editMode = ref(true);
</script>

<template>
    <div class="lkt-page-editor-container">
        <div class="like-lkt-field-label">Page content</div>
        <lkt-field-switch label="edit mode" v-model="editMode"/>
        <div class="lkt-page-editor">
            <edition-canvas v-model="content" :edit-mode="editMode" :canvas-level="0"/>
        </div>
    </div>
</template>