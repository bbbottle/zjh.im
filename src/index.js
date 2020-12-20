import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { PageMenu, Page } from '@bbbottle/page-menu'

import { IconText } from './components/icon_text';
import { MenuBtn } from './components/menu_btn';
import { pages } from './pages';
import {Fade} from './components/fade';
import useScrollDirection from './hooks/use_scroll_dir';


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

export const Logo = (props) => {
  const { visible, onClick } = props;
  const [dir] = useScrollDirection(document);
  const isScrollingDown = dir === 'DOWN';
  return <MenuBtn onClick={onClick} hidden={!visible || isScrollingDown} />
};

const App = () => {
  const [activePageIndex, setActivePage] = useState(pages.length - 1)
  return (
    <PageMenu
      defaultOpen={false}
      onSelect={setActivePage}
      menuIconRenderer={({ open, isOpen }) => {
        return <Logo onClick={open} visible={!isOpen} />
      }}
    >
      {pages.map(({
        title,
        component: PageComp,
        icon: PageIcon,
      }, index) => {
        const visible = index === activePageIndex
          || index === pages.length - 1;
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