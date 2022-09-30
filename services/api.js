import axios from "axios";
const API_BASE_URL = "https://englishapi.xynie.com/app-api/v1/";
const ARTICLES_ENDPOINT = "photo-gallery-feed-page";

export const fireRequest = async (method, api) => {
  try {
    console.log("fire request", method, api);
    let headers = { "Content-Type": "application/x-www-form-urlencoded" };
    const options = { method, headers, credentials: "include", url: api };
    const response = await axios.request(options);
    console.log(response.status, "response of api", api);
    //const json = await response.json();
    const json = response.data;
    const ALLOWED_STATUS_CODES = [200, 201, 206];
    /*console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log('[API.JS] Time taken by API', api);
    var end = new Date().getTime();
    var time = (end - start) / 1000;
    console.log(`Execution time for API ${api}: ${time} seconds`);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");*/
    return ALLOWED_STATUS_CODES.includes(response.status)
      ? json
      : Promise.reject(json);
  } catch (e) {
    console.log(e);
  }
};

export const getArticles = (page) => {
  const fullUrl = `${API_BASE_URL}${ARTICLES_ENDPOINT}/page/${page}`;
  return fireRequest("GET", fullUrl);
};
