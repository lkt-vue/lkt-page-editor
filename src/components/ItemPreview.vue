<script setup lang="ts">
import {PickedItem} from "../types/PickedItem";
import {computed, ref} from "vue";
import {__} from "lkt-i18n";

const props = withDefaults(defineProps<{
    modelValue: PickedItem,
    icon?: string
}>(), {
    modelValue: [],
    icon: ''
});const item = ref(props.modelValue);

const hasImage = computed(() => {
        return typeof item.value.image === 'object'
            && Object.keys(item.value.image).length > 0;
    }),
    hasCreatedBy = computed(() => {
        return typeof item.value.createdBy === 'object'
            && Object.keys(item.value.createdBy).length > 0;
    })
</script>

<template>
    <lkt-box
        class="lkt-pagetor-item-preview">

        <div class="lkt-pagetor-item-preview-image" v-if="hasImage">
            <lkt-image
                :src="item.image.src"
            />
        </div>

        <div class="lkt-pagetor-item-preview-content">
            <div class="lkt-pagetor-item-preview-name" v-if="item.label">
                <div class="lkt-box-header">
                    <div class="lkt-box-title">
                        <lkt-icon class="lkt-alt-1" :icon="icon" :text="item.label"/>
                    </div>
                </div>
            </div>

            <div class="lkt-pagetor-item-preview-date" v-if="item.createdAt || hasCreatedBy">
                <template v-if="item.createdAt && hasCreatedBy">
                    {{ __('lmm.createdAt') }} {{ item.createdAt }} by {{ item.createdBy.label }}
                </template>
                <template v-else-if="item.createdAt">
                    {{ __('lmm.createdAt') }} {{ item.createdAt }}
                </template>
                <template v-else-if="hasCreatedBy">
                    {{ __('lmm.createdBy') }} {{ item.createdBy.label }}
                </template>
            </div>

            <div class="lkt-pagetor-item-preview-tags" v-if="item.tags && item.tags.length > 0">
                <lkt-tag
                    v-for="tag in item.tags"
                    :text="tag.label"
                />
            </div>

            <div v-if="item.description" class="lkt-pagetor-item-preview-description" v-html="item.description"/>

        </div>
    </lkt-box>
</template>

<style lang="css">
.lkt-pagetor-item-preview {
    --lkt-box-header-font-weight: 500;
    --lkt-box-font-size: 16px;
    --lkt-box-gap: 15px;
    --lkt-box-border-color: var(--dark-1);
    --lkt-box-border-width: 1px;
    --lkt-box-border-style: solid;
}

.lkt-pagetor-item-preview .lkt-box-header .lkt-anchor {
    font-size: 18px;
    font-weight: 500;
}

.lkt-pagetor-item-preview-description {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.425;
}

.lkt-pagetor-item-preview-tags {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
}

.lkt-pagetor-item-preview-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.lkt-pagetor-item-preview .lkt-image {
    --lkt-image-max-height: 150px;
    --lkt-image-padding: 0;
}

.lkt-pagetor-item-preview .lkt-icon {
    --lkt-icon-font-size: 16px;
}

@media screen and (min-width: 640px) {
    .lkt-pagetor-item-preview .lkt-box-content {
        flex-direction: row;
    }

    .lkt-pagetor-item-preview-image {
        width: 209px;
    }

    .lkt-pagetor-item-preview-tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }
}
</style>