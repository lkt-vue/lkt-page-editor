<script setup lang="ts">
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {PageBlock} from "../instances/PageBlock";
import EditionBlock from "./EditionBlock.vue";
import Sortable from 'sortablejs';
import {time} from "lkt-date-tools";
import {generateRandomString} from "lkt-string-tools";
import AddBlockMenu from "./AddBlockMenu.vue";
import TextEditor from "../edition-components/TextEditor.vue";
import {BlockComponentType} from "../enums/BlockComponentType";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
    columns?: number
    editMode?: boolean
    canvasLevel: number
}>(), {
    modelValue: [],
    columns: 1,
    editMode: false,
    canvasLevel: 0
});


const content = ref(props.modelValue);
const sortable = ref(undefined);
const dragArea = ref(null);
const updateTimeStamp = ref(0);

const uniqueId = generateRandomString(12);

const computedColumnClass = computed(() => {
    return 'lkt-grid-1';
    return 'lkt-grid-' + props.columns;
});

const onDropBlock = (index: number) => {
    content.value.splice(index, 1);
    updateTimeStamp.value = time();
}

const onAppend = (index: number, component: string) => {
    let block = component === BlockComponentType.ListItem ? PageBlock.createListItem() : PageBlock.createTextEditor();
    content.value.splice(index + 1, 0, block);
    updateTimeStamp.value = time();
}

const getBlockKey = (index: number) => {
    let r = [updateTimeStamp.value, uniqueId, 'row', index];

    return r.join('-');
}

onMounted(() => {
    nextTick(() => {
        sortable.value = new Sortable(dragArea.value, {
            group: 'group-' + time(),
            handle: '.drag-indicator',
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65,
            onEnd: function (evt: CustomEvent) {
                let oldIndex = evt.oldIndex;
                let newIndex = evt.newIndex;

                content.value.splice(newIndex, 0, content.value.splice(oldIndex, 1)[0]);
                updateTimeStamp.value = time();
            }
        })
    });
})

watch(() => props.modelValue, v => content.value = v, {deep: true});
watch(content, v => emit('update:modelValue', v), {deep: true});
</script>

<template>
<div class="lkt-page-editor-canvas lkt-grid-1">
    <div ref="dragArea"
         class="lkt-page-editor-drag-area"
         :class="computedColumnClass"
         v-show="content.length > 0">
        <edition-block
            v-for="(_, i) in content"
            v-model="content[i]"
            :key="getBlockKey(i)"
            :edit-mode="editMode"
            :canvas-level="canvasLevel"
            :index="i"
            @drop="onDropBlock"
            @append="onAppend"/>
    </div>

    <div class="lkt-page-editor-canvas-nav">
        <lkt-button
            text="Add block"
            tooltip-window-margin="30"
            tooltip-referrer-margin="7"
            split
            split-class="lkt-page-editor-menu-tooltip"
        >
            <template #split="{doClose}">
                <add-block-menu v-model="content" :canvas-level="canvasLevel" :do-close="doClose"/>
            </template>
        </lkt-button>
    </div>
</div>
</template>