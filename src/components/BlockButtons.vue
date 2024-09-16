<script setup lang="ts">

</script>

<template>
<div class="lkt-page-editor-block-buttons">
    <div class="drag-indicator"/>
</div>
</template>

<style scoped>
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