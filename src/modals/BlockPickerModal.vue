<script setup lang="ts">
import {PageBlock} from "../instances/PageBlock";
import {closeModal} from "lkt-modal";

const props = withDefaults(defineProps<{
    modalName: string
    modalKey: string
    zIndex: number
    onPicked?: Function
}>(), {
    modalName: '',
    modalKey: '_',
    zIndex: 500,
});

const addLktBox = () => {
    if (typeof props.onPicked === 'function') {
        props.onPicked(PageBlock.createLktBox());
    }

    closeModal(props.modalName, props.modalKey);
}

const addLktAccordion = () => {
    if (typeof props.onPicked === 'function') {
        props.onPicked(PageBlock.createLktAccordion());
    }

    closeModal(props.modalName, props.modalKey);
}

const addLktFieldEditor = () => {
    if (typeof props.onPicked === 'function') {
        props.onPicked(PageBlock.createLktFieldEditor());
    }

    closeModal(props.modalName, props.modalKey);
}

const addLktFieldTextarea = () => {
    if (typeof props.onPicked === 'function') {
        props.onPicked(PageBlock.createLktFieldTextarea());
    }

    closeModal(props.modalName, props.modalKey);
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
                <lkt-button text="LKT Text Editor" @click="addLktFieldEditor"/>
                <lkt-button text="LKT Text Area" @click="addLktFieldTextarea"/>
                <lkt-button text="LKT Box" @click="addLktBox"/>
                <lkt-button text="LKT Accordion" @click="addLktAccordion"/>
                <lkt-button text="LKT Banner" @click="addLktAccordion"/>
            </div>
        </lkt-accordion>
    </lkt-modal>
</template>

<style scoped>

</style>