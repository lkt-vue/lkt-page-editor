import {LktObject} from "lkt-ts-interfaces";

export class CustomItemType {
    component: string = '';
    text: string = '';
    resource: string = '';
    resourceData: LktObject = {};

    constructor(data: LktObject = {}) {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                //@ts-ignore
                this[k] = data[k];
            }
        }
    }
}