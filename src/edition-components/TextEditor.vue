<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import {Settings} from "../settings/Settings";
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
    }),
    computedLabel = computed(() => {
        switch (item.value.component) {
            case BlockComponentType.Header1:
                return 'Heading 1';

            case BlockComponentType.Header2:
                return 'Heading 2';

            case BlockComponentType.Header3:
                return 'Heading 3';

            case BlockComponentType.Text:
                return 'Text Block';

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

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => {
    console.log('updated text editor', v);
    emit('update:modelValue', v)
}, {deep: true});


const computedTitle = computed(() => {
    if (item.value.i18nMode && item.value.i18nTitle) return __(item.value.i18nTitle);
    return item.value.title;
});
const computedContent = computed(() => {
    if (computedDisplayContentEdition.value && item.value.i18nMode && item.value.i18nTitle) {
        return __(item.value.i18nTitle);
    }
    return '';
})
const computedFieldType = computed(() => {
    return item.value.component === BlockComponentType.Text ? 'html' : 'text';
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

            <template v-if="computedDisplayContentEdition && !item.i18nMode">
                <lkt-field-text
                    :type="computedFieldType"
                    v-model="item.content"
                    :placeholder="computedPlaceholder"
                    :label="computedLabel"
                    :read-mode="!editMode"
                />
            </template>

            <div
                v-if="computedDisplayContentEdition && item.i18nMode"
                class="lkt-text-editor-content"
                v-html="computedContent"
            />
        </div>
    </div>
</template>