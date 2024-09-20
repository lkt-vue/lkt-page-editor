<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import BlockButtons from "../components/BlockButtons.vue";
import {Settings} from "../settings/Settings";
import EditionCanvas from "../components/EditionCanvas.vue";
import BlockHeader from "../components/BlockHeader.vue";
import {BlockComponentType} from "../enums/BlockComponentType";

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
const blockHeader = ref(null);
const item = ref(props.modelValue);
const showToolbar = ref(false);

const computedClass = computed(() => {
        let r = [];
        if (item.value.component === 'ul') r.push('is-ul');
        return r.join(' ');
    });

const customItemType = computed(() => {
    let found = Settings.customItemTypes.find(z => z.component === item.value.itemType);
    if (found) return found;
    return undefined;
});

const computedIcon = computed(() => {

    if (typeof customItemType.value === 'undefined') {
        switch (item.value.component) {
            case BlockComponentType.BulletList:
                return 'pagetor-icon-list-bullet';

            default:
                return 'icon-cog';
        }
    }
    if (customItemType.value.icon) return customItemType.value.icon;
    return 'icon-cog';
});

const computedBlockTitle = computed(() => {
    if (item.value.component === BlockComponentType.BulletList) {
        return 'Bullet list';
    }

    return item.value.component;
})


watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});

</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-list-editor" :class="computedClass">
        <div
            ref="blockHeader"
            class="lkt-page-editor-block-header-container"
            @click="showToolbar = !showToolbar">
            <block-header>
                <i :class="computedIcon"/>
                {{computedBlockTitle}}
            </block-header>
        </div>

        <div class="lkt-container-editor-canvas">
            <edition-canvas
                v-model="item.blocks"
                :edit-mode="editMode"
                :canvas-level="-2"
                :columns="item.columns"/>
        </div>


        <lkt-tooltip
            v-if="false"
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="blockHeader"
            location-y="bottom"
            referrer-width
        >
            <template #default="{doClose}">
                <div class="lkt-editor-block-grid">
                </div>
            </template>
        </lkt-tooltip>
    </div>
</template>