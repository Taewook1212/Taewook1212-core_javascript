// console.log(xhr);

// 둘다 따로 놀아. 통신이 이행되기 전에 response가 실행되서 정보가 제대로 안나옴
//방법 비동기작업
//1.콜백, 2.promise

/* 

[readyState]

0: uninitialized
1: loading
2: loaded
3: interactive
4: complete

*/

// 비동기 통신을 해보자!  XMLHttpRequest

/* -------------------------------------------- */
/*                 XHR callback                 */
/* -------------------------------------------- */

// 원래는 인자로 parameter를 받을텐데 이것도 받음과 동시에 구조분해로 인자를 받음
function xhr({
  method = "GET",
  url = "",
  onSuccess = null,
  onFail = null,
  body = null,
  headers = {
    //    "Content-type": "application/json", 의미는 json으로 보낸다는 의미
    "Content-type": "application/json",
    //   "Access-Control-Allow-Origin": "*", 접근권한 모든것을 을 서버에 요청함, 근데 줄 의무가 없다, client와 server둘다 모든 권한을 해야함, 근데 우선 우리는 권한을 풀었어. 나중에 server가 권한을 풀고 데이터를 줄 때 푼다.
    "Access-Control-Allow-Origin": "*",
  },
}) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
    // 헤더에 key왜 value로 구성되어있어서 이렇게 보냄
  });

  xhr.addEventListener("readystatechange", () => {
    const { readyState, status, response } = xhr;
    if (readyState === 4) {
      console.log("통신완료");
      if (status >= 200 && status < 400) {
        console.log("통신성공");
        // console.log(xhr);
        // console.log(JSON.parse(response));
        // console.log(typeof response);

        //서버에서 우리한테 응답으로 { } 객체로 보내니깐
        onSuccess(JSON.parse(response));
      } else {
        console.log("통신실패!!");
        onFail({ messaege: "에러가 나왔어." });
      }
    }
  });

  // 데이터를 보낼땐 stringify 받을때는 parse
  xhr.send(JSON.stringify(body));

  // send 는 open 다음으로 아무곳이나 위치해도 됨
}
//인자로 하나하나 안받고, 객체로 받는다. 콜백함수가 길어지니깐
// xhr("GET", "https://jsonplaceholder.typicode.com/users", () => {});

// xhr({
//   method: "POST",
//   url: "https://jsonplaceholder.typicode.com/users",
//   onSuccess(data) {
//     console.log(data);
//   },
//   onFail(err) {
//     // console.log(err);
//   },
//   body: { name: "tiger" },
// });

// 1. 메서드로 호출하기
// xhr을 이미 함수로 만들어서 xhr.get() 에 get은 메서드로안될텐데, 왜냐면 xhr은 객체가 아니어서

//Key (url, onSuccess, onFail)
/**
 * Vlaue
 *   xhr({
    url,
    onSuccess,
    onFail,
  });
 */
xhr.get = (url, onSuccess, onFail) => {
  xhr({
    // method get은 어차피 생략하니깐?
    // url:url,
    // onSuccess:onSuccess,
    // onFail:onFail,
    url,
    onSuccess,
    onFail,
  });
};

xhr.post = (url, body, onSuccess, onFail) => {
  xhr({
    // method get은 어차피 생략하니깐?
    // url:url,
    // onSuccess:onSuccess,
    // onFail:onFail,
    method: "POST",
    url,
    body,
    onSuccess,
    onFail,
  });
};

xhr.put = (url, body, onSuccess, onFail) => {
  xhr({
    method: "PUT",
    url,
    body,
    onSuccess,
    onFail,
  });
};

xhr.delete = (url, body, onSuccess, onFail) => {
  xhr({
    method: "DELETE",
    url,
    onSuccess,
    onFail,
  });
};
// xhr.post()

// xhr.delete()

// 함수이면서 객체
// console.dir(xhr);

// xhr.get(
//   "https://jsonplaceholder.typicode.com/users",
//   (data) => {
//     console.log(data);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

/* -------------------------------------------- */
/*                XHR Promise API               */
/* -------------------------------------------- */

const defaultOptions = {
  method: "GET",
  url: "",
  body: null,
  errorMessage: "서버와의 통신이 원할하지 않습니다.",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export function xhrPromise(options) {
  // const config = { ...defaultOptions, ...options };
  // const { method, url, body, data, errorMessage } = config;

  const { method, url, body, errorMessage, headers } = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
    // 헤더가 인자로 전달되면 깊은복사
  };

  // const { method, url, body } = options;
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });

  xhr.send(JSON.stringify(body));

  return new Promise((resolve, reject) => {
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({ message: errorMessage });
        }
      }
    });
  });
}

// xhrPromise({
//   url: "https://jsonplaceholder.typicode.com/users",
// }).then((res) => {
//   console.log(res);
// });

xhrPromise.get = (url) => {
  return xhrPromise({ url });
};

xhrPromise.post = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: "POST",
  });
};

xhrPromise.put = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: "PUT",
  });
};

xhrPromise.delete = (url) => {
  return xhrPromise({
    url,
    method: "DELETE",
  });
};
