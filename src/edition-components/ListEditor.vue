<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import EditionCanvas from "../components/EditionCanvas.vue";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
    canvasLevel: number
}>(), {
    modelValue: [],
    editMode: false,
});

const container = ref(null);
const editor = ref(null);
const item = ref(props.modelValue);

const computedClass = computed(() => {
        let r = [];
        if (item.value.component === 'ul') r.push('is-ul');
        return r.join(' ');
    });


watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});

</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-list-editor" :class="computedClass">
        <div class="lkt-container-editor-canvas">
            <edition-canvas
                v-model="item.blocks"
                :edit-mode="editMode"
                :canvas-level="-2"
                :columns="item.columns"/>
        </div>
    </div>
</template>