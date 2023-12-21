const END_POINT = "https://jsonplaceholder.typicode.com/users";

const defaultOptions = {
  method: "GET",
  body: null,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

//util 함수 만들기
export const taewook = async (options) => {
  //fetch는 기본적으로 url이 들어와야해서 구조분해로 따로 빼놓음
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  };
  const response = await fetch(url, restOptions);
  //   restOptions 의 option 을 생략가능 생략하면 GET방식 넣으면 POST방식
  //   console.log(url);
  //   console.log(restOptions);
  // console.log(response);
  //ok:true 나옴
  if (response.ok) {
    //response.data 키를 만듬 변수로 해도 되지만 그냥 이걸로
    response.data = await response.json();
  }
  return response;

  //   console.log(await response.json());
};
// taewook(END_POINT);
//fetch를 쓸 때는 pase를 안해도 된다. 알아서 json으로 파싱해주기 떄문이다. 최신기술
//json 은 내부적으로 promise를 리턴하고있구나.
//await은 promise의 Promiseresult값을 가져온다.
//await 대신에 then 으로도 promiseresult값을 가져옴

// taewook({
//   url: END_POINT,
//   method: "GET",
//   body: { name: "taewook" },
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// const data = taewook({ url: END_POINT });
// console.log(await data);

//
// 개량버전
//

// taewook.get();
// taewook.post();
// taewook.put();
// taewook.delete();

taewook.get = (url, options) => {
  return taewook({
    url,
    ...options,
  });
};

taewook.post = (url, body, options) => {
  return taewook({
    method: "POST",
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

taewook.delete = (url, options) => {
  return taewook({
    method: "DELETE",
    url,
    ...options,
  });
};

taewook.put = (url, body, options) => {
  return taewook({
    method: "PUT",
    url,
    body: JSON.stringify(body),
    ...options,
  });
};
