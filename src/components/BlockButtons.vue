<script setup lang="ts">

const emit = defineEmits(['drop']);

const onClickDrop = () => {
    emit('drop');
}
</script>

<template>
<div class="lkt-page-editor-block-buttons">
    <div class="drag-indicator"/>

    <lkt-button
        icon="icon-cog"
        tooltip
        tooltip-class="lkt-page-editor-menu-tooltip"
    >
        <template #tooltip="{doClose}">
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
                            <div class="lkt-page-editor-add-menu-title">Basic blocks</div>
                            <lkt-button
                                class="lkt-page-editor-add-menu-button"
                                icon="pagetor-icon-fontsize"
                                text="Text"
                                @click="() => {doClose();}"
                            />
                            <lkt-button
                                class="lkt-page-editor-add-menu-button"
                                icon="pagetor-icon-fontsize"
                                text="Header 1"
                                @click="() => {doClose();}"
                            />
                            <lkt-button
                                class="lkt-page-editor-add-menu-button"
                                icon="pagetor-icon-fontsize"
                                text="Header 2"
                                @click="() => {doClose();}"
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
                    icon="pagetor-icon-erase"
                    text="Remove"
                    @click="() => {doClose(); onClickDrop();}"
                />
            </div>
        </template>
    </lkt-button>
</div>
</template>

<style scoped>
.lkt-page-editor-block-buttons {
    display: inline-flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
}
.lkt-page-editor-block-buttons .drag-indicator {
    padding: 3px 2px 2px 4px;
    transition: all linear 200ms;
    border-radius: 4px;
}
.lkt-page-editor-block-buttons .drag-indicator:hover {
    background: #dadada;
}
.lkt-page-editor-block-buttons .drag-indicator:before {
    content: '';
    display: block;
    width: 10px;
    height: 20px;
    --dot-bg: #ffffff;
    --dot-color: #000;
    --dot-size: 2px;
    --dot-space: 5px;
    background: linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space), linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space), var(--dot-color);
}
.lkt-page-editor-block-buttons .drag-indicator:hover:before {
    --dot-bg: #dadada;
}
</style>