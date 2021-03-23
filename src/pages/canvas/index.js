import React from "react";
import classnames from "classnames";
import { BoxCanvas } from "@bbbottle/box-canvas";
import { CanvasAppRenderer } from "./core";
import CLS from "./index.scss";

export class CanvasPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvasAppRenderer = new CanvasAppRenderer();
  }

  render() {
    return (
      <div className={classnames(CLS.canvasPage)}>
        <BoxCanvas
          onPreviewStart={this.canvasAppRenderer.enterPreviewMode}
          onPreviewDone={this.canvasAppRenderer.exitPreviewMode}
          onBeforeAddBox={this.canvasAppRenderer.installApp}
          boxValidator={this.canvasAppRenderer.canRenderApp}
          staticBoxRenderer={this.canvasAppRenderer.renderApp}
          clearButtonRenderer={this.canvasAppRenderer.renderClearButton}
          previewBoxRenderer={this.canvasAppRenderer.renderAppPreviewer}
        />
      </div>
    );
  }
}
