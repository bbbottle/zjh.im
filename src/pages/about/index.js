import React from 'react';
import classnames from 'classnames';
import {
  GithubIcon,
  MailIcon,
  TagIcon
} from '@bbbottle/bbicons';
import { IconText } from '../../components/icon_text';
import pkgJSON from '../../../package.json';
import CLS from './about.scss';
import {TVNoiseLayer} from '../../components/noise';

const EmailAddr = () => {
  return (
    <span>
      <span className={CLS.kwd}>'hi#zjh.im'</span>
      <span className={CLS.normal}>.replace(</span>
      <span className={CLS.kwd}>'#'</span>
      <span className={CLS.normal}>, </span>
      <span className={CLS.kwd}>'@'</span>
      <span className={CLS.normal}>)</span>
    </span>
  )
};

const GridLine = (props) => {
  const {
    num = 60,
    gap = 8,
    vertical = true,
    className = ''
  } = props;
  const size = num * gap;

  const lines = new Array(num).fill(
    <div
      className={classnames({
        [CLS.vertical]: vertical,
        [CLS.horizontal]: !vertical,
      })}
    />
  );

  return (
    <div
      className={classnames(
        className,
        'center',
        CLS.gridLine,
        { [CLS.gridLineHor]: !vertical }
      )}
      style={{ width: size, height: size }}
    >
      {lines}
    </div>
  )
}

export const AboutPage = () => {
  return (
    <>
      <GridLine />
      <TVNoiseLayer
        height={480}
        width={480}
        className="center"
        opacity={.2}
      />
      <div className={CLS.about}>
        <IconText
          color='#333'
          icon={<GithubIcon />}
          text="@zjhou"
        />
        <IconText
          icon={<MailIcon />}
          text={<EmailAddr />}
        />
        <IconText
          icon={<TagIcon />}
          text={`v${pkgJSON.version}`}
        />
      </div>
    </>
  )
};