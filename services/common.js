export const processArticles = (data) => {
  try {
    let resultData = [];
    if (data && Object.keys(data).length > 0) {
      data.forEach((row, index) => {
        //console.log(row, "each item");
        if (row && row.node && Object.keys(row.node).length > 0) {
          resultData.push(row.node);
        }
      });
    }
    return resultData;
  } catch (e) {
    console.log(e);
  }
};

export const getCount = (x, plus = "") => {
  try {
    if (isNaN(x)) return x;

    if (x < 1000) {
      return x;
    }
    if (x < 1000000) {
      //return Math.round(Number(Math.round(x/1000))*100)/100  + ", K"+plus;
      return (
        Math.round(RoundUptoOneDecimal(x / 1000) * 100) / 100 + " K" + plus
      );
    }
    if (x < 10000000) {
      //return Math.round(Number((x/1000000).toFixed(fixeddigit))*100)/100  + ", Mn"+plus;
      return (
        Math.round(RoundUptoOneDecimal(x / 1000000) * 100) / 100 + " M" + plus
      );
    }
    if (x < 1000000000) {
      //return Math.round(Number((x/1000000).toFixed(fixeddigit))*100)/100  + ", Mn"+plus;
      return (
        Math.round(RoundUptoOneDecimal(x / 1000000) * 100) / 100 + " M" + plus
      );
      // return Math.round((x/1000000)) + ", Mn+";
    }
    if (x < 1000000000000) {
      //return Math.round(Number((x/1000000000).toFixed(fixeddigit))*100)/100  + ", Bn"+plus;
      return (
        Math.round(RoundUptoOneDecimal(x / 1000000000) * 100) / 100 +
        " B" +
        plus
      );
      //  return Math.round((x/1000000000)) + ", Bn+";
    }
    return "1T+";
  } catch (e) {
    console.log(e);
  }
};
export const RoundUptoOneDecimal = (num) => {
  var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
  return with2Decimals;
};

export const convertDate = (date) => {
  let dateStr = "";
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  if (date) {
    let currDate = new Date(date * 1000);
    dateStr =
      currDate.getDate() +
      " " +
      months[currDate.getMonth()] +
      " " +
      currDate.getFullYear();
  }
  return dateStr;
};
