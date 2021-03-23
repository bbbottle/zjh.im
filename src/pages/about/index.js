import React from "react";
import classnames from "classnames";
import { GithubIcon, MailIcon, NpmIcon } from "@bbbottle/bbicons";
import { IconText } from "../../components/icon_text";
import pkgJSON from "../../../package.json";
import CLS from "./about.scss";
import Img from "../../components/img";
import { coverImgSrc, npmPkgSrc } from "../../constants";
import { TVNoiseLayer } from "../../components/noise";
import { PcOnly } from "../../components/pc_only";

export const Link = (props) => (
  <a href={props.href} target="_blank" tabIndex="-1">
    {props.children}
  </a>
);

export const AboutPage = (props) => {
  const imgSize = 500;
  const linkToPkg = `${npmPkgSrc}${pkgJSON.version}`;
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
