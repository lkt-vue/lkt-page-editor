<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import {BlockComponentType} from "../enums/BlockComponentType";
import {__} from "lkt-i18n";


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
const showToolbar = ref(false);

const computedClass = computed(() => {
    return 'is-item';
});

const computedTitle = computed(() => {
    if (item.value.customTitle) {
        if (item.value.i18nMode) return __(item.value.i18nTitle);
        return item.value.title;
    }
    return item.value.item.label
})

const getStyleValue = (val) => {
    return val;
}

const computedStyle = computed(() => {
    let r = {};

    if (!item.value.config) {
        return r;
    }

    if (item.value.config.width) r.width = getStyleValue(item.value.config.width);
    if (item.value.config.height) r.height = getStyleValue(item.value.config.height);
    if (item.value.config.minWidth) r.minWidth = getStyleValue(item.value.config.minWidth);
    if (item.value.config.minHeight) r.minHeight = getStyleValue(item.value.config.minHeight);
    if (item.value.config.maxWidth) r.maxWidth = getStyleValue(item.value.config.maxWidth);
    if (item.value.config.maxHeight) r.maxHeight = getStyleValue(item.value.config.maxHeight);

    return r;
})

const computedImageStyle = computed(() => {
    let r = {};

    if (!item.value.config) {
        return r;
    }

    if (item.value.config.contentWidth) r.width = getStyleValue(item.value.config.contentWidth);
    if (item.value.config.contentHeight) r.height = getStyleValue(item.value.config.contentHeight);
    if (item.value.config.contentMinWidth) r.minWidth = getStyleValue(item.value.config.contentMinWidth);
    if (item.value.config.contentMinHeight) r.minHeight = getStyleValue(item.value.config.contentMinHeight);
    if (item.value.config.contentMaxWidth) r.maxWidth = getStyleValue(item.value.config.contentMaxWidth);
    if (item.value.config.contentMaxHeight) r.maxHeight = getStyleValue(item.value.config.contentMaxHeight);

    return r;
})

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});
</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-item-editor" :class="computedClass">
        <lkt-field-text is-color/>
    </div>
</template>