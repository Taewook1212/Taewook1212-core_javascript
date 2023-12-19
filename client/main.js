import {
  diceAnimation,
  getNodes,
  getNode,
  insertLast,
  clearContents,
  endScroll,
  memo,
} from "./lib/index.js";

const [rollingButton, recordButton, resetButton] = getNodes(
  ".buttonGroup > button"
);
const recordListWrapper = getNode(".recordListWrapper");

let count = 0;
let total = 0;

function creatItem(value) {
  const template = ` 
  <tr>
  <td>${++count}</td>
  <td>${value}</td>
  <td>${(total += value)}</td>
</tr>
  `;
  return template;
}

function renderRecordItem() {
  const diceValue = memo("cube").dataset.dice / 1;

  insertLast(".recordList tbody", creatItem(diceValue));
  endScroll(recordListWrapper);
}

const handleRollingDice = (() => {
  let isCLicked = false;
  let stopAnimation;

  return () => {
    //두번 클릭했을 때 중지 toggle 구현
    if (!isCLicked) {
      //실행
      stopAnimation = setInterval(diceAnimation, 100);
      recordButton.disabled = true;
      resetButton.disabled = true;
    } else {
      // 정지
      clearInterval(stopAnimation);
      recordButton.disabled = false;
      resetButton.disabled = false;
    }
    isCLicked = !isCLicked;
  };
})();

function handleRecord() {
  recordListWrapper.hidden = false;

  renderRecordItem();
}

function handleReset() {
  recordListWrapper.hidden = true;

  clearContents(getNode("tbody"));
  count = 0;
  total = 0;
}

//속성과 프로퍼티에서 hidden 처럼 값만 false나 true로 해주면 추가 제거 가능
rollingButton.addEventListener("click", handleRollingDice);
recordButton.addEventListener("click", handleRecord);
resetButton.addEventListener("click", handleReset);
