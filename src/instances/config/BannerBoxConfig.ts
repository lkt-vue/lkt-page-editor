import {AbstractConfig} from "./AbstractConfig";
import {LktObject} from "lkt-ts-interfaces";

export class BannerBoxConfig extends AbstractConfig {
    backgroundImage: LktObject = {};
    backgroundImageId: number = 0;
}