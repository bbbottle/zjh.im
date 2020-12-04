import React, { useState, useEffect } from 'react';
import { ajax as ajaxMod } from 'rxjs';

const { ajax } = ajaxMod;

export const get = (url) => {
  const res$ = ajax.getJSON(url);
  return new Promise((res, rej) => {
    return res$.subscribe(res)
  })
}

export const Get = (props) => {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState(null);
  const { url, children } = props;
  useEffect(() => {
    get(url)
      .then((res) => {
        setRes(res);
        setLoading(false)
      })
  }, []);

  return children({
    loading,
    data: res,
  })
};

