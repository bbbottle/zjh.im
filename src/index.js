import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { PageMenu, Page } from '@bbbottle/page-menu'

import { IconText } from './components/icon_text';
import { MenuBtn } from './components/menu_btn';
import { pages } from './pages';
import {Fade} from './components/fade';


export const PageTitle = (props) => {
  const { icon, title } = props;
  return (
    <div style={{ position: 'absolute', top: 15, left: 15 }}>
      <IconText
        icon={icon}
        color="#51c49f"
      >
        {title || props.children}
      </IconText>
    </div>
  )
}

const App = () => {
  const [activePageIndex, setActivePage] = useState(pages.length - 1)
  return (
    <PageMenu
      defaultOpen={false}
      onSelect={setActivePage}
      menuIconRenderer={({ open, isOpen }) => {
        return <MenuBtn onClick={open} hidden={isOpen} />
      }}
    >
      {pages.map(({
        title,
        component: PageComp,
        icon: PageIcon,
      }, index) => {
        const visible = index === activePageIndex;
        return (
          <Page>
            <Fade
              visible={visible}
              unMountAfterFadeOut
            >
              {(cls) => <PageComp className={cls} />}
            </Fade>
          </Page>
        )
      })}
    </PageMenu>
  )

}

export const renderZjhDotIm = ($dom) => {
  return ReactDOM.render(<App />, $dom);
}