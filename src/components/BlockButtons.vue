<script setup lang="ts">

import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import {BlockComponentType} from "../enums/BlockComponentType";

const emit = defineEmits(['drop']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
}>(), {
    modelValue: [],
});

const item = ref(props.modelValue);

const onClickDrop = () => {
    emit('drop');
}

const computedDisplaySwitchBetweenBasicBlocks = computed(() => {
    return [
        BlockComponentType.Text,
        BlockComponentType.Header1,
        BlockComponentType.Header2,
        BlockComponentType.Header3,
    ].includes(item.value.component);
})
</script>

<template>
    <div class="lkt-page-editor-block-buttons">
        <lkt-button
            class="drag-indicator"
            icon="icon-drag-indicator"
            tooltip
            tooltip-class="lkt-page-editor-menu-tooltip"
        >
            <template #tooltip="{doClose}">
                <div class="lkt-grid-2">
                    <div class="lkt-page-editor-add-menu">
                        <div class="lkt-page-editor-add-menu-title">Block Options</div>
                        <lkt-button
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-fontsize"
                            text="Convert To"
                            @click="() => {doClose();}"
                            tooltip
                            tooltip-class="lkt-page-editor-menu-tooltip"
                        >
                            <template #tooltip="{doClose}">
                                <div class="lkt-page-editor-add-menu">
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Text"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Text)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Header 1"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Header1)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Header 2"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Header2)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Header 3"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Header3)}"
                                    />
                                </div>
                            </template>
                        </lkt-button>
                        <lkt-button
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="I18n mode"
                            @click="() => {doClose();}"
                        />
                        <lkt-button
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="Translate"
                            @click="() => {doClose();}"
                        />
                        <lkt-button
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="Breakpoints"
                            @click="() => {doClose();}"
                        />
                        <lkt-button
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-erase"
                            text="Remove"
                            @click="() => {doClose(); onClickDrop();}"
                        />
                    </div>
                    <div class="lkt-editor-block-grid">
                        <lkt-field-text
                            v-model="item.title"
                            label="Title"
                        />

                        <lkt-field-text
                            v-model="item.columns"
                            label="Columns"
                            is-number
                            :min="1"
                            :max="10"
                        />

                        <lkt-field-text
                            v-model="item.className"
                            label="CSS Class"
                        />
                        <lkt-field-text
                            v-model="item.icon"
                            label="Icon"
                        />
                    </div>
                </div>
            </template>
        </lkt-button>
    </div>
</template>