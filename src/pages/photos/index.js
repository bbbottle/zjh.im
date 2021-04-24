import React, { useState } from "react";
import useSWR from "swr";

import { TickLoader } from "../../components/spinner";
import { Pager } from "./pager";
import { preloadImg } from "../../utils/req";
import { Nav } from "../../components/nav";
import { tmpWebpUrlSuffix } from "../../constants";
import { apiURL } from "../../constants";

const toWebpUrl = (src) => `${src}${tmpWebpUrlSuffix}`;

export const Photos = (props) => {
  const { data = [], error } = useSWR(apiURL.photos, {
    revalidateOnFocus: false,
  });

  if (error) {
    return null;
  }

  const [photos, setPhotos] = useState(null);

  if (!data.length) {
    return <TickLoader absCenter />;
  }

  const navItems = [];
  data.forEach((d) => {
    navItems.push({
      id: d.name,
      text: d.name,
      photos: d.photos,
    });
    const src = d.photos[0].url;
    return preloadImg(toWebpUrl(src));
  });

  const photosList = photos || data[0].photos;

  return (
    <>
      <Nav
        title="分类"
        items={navItems}
        onItemClick={(id, item) => {
          console.log(item.photos);
          setPhotos(item.photos);
        }}
      />
      <Pager photos={photosList} hideProgressIndicator />
    </>
  );
};
