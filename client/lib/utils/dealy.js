// function delay(callback, timeout = 1000) {
//   setTimeout(callback, timeout);
// }

// delay(() => {
//   console.log("실행");

//   delay(() => {
//     console.log("실행2");
//   });
// });

import { getNode } from "../dom/getNode.js";

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

//Promise 비동기 API를 사용  Promise 를 리턴하는 방법
function delayP(shoudReject, timeout = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 지금은 우리가 직접 조건을 나눔, 원래는 api가 알아서 할 수 있음
      if (!shoudReject) {
        resolve("아싸 성공~!");
        //  onSuccess xhr API 와 같음
      } else {
        reject("실패!!");
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
    console.log(result);
    return delayP();
  })
  .then((result) => {
    console.log(result);
    return delayP();
  })
  .catch((err) => {
    console.log(err);
  });

// 자바스크립트는 위에서 아래로 읽어주는데 출력할 때 거의 한번에 실행한 것과 같은 출력,. 기다려주지않아..
// 비동기 작업 콜백과 promise 작업
first.style.top = "-100px";
first.style.transform = "rotate(350deg)";
first.style.top = "0px";
