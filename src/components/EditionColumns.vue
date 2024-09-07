<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import EditionCanvas from "./EditionCanvas.vue";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
}>(), {
    modelValue: [],
});

const item = ref(props.modelValue);

watch(() => props.modelValue, v => item.value = v);
watch(item, v => {
    // if (item.value.config.amountOfColumns > item.value.config.columns.length) {
    //     for (let k = item.value.config.columns.length; k < item.value.config.amountOfColumns; ++k)  item.value.config.columns.push(new PageBlock());
    // }

    console.log('item.value', item.value);
    emit('update:modelValue', v)
}, {deep: true});

const computedClass = computed(() => {
    return 'lkt-grid-' + item.value.config.amountOfColumns;
});

</script>

<template>
    <div :class="computedClass">
        <div v-if="item.config.amountOfColumns >= 1" class="lkt-page-editor-column">
            <edition-canvas
                v-model="item.blocksColumn1"
            />
        </div>
    </div>
</template>

<style scoped>
.lkt-page-editor-column {
    background: red;
    padding: 15px;
}
</style>