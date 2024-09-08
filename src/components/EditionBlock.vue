<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {computed, ref} from "vue";
import EditionCanvas from "./EditionCanvas.vue";
import TextEditor from "../edition-components/TextEditor.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock
    editMode?: boolean
}>(), {
    modelValue: [],
    editMode: false,
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
    <div class="lkt-page-editor-block">
        <text-editor v-model="item" :edit-mode="editMode"/>
    </div>

    <lkt-accordion
        v-if="false"
        class="lkt-page-editor-block"
        :title="computedBlockTitle"
        :icon="computedBlockIcon"
        :model-value="true"
        toggle-mode="display"
    >
        <template #intro>
            <div
                class="lkt-page-editor-block-config">
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

                <div>
                    <lkt-field-text
                        v-if="item.component === 'lkt-box' || item.component === 'lkt-accordion'"
                        v-model="item.config.amountOfColumns"
                        label="Default amount of columns"
                        is-number
                        :min="1"
                        :max="12"
                    />
                </div>
            </div>
        </template>

        <lkt-box
            v-if="item.component === 'lkt-box'"
            :class="item.className"
        >
            <edition-canvas v-model="item.blocks" :columns="item.config.amountOfColumns" :edit-mode="editMode"/>
        </lkt-box>

        <lkt-field-editor
            v-else-if="item.component === 'lkt-field-editor'"
            :class="item.className"
            v-model="item.content"
            :read-mode="!editMode"
        />

        <lkt-field-textarea
            v-else-if="item.component === 'lkt-field-textarea'"
            :class="item.className"
            v-model="item.content"
            :read-mode="!editMode"
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
            <edition-canvas v-model="item.blocks" :columns="item.config.amountOfColumns" :edit-mode="editMode"/>
        </lkt-accordion>

        <component v-else :is="item.component"/>
    </lkt-accordion>
</template>

<style scoped>

</style>