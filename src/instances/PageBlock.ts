import {LktObject} from "lkt-ts-interfaces";
import {AccordionConfig} from "./config/AccordionConfig";
import {BoxConfig} from "./config/BoxConfig";
import {BannerBoxConfig} from "./config/BannerBoxConfig";
import {ColumnsConfig} from "./config/ColumnsConfig";
import {BlockConfig} from "../types/BlockConfig";
import {BlockComponentType} from "../enums/BlockComponentType";

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

        if (Array.isArray(data.item) && data.item.length === 0) {
            this.item = {};
        }

        if (Array.isArray(data.config) && data.config.length === 0) {
            this.config = {};
        }
    }

    static createBasicBlock(itemType: string) {
        return new PageBlock({
            component: 'basic:' + itemType,
            // component: 'basic-block',
            // itemType,
        })
    }

    static createItemEditor(itemType: string) {
        return new PageBlock({
            component: 'item:' + itemType,
        })
    }

    static createTextEditor() {
        return new PageBlock({
            component: BlockComponentType.Text,
        })
    }

    static createHeadingOneEditor() {
        return new PageBlock({
            component: BlockComponentType.Header1,
        })
    }

    static createHeadingTwoEditor() {
        return new PageBlock({
            component: BlockComponentType.Header2,
        })
    }

    static createHeadingThreeEditor() {
        return new PageBlock({
            component: BlockComponentType.Header3,
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
            component: BlockComponentType.Columns,
            columns: 2,
            config: new ColumnsConfig()
        })
    }

    static createLktBox() {
        return new PageBlock({
            component: BlockComponentType.LktBox,
            config: new BoxConfig()
        })
    }

    static createLktAccordion() {
        return new PageBlock({
            component: BlockComponentType.LktAccordion,
            config: new AccordionConfig()
        })
    }

    static createBulletList() {
        return new PageBlock({
            component: BlockComponentType.BulletList,
            blocks: [PageBlock.createListItem()],
        })
    }

    static createListItem() {
        return new PageBlock({
            component: BlockComponentType.ListItem,
        })
    }
}