const playBtn = document.querySelector(".playBtn");
const timeCounter = document.querySelector(".timeCounter");
const numCounter = document.querySelector(".numCounter");
const resultContainer = document.querySelector(".result-container");
const resultTitle = document.querySelector(".result__title");
const replayBtn = document.querySelector(".replayBtn");

const field = document.querySelector(".field");
const carrots = document.querySelectorAll(".carrot");
const carrot = document.querySelector(".carrot");
const bugs = document.querySelectorAll(".bug");
const bug = document.querySelector(".bug");

let time;
let timer;
let num;

const fieldWidth = 1000;
const fieldHeight = 300;
const carrotWidth = 80;
const carrotHeight = 80;
const bugWidth = 50;
const bugHeight = 50;

function initSet() {
  //   class 세팅
  playBtn.classList.remove("init");
  playBtn.classList.remove("invisible");
  playBtn.classList.remove("start");
  playBtn.classList.add("stop");
  field.classList.remove("invisible");
  resultContainer.classList.add("invisible");

  // playBtn 세팅
  playBtn.innerHTML = `
      <i class="fas fa-stop"></i>
      `;

  // timeCounter 세팅
  time = 10;
  timeCounter.textContent = `0:${time--}`;
  timer = setInterval(() => {
    if (time === 0) {
      showResult("YOU LOSE");
    }
    timeCounter.textContent = `0:${time--}`;
  }, 1000);

  // numCounter 세팅
  num = 10;
  numCounter.textContent = num;

  // 당근, 벌레 세팅

  carrots.forEach(carrot => {
    carrot.style.transform = `translate(${
      Math.random() * (fieldWidth - carrotWidth)
    }px, ${Math.random() * (fieldHeight - carrotHeight)}px)`;

    carrot.style.display = "inline";
  });

  bugs.forEach(bug => {
    bug.style.transform = `translate(${
      Math.random() * (fieldWidth - bugWidth)
    }px, ${Math.random() * (fieldHeight - bugHeight)}px)`;
  });
}

function showResult(result) {
  clearInterval(timer);
  playBtn.classList.add("invisible");
  resultTitle.textContent = `${result}`;
  resultContainer.classList.remove("invisible");
}
// playBtn 이벤트
playBtn.addEventListener("click", () => {
  if (
    //   처음 시작

    playBtn.classList.contains("start") &&
    playBtn.classList.contains("init")
  ) {
    initSet();
  } else if (
    // 일시정지
    playBtn.classList.contains("stop")
  ) {
    playBtn.classList.remove("stop");
    playBtn.classList.add("start");
    playBtn.innerHTML = `
      <i class="fas fa-play"></i>
      `;
    showResult("REPLAY?");
  } else if (
    //   일시정지에서 재개

    playBtn.classList.contains("start") &&
    !playBtn.classList.contains("init")
  ) {
    resultContainer.classList.add("invisible");
    playBtn.classList.remove("start");
    playBtn.classList.add("stop");

    playBtn.innerHTML = `
      <i class="fas fa-stop"></i>
      `;

    timer = setInterval(() => {
      if (time === 0) {
        showResult("YOU LOSE");
      }
      timeCounter.textContent = `0:${time--}`;
    }, 1000);
  }
});

// replayBtn 이벤트
replayBtn.addEventListener("click", () => {
  initSet();
});

// 당근, 벌레에 click 이벤트 추가
field.addEventListener("click", event => {
  if (event.target.tagName !== "IMG") {
    return;
  }
  console.dir(event.target);
  if (event.target.classList.contains("carrot")) {
    numCounter.textContent = `${--num}`;
    const id = event.target.dataset.id;
    const pickedCarrot = document.querySelector(`.carrot[data-id="${id}"]`);
    pickedCarrot.style.display = "none";

    if (num === 0) {
      showResult("YOU WON");
    }
  } else if (event.target.classList.contains("bug")) {
    showResult("YOU LOSE");
  }
});
