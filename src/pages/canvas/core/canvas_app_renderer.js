import React from 'react';
import {CanvasAppRegistry} from "./canvas_app_registry";
import {AppPreviewer} from "../apps";
import {SlotMachine} from "../../../components/slot_machine";
import {getQuadrantByStartEndPos} from "../utils";
import {AbsolutePositionedBox} from "../apps/absolute_positioned_box";

/**
 * 画布应用渲染器
 */
export class CanvasAppRenderer extends CanvasAppRegistry {
  constructor() {
    super();
    this._slotMachinePatterns = this.allApps().map(a => ({ id: a.id, renderer: a.renderIcon }));
  }

  canRenderApp = (hostInfo) => {
    return !this.availableApp(hostInfo).isEmpty();
  };

  renderCursorTracker = (content, hostInfo, cursorQuadrant) => {
    return (
      <AbsolutePositionedBox
        offset={10}
        fixedPointCoordinate={hostInfo.endPos}
        quadrant={cursorQuadrant}
      >
        {content}
      </AbsolutePositionedBox>
    )
  };

  renderAvailableAppsLivableZoneEdge = (hostInfo, cursorQuadrant) => {
    return this.allApps().map((app) => {
      return app.renderLivableZoneEdge(hostInfo, cursorQuadrant)
    })

  };

  renderClearButton = () => null;

  renderAvailableApp = (props) => {
    return this.availableApp(props.boxStyle).render(props);
  }

  renderSlotMachine = (app) => {
    const slotMachineSize = 24;
    return (
      <SlotMachine
        size={slotMachineSize}
        luckyPatternId={app.id}
        patterns={this._slotMachinePatterns}
      />
    )
  };

  renderAppPreviewer = (hostInfo) => {
    const availableApp = this.availableApp(hostInfo);
    const cursorQuadrant = getQuadrantByStartEndPos(
      hostInfo.startPos,
      hostInfo.endPos
    );
    return (
      <AppPreviewer
        cursorQuadrant={cursorQuadrant}
        boxInfo={hostInfo}
        availableApp={availableApp}
      >
        {this.renderCursorTracker(
          this.renderSlotMachine(availableApp, hostInfo),
          hostInfo,
          cursorQuadrant
        )}
        {this.renderAvailableAppsLivableZoneEdge(hostInfo, cursorQuadrant)}
      </AppPreviewer>
    );
  }
}