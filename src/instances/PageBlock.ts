import {LktObject} from "lkt-ts-interfaces";

export class PageBlock {
    id: number = 0;

    component: string = 'lkt-box';

    content: string = '';

    blocks: PageBlock[] = [];

    className: string = '';
    classNameOpts: LktObject[] = [
        {value: 'info-box', label: 'Info Box'},
        {value: 'info-box with-header', label: 'Info Box (header)'},
        {value: 'warning-box', label: 'Warning Box'},
    ];

    props: LktObject = {
        title: '',
    };

    config: LktObject = {
        onlyContent: false,
        alwaysOpen: false,
    }

    constructor(data: LktObject = {}) {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                //@ts-ignore
                this[k] = data[k];
            }
        }
    }
}