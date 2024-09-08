import {Component} from "vue";
import {CustomItemType} from "../classes/CustomItemType";
import {CustomBasicBlock} from "../classes/CustomBasicBlock";

export class Settings {
  static defaultIcon: string|Component|undefined = undefined;

  static customItemTypes: CustomItemType[] = [];
  static customBasicBlocks: CustomBasicBlock[] = [];
}
