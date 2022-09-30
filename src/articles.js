import React from "react";
import { convertDate, getCount } from "./services/common";

const Articles = (props) => {
  return (
    <ul className="articles">
      {props.list &&
        Object.keys(props.list).length > 0 &&
        Object.keys(props.list).map((index) => {
          let row = props.list[index];
          return (
            <li key={index} className="home-article">
              <div className="home-article-img">
                <img src={row?.ImageStyle_thumbnail} alt="article" />
              </div>
              <div className="home-article-content font1">
                <h3>{row?.title}</h3>

                <div className="author-name">{row?.author_name}</div>
                <span className="extra">
                  {`Author: ${convertDate(row?.last_update)}`} |{" "}
                  {`Views: ${getCount(row?.views_count)}`}
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Articles;
