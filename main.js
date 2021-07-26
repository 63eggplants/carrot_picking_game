// 1. 플레이 버튼을 누르면 게임 스탑 버튼으로 바뀌기
const playBtn = document.querySelector(".playBtn");

playBtn.addEventListener("click", () => {
  if (playBtn.classList.contains("start")) {
    playBtn.classList.remove("start");
    playBtn.classList.add("stop");
    playBtn.innerHTML = `
    <i class="fas fa-stop"></i>
    `;
  } else {
    playBtn.classList.remove("stop");
    playBtn.classList.add("start");
    playBtn.innerHTML = `
    <i class="fas fa-play"></i>
    `;
  }
});

// 2. 플레이 버튼을 누르면 카운터를 1초씩 줄이기, 스탑 버튼을 누르면 카운터를 멈추고 replay? 화면 보여주기

const timeCounter = document.querySelector(".timeCounter");

let time;
let timer;

playBtn.addEventListener("click", () => {
  if (playBtn.classList.contains("init")) {
    time = 10;
    playBtn.classList.remove("init");
    timeCounter.textContent = `0:${time--}`;
    timer = setInterval(() => {
      timeCounter.textContent = `0:${time--}`;
    }, 1000);
    // setTimeout(() => {
    //   clearInterval(timer);
    // }, 10000);
  } else if (playBtn.classList.contains("start")) {
    clearInterval(timer);
  } else if (
    playBtn.classList.contains("stop") &&
    !playBtn.classList.contains("init")
  ) {
    timer = setInterval(() => {
      timeCounter.textContent = `0:${time--}`;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
    }, (time + 1) * 1000);
  }
});
