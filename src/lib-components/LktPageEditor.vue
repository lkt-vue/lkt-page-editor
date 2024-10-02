<script setup lang="ts">
import {ref, watch} from "vue";
import {PageBlock} from "../instances/PageBlock";
import EditionCanvas from "../components/EditionCanvas.vue";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
}>(), {
    modelValue: [],
});
const content = ref(props.modelValue);

const editMode = ref(true);
const dragArea = ref(null);

watch(() => props.modelValue, v => content.value = v, {deep: true});
watch(content, v => {
    console.log('updated editor', v);
    emit('update:modelValue', v)
}, {deep: true});
</script>

<template>
    <div class="lkt-page-editor-container">
        <div class="like-lkt-field-label">Page content</div>
        <lkt-field-switch label="edit mode" v-model="editMode"/>
        <div class="lkt-page-editor" ref="dragArea">
            <edition-canvas v-model="content" :edit-mode="editMode" :canvas-level="0"/>
        </div>
    </div>
</template>