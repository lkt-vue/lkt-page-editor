<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import BlockButtons from "../components/BlockButtons.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
});

const editor = ref(null);
const item = ref(props.modelValue);
const showToolbar = ref(false);

const computedClass = computed(() => {
        let r = [];
        if (item.value.component === 'text') r.push('is-text');
        if (item.value.component === 'h1') r.push('is-h1');
        if (item.value.component === 'h2') r.push('is-h2');
        if (item.value.component === 'h3') r.push('is-h3');

        return r.join(' ');
    })
</script>

<template>
    <div class="lkt-editor-block lkt-item-editor" :class="computedClass">

        <block-buttons/>

        <div
            class="lkt-item-editor-content"
            ref="editor">
            Pick an item
        </div>


        <lkt-tooltip
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="editor"
            location-y="top"
        >
            <template #default="{doClose}">
                <div class="">
                    holiii
                </div>
            </template>
        </lkt-tooltip>
    </div>
</template>

<style scoped>
.lkt-item-editor-content {
    background: #f1f1f1;
    padding: 15px;
    width: 100%;
}
</style>