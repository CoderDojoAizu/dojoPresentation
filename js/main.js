// Sortable.jsを使用してリストを並び替え可能にする
const sortable = new Sortable(document.getElementById("presentersList"), {
  animation: 150,
  ghostClass: "blue-background-class",
  onSort: updatePresenterNumbers,
});

// 発表者番号を更新する関数
function updatePresenterNumbers() {
  const presenters = document.querySelectorAll("#presentersList .list-item");
  presenters.forEach((presenter, index) => {
    presenter.querySelector(".presenter-number").textContent = index + 1;
  });
}

// 削除ボタンの機能を実装
document
  .getElementById("presentersList")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      e.target.closest(".list-item").remove();
      updatePresenterNumbers();
    }
  });

// 発表者追加ボタンの機能
document.getElementById("addPresenters").addEventListener("click", function () {
  const newPresenterNames = document
    .getElementById("newPresenterNames")
    .value.trim()
    .split("\n");
  newPresenterNames.forEach((name) => {
    if (name.trim()) {
      const newItem = document.createElement("li");
      newItem.className = "list-item";
      const presentersCount = document.querySelectorAll(
        "#presentersList .list-item"
      ).length;
      newItem.innerHTML = `<span><span class="presenter-number">${
        presentersCount + 1
      }</span>. ${name.trim()}</span><button class="delete-btn">×</button>`;
      document.getElementById("presentersList").appendChild(newItem);
    }
  });
  document.getElementById("newPresenterNames").value = "";
  updatePresenterNumbers();
});

// リストをクリアする機能を追加
document.getElementById("clearList").addEventListener("click", function () {
  if (confirm("発表者リストをクリアしてもよろしいですか？")) {
    document.getElementById("presentersList").innerHTML = "";
  }
});

// リストを保存する機能を追加
document.getElementById("saveList").addEventListener("click", function () {
  const presenters = Array.from(
    document.querySelectorAll("#presentersList .list-item")
  ).map((item) => {
    return item.querySelector("span").textContent.split(". ")[1];
  });

  fetch("save-list.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(presenters),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("リストの保存中にエラーが発生しました。");
    });
});

// リストを読み込む機能を追加
document.getElementById("loadList").addEventListener("click", function () {
  fetch("load-list.php")
    .then((response) => response.json())
    .then((presenters) => {
      document.getElementById("presentersList").innerHTML = "";
      presenters.forEach((name, index) => {
        const newItem = document.createElement("li");
        newItem.className = "list-item";
        newItem.innerHTML = `<span><span class="presenter-number">${
          index + 1
        }</span>. ${name}</span><button class="delete-btn">×</button>`;
        document.getElementById("presentersList").appendChild(newItem);
      });
      updatePresenterNumbers();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("リストの読み込み中にエラーが発生しました。");
    });
});

// 時間管理の機能
let startTime = null;

function updateCurrentTime() {
  const now = new Date();
  document.getElementById("currentTime").textContent = now.toLocaleTimeString();
  updateTimeUntilPresentation(now);
}

function updateTimeUntilPresentation(now) {
  if (startTime) {
    const timeDiff = startTime - now;
    if (timeDiff > 0) {
      const hours = Math.floor(timeDiff / 3600000);
      const minutes = Math.floor((timeDiff % 3600000) / 60000);
      const seconds = Math.floor((timeDiff % 60000) / 1000);
      document.getElementById("timeUntilPresentation").textContent = `${String(
        hours
      ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    } else {
      document.getElementById("timeUntilPresentation").textContent = "00:00:00";
    }
  } else {
    document.getElementById("timeUntilPresentation").textContent = "00:00:00";
  }
}

document.getElementById("setStartTime").addEventListener("click", function () {
  const inputTime = document.getElementById("startTimeInput").value;
  if (inputTime) {
    const [hours, minutes] = inputTime.split(":");
    const now = new Date();
    startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
    if (startTime < now) {
      startTime.setDate(startTime.getDate() + 1);
    }
  }
});

// 1秒ごとに時間を更新
setInterval(updateCurrentTime, 1000);

// 初期表示のために即時実行
updateCurrentTime();

// プレゼンタイマーの機能
let presentationTime = 0;
let remainingTime = 0;
let timerInterval = null;
const oneMinuteWarning = document.getElementById("oneMinuteWarning");
const endTime = document.getElementById("endTime");

function updateRemainingTime() {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  document.getElementById("remainingTime").textContent = `${String(
    hours
  ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  if (remainingTime === 30) {
    oneMinuteWarning.play();
  } else if (remainingTime === 0) {
    endTime.play();
  }
}

document.getElementById("setTimer").addEventListener("click", function () {
  const input = document.getElementById("presentationTimeInput").value;
  const match = input.match(/^(\d{2}):(\d{2}):(\d{0,2})$/);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const seconds = match[3] ? parseInt(match[3]) : 0;
    presentationTime = hours * 3600 + minutes * 60 + seconds;
    remainingTime = presentationTime;
    updateRemainingTime();
  } else {
    alert("正しい形式で時間を入力してください（HH:MM:SS）");
  }
});

document.getElementById("startTimer").addEventListener("click", function () {
  if (remainingTime > 0 && !timerInterval) {
    timerInterval = setInterval(function () {
      if (remainingTime > 0) {
        remainingTime--;
        updateRemainingTime();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }, 1000);
  }
});

document.getElementById("resetTimer").addEventListener("click", function () {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = presentationTime;
  updateRemainingTime();
});
