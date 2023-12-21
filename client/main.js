/*  global gsap */
import {
  taewook,
  insertLast,
  getNode as $,
  changeColor,
  renderUserCard,
  renderSpinner,
  delayP,
  renderEmptyCard,
  clearContents,
} from "./lib/index.js";

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

const END_POINT = "http://localhost:3000/users";
const userCardInner = $(".user-card-inner");

renderSpinner(userCardInner);

async function renderUserList() {
  try {
    await delayP(1000);
    gsap.to(".loadingSpinner", {
      opacity: 0,
      onComplete() {
        $(".loadingSpinner").remove();
      },
    });

    const response = await taewook.get(END_POINT);
    const userData = response.data;
    // console.log(userData);

    /**
     *
     * userData.id  userData.name 이런걸 구조부해한거
     */
    // userData.forEach(({ id, name, emial,"" website }) => {
    //   renderUserList(userCardInner,data)

    // });

    userData.forEach((data) => {
      renderUserCard(userCardInner, data);
    });
    changeColor(".user-card");

    gsap.from(".user-card", {
      x: 100,
      opacity: 0,
      stagger: 0.1,
    });
  } catch (err) {
    console.log(err);
    // insertLast("body", "에러다");
    renderEmptyCard(userCardInner);
  }
}
renderUserList();

//article 을 왜 찾냐고 data-index = 'user-1'
// delete 통신은 user의 id 를 입력해야 지워지니깐
// 버튼을 눌렀을 때 지워야하니깐 id를 얻어야함
function handleDelete(e) {
  const button = e.target.closest("button");
  const article = e.target.closest("article");
  //버튼이 아니거나 , article이 아니거나 하면 적용되면 안되니깐 return
  // 메일같은 버튼은 작동 되야 하니깐
  if (!article || !button) return;
  const id = article.dataset.index.slice(5);
  taewook.delete(`${END_POINT}/${id}`).then(() => {
    clearContents(userCardInner);
    renderUserList();
  });
  //헤더에서 보면 확인가능
}

//삭제 버튼 누르고 아이디 찾아서 삭제할건데 삭제 버튼이 많아서
// 이벤트 위임으로 한다.
userCardInner.addEventListener("click", handleDelete);

const createButton = $(".create");
const cancelButton = $(".cancel");
const doneButton = $(".done");

function handleCreate() {
  gsap.to(".pop", { autoAlpha: 1 });
}

function handleCancel(e) {
  e.stopPropagation();
  // 이벤트 버블링 .pop 위에 button 으로 부모로도 이벤트 적용됨
  gsap.to(".pop", { autoAlpha: 0 });
}

function handleDone(e) {
  // e.stopPropagation();
  // 이거는 stop은 버블링을 막는거지 내가 클릭한 이벤트를 막는건아님
  e.preventDefault();
  //submit 을 막은거임

  const name = $("#nameField").value;
  const email = $("#emailField").value;
  const website = $("#siteField").value;

  const obj = {
    name,
    email,
    website,
  };
  taewook.post(END_POINT, obj).then(() => {
    clearContents();
    renderUserList();
  });
}

createButton.addEventListener("click", handleCreate);
cancelButton.addEventListener("click", handleCancel);
doneButton.addEventListener("click", handleDone);
