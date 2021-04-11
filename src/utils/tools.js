import moment from "moment";

export function setLocalStorage(val, name) {
  let type = typeof val;
  let date = moment(new Date()).format();
  let obj = {
    type,
    date,
    content: val
  };
  localStorage.setItem(name, JSON.stringify(obj));
}

export function getLocalStorage(name) {
  let content = JSON.parse(localStorage.getItem(name));
  if (content) {
    return content.content;
  } else {
    return null;
  }
}

export function removeLocalStorage(name) {
  localStorage.removeItem(name);
}

export function setSessionStorage(val, name) {
  let type = typeof val;
  let date = moment(new Date()).format();
  let obj = {
    type,
    date,
    content: val
  };
  sessionStorage.setItem(name, JSON.stringify(obj));
}

export function getSessionStorage(name) {
  let content = JSON.parse(sessionStorage.getItem(name));
  if (content) {
    return content.content;
  } else {
    return null;
  }
}

export function removeSessionStorage(name) {
  sessionStorage.removeItem(name);
}

export function timeFormate(value) {
  var theTime = parseInt(value); // 秒
  var middle = 0; // 分
  var hour = 0; // 小时

  if (theTime > 60) {
    middle = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (middle > 60) {
      hour = parseInt(middle / 60);
      middle = parseInt(middle % 60);
    }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (middle > 0) {
    result = "" + parseInt(middle) + "分" + result;
  }
  if (hour > 0) {
    result = "" + parseInt(hour) + "小时" + result;
  }
  return result;
}
