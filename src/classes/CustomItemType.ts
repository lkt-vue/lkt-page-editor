import {LktObject} from "lkt-ts-interfaces";
import {Component} from "vue";

export class CustomItemType {
    component: string = '';
    text: string = '';
    resource: string = '';
    icon: string = '';
    slot: string|Component = '';
    resourceData: LktObject = {};
    type: 'item'|'items'|'auto' = 'item';

    constructor(data: LktObject = {}) {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                //@ts-ignore
                this[k] = data[k];
            }
        }
    }
}