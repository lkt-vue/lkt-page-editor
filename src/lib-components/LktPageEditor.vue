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
    <div class="lmm-page-editor">
        <edition-canvas v-model="content"/>
    </div>
</template>