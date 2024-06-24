<?php
$file = 'presenters_list.json';

if (file_exists($file)) {
    $json_data = file_get_contents($file);
    $presenters = json_decode($json_data, true);
    
    if ($presenters !== null) {
        header('Content-Type: application/json');
        echo json_encode($presenters);
    } else {
        echo json_encode(array('error' => 'ファイルの解析中にエラーが発生しました。'));
    }
} else {
    echo json_encode(array('error' => 'ファイルが見つかりません。'));
}
?>
