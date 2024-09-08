<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import BlockButtons from "../components/BlockButtons.vue";
import {Settings} from "../settings/Settings";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
});

const editor = ref(null);
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
    <div class="lkt-editor-block lkt-item-editor" :class="computedClass">

        <block-buttons/>

        <div
            class="lkt-item-editor-content"
            @click="showToolbar = !showToolbar">

            <i :class="computedIcon"/>
            <template v-if="item.itemId <= 0">
                Pick an item
            </template>
            <template v-else-if="customItemType?.slot">
                <component :is="customItemType.slot" :item="item.item"/>
            </template>
            <template v-else>
                {{item.item.label}}
            </template>

        </div>


        <lkt-tooltip
            class="lkt-editor-toolbar"
            v-model="showToolbar"
            :referrer="editor"
            location-y="bottom"
        >
            <template #default="{doClose}">
                <div class="">
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

<style scoped>
.lkt-item-editor-content {
    background: #f1f1f1;
    padding: 15px;
    width: 100%;
}
</style>