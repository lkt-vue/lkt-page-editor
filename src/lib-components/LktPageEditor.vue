<script setup lang="ts">
import {LktObject} from "lkt-ts-interfaces";
import {ref} from "vue";

const props = withDefaults(defineProps<{
    modelValue: LktObject[]
}>(), {
    modelValue: [],
});


const content = ref([]);

const addLktBox = () => {
    content.value.push({
        component: 'lkt-box',

        content: '',

        className: '',
        classNameOpts: [
            {value: 'info-box', label: 'Info Box'},
            {value: 'info-box with-header', label: 'Info Box (header)'},
            {value: 'warning-box', label: 'Warning Box'},
        ],

        props: {
            title: '',
        },

        config: {
            onlyContent: false,
        }
    });
}

const addLktAccordion = () => {
    content.value.push({
        component: 'lkt-accordion',

        content: '',

        className: '',
        classNameOpts: [],

        props: {
            title: '',
        },

        config: {
            onlyContent: false,
            alwaysOpen: false,
        }
    });
}
</script>

<template>
    <div class="lmm-page-editor">

        <div class="lmm-page-editor-nav">
            <lkt-button text="LKT Box" @click="addLktBox"/>
            <lkt-button text="LKT Accordion" @click="addLktAccordion"/>
        </div>

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
    </div>
</template>