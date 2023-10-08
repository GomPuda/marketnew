const calcTime = (timestamp) => {
  //UTC 한국 9시간 ->세계 시간 기준으로 맞추기
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 10) return `${second}초 전`;
  else "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const itemListInfoDiv = document.createElement("div");
    itemListInfoDiv.className = "item-list__info";

    const itemListInfoTitleDiv = document.createElement("div");
    itemListInfoDiv.className = "item-list__info-title";
    itemListInfoTitleDiv.innerText = obj.title;

    const itemListINfoMetaDiv = document.createElement("div");
    itemListINfoMetaDiv.className = "item-list__info-meta";
    itemListINfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAT);

    const itemListInfoPriceDiv = document.createElement("div");
    itemListInfoPriceDiv.className = "item-list__info-price";
    itemListInfoPriceDiv.innerText = obj.price;

    imgDiv.appendChild(img);
    itemListInfoDiv.appendChild(itemListInfoTitleDiv);
    itemListInfoDiv.appendChild(itemListINfoMetaDiv);
    itemListInfoDiv.appendChild(itemListInfoPriceDiv);
    div.appendChild(imgDiv);
    main.appendChild(div);
    div.appendChild(itemListInfoDiv);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  let main = document.querySelector("main");
  main = "";
  renderData(data);
};

fetchList();

// 필기
// <div class="item-list">
//   <div class="item-list__img">
//     <img src="a/image.svg" alt="이미지" />
//   </div>
//   <div class="item-list__info">
//     <div class="item-list__info-title">게이밍 pc 팝니다.</div>
//     <div class="item-list__info-meta">역삼동 19초전</div>
//     <div class="item-list__info-price">100만원</div>
//   </div>
// </div>; 참고해서 적기

// 필기
