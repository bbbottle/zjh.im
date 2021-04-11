import React, { useState } from "react";
import classnames from "classnames";
import { GithubIcon, MailIcon, NpmIcon } from "@bbbottle/bbicons";
import { IconText } from "../../components/icon_text";
import pkgJSON from "../../../package.json";
import CLS from "./about.scss";
import Img from "../../components/img";
import { coverImgSrc, npmPkgSrc } from "../../constants";
import { TVNoiseLayer } from "../../components/noise";
import { PcOnly } from "../../components/pc_only";
import { TerminalApp } from "../canvas/apps";
import { XTERM_THEME } from "../../constants";

export const Link = (props) => (
  <a href={props.href} target="_blank" tabIndex="-1">
    {props.children}
  </a>
);

export const AboutPage = (props) => {
  const imgSize = 500;
  const [showTerm, setTermVisibility] = useState(true);
  const linkToPkg = `${npmPkgSrc}${pkgJSON.version}`;
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
      <div className={CLS.about}>
        <IconText
          color="#333"
          icon={<GithubIcon />}
          text={<Link href="https://github.com/zjhou">@zjhou</Link>}
        />
        <IconText
          icon={<NpmIcon />}
          text={
            <Link
              href={linkToPkg}
            >{`@bbbottle/zjh.im@${pkgJSON.version}`}</Link>
          }
        />
        <IconText
          icon={<MailIcon />}
          text={<Link href="mailto: hi@zjh.im">hi@zjh.im</Link>}
        />
      </div>
    </>
  );
};
