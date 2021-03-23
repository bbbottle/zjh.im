import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Styles from "./index.scss";

export class Fade extends React.PureComponent {
  static propTypes = {
    speed: PropTypes.oneOf(["superFast", "fast", "slow"]),
    visible: PropTypes.bool.isRequired,
    unMountAfterFadeOut: PropTypes.bool,
  };

  static defaultProps = {
    unMountAfterFadeOut: false,
  };

  state = {
    unMounted: !this.props.visible,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.visible !== this.props.visible) {
      setTimeout(() => {
        this.setState((prevState) => ({
          unMounted: !prevState.unMounted,
        }));
      }, 300);
    }
  }

  render() {
    const { unMounted } = this.state;

    if (unMounted && this.props.unMountAfterFadeOut) {
      return null;
    }

    const { children, visible, speed = "slow" } = this.props;

    const classNames = classnames(Styles.fadeEle, Styles[speed], {
      [Styles.fadeOut]: !visible,
      [Styles.fadeIn]: visible,
    });
    return children(classNames);
  }
}
