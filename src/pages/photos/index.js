import React, { useState } from "react";
import useSWR from "swr";

import { TickLoader } from "../../components/spinner";
import { Pager } from "./pager";
import { IS_PC } from "../../utils/device_detect";
import { preloadImg } from "../../utils/req";
import { Nav } from "../../components/nav";
import { apiURL } from "../../constants";
import { toWebpUrl } from "../../utils/oss_url";

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
      content: d.name,
      photos: d.photos,
    });
    const src = d.photos[0].url;
    return preloadImg(toWebpUrl(src));
  });

  const photosList = photos || data[0].photos;

  return (
    <>
      {IS_PC && (
        <Nav
          title="系列"
          items={navItems}
          onItemClick={(id, item) => {
            setPhotos(item.photos);
          }}
        />
      )}
      <Pager photos={photosList} hideProgressIndicator />
    </>
  );
};
