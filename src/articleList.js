import React, { useState, useEffect } from "react";
import { getArticles } from "./services/api";
import { processArticles } from "./services/common";
import "./styles/article.css";
import Articles from "./articles";

const ArticleList = (props) => {
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [stopPager, setStopPager] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);
  const loadingRef = React.createRef();
  console.log(loadingRef, pageNo, stopPager, loading);

  useEffect(() => {
    const handleObserver = (elem) => {
      try {
        console.log("handle observer called", elem);
        if (stopPager) {
          return;
        }
        console.log(pageNo, elem[0]["isIntersecting"], loading);
        if (elem && elem[0] && elem[0]["isIntersecting"]) {
          console.log("calling api for new page");
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    // fetch articles list with page 0
    console.log(loading, "first useeffect called", pageLoad);
    if (!loading) {
      setPageLoad(true);
      let fetchOutput = fetchArticles(Number(pageNo) + 1);
      console.log(fetchOutput, "=====");
      fetchOutput.then((output) => {
        setLoading(true);
        let newData = list ? [...list, ...output] : output;
        console.log(list, "list", newData);
        setList([...list, ...output]);
        setPageNo(Number(pageNo) + 1);
      });
    }
    if (!pageLoad) {
      const observer = new IntersectionObserver(handleObserver);
      if (loadingRef.current) {
        observer.observe(loadingRef.current);
      }
    }
  }, [pageLoad, loading]);

  const fetchArticles = async (page) => {
    setLoading(false);
    console.log("fetch articles for page", page);
    const res = await getArticles(Number(pageNo) + 1);
    return await appendData(res);
  };
  const appendData = (res) => {
    try {
      if (res.nodes && res.nodes.length > 0) {
        console.log(res, "output in articles list");
        let output = processArticles(res.nodes);
        console.log(output, "final output");
        return new Promise((resolve) => {
          resolve(output);
        });
      } else {
        setStopPager(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Trending Articles</h1>
      <Articles list={list} />
      <div className="btm_loader" ref={loadingRef}></div>
      {loading && <p>...loading</p>}
    </div>
  );
};

export default ArticleList;
