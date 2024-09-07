import {LktObject} from "lkt-ts-interfaces";

export class AbstractConfig {

    amountOfColumns: number = 1;

    constructor(data: LktObject = {}) {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                //@ts-ignore
                this[k] = data[k];
            }
        }
    }
}