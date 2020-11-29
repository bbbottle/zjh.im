import React from 'react';

import {
  RulerIcon,
  AboutIcon
} from '@bbbottle/bbicons';

const Page1 = () => <div>H</div>
const Page2 = () => <div/>

export const pages = [{
  title: 'hello world',
  icon: AboutIcon,
  component: Page2,
}, {
  title: '画布',
  icon: RulerIcon,
  component: Page1,
}];
