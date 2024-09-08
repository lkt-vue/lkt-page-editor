<script setup lang="ts">

</script>

<template>
<div class="lkt-page-editor-block-buttons">
    <div class="drag-indicator"/>
</div>
</template>

<style scoped>
.lkt-page-editor-block-buttons .drag-indicator {
    width: 20px;
    height: 30px;
    --dot-bg: #ffffff;
    --dot-color: #aaa;
    --dot-size: 3px;
    --dot-space: 10px;
    background: linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space), linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space), var(--dot-color);
}
</style>