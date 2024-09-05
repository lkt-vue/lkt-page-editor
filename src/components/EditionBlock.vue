<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import EditionCanvas from "./EditionCanvas.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
}>(), {
    modelValue: [],
});

const item = ref(props.modelValue);

const computedBlockTitle = computed(() => {
        switch (item.value.component) {
            case 'lkt-box':
                return 'LKT Box';

            case 'lkt-accordion':
                return 'LKT Accordion';

            case 'lkt-field-editor':
                return 'LKT Text Editor';

            case 'lkt-field-textarea':
                return 'LKT Text Area';

            case 'lkt-banner-box':
                return 'LKT Banner Box';

            default:
                return '';
        }
    }),
    computedBlockIcon = computed(() => {
        switch (item.value.component) {
            case 'lkt-box':
                return '';

            case 'lkt-accordion':
                return '';

            case 'lkt-field-editor':
                return '';

            case 'lkt-field-textarea':
                return '';

            case 'lkt-banner-box':
                return '';

            default:
                return '';
        }
    });

</script>

<template>
    <lkt-accordion
        class="lkt-page-editor-block"
        :title="computedBlockTitle"
        :icon="computedBlockIcon"
        :model-value="true"
        toggle-mode="display"
    >
        <template #intro>
            <div
                class="lkt-page-editor-block-config"
                style="background: #00001E; color: #ffffff; padding: 15px;">
                <div>Block config</div>
                <div v-if="item.classNameOpts && item.classNameOpts.length > 0">
                    <lkt-field-select
                        v-model="item.className"
                        :options="item.classNameOpts"
                    />
                </div>

                <div
                    v-if="item.component === 'lkt-banner-box'">
                    <lmm-multimedia
                        v-model="item.backgroundImageId"
                        v-model:data="item.backgroundImage"
                        label="Background image"
                        :read-mode="false"
                        :resource-data="{_lmm_type: 'multimedia'}"
                        field-name="_lmm_block"/>
                </div>
            </div>
        </template>

        <lkt-box
            v-if="item.component === 'lkt-box'"
            :class="item.className"
        >
            <edition-canvas v-model="item.blocks"/>
        </lkt-box>

        <lkt-field-editor
            v-else-if="item.component === 'lkt-field-editor'"
            :class="item.className"
            v-model="item.content"
        />

        <lkt-field-textarea
            v-else-if="item.component === 'lkt-field-textarea'"
            :class="item.className"
            v-model="item.content"
        />

        <lkt-banner-box
            v-else-if="item.component === 'lkt-banner-box'"
            :class="item.className"
            v-model="item.content"
        />

        <lkt-accordion
            v-else-if="item.component === 'lkt-accordion'"
            :class="item.className"
            :model-value="true"
            toggle-mode="display"
        >
            <template #header>
                <lkt-field-text
                    placeholder="Title"
                />
            </template>
            <edition-canvas v-model="item.blocks"/>
        </lkt-accordion>
        <component v-else :is="item.component"/>
    </lkt-accordion>
</template>

<style scoped>

</style>