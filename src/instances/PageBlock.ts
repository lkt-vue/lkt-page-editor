import {LktObject} from "lkt-ts-interfaces";
import {AccordionConfig} from "./config/AccordionConfig";
import {BoxConfig} from "./config/BoxConfig";
import {AbstractConfig} from "./config/AbstractConfig";
import {BannerBoxConfig} from "./config/BannerBoxConfig";
import {ColumnsConfig} from "./config/ColumnsConfig";

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

    config: AbstractConfig = {
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

    static createLktFieldEditor() {
        return new PageBlock({
            component: 'lkt-field-editor',
            classNameOpts: [
            ],
        })
    }

    static createLktFieldTextarea() {
        return new PageBlock({
            component: 'lkt-field-textarea',
            classNameOpts: [
            ],
        })
    }

    static createLktBannerBox() {
        return new PageBlock({
            component: 'lkt-banner-box',
            classNameOpts: [],
            config: new BannerBoxConfig()
        })
    }

    static createColumnEngine() {
        return new PageBlock({
            component: 'edition-columns',
            classNameOpts: [],
            config: new ColumnsConfig()
        })
    }

    static createLktBox() {
        return new PageBlock({
            component: 'lkt-box',
            classNameOpts: [
                {value: 'info-box', label: 'Info Box'},
                {value: 'info-box with-header', label: 'Info Box (header)'},
                {value: 'warning-box', label: 'Warning Box'},
            ],
            config: new BoxConfig()
        })
    }

    static createLktAccordion() {
        return new PageBlock({
            component: 'lkt-accordion',
            classNameOpts: [],
            config: new AccordionConfig()
        })
    }
}