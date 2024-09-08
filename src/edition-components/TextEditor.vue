<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
});

const editor = ref(null);
const item = ref(props.modelValue);
const showToolbar = ref(false);

import {getSelectionText} from "../functions/editor-functions";
import {computed, onMounted, ref} from "vue";

const onSelectedText = () => {
    if (!props.editMode) return;
    let text = getSelectionText();
    showToolbar.value = text.length > 0;
    console.log('onSelectedText', text)
}

const convertToTag = (tag: string = 'p') => {
    document.execCommand('formatBlock', false, tag);
}

function execDefaultAction(action) {
    document.execCommand(action, false);
    item.value.content = document.activeElement.innerHTML;
}

onMounted(() => {
    editor.value.addEventListener('mouseup', onSelectedText);
    editor.value.addEventListener('keyup', onSelectedText);
    editor.value.addEventListener('selectionchange', onSelectedText);
})

const computedClass = computed(() => {
    let r = [];
    if (item.value.component === 'text') r.push('is-text');
    if (item.value.component === 'h1') r.push('is-h1');
    if (item.value.component === 'h2') r.push('is-h2');
    if (item.value.component === 'h3') r.push('is-h3');

    return r.join(' ');
})
</script>

<template>
    <div class="lkt-text-editor" :class="computedClass">
        <div class="lkt-text-editor-content" ref="editor" :contenteditable="editMode" v-html="item.content"></div>

        <lkt-tooltip
            v-model="showToolbar"
            :referrer="editor"
            location-y="top"
        >
            <template #default="{doClose}">
                <div class="" style="background: red; padding: 15px;">
                    <lkt-button text="bold" @click="() => execDefaultAction('bold')"/>
                    <lkt-button text="italic" @click="() => execDefaultAction('italic')"/>
                    <lkt-button text="underline" @click="() => execDefaultAction('underline')"/>
                    <lkt-button text="strike-through" @click="() => execDefaultAction('strikeThrough')"/>
                </div>
            </template>
        </lkt-tooltip>
    </div>
</template>

<style scoped>
.lkt-text-editor {

}

.lkt-text-editor.is-h1 {
    font-size: 32px;
    font-weight: 700;
}
.lkt-text-editor.is-h2 {
    font-size: 28px;
    font-weight: 600;
}
.lkt-text-editor.is-h3 {
    font-size: 24px;
    font-weight: 600;
}
.lkt-text-editor.is-text {
    font-size: 16px;
}
</style>