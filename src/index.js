import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

import { PageMenu, Page } from "@bbbottle/page-menu";

import { IconText } from "./components/icon_text";
import { MenuBtn } from "./components/menu_btn";
import { pages } from "./pages";
import { Fade } from "./components/fade";
import { IS_PC } from "./utils/device_detect";
import useScrollDirection from "./hooks/use_scroll_dir";
import { useSafeState } from "./hooks/use_safe_state";
import {
  PanelContext,
  PanelContextLayer,
} from "./components/panel/panel_context";

export const PageTitle = (props) => {
  const { icon, title } = props;
  return (
    <div style={{ position: "absolute", top: 15, left: 15, zIndex: 1 }}>
      <IconText icon={icon} color="#000">
        {title || props.children}
      </IconText>
    </div>
  );
};

export const Logo = (props) => {
  const { visible, onClick: onLogoClick } = props;
  const { resetPanel } = useContext(PanelContext);
  const onClick = (...args) => {
    resetPanel();
    onLogoClick(...args);
  };

  if (IS_PC) {
    return <MenuBtn onClick={onClick} hidden={!visible} />;
  }

  const [dir] = useScrollDirection(document);
  const isScrollingDown = dir === "DOWN";
  return <MenuBtn onClick={onClick} hidden={!visible || isScrollingDown} />;
};

const App = () => {
  const [sitePages, updatePages] = useSafeState(pages);
  const [activePageIndex, setActivePage] = useState(sitePages.length - 1);
  const addSitePage = (page) => {
    updatePages((currentPages) => {
      currentPages.push(page);
    });
  };
  return (
    <PanelContextLayer>
      <PageMenu
        defaultOpen={false}
        onSelect={setActivePage}
        menuIconRenderer={({ open, isOpen }) => {
          return <Logo onClick={open} visible={!isOpen} />;
        }}
      >
        {sitePages.map(
          ({ title, component: PageComp, icon: PageIcon }, index) => {
            const visible =
              index === activePageIndex || index === sitePages.length - 1;
            return (
              <Page title={<PageTitle title={title} icon={<PageIcon />} />}>
                <Fade visible={visible} unMountAfterFadeOut>
                  {(cls) => (
                    <PageComp className={cls} addSitePage={addSitePage} />
                  )}
                </Fade>
              </Page>
            );
          }
        )}
      </PageMenu>
    </PanelContextLayer>
  );
};

export const renderZjhDotIm = ($dom) => {
  return ReactDOM.render(<App />, $dom);
};
