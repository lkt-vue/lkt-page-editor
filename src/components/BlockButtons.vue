<script setup lang="ts">

import {PageBlock} from "../instances/PageBlock";
import {computed, ref, watch} from "vue";
import {BlockComponentType} from "../enums/BlockComponentType";
import {Settings} from "../settings/Settings";
import {i18n} from "lkt-i18n";
import {openModal} from "lkt-modal";
import {LktObject} from "lkt-ts-interfaces";

const emit = defineEmits(['drop']);

const props = withDefaults(defineProps<{
    modelValue: PageBlock
}>(), {
    modelValue: [],
});

const item = ref(props.modelValue);

const onClickDrop = () => {
        emit('drop');
    },
    onSelectedOption = (opt) => {
        item.value.item = opt;
        item.value.items = [opt];
    }

const computedDisplaySwitchBetweenBasicBlocks = computed(() => {
    return [
        BlockComponentType.Text,
        BlockComponentType.Header1,
        BlockComponentType.Header2,
        BlockComponentType.Header3,
    ].includes(item.value.component);
});

const computedDisplaySwitchBetweenContainerBlocks = computed(() => {
    return [
        BlockComponentType.LktBox,
        BlockComponentType.LktAccordion,
        BlockComponentType.Columns,
    ].includes(item.value.component);
});

const computedCustomItemType = computed(() => {
    let searchType = item.value.component.split(':')[1];
    let found = Settings.customItemTypes.find(z => z.component === searchType);
    if (found) return found;
    return undefined;
});

const isItemPicker = computed(() => {
    let type = item.value.component.split(':')[0];
    return type.startsWith('item');
})

const isMultimediaPicker = computed(() => {
    let type = item.value.component.split(':')[0];
    return type.startsWith('lmm-multimedia');
})

const computedMultimediaPickerResourceData = computed(() => {
    return {
        _lmm_type: 'multimedia',
        _lmm_filters: JSON.stringify({
            type: 'image',
        })
    };
})

const isMultipleItemPicker = computed(() => {
    let type = item.value.component.split(':')[0];
    return type === 'items';
})

const computedCanEditTitle = computed(() => {
    if (computedCanEditCustomTitleMode.value && item.value.customTitle) return true;
    if ([
        BlockComponentType.LktAccordion,
        BlockComponentType.LktBox,
        BlockComponentType.LktIcon,
    ].includes(item.value.component)) return true;

    if (item.value.i18nMode && [
        BlockComponentType.Text,
        BlockComponentType.Header1,
        BlockComponentType.Header2,
        BlockComponentType.Header3,
    ].includes(item.value.component)) return true;
    return false;
})

const computedCanEditTranslate = computed(() => {
    if (!item.value.i18nMode && [
        BlockComponentType.Text,
        BlockComponentType.Header1,
        BlockComponentType.Header2,
        BlockComponentType.Header3,
    ].includes(item.value.component)) return true;
    return false;
})

const computedCanEditI18nMode = computed(() => {
    if (computedCanEditCustomTitleMode.value && item.value.customTitle) return true;
    if ([
        BlockComponentType.Text,
        BlockComponentType.Header1,
        BlockComponentType.Header2,
        BlockComponentType.Header3,
        BlockComponentType.LktAccordion,
        BlockComponentType.LktBox,
        BlockComponentType.LktIcon,
    ].includes(item.value.component)) return true;
    return false;
})

const computedCanEditCustomTitleMode = computed(() => {
    if ([
        BlockComponentType.LmmMultimediaImage,
    ].includes(item.value.component)) return true;
    return false;
})

const computedCanEditHiddenTitleMode = computed(() => {
    if ([
        BlockComponentType.LmmMultimediaImage,
    ].includes(item.value.component)) return true;
    return false;
})

const computedCanEditCustomSize = computed(() => {
    if ([
        BlockComponentType.LmmMultimediaImage,
    ].includes(item.value.component)) return true;
    return false;
})

const computedCanEditColumns = computed(() => {
    if ([
        BlockComponentType.LktAccordion,
        BlockComponentType.LktBox,
        BlockComponentType.Columns,
    ].includes(item.value.component)) return true;
    return false;
})

const computedCanEditIcon = computed(() => {
    if ([
        BlockComponentType.LktAccordion,
        BlockComponentType.LktBox,
        BlockComponentType.LktIcon,
    ].includes(item.value.component)) return true;
    return false;
})

const computedIsContainerBlock = computed(() => {
    if ([
        BlockComponentType.LktAccordion,
        BlockComponentType.LktBox,
        BlockComponentType.Columns,
    ].includes(item.value.component)) return true;
    return false;
})

const computedI18nOptions = computed(() => {

    const i18nToOptions = (obj, excludedRootKeys: string[] = [], accumulatedKey: string = '', ) => {
        const keys = Object.keys(obj);
        let r: any = [];

        keys.forEach(key => {
            if (!(accumulatedKey === '' && excludedRootKeys.includes(key))) {
                let finalKey = [];
                if (accumulatedKey) finalKey.push(accumulatedKey);
                finalKey.push(key);
                finalKey = finalKey.join('.');

                if (typeof obj[key] === 'object') {
                    let objectOptions = i18nToOptions(obj[key], [], finalKey)
                    r.push(...objectOptions);

                } else {
                    r.push({
                        value: finalKey,
                        label: obj[key]
                    })
                }
            }
        })

        return r;
    }

    return i18nToOptions(i18n, ['lmm']);
})

const onClickOpenMultimediaManager = () => {
    openModal('multimedia-manager', item.value.itemId, {
        onSelected: (value: number|string, data: LktObject) => {
            item.value.itemId = value;
            item.value.item = data;
        },
        multiple: false,
        allowEmpty: true,
        fieldName: ''
    })
}

watch(() => props.modelValue, v => item.value = v, {deep: true});
watch(item, v => emit('update:modelValue', v), {deep: true});
</script>

<template>
    <div class="lkt-page-editor-block-buttons">
        <lkt-button
            class="drag-indicator"
            icon="pagetor-icon-ellipsis-vert"
            tooltip
            tooltip-class="lkt-page-editor-menu-tooltip lkt-page-editor-block-menu-tooltip"
        >
            <template #tooltip="{doClose}">
                <div class="lkt-grid-2">
                    <div class="lkt-page-editor-add-menu block-menu-actions">
                        <div class="lkt-page-editor-add-menu-title">Actions</div>


                        <lkt-button
                            v-if="isMultimediaPicker"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-picture"
                            text="Pick image"
                            @click="onClickOpenMultimediaManager"
                        />


                        <lkt-button
                            v-if="computedDisplaySwitchBetweenBasicBlocks || computedDisplaySwitchBetweenContainerBlocks"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-fontsize"
                            icon-end="icon-right"
                            text="Convert To"
                            tooltip
                            tooltip-class="lkt-page-editor-menu-tooltip"
                            tooltip-location-y="center"
                            tooltip-location-X="right"
                        >
                            <template #tooltip="{doClose}">
                                <div class="lkt-page-editor-add-menu">
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Text"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Text)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Header 1"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Header1)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Header 2"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Header2)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenBasicBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Header 3"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Header3)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenContainerBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="LKT Accordion"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.LktAccordion)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenContainerBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="LKT Box"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.LktBox)}"
                                    />
                                    <lkt-button
                                        v-if="computedDisplaySwitchBetweenContainerBlocks"
                                        class="lkt-page-editor-add-menu-button"
                                        icon="pagetor-icon-fontsize"
                                        text="Columns"
                                        @click="() => {doClose(); PageBlock.convertBlock(item, BlockComponentType.Columns)}"
                                    />
                                </div>
                            </template>
                        </lkt-button>
                        <lkt-button
                            v-if="computedCanEditHiddenTitleMode"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="Hidden title"
                            show-switch
                            v-model:checked="item.hiddenTitle"
                        />
                        <lkt-button
                            v-if="computedCanEditCustomTitleMode"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="Custom title"
                            show-switch
                            v-model:checked="item.customTitle"
                        />
                        <lkt-button
                            v-if="computedCanEditI18nMode"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="I18n mode"
                            show-switch
                            v-model:checked="item.i18nMode"
                        />
                        <lkt-button
                            v-if="!item.i18nMode && computedCanEditTranslate"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="Translate"
                            @click="() => {doClose();}"
                        />
                        <lkt-button
                            v-if="computedIsContainerBlock"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-language"
                            text="Breakpoints"
                            @click="() => {doClose();}"
                        />
                        <lkt-button
                            v-if="computedCanEditCustomSize"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-fontsize"
                            icon-end="icon-right"
                            text="Container Size"
                            tooltip
                            tooltip-class="lkt-page-editor-menu-tooltip"
                            tooltip-location-y="center"
                            tooltip-location-X="right"
                        >
                            <template #tooltip="{doClose}">
                                <div class="lkt-grid-1">
                                    <lkt-accordion
                                        title="Fixed Size">
                                        <div class="lkt-grid-2">
                                            <lkt-field-text
                                                v-model="item.config.width"
                                                label="Width"
                                            />
                                            <lkt-field-text
                                                v-model="item.config.height"
                                                label="Height"
                                            />
                                        </div>
                                    </lkt-accordion>
                                    <lkt-accordion
                                        title="Min Size">
                                        <div class="lkt-grid-2">
                                            <lkt-field-text
                                                v-model="item.config.minWidth"
                                                label="Min Width"
                                            />
                                            <lkt-field-text
                                                v-model="item.config.minHeight"
                                                label="Min Height"
                                            />
                                        </div>
                                    </lkt-accordion>
                                    <lkt-accordion
                                        title="Max Size">
                                        <div class="lkt-grid-2">
                                            <lkt-field-text
                                                v-model="item.config.maxWidth"
                                                label="Max Width"
                                            />
                                            <lkt-field-text
                                                v-model="item.config.maxHeight"
                                                label="Max Height"
                                            />
                                        </div>
                                    </lkt-accordion>
                                </div>
                            </template>
                        </lkt-button>
                        <lkt-button
                            v-if="computedCanEditCustomSize"
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-fontsize"
                            icon-end="icon-right"
                            text="Content Size"
                            tooltip
                            tooltip-class="lkt-page-editor-menu-tooltip"
                            tooltip-location-y="center"
                            tooltip-location-x="right"
                        >
                            <template #tooltip="{doClose}">
                                <div class="lkt-grid-1">
                                    <lkt-accordion
                                        title="Fixed Size">
                                        <div class="lkt-grid-2">
                                            <lkt-field-text
                                                v-model="item.config.contentWidth"
                                                label="Width"
                                            />
                                            <lkt-field-text
                                                v-model="item.config.contentHeight"
                                                label="Height"
                                            />
                                        </div>
                                    </lkt-accordion>
                                    <lkt-accordion
                                        title="Min Size">
                                        <div class="lkt-grid-2">
                                            <lkt-field-text
                                                v-model="item.config.contentMinWidth"
                                                label="Min Width"
                                            />
                                            <lkt-field-text
                                                v-model="item.config.contentMinHeight"
                                                label="Min Height"
                                            />
                                        </div>
                                    </lkt-accordion>
                                    <lkt-accordion
                                        title="Max Size">
                                        <div class="lkt-grid-2">
                                            <lkt-field-text
                                                v-model="item.config.contentMaxWidth"
                                                label="Max Width"
                                            />
                                            <lkt-field-text
                                                v-model="item.config.contentMaxHeight"
                                                label="Max Height"
                                            />
                                        </div>
                                    </lkt-accordion>
                                </div>
                            </template>
                        </lkt-button>
                        <lkt-button
                            class="lkt-page-editor-add-menu-button"
                            icon="pagetor-icon-erase"
                            text="Remove"
                            @click="() => {doClose(); onClickDrop();}"
                        />
                    </div>
                    <div class="lkt-page-editor-add-menu">
                        <div class="lkt-page-editor-add-menu-title">Config</div>
                        <div class="lkt-editor-block-grid no-padding">

                            <lkt-field-select
                                v-if="isItemPicker && !isMultipleItemPicker"
                                ref="itemPicker"
                                v-model="item.itemId"
                                label="Select item"
                                searchable
                                :resource="computedCustomItemType?.resource"
                                :resource-data="computedCustomItemType?.resourceData"
                                @selected-option="onSelectedOption"
                            />
                            <lkt-field-select
                                v-else-if="isItemPicker && isMultipleItemPicker"
                                ref="itemPicker"
                                v-model="item.itemsIds"
                                :options="item.items"
                                label="Select item"
                                searchable
                                multiple
                                :resource="computedCustomItemType?.resource"
                                :resource-data="computedCustomItemType?.resourceData"
                                @selected-option="onSelectedOption"
                            />


                            <lkt-field-text
                                v-if="computedCanEditTitle && !item.i18nMode"
                                v-model="item.title"
                                label="Title"
                            />

                            <lkt-field-select
                                v-else-if="computedCanEditTitle && item.i18nMode"
                                ref="itemPicker"
                                v-model="item.i18nTitle"
                                label="Select item"
                                searchable
                                :options="computedI18nOptions"
                            />

                            <lkt-field-text
                                v-if="computedCanEditColumns"
                                v-model="item.columns"
                                label="Columns"
                                is-number
                                :min="1"
                                :max="10"
                                :step="1"
                            />

                            <lkt-field-text
                                v-model="item.className"
                                label="CSS Class"
                            />

                            <lkt-field-text
                                v-if="computedCanEditIcon"
                                v-model="item.icon"
                                label="Icon"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </lkt-button>
    </div>
</template>