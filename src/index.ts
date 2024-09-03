import {App, Plugin} from "vue";
import "../style.css";
import {default as libComponent} from "./lib-components/LktPageEditor.vue";


const LktPageEditor: Plugin = {
    install: (app: App) => {
        if (app.component('lkt-page-editor') === undefined) app.component('lkt-page-editor', libComponent)
    },
};

export default LktPageEditor;