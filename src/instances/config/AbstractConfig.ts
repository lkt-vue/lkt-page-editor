import {LktObject} from "lkt-ts-interfaces";

export class AbstractConfig {

    // Content size
    contentWidth: string = '';
    contentHeight: string = '';
    contentMinWidth: string = '';
    contentMinHeight: string = '';
    contentMaxWidth: string = '';
    contentMaxHeight: string = '';

    // Element size
    width: string = '';
    height: string = '';
    minWidth: string = '';
    minHeight: string = '';
    maxWidth: string = '';
    maxHeight: string = '';

    constructor(data: LktObject = {}) {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                //@ts-ignore
                this[k] = data[k];
            }
        }
    }
}