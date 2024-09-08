export class CustomItemType {
    constructor(data?: {});
    component: string;
    text: string;
    resource: string;
    icon: string;
    resourceData: {};
}
export function addItemTypeToEditor(config: any): void;
declare namespace LktPageEditor {
    function install(app: any): void;
}
export { LktPageEditor as default };
