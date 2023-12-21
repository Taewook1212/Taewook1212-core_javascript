import { taewook, insertLast, getNode as $ } from "./lib/index.js";

// xhrPromise.get("https://jsonplaceholder.typicode.com/users").then((res) => {
//   res.forEach((item) => {
//     insertLast(document.body, `<div>${item.name}</div>`);
//     // console.log(item.name);
//   });
// });

// [phase-1]

// 1. user 데이터를 fetch 해주세요.
// 2. 함수안에 넣기
// 3. 유저 데이터 (이름만) 화면에 랜더링

const END_POINT = "https://jsonplaceholder.typicode.com/users";

async function renderUserList() {
  const response = await taewook.get(END_POINT);
  const userData = response.data;
  //   console.log();
  // insertLast(".first", `<div>${user}</div>`);

  userData.forEach((item) => {
    item.name;
    insertLast(".user-card-inner", item.name);
  });
}

renderUserList();
