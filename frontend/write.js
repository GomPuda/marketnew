const handleSubmitForm = async (event) => {
  event.preventDefault(); //리로드되는 서브밋 이벤트를 막는 문법
  const body = new FormData(form); //추가문법 필기
  //세계시간 기준
  body.append("insertAT", new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "POST",
      body, //변경요소
    });
    const data = await res.json();
    if (data == "200") window.location.pathname = "/";
  } catch (e) {
    console.error(e);
  }
};

const form = document.getElementById("write-form");
form.addEventListener("submit", handleSubmitForm);
