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

export const AboutPage = (props) => {
  return (
    <div className={classnames(CLS.about, props.className)}>
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
  )
};