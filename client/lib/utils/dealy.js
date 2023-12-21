import { getNode } from "../dom/getNode.js";
import { insertLast } from "../dom/insert.js";
import { isNumber, isObject } from "./typeOf.js";
import { xhrPromise } from "./xhr.js";

// function delay(callback, timeout = 1000) {
//   setTimeout(callback, timeout);
// }

// delay(() => {
//   console.log("실행");

//   delay(() => {
//     console.log("실행2");
//   });
// });

// 이상원, 박수양, 조윤주, 정현주, 박주현

function delay(callback, timeout = 1000) {
  setTimeout(callback, timeout);
}

const first = getNode(".first");
const second = getNode(".second");

// 콜백지옥
// delay(() => {
//   first.style.top = "-100px";

//   delay(() => {
//     first.style.transform = "rotate(360deg)";
//     delay(() => {
//       first.style.top = "0px";
//     });
//   });
// });

//인자에 안넣고 이렇게 디폴트값을로 뺀 이유는 나중에 코드가 커질 때
// 다른 곳에서 디폴트값들을 쓸 수 있어서 빼놓은것
// mixin 패턴은 따로 있음
const defaultOptions = {
  shouldReject: false,
  timeout: 1000,
  data: "아싸성공",
  errorMessage: "알 수 없는 오류가 발생했습니다.",
};

//Promise 비동기 API를 사용  Promise 를 리턴하는 방법
function delayP(options) {
  let config = { ...defaultOptions };

  if (isNumber(options)) {
    // timeout = options; 해도 되는데 지금 아래에 구조분해를해서 지금은 안됨
    config.timeout = options;
  }

  if (isObject(options)) {
    // 객체가 들어오면 객체 추가
    config = { ...defaultOptions, ...options };
  }

  const { shouldReject, data, errorMessage, timeout } = config;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 지금은 우리가 직접 조건을 나눔, 원래는 api가 알아서 할 수 있음
      if (!shouldReject) {
        resolve(data);
        //  onSuccess xhr API 와 같음
      } else {
        reject(errorMessage);
        //  onFail xhr API 와 같음
      }
    }, timeout);
  });
}

// console.log(delayP(true));
// console.log(delayP());
/**
 * 초기는 pending 이라뜸
 * PromiseState state : fulfiled
 * result : '아싸 성공~!'
 *
 */

/**
 * Promise {<pending>}
[[Prototype]]
: 
Promise
[[PromiseState]]
: 
"rejected"
[[PromiseResult]]
: 
"실패!!"
 *
 */
// 축약버전
// delayP(false).then(console.log());
// then메서드를 갖고있는 Promise api 객체를 then이 또 리턴해줘서 이어서 then을 쓸 수 있음
// 그리고 resolve또는 reject를 사용해야함. return으로 resolve와 reject를 갖고있는 위에 delayP()를 호출
delayP(false)
  .then((result) => {
    // console.log(result);
    return delayP();
  })
  .then((result) => {
    // console.log(result);
    return delayP();
  })
  .catch((err) => {
    // console.log(err);
  });

// 자바스크립트는 위에서 아래로 읽어주는데 출력할 때 거의 한번에 실행한 것과 같은 출력,. 기다려주지않아..
// 비동기 작업 콜백과 promise 작업
first.style.top = "-100px";
first.style.transform = "rotate(350deg)";
first.style.top = "0px";

/**
 * async - 함수가 promise 객체를 반환 하도록
 *       - await 사용 -> promise 객체
 * await - 코드의 실행 흐름 제어 (멈춤)
 *       - result 값 가져오기
 *
 *
 */

async function delayA(data) {
  return data;
}

const value = await delayA("이슬기나");

// console.log(value);

// value.then((res) => {
//   console.log(res);
// });

// console.log(value);

async function 라면끓이기() {
  const 물 = await delayP({ data: "물" });
  console.log(물);

  const 스프 = await delayP({ data: "스프" });
  console.log(스프);

  const 면 = await delayP({ data: "면" });
  console.log(면);

  const 그릇 = await delayP({ data: "그릇" });
  console.log(그릇);

  // delayP({data:'물'})
  // .then((res)=>{
  //   console.log( res );
  //   return delayP({data:'스프'})
  // })
  // .then((res)=>{
  //   console.log( res );
  //   return delayP({data:'면넣기'})
  // })
  // .then((res)=>{
  //   console.log( res );
  //   return delayP({data:'그릇에담기'})
  // })
  // .then((res)=>{
  //   console.log( res );
  // })
  // console.log('물넣기');
  // console.log('스프넣기');
  // console.log('면넣기');
  // console.log('그릇에담기');
}
// 라면끓이기();

async function getData() {
  const data = await xhrPromise.get("https://pokeapi.co/api/v2/pokemon/3");
  //  get으로 받아오면 promise 객체가 나오니깐 await  가능

  insertLast(
    document.body,
    `<img src="${data.sprites["front_default"]}",alt="둑침붕"></img>`
  );

  console.log(data.sprites["front_default"]);
}
// getData();

// 함수 밖에서는 async 안해도 됨
// await xhrPromise.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
