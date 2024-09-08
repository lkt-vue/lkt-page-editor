<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import BlockButtons from "../components/BlockButtons.vue";
import {Settings} from "../settings/Settings";
import EditionCanvas from "../components/EditionCanvas.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
    canvasLevel: number
}>(), {
    modelValue: [],
    editMode: false,
});

const editor = ref(null);
const item = ref(props.modelValue);
const showToolbar = ref(false);

const computedClass = computed(() => {
        let r = [];
        if (item.value.component === 'lkt-accordion') r.push('is-accordion');
        return r.join(' ');
    });

const customItemType = computed(() => {
    let found = Settings.customItemTypes.find(z => z.component === item.value.itemType);
    if (found) return found;
    return undefined;
});

const computedIcon = computed(() => {
    if (typeof customItemType.value === 'undefined') return 'icon-cog';
    if (customItemType.value.icon) return customItemType.value.icon;
    return 'icon-cog';
});

const computedCanvasLevel = computed(() => {
    if (item.value.component === 'columns') return 0;
    return props.canvasLevel + 1;
})

const computedBlockTitle = computed(() => {
    if (item.value.component === 'columns') {
        return 'Column engine (' + item.value.columns + ' columns)'
    }

    return item.value.component;
})


</script>

<template>
    <div class="lkt-editor-block lkt-container-editor" :class="computedClass">

        <block-buttons/>

        <div
            class="lkt-container-editor-content"
            ref="editor"
            @click="showToolbar = true">

            <i :class="computedIcon"/>
            {{computedBlockTitle}}
        </div>


        <lkt-tooltip
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="editor"
            location-y="bottom"
        >
            <template #default="{doClose}">
                <div class="">
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
                </div>
            </template>
        </lkt-tooltip>
    </div>

    <div class="lkt-container-editor-canvas">
        <edition-canvas v-model="item.blocks" :edit-mode="editMode" :canvas-level="computedCanvasLevel" :columns="item.columns"/>
    </div>
</template>

<style scoped>
.lkt-container-editor-content {
    background: #f1f1f1;
    padding: 15px;
    width: 100%;
}
.lkt-container-editor-canvas {
    padding-left: 30px;
}
</style>