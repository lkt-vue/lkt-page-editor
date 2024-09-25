export class CustomBasicBlock {
    constructor(data?: {});
    component: string;
    text: string;
    icon: string;
    slot: string;
    contentEnabled: boolean;
    config: {};
}
export class CustomItemType {
    constructor(data?: {});
    component: string;
    itemType: string;
    text: string;
    resource: string;
    icon: string;
    slot: string;
    resourceData: {};
    type: string;
}
export class PageBlock {
    static convertBlock(block: any, component: any): any;
    static createBasicBlock(itemType: any): PageBlock;
    static createItemEditor(component: any, itemType: any): PageBlock;
    static createTextEditor(): PageBlock;
    static createHeadingOneEditor(): PageBlock;
    static createHeadingTwoEditor(): PageBlock;
    static createHeadingThreeEditor(): PageBlock;
    static createLktBannerBox(): PageBlock;
    static createColumnEngine(): PageBlock;
    static createLktBox(): PageBlock;
    static createLktAccordion(): PageBlock;
    static createLktIcon(): PageBlock;
    static createLktColor(): PageBlock;
    static createBulletList(): PageBlock;
    static createListItem(): PageBlock;
    static createLmmMultimediaImage(): PageBlock;
    constructor(data?: {});
    id: number;
    component: string;
    itemType: string;
    itemId: number;
    item: {};
    items: any[];
    itemsIds: any[];
    content: string;
    title: string;
    i18nTitle: string;
    icon: string;
    blocks: PageBlock[];
    columns: number;
    className: string;
    i18nMode: boolean;
    customTitle: boolean;
    config: AbstractConfig;
}
export function addBasicBlockToEditor(config: any): void;
export function addItemTypeToEditor(config: any): void;
declare namespace LktPageEditor {
    function install(app: any): void;
}
declare class AbstractConfig {
    constructor(data?: {});
    contentWidth: string;
    contentHeight: string;
    contentMinWidth: string;
    contentMinHeight: string;
    contentMaxWidth: string;
    contentMaxHeight: string;
    width: string;
    height: string;
    minWidth: string;
    minHeight: string;
    maxWidth: string;
    maxHeight: string;
}
export { LktPageEditor as default };
