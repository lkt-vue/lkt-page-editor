import {App, Plugin} from "vue";
import "../style.css";
import {default as libComponent} from "./lib-components/LktPageEditor.vue";
import {addModal} from "lkt-modal";
import BlockPickerModal from "./modals/BlockPickerModal.vue";
import {CustomItemType} from "./classes/CustomItemType";
import {Settings} from "./settings/Settings";


const LktPageEditor: Plugin = {
    install: (app: App) => {
        if (app.component('lkt-page-editor') === undefined) app.component('lkt-page-editor', libComponent);

        addModal('lkt-page-editor-block-picker', BlockPickerModal)
    },
};

export default LktPageEditor;


export const addItemTypeToEditor = (config: CustomItemType) => {
    Settings.customItemTypes.push(config);
}

export {
    CustomItemType
};