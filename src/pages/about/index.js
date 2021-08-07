import React, { useState } from "react";
import classnames from "classnames";
import { GithubIcon, EditIcon } from "@bbbottle/bbicons";
import { IconText } from "../../components/icon_text";
import pkgJSON from "../../../package.json";
import Img from "../../components/img";
import { coverImgSrc, npmPkgSrc } from "../../constants";
import { TVNoiseLayer } from "../../components/noise";
import { PcOnly } from "../../components/pc_only";
import { TerminalApp } from "../../components/terminal";
import { XTERM_THEME } from "../../constants";
import { Nav } from "../../components/nav";

export const Link = (props) => (
  <a href={props.href} target="_blank" tabIndex="-1" rel="noreferrer">
    {props.children}
  </a>
);

export const AboutPage = (props) => {
  const imgSize = 500;
  const [showTerm, setTermVisibility] = useState(true);
  const destroyTerm = () => {
    setTermVisibility(false);
  };
  return (
    <>
      <PcOnly>
        <Img
          className={classnames("center", props.className)}
          src={coverImgSrc}
          loadingViewRenderer={() => {
            return (
              <TVNoiseLayer
                opacity={0.5}
                className="center"
                width={imgSize}
                height={imgSize}
              />
            );
          }}
          style={{
            width: imgSize,
            height: imgSize,
          }}
        />
        {showTerm && (
          <TerminalApp
            termHeight={imgSize}
            termWidth={imgSize}
            addSitePage={props.addSitePage}
            destroy={destroyTerm}
            className="center"
            xtermConfig={{
              allowTransparency: true,
              theme: {
                background: "rgba(0, 0, 0, 0)",
                ...XTERM_THEME,
              },
            }}
          />
        )}
      </PcOnly>
      <Nav
        title="根据地"
        items={[
          {
            id: "github",
            content: (
              <IconText
                color="#333"
                icon={<GithubIcon />}
                text={<Link href="https://github.com/bbbottle">bbbottle</Link>}
              />
            ),
          },
          {
            id: "tech",
            content: (
              <IconText
                color="#333"
                icon={<EditIcon />}
                text={<Link href="https://tech.zjh.im/">notes</Link>}
              />
            ),
          },
        ]}
      />
    </>
  );
};
