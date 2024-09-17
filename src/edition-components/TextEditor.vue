<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {getSelectionText} from "../functions/editor-functions";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {Settings} from "../settings/Settings";
import BlockHeader from "../components/BlockHeader.vue";
import {trim} from "lkt-string-tools";


const emit = defineEmits(['drop', 'update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
});

const editor = ref(null);
const container = ref(null);
const blockHeader = ref(null);
const item = ref(props.modelValue);
const showToolbar = ref(false);
const showCustomToolbar = ref(false);
const latestTextLengthOnBackspace = ref(-1);

const onSelectedText = () => {
    if (!props.editMode) return;
    let text = trim(getSelectionText());
    nextTick(() => {
        showToolbar.value = text.length > 0;
    })
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
    if (typeof customBasicBlock.value === 'undefined') return true;
    return customBasicBlock.value.contentEnabled;
})

const onEditorKeyUp = (event: KeyboardEvent) => {
    item.value.content = editor.value.innerHTML;

    if (event.key === 'Backspace') {
        let text = trim(item.value.content);
        let l = text.length;

        if (latestTextLengthOnBackspace.value === 0 && l === 0) {
            emit('drop');
        } else {
            latestTextLengthOnBackspace.value = l;
        }
    }
}

function pasteEvent(e) {
    e.preventDefault();

    let text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
}

onMounted(() => {
    // add paste event
    editor.value.addEventListener('paste', pasteEvent);
})

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});
</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-text-editor" :class="computedClass">

        <div class="lkt-grid-1">
            <div
                v-show="customBasicBlock"
                ref="blockHeader"
                class="lkt-page-editor-block-header-container"
                @click="showCustomToolbar = !showCustomToolbar">
                <block-header v-if="item.itemId <= 0">
                    <i :class="computedIcon"/>
                    {{ computedBlockTitle }}
                </block-header>
                <block-header v-else-if="customBasicBlock?.slot">
                    <component :is="customBasicBlock.slot" :item="item.item"/>
                </block-header>
                <block-header v-else>
                    <i :class="computedIcon"/>
                    {{ computedBlockTitle }}
                </block-header>
            </div>

            <div
                v-show="computedDisplayContentEdition"
                class="lkt-text-editor-content"
                ref="editor"
                :placeholder="computedPlaceholder"
                :contenteditable="editMode"
                v-html="item.content"
                v-once
                @keyup="onEditorKeyUp"
            />
        </div>

        <lkt-tooltip
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="container"
            location-y="top"
            referrer-margin="5"
        >
            <template #default="{doClose}">
                <div class="toolbar-actions">
                    <lkt-button class="text-format-button" icon="pagetor-icon-bold"
                                @click="() => execDefaultAction('bold')"/>
                    <lkt-button class="text-format-button" icon="pagetor-icon-italic"
                                @click="() => execDefaultAction('italic')"/>
                    <lkt-button class="text-format-button" icon="pagetor-icon-underline"
                                @click="() => execDefaultAction('underline')"/>
                    <lkt-button class="text-format-button" icon="pagetor-icon-strike"
                                @click="() => execDefaultAction('strikeThrough')"/>
                </div>
            </template>
        </lkt-tooltip>

        <lkt-tooltip
            v-if="false"
            class="lkt-editor-toolbar"
            v-model="showCustomToolbar"
            :referrer="blockHeader"
            location-y="bottom"
        >
            <template #default="{doClose}">
                <div class="">
                    TODO: Custom options
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