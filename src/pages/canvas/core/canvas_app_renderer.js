import {CanvasAppRegistry} from "./canvas_app_registry";

/**
 * 画布应用渲染器
 */
export class CanvasAppRenderer {
  constructor() {
    this._appRegistry = new CanvasAppRegistry()
  }
}