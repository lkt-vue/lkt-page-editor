<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
});

const editor = ref(null);
const container = ref(null);
const item = ref(props.modelValue);

const computedClass = computed(() => {
    return 'is-item';
});

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});
</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-item-editor" :class="computedClass">
        <lkt-field-text v-model="item.content" is-color/>
    </div>
</template>