import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import { TickLoader as Spinner } from "../spinner";

class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  static propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadingStatusChange: PropTypes.func,
    loadingViewRenderer: PropTypes.func,
    className: PropTypes.string.isRequired,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    onClick: () => {},
  };

  componentDidUpdate(prevProps) {
    const { onLoadingStatusChange = () => null } = this.props;
    if (prevProps.src !== this.props.src) {
      this.setState(
        {
          loading: true,
        },
        () => {
          onLoadingStatusChange();
        }
      );
    }
  }

  renderImg = () => {
    const {
      src,
      onClick,
      onLoad = () => {},
      style = {},
      className = "",
      onLoadingStatusChange = () => null,
    } = this.props;

    const { loading } = this.state;

    const retImg = (
      <img
        className={classnames(className)}
        alt="*]:{)"
        src={src}
        key={src}
        onClick={onClick}
        onLoad={(evt) => {
          const img = evt.target;
          if (img.complete && img.height) {
            this.setState(
              {
                loading: false,
              },
              () => {
                onLoad();
                onLoadingStatusChange(false);
              }
            );
          }
        }}
        style={style}
      />
    );
    return (
      <>
        {loading && this.renderLoadingView()}
        {retImg}
      </>
    );
  };

  renderLoadingView = () => {
    const { src, loadingViewRenderer } = this.props;
    if (!loadingViewRenderer) {
      return <Spinner absCenter />;
    }
    return loadingViewRenderer(src);
  };

  render() {
    if (this.state.error) {
      return ":(";
    }

    return this.renderImg();
  }
}

export default Img;
