import {CanvasApp, LivableZone} from "./canvas_app";
import {CANVAS_APPLICATIONS} from "../const";

/**
 * 画布应用注册表
 */
export class CanvasAppRegistry {
  constructor(apps= CANVAS_APPLICATIONS) {
    this.appById = new Map();
    this._registerApp(apps);
  }

  _registerApp(apps) {
    apps.forEach((appInfo) => {
      const {
        id,
        name,
        icon,
        component,
        description,
        widthRange,
        heightRange,
      } = appInfo;

      this.appById.set(id, new CanvasApp(
        id,
        name,
        icon,
        component,
        description,
        LivableZone.create(widthRange, heightRange)
      ))
    })
  }
}