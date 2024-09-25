import {Component} from "vue";
import {CustomItemType} from "../classes/CustomItemType";
import {CustomBasicBlock} from "../classes/CustomBasicBlock";
import {LktObject} from "lkt-ts-interfaces";

export class Settings {
  static defaultIcon: string|Component|undefined = undefined;

  static customItemTypes: CustomItemType[] = [];
  static customBasicBlocks: CustomBasicBlock[] = [];

  static perComponentClassNameOptions: LktObject[] = [];
}
