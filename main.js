const playBtn = document.querySelector(".playBtn");
const timeCounter = document.querySelector(".timeCounter");
const numCounter = document.querySelector(".numCounter");
const result = document.querySelector(".result");
const resultTitle = document.querySelector(".result__title");
const replayBtn = document.querySelector(".replayBtn");
const carrots = document.querySelectorAll(".carrot");
const carrot = document.querySelector(".carrot");
const field = document.querySelector(".field");

let time;
let timer;
let num;

// playBtn 이벤트
playBtn.addEventListener("click", () => {
  if (
    //   처음 시작
    playBtn.classList.contains("start") &&
    playBtn.classList.contains("init")
  ) {
    //   class 세팅
    playBtn.classList.remove("init");
    playBtn.classList.remove("start");
    playBtn.classList.add("stop");

    // html 세팅
    playBtn.innerHTML = `
    <i class="fas fa-stop"></i>
    `;

    // timeCounter 세팅
    time = 10;
    timeCounter.textContent = `0:${time--}`;
    timer = setInterval(() => {
      if (time === 0) {
        clearInterval(timer);
        playBtn.classList.add("invisible");
        resultTitle.textContent = "YOU LOSE";
        result.classList.remove("invisible");
        playBtn.classList.add("init");
      }
      timeCounter.textContent = `0:${time--}`;
    }, 1000);

    // numCounter 세팅
    num = 10;
    numCounter.textContent = num;
  } else if (
    // 일시정지
    playBtn.classList.contains("stop")
  ) {
    playBtn.classList.remove("stop");
    playBtn.classList.add("start");
    playBtn.innerHTML = `
    <i class="fas fa-play"></i>
    `;

    clearInterval(timer);
    resultTitle.textContent = "REPLAY?";
    result.classList.remove("invisible");
  } else if (
    playBtn.classList.contains("start") &&
    !playBtn.classList.contains("init")
  ) {
    //   일시정지에서 재개
    result.classList.add("invisible");
    playBtn.classList.remove("start");
    playBtn.classList.add("stop");

    playBtn.innerHTML = `
    <i class="fas fa-stop"></i>
    `;

    timer = setInterval(() => {
      if (time === 0) {
        clearInterval(timer);
        playBtn.classList.add("invisible");
        resultTitle.textContent = "YOU LOSE";
        result.classList.remove("invisible");
        playBtn.classList.add("init");
        // 여기에 YOU LOSE 나타나도록 작성
      }
      timeCounter.textContent = `0:${time--}`;
    }, 1000);
  }
});

// replayBtn 이벤트
replayBtn.addEventListener("click", () => {
  //   class 세팅
  playBtn.classList.remove("invisible");
  result.classList.add("invisible");
  playBtn.classList.remove("start");
  playBtn.classList.add("stop");

  // html 세팅
  playBtn.innerHTML = `
        <i class="fas fa-stop"></i>
        `;

  // timeCounter 세팅
  time = 10;
  timeCounter.textContent = `0:${time--}`;
  timer = setInterval(() => {
    if (time === 0) {
      clearInterval(timer);
      playBtn.classList.add("invisible");
      resultTitle.textContent = "YOU LOSE";
      result.classList.remove("invisible");
      playBtn.classList.add("init");
    }
    timeCounter.textContent = `0:${time--}`;
  }, 1000);
});

// 당근, 벌레 랜덤 배치
addEventListener("load", () => {
  const fieldWidth = field.offsetWidth;
  const fieldHeight = field.offsetHeight;
  const carrotWidth = carrot.width;
  const carrotHeight = carrot.height;

  carrots.forEach(carrot => {
    carrot.style.transform = `translate(${
      Math.random() * (fieldWidth - carrotWidth)
    }px, ${Math.random() * (fieldHeight - carrotHeight)}px)`;
  });
});
