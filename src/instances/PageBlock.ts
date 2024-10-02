import {LktObject} from "lkt-ts-interfaces";
import {BannerBoxConfig} from "./config/BannerBoxConfig";
import {BlockConfig} from "../types/BlockConfig";
import {BlockComponentType} from "../enums/BlockComponentType";
import {AbstractConfig} from "./config/AbstractConfig";

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
    i18nTitle: string = '';
    icon: string = '';
    blocks: PageBlock[] = [];
    columns: number = 1;

    // Class name config
    className: string = '';

    i18nMode: boolean = false;
    customTitle: boolean = false;
    hiddenTitle: boolean = false;

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

        this.config = new AbstractConfig(this.config);

        this.blocks = this.blocks.map(item => new PageBlock(item));
    }

    static convertBlock(block: PageBlock, component: string) {
        block.component = component;
        return block;
    }

    static createBasicBlock(itemType: string) {
        return new PageBlock({
            component: 'basic:' + itemType,
            // component: 'basic-block',
            // itemType,
        })
    }

    static createItemEditor(component: string, itemType: string) {
        return new PageBlock({
            component: 'item:' + component,
            itemType,
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
            blocks: [PageBlock.createTextEditor()],
        })
    }

    static createLktBox() {
        return new PageBlock({
            component: BlockComponentType.LktBox,
            blocks: [PageBlock.createTextEditor()],
        })
    }

    static createLktAccordion() {
        return new PageBlock({
            component: BlockComponentType.LktAccordion,
            blocks: [PageBlock.createTextEditor()],
        })
    }

    static createLktIcon() {
        return new PageBlock({
            component: BlockComponentType.LktIcon,
        })
    }

    static createLktColor() {
        return new PageBlock({
            component: BlockComponentType.LktColor,
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

    static createLmmMultimediaImage() {
        return new PageBlock({
            component: BlockComponentType.LmmMultimediaImage,
            itemType: 'lmm-multimedia',
            config: new AbstractConfig(),
        })
    }
}