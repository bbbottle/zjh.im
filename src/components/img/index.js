import React from "react";
import PropTypes from 'prop-types';

import { TickLoader as Spinner } from '../spinner';

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
    onClick: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    loadingViewRenderer: PropTypes.func,
    style: PropTypes.shape({}),
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.setState({
        loading: true
      })
    }
  }

  renderImg = () => {
    const {
      src,
      onClick,
      onLoad = () => {},
      style = {}
    } = this.props;

    const { loading } = this.state;

    const retImg = (
      <img
        className="custom-img-tag"
        src={src}
        key={src}
        onClick={onClick}
        onLoad={() => {
          this.setState({
            loading: false
          }, onLoad);
        }}
        style={{
          ...style,
          display: loading ? 'none' : 'unset'
        }}
      />
    )
    return (
      <>
        {loading && (this.renderLoadingView())}
        {retImg}
      </>
    )
  };

  renderLoadingView = () => {
    const {
      src,
      loadingViewRenderer,
    } = this.props;
    if (!loadingViewRenderer) {
      return <Spinner absCenter />
    }
    return [<Spinner absCenter />, loadingViewRenderer(src)];
  }

  render() {
    if (this.state.error) {
      return ':('
    }

    return this.renderImg();
  }
}

export default Img;