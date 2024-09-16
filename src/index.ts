import {App, Plugin} from "vue";
import "../style.css";
import "../fontello/css/lktpageeditor.css";
import {default as libComponent} from "./lib-components/LktPageEditor.vue";
import {CustomItemType} from "./classes/CustomItemType";
import {Settings} from "./settings/Settings";
import {CustomBasicBlock} from "./classes/CustomBasicBlock";


const LktPageEditor: Plugin = {
    install: (app: App) => {
        if (app.component('lkt-page-editor') === undefined) app.component('lkt-page-editor', libComponent);
    },
};

export default LktPageEditor;


export const addItemTypeToEditor = (config: CustomItemType) => {
    Settings.customItemTypes.push(config);
}

export const addBasicBlockToEditor = (config: CustomBasicBlock) => {
    Settings.customBasicBlocks.push(config);
}

export {
    CustomItemType,
    CustomBasicBlock
};