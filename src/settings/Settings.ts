import {Component} from "vue";
import {CustomItemType} from "../classes/CustomItemType";

export class Settings {
  static defaultIcon: string|Component|undefined = undefined;

  static customItemTypes: CustomItemType[] = [];
}
