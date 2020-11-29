import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { PageMenu, Page } from '@bbbottle/page-menu'

import { IconText } from './components/icon_text';
import { MenuBtn } from './components/menu_btn';
import { pages } from './pages';


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
  const [isOpen, setOpen] = useState(false)
  const [activePageIndex, setActivePage] = useState(pages.length - 1)
  return (
    <PageMenu
      defaultOpen={isOpen}
      onOpenStatusChange={setOpen}
      onSelect={setActivePage}
      menuIconRenderer={({ open }) => {
        return <MenuBtn onClick={open} hidden={isOpen} />
      }}
    >
      {pages.map(({
        title,
        component: PageComp,
        icon: PageIcon,
      }, index) => {
        return (
          <Page title={ isOpen && <PageTitle icon={<PageIcon />}>{title}</PageTitle>}>
            {index === activePageIndex && <PageComp />}
          </Page>
        )
      })}
    </PageMenu>
  )

}

export const renderZjhDotIm = ($dom) => {
  return ReactDOM.render(<App />, $dom);
}