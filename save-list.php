<?php
// POSTリクエストからJSONデータを取得
$json_data = file_get_contents('php://input');
$presenters = json_decode($json_data, true);

if ($presenters !== null) {
    // JSONデータをファイルに保存
    $file = 'presenters_list.json';
    if (file_put_contents($file, json_encode($presenters, JSON_PRETTY_PRINT))) {
        echo "リストが正常に保存されました。";
    } else {
        echo "リストの保存中にエラーが発生しました。";
    }
} else {
    echo "無効なデータです。";
}
?>
