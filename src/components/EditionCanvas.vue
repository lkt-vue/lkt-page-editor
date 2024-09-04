<script setup lang="ts">
import {ref} from "vue";
import {PageBlock} from "../instances/PageBlock";
import {openModal} from "lkt-modal";

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
}>(), {
    modelValue: [],
});


const content = ref(props.modelValue);

const onClickAddBlock = () => {
    openModal('lkt-page-editor-block-picker', '_', {
        onPicked: (block) => content.value.push(block),
    });
};
</script>

<template>
<div class="lkt-page-editor-canvas lkt-grid-1">
    <template v-for="block in content">

        <div
            v-if="block.component !== 'lkt-field-textarea' && block.component !== 'lkt-field-editor'"
            class="lmm-block-config"
            style="background: #00001E; color: #ffffff; padding: 15px;">
            <div>Block config</div>
            <div v-if="block.classNameOpts && block.classNameOpts.length > 0">
                <lkt-field-select
                    v-model="block.className"
                    :options="block.classNameOpts"
                />
            </div>
        </div>

        <lkt-box
            v-if="block.component === 'lkt-box'"
            :class="block.className"
        >
            <edition-canvas v-model="block.blocks"/>
        </lkt-box>

        <lkt-field-editor
            v-else-if="block.component === 'lkt-field-editor'"
            :class="block.className"
            v-model="block.content"
        />

        <lkt-field-textarea
            v-else-if="block.component === 'lkt-field-textarea'"
            :class="block.className"
            v-model="block.content"
        />

        <lkt-accordion
            v-else-if="block.component === 'lkt-accordion'"
            :class="block.className"
        >
            <template #header>
                <lkt-field-text
                    placeholder="Title"
                />
            </template>
            <edition-canvas v-model="block.blocks"/>
        </lkt-accordion>
        <component v-else :is="block.component"/>
    </template>

    <div class="lkt-page-editor-canvas-nav">
        <lkt-button text="Add block" @click="onClickAddBlock"/>
    </div>
</div>
</template>

<style scoped>

</style>