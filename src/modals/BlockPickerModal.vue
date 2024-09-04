<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";

const props = withDefaults(defineProps<{
    modalName: string
    modalKey: string
    zIndex: number
    onCreate?: Function
    onUpdate?: Function
}>(), {
    modalName: '',
    modalKey: '_',
    zIndex: 500,
});

const addLktBox = () => {
    // content.value.push(new PageBlock({
    //     component: 'lkt-box',
    //     classNameOpts: [
    //         {value: 'info-box', label: 'Info Box'},
    //         {value: 'info-box with-header', label: 'Info Box (header)'},
    //         {value: 'warning-box', label: 'Warning Box'},
    //     ],
    // }));
}

const addLktAccordion = () => {
    // content.value.push(new PageBlock({
    //     component: 'lkt-accordion',
    //     classNameOpts: [],
    // }));
}
</script>

<template>
    <lkt-modal
        title=""
        :modal-name="modalName"
        :title="item.name"
        :modal-key="modalKey"
        :z-index="zIndex"
    >
        <lkt-accordion
            title="LKT Components"
            icon=""
            :model-value="true"
            always-open
            toggle-mode="display"
        >
            <div class="lkt-grid-1">
                <lkt-button text="LKT Box" @click="addLktBox"/>
                <lkt-button text="LKT Accordion" @click="addLktAccordion"/>
                <lkt-button text="LKT Banner" @click="addLktAccordion"/>
            </div>
        </lkt-accordion>
    </lkt-modal>
</template>

<style scoped>

</style>