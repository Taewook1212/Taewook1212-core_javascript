/* global gsap*/
// 쥐샵도 그냥 import로 가져와도 되지만 경로가 복잡해서 그냥 script로
import jujeobData from "./data/data.js";
import {
  getNode,
  getRandom,
  isNumbericString,
  showAlert,
  shake,
  insertLast,
  clearContents,
  copy,
} from "./lib/index.js";

// [phase-1]
// 1. 주접 떨기 버튼을 클릭할 수 있는 핸들러를 연결해 주세요.
// 2. nameField에 있는 값을 가져와 주세요.

const result = getNode(".result");
const submit = getNode("#submit");
const nameField = getNode("#nameField");

function handleSubmit(e) {
  e.preventDefault();
  const name = nameField.value;
  const list = jujeobData(name);
  const pick = jujeobData(name)[getRandom(list.length)];

  if (!name || name.replace(/\s*/g, "") === "") {
    console.log("제대로 된 이름을 입력해주세요.");

    showAlert(".alert-error", "이름을 입력해주세요!");

    shake.restart();
    return;
  }

  if (!isNumbericString(name)) {
    showAlert(".alert-error", "제대로된 이름을 입력해주세요.", 2000);
  }
  clearContents(result);
  insertLast(result, pick);
}

function handleCopy() {
  const text = result.textContent;
  if (nameField.value) {
    // Promiss가 리턴됨. 비동기. then() 콜백함수. 실패하면 Alert 안보냄
    copy(text).then(() => {
      showAlert(".alert-success", "클립보드 복사 완료!!");
    });
  }
}

submit.addEventListener("click", handleSubmit);
result.addEventListener("click", handleCopy);
