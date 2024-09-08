import {LktObject} from "lkt-ts-interfaces";
import {AccordionConfig} from "./config/AccordionConfig";
import {BoxConfig} from "./config/BoxConfig";
import {BannerBoxConfig} from "./config/BannerBoxConfig";
import {ColumnsConfig} from "./config/ColumnsConfig";
import {BlockConfig} from "../types/BlockConfig";

export class PageBlock {
    id: number = 0;

    // Block type
    component: string = 'text';

    // item selection
    itemType: string = '';
    itemId: number = 0;
    item: LktObject = {};

    // items selection
    items: LktObject[] = [];
    itemsIds: number[] = [];

    // Text editor
    content: string = '';

    // Content organization
    title: string = '';
    blocks: PageBlock[] = [];
    columns: number = 1;

    // Class name config
    className: string = '';

    config: BlockConfig = {}

    constructor(data: LktObject = {}) {
        for (let k in data) {
            if (this.hasOwnProperty(k)) {
                //@ts-ignore
                this[k] = data[k];
            }
        }
    }

    static createBasicBlock(itemType: string) {
        return new PageBlock({
            component: 'basic-block',
            itemType,
        })
    }

    static createItemEditor(itemType: string) {
        return new PageBlock({
            component: 'item',
            itemType,
        })
    }

    static createTextEditor() {
        return new PageBlock({
            component: 'text',
        })
    }

    static createHeadingOneEditor() {
        return new PageBlock({
            component: 'h1',
        })
    }

    static createHeadingTwoEditor() {
        return new PageBlock({
            component: 'h2',
        })
    }

    static createHeadingThreeEditor() {
        return new PageBlock({
            component: 'h3',
        })
    }

    static createLktBannerBox() {
        return new PageBlock({
            component: 'lkt-banner-box',
            config: new BannerBoxConfig()
        })
    }

    static createColumnEngine() {
        return new PageBlock({
            component: 'columns',
            columns: 2,
            config: new ColumnsConfig()
        })
    }

    static createLktBox() {
        return new PageBlock({
            component: 'lkt-box',
            config: new BoxConfig()
        })
    }

    static createLktAccordion() {
        return new PageBlock({
            component: 'lkt-accordion',
            config: new AccordionConfig()
        })
    }
}