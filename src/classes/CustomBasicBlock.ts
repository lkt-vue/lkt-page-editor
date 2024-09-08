import {LktObject} from "lkt-ts-interfaces";
import {Component} from "vue";

export class CustomBasicBlock {
    component: string = '';
    text: string = '';
    icon: string = '';
    slot: string|Component = '';
    contentEnabled: boolean = true;
    config: LktObject = {}; //Campos extra para agregar a la configuración

    // config: {value: 'title', label: '', type: 'lkt-field-text'} // Y agregar también al configuración extra necesaria en caso de que tengamos un campo de tipo item picker

    constructor(data: LktObject = {}) {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                //@ts-ignore
                this[k] = data[k];
            }
        }
    }
}