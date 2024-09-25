import {PickedItemTag} from "./PickedItemTag";
import {LktObject} from "lkt-ts-interfaces";

export type PickedItem = {

    value: number;
    label: string;

    image?: LktObject;
    description?: string;

    tags?: PickedItemTag
}