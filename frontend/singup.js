const form = document.querySelector("#signup-form");

const checkPasssword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");

  if (password1 === password2) {
    return true;
  } else return false;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256password = sha256(formData.get("password"));
  formData.set("password", sha256password);

  const div = document.querySelector("#info");
  if (checkPasssword()) {
    div.innerText = "회원가입이 완료되었습니다";
    div.style.color = "blue";
    const res = await fetch("/signup", {
      method: "post",
      body: formData,
    });
  } else {
    div.innerHTML = "비밀번호가 같지 않습니다.";
    div.style.color = "red";
    form.appendChild(div);
  }
};

form.addEventListener("submit", handleSubmit);
