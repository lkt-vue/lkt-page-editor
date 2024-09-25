<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import {Settings} from "../settings/Settings";
import BlockHeader from "../components/BlockHeader.vue";
import ItemPreview from "../components/ItemPreview.vue";


const emit = defineEmits(['update:modelValue']);

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
const item = ref(props.modelValue);
const showToolbar = ref(false);

const computedClass = computed(() => {
    return 'is-item';
});

const isMultipleItemPicker = computed(() => {
    let type = item.value.component.split(':')[0];
    return type === 'items';
})

const customItemType = computed(() => {
    let searchType = item.value.component.split(':')[1];
    let found = Settings.customItemTypes.find(z => z.component === searchType);
    if (found) return found;
    return undefined;
});

const computedIcon = computed(() => {
    if (typeof customItemType.value === 'undefined') return 'icon-cog';
    if (customItemType.value.icon) return customItemType.value.icon;
    return 'icon-cog';
})

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});
</script>

<template>
    <div ref="container" class="lkt-editor-block lkt-item-editor" :class="computedClass">
        <template v-if="!isMultipleItemPicker && item.itemId > 0">
            <template v-if="customItemType?.slot">
                <component :is="customItemType.slot" :item="item.item"/>
            </template>
            <template v-else>
                <item-preview
                    v-model="item.item"
                    :icon="customItemType?.icon"
                />
            </template>
        </template>

        <div v-else
            ref="blockHeader"
            class="lkt-page-editor-block-header-container"
            @click="showToolbar = !showToolbar">
            <block-header v-if="!isMultipleItemPicker">
                <template v-if="item.itemId <= 0">
                    <i :class="computedIcon"/>
                    Pick an item
                </template>
            </block-header>

            <block-header v-else-if="isMultipleItemPicker">
                <template v-if="item.itemsIds.length === 0">
                    <i :class="computedIcon"/>
                    Pick some items
                </template>
                <template v-else-if="customItemType?.slot">
                    <component
                        v-for="pickedItem in item.items"
                        :is="customItemType.slot"
                        :item="pickedItem"/>
                </template>
                <template v-else>
                    <i :class="computedIcon"/>
                    {{ item.itemsIds.length }} items picked
                </template>
            </block-header>

            <block-header v-else-if="customItemType?.type === 'auto'">
                <i :class="computedIcon"/>
                {{ customItemType.text }}
            </block-header>
        </div>
    </div>
</template>