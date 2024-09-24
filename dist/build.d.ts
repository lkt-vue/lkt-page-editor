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
export function addBasicBlockToEditor(config: any): void;
export function addItemTypeToEditor(config: any): void;
declare namespace LktPageEditor {
    function install(app: any): void;
}
export { LktPageEditor as default };
