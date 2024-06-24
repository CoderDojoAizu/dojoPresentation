<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>プレゼン管理アプリ</title>

    <!-- リセットCSSの読み込み -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="section" id="presentationList">
            <h2>発表順序</h2>
            <ul id="presentersList"></ul>
            <textarea id="newPresenterNames" placeholder="新しい発表者名を1行に1人ずつ入力してください"></textarea>
            <div class="button-group">
                <button id="addPresenters">追加</button>
                <button id="clearList">クリア</button>
                <button id="saveList">保存</button>
                <button id="loadList">読込</button>
            </div><br>
            <a href="view-presenters.php" target="_blank">発表者一覧を表示</a>
        </div>
        
        <div class="section" id="timeInfo">
            <h2>時間情報</h2>
            <div class="time-display">
                <p>現在時刻: <span id="currentTime"></span></p><br>
                <p>発表まで: <span id="timeUntilPresentation"></span></p>
            </div>
            <input type="time" id="startTimeInput">
            <button id="setStartTime">開始時間設定</button>
        </div>
        
        <div class="section" id="presentationTimer">
            <h2>プレゼンタイマー</h2><br>
            <div class="time-display">
                <p>残り時間: <span id="remainingTime">00:00:00</span></p>
            </div>
            <input type="text" id="presentationTimeInput" placeholder="00:00:00">
            <button id="setTimer">時間設定</button><br>
            <button id="startTimer">スタート</button>
            <button id="resetTimer">リセット</button>
        </div>
    </div>
    <div class="guide">
        <a href="guide.html" target="blank"><button>アプリの使い方</button></a>
    </div>
    <footer class="footer">
        <p>© 2024 CoderDojo Aizu. All rights reserved.</p>
    </footer>
    
    <audio id="oneMinuteWarning" src="sound/preBell.mp3"></audio>
    <audio id="endTime" src="sound/endBell.mp3"></audio>

    <script src="js/main.js"></script>
</body>
</html>
