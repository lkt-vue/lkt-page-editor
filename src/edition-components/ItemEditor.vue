<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import BlockButtons from "../components/BlockButtons.vue";
import {Settings} from "../settings/Settings";
import BlockHeader from "../components/BlockHeader.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
});

const editor = ref(null);
const container = ref(null);
const blockHeader = ref(null);
const itemPicker = ref(null);
const item = ref(props.modelValue);
const showToolbar = ref(false);

const computedClass = computed(() => {
        let r = [];
        if (item.value.component === 'item') r.push('is-item');
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
})

const onSelectedOption = (opt) => {
    item.value.item = opt;
    showToolbar.value = false;
}


</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-item-editor" :class="computedClass">

        <div
            ref="blockHeader"
            class="lkt-page-editor-block-header-container"
            @click="showToolbar = !showToolbar">
            <block-header v-if="item.itemId <= 0">
                <i :class="computedIcon"/>
                Pick an item
            </block-header>
            <block-header v-else-if="customItemType?.slot">
                <component :is="customItemType.slot" :item="item.item"/>
            </block-header>
            <block-header v-else>
                <i :class="computedIcon"/>
                {{item.item.label}}
            </block-header>
        </div>


        <lkt-tooltip
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="blockHeader"
            location-y="bottom"
            referrer-width
        >
            <template #default="{doClose}">
                <div class="lkt-editor-block-grid">
                    <lkt-field-select
                        ref="itemPicker"
                        v-model="item.itemId"
                        label="Select item"
                        searchable
                        :resource="customItemType?.resource"
                        :resource-data="customItemType?.resourceData"
                        @selected-option="onSelectedOption"
                    />
                </div>
            </template>
        </lkt-tooltip>
    </div>
</template>