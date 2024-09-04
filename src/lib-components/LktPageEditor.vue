<script setup lang="ts">
import {LktObject} from "lkt-ts-interfaces";
import {ref} from "vue";
import {PageBlock} from "../instances/PageBlock";
import EditionCanvas from "../components/EditionCanvas.vue";

const props = withDefaults(defineProps<{
    modelValue: PageBlock[]
}>(), {
    modelValue: [],
});


const content = ref([]);

const addLktBox = () => {
    content.value.push(new PageBlock({
        component: 'lkt-box',
        classNameOpts: [
            {value: 'info-box', label: 'Info Box'},
            {value: 'info-box with-header', label: 'Info Box (header)'},
            {value: 'warning-box', label: 'Warning Box'},
        ],
    }));
}

const addLktAccordion = () => {
    content.value.push(new PageBlock({
        component: 'lkt-accordion',
        classNameOpts: [],
    }));
}
</script>

<template>
    <div class="lmm-page-editor">

        <div class="lmm-page-editor-writer">
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
                    <lkt-field-editor
                        v-model="block.content"
                        placeholder="Content"
                    />
                </lkt-box>

                <lkt-box
                    v-else-if="block.component === 'lkt-accordion'"
                    :class="block.className"
                >
                    <lkt-field-editor
                        v-model="block.content"
                        placeholder="Content"
                    />
                </lkt-box>
                <component v-else :is="block.component"/>
            </template>
        </div>

        <div class="lmm-page-editor-nav">
            <lkt-button text="LKT Box" @click="addLktBox"/>
            <lkt-button text="LKT Accordion" @click="addLktAccordion"/>
            <lkt-button text="LKT Banner" @click="addLktAccordion"/>
        </div>

        <edition-canvas v-model="content"/>
    </div>
</template>