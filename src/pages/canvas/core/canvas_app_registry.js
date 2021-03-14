import {CanvasApp, LivableZone, Zone} from "./canvas_app";
import {CANVAS_APPLICATIONS, EMPTY_APP_ID} from "../const";

/**
 * 画布应用注册表
 */
export class CanvasAppRegistry {
  constructor(apps= CANVAS_APPLICATIONS) {
    this._appById = new Map();
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

      this._appById.set(id, new CanvasApp(
        id,
        name,
        icon,
        component,
        description,
        LivableZone.create(widthRange, heightRange)
      ))
    })
  }

  allApps() {
    return Array.from(this._appById.values());
  }

  availableApp(hostInfo = {}) {
    const { width, height } = hostInfo;
    const hostZone = new Zone(width, height);
    return this.allApps().find(app => app.canLiveIn(hostZone))
      || this._appById.get(EMPTY_APP_ID);
  }
}