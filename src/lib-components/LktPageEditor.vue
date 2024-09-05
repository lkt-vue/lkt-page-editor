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
</script>

<template>
    <div class="lkt-page-editor-container">
        <div class="like-lkt-field-label">Page content</div>
        <div class="lkt-page-editor">
            <edition-canvas v-model="content"/>
        </div>
    </div>
</template>