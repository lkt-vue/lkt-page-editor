<script setup lang="ts">
import {LktObject} from "lkt-ts-interfaces";
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
    openModal('lkt-page-editor-block-picker');
};
</script>

<template>
<div class="lkt-page-editor-canvas">
    <template v-for="block in content">

        <div class="lmm-block-config" style="background: #00001E; color: #ffffff; padding: 15px;">
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

        <lkt-accordion
            v-else-if="block.component === 'lkt-accordion'"
            :class="block.className"
        >
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