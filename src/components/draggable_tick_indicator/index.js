import React from 'react';
import PropTypes from 'prop-types';
import Rxjs from 'rxjs';
import classNames from 'classnames';

import CLS from './style.scss';

const { Subject, fromEvent, merge, operators } = Rxjs;
const { filter, map, concatAll, takeUntil } = operators;

const range = num => [...Array(num).keys()];

const pointerEvent$ = new Subject();

export class TickIndicator extends React.Component {
  static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    absRight: PropTypes.bool,
  };

  static defaultProps={
    onDrop: () => {},
    onClick: () => {},
    current: 1,
    absRight: false,
  };

  state = {
    y: this.props.current * 6,
    isDragging: false,
  };

  buildProgressStr = () => `${(this.state.y - 6) / 6 + 1} / ${this.props.total}`;

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.current !== this.props.current) {
      this.setState({
        y: this.props.current * 6,
      })
    }
  }

  componentDidMount() {
    // workaround for safari: wrong text cursor when drag;
    document.onselectstart = function(){ return false; };

    const self = this;
    const calcPointerY = s => map(e => {
      const parentY = self.indicator && self.indicator.getBoundingClientRect().y;
      const mouseY = e.clientY;
      return mouseY - parentY - 6;
    })(s);
    const dragStart$ = pointerEvent$.pipe(filter(e => e.type === 'mousedown'));
    const dragMoving$ = pointerEvent$.pipe(filter(e => e.type === 'mousemove'));
    const dragEnd$ = merge(
      fromEvent(document, 'mouseup'),
      // pointerEvent$.pipe(filter(e => e.type === 'mouseup'))
    );
    const dragNdrop$ = dragStart$.pipe(
      map(() => {
          return dragMoving$.pipe(
            takeUntil(dragEnd$))
        }
      ),
      concatAll(),
      calcPointerY,
      map(y => Math.round(y / 6) * 6),
      filter(y => y < this.indicator.getBoundingClientRect().height - 12 && y >= 6),
    );
    this.dragNdropSubscribtion = dragNdrop$.subscribe(this.updatePointerPos);
    this.dragStartSubscribtion = dragStart$.subscribe(() => {this.updateDragStatus(true)});
    this.dragEndSubscribtion = dragEnd$.pipe(
      map(() => {
        const y = this.state.y;
        const pos = Math.floor(y / 6);
        if (pos >= this.props.total) {
          return this.props.total;
        }
        if (pos <= 1) {
          return 1;
        }
        return pos;
      }),
      filter(() => {
        return this.state.isDragging
      })
    ).subscribe((pointerIdx) => {
      this.props.onDrop(pointerIdx);
      this.updateDragStatus(false)
    })
  }

  componentWillUnmount() {
    this.dragEndSubscribtion.unsubscribe();
    this.dragStartSubscribtion.unsubscribe();
    this.dragNdropSubscribtion.unsubscribe();
  }

  updatePointerPos = (y) => {
    this.setState({y})
  };

  updateDragStatus = (isDragging) => {
    this.setState({isDragging})
  };

  pointerEventHandler = (e) => {pointerEvent$.next(e)};

  renderTickIndicator = () => {
    const { total } = this.props;
    return (
      <div
        className={classNames(
          CLS.dragTickIndicator, {
          [CLS.absRight]: this.props.absRight,
          [CLS.isDragging]: this.state.isDragging
        })}
        ref={ref => {this.indicator = ref;}}
        onMouseUp={this.pointerEventHandler}
        onMouseMove={this.pointerEventHandler}
      >
        {
          range(total).map(i => {
            return (
              <div
                onClick={(e) => this.props.onClick(e, i)}
                className={classNames(CLS.tick)}
              />
            )
          })
        }
        {
          <div
            className={CLS.pointer}
            data-progress={this.buildProgressStr()}
            style={{top: this.state.y}}
            onMouseDown={this.pointerEventHandler}
          />
        }
      </div>
    )
  }

  render() {
    if (this.props.total < 2) {
      return null;
    }

    return this.renderTickIndicator()
  }
}