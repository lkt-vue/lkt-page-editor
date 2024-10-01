<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {getSelectionText} from "../functions/editor-functions";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {Settings} from "../settings/Settings";
import {trim} from "lkt-string-tools";
import {BlockComponentType} from "../enums/BlockComponentType";
import {__} from "lkt-i18n";


const emit = defineEmits(['drop', 'append', 'update:modelValue']);

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
const latestTextLengthOnBackspace = ref(-1);
const updateTimeout = ref(undefined);

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
        if (item.value.component === BlockComponentType.Text) r.push('is-text');
        if (item.value.component === BlockComponentType.Header1) r.push('is-h1');
        if (item.value.component === BlockComponentType.Header2) r.push('is-h2');
        if (item.value.component === BlockComponentType.Header3) r.push('is-h3');
        if (item.value.component === BlockComponentType.ListItem) r.push('is-li');
        if (item.value.component === BlockComponentType.LktIcon) r.push('is-lkt-icon');

        if (item.value.i18nMode) r.push('is-i18n-mode');

        return r.join(' ');
    }),
    computedPlaceholder = computed(() => {
        switch (item.value.component) {
            case BlockComponentType.Header1:
                return 'Heading 1';

            case BlockComponentType.Header2:
                return 'Heading 2';

            case BlockComponentType.Header3:
                return 'Heading 3';

            case BlockComponentType.Text:
                return 'Time to write something';

            default:
                return 'Time to write something';
        }
    });


const customBasicBlock = computed(() => {
    let searchType = item.value.component.split(':')[1];
    let found = Settings.customBasicBlocks.find(z => z.component === searchType);
    if (found) return found;
    return undefined;
});

const computedDisplayContentEdition = computed(() => {
    if (item.value.component === BlockComponentType.LktIcon) return false;
    if (typeof customBasicBlock.value === 'undefined') return true;
    return customBasicBlock.value.contentEnabled;
})

const isLktIcon = computed(() => {
    return item.value.component === BlockComponentType.LktIcon;
})

const onEditorKeyUp = (event: KeyboardEvent) => {
    if (typeof updateTimeout.value !== 'undefined') {
        clearTimeout(updateTimeout.value);
    }

    updateTimeout.value = setTimeout(() => {
        if (event.key !== 'Enter') {
            item.value.content = editor.value.innerHTML;
        }

        if (event.key === 'Backspace') {
            let text = trim(item.value.content);
            let l = text.length;

            if (latestTextLengthOnBackspace.value === 0 && l === 0) {
                emit('drop');
            } else {
                latestTextLengthOnBackspace.value = l;
            }

        } else if (event.key === 'Enter') {

            const clearLineBreakEvent = new KeyboardEvent('keydown', {
                key: 'Backspace'
            });

            emit(
                'append',
                item.value.component === BlockComponentType.ListItem
                    ? BlockComponentType.ListItem
                    : BlockComponentType.Text
            )

            editor.value.dispatchEvent(clearLineBreakEvent);
        }
    }, 200);

}

function pasteEvent(e) {
    e.preventDefault();

    let text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
}

onMounted(() => {
    // add paste event
    editor.value.addEventListener('paste', pasteEvent);

    nextTick(() => {
        if (item.value.id === 0) {
            editor.value.focus();
        }
    })
})

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});



const computedTitle = computed(() => {
    if (item.value.i18nMode) return __(item.value.i18nTitle);
    return item.value.title;
});
const computedContent = computed(() => {
    return __(item.value.i18nTitle);
})
</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-text-editor" :class="computedClass">

        <div class="lkt-grid-1">

            <div v-if="isLktIcon">
                <lkt-icon
                    :icon="item.icon"
                    :text="computedTitle"
                />
            </div>

            <div
                v-show="computedDisplayContentEdition && !item.i18nMode"
                class="lkt-text-editor-content text-editor-field"
                ref="editor"
                :placeholder="computedPlaceholder"
                :contenteditable="editMode && !item.i18nMode"
                v-html="item.content"
                v-once
                @keyup="onEditorKeyUp"
            />

            <div
                v-if="computedDisplayContentEdition && item.i18nMode"
                class="lkt-text-editor-content"
                v-html="computedContent"
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
    </div>
</template>