<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {getSelectionText} from "../functions/editor-functions";
import {computed, onMounted, ref} from "vue";
import BlockButtons from "../components/BlockButtons.vue";
import {Settings} from "../settings/Settings";

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

const onSelectedText = () => {
    if (!props.editMode) return;
    let text = getSelectionText();
    showToolbar.value = text.length > 0;
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
    }),
    computedPlaceholder = computed(() => {
        switch (item.value.component) {
            case 'h1':
                return 'Heading 1';

            case 'h2':
                return 'Heading 2';

            case 'h3':
                return 'Heading 3';

            case 'text':
                return 'Time to write something';

            default:
                return 'Time to write something';
        }

        return '';
    });



const customBasicBlock = computed(() => {
    let found = Settings.customBasicBlocks.find(z => z.component === item.value.itemType);
    if (found) return found;
    return undefined;
});

const computedIcon = computed(() => {
    if (typeof customBasicBlock.value === 'undefined') return 'icon-cog';
    if (customBasicBlock.value.icon) return customBasicBlock.value.icon;
    return 'icon-cog';
})

const computedBlockTitle = computed(() => {
    return customBasicBlock.value?.text;
})

const computedDisplayContentEdition = computed(() => {
    console.log('computedDisplayContentEdition: ', customBasicBlock.value);
    if (typeof customBasicBlock.value === 'undefined') return true;
    return customBasicBlock.value.contentEnabled;
})
</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-text-editor" :class="computedClass">

        <block-buttons/>

        <div class="lkt-grid-1">
            <div
                v-if="customBasicBlock"
                class="lkt-container-editor-content"
                @click="showToolbar = !showToolbar">
                <i :class="computedIcon"/>
                {{computedBlockTitle}}
            </div>


            <div
                v-show="computedDisplayContentEdition"
                class="lkt-text-editor-content"
                ref="editor"
                :placeholder="computedPlaceholder"
                :contenteditable="editMode"
                v-html="item.content"/>
        </div>

        <lkt-tooltip
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="container"
            location-y="top"
        >
            <template #default="{doClose}">
                <div class="">
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

[contenteditable]:empty:before {
    content: attr(placeholder);
    color: #949494;
}

[contenteditable] {
    -webkit-tap-highlight-color: transparent;
}

[contenteditable]:focus {
    outline: 0px solid transparent;
}
</style>