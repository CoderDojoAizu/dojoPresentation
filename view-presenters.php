<?php
$file = 'presenters_list.json';
$presenters = [];

if (file_exists($file)) {
    $json_data = file_get_contents($file);
    $presenters = json_decode($json_data, true);
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>発表者一覧</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .presenter-list {
            list-style-type: none;
            padding: 0;
        }
        .presenter-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .presenter-item:last-child {
            border-bottom: none;
        }
        .presenter-number {
            display: inline-block;
            width: 30px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="section">
            <h1>発表者一覧</h1>
            <?php if (empty($presenters)): ?>
                <p>発表者リストが空です。</p>
            <?php else: ?>
                <ol class="presenter-list">
                    <?php foreach ($presenters as $index => $presenter): ?>
                        <li class="presenter-item">
                            <span class="presenter-number"><?php echo ($index + 1) . '.'; ?></span>
                            <?php echo htmlspecialchars($presenter); ?>
                        </li>
                    <?php endforeach; ?>
                </ol>
            <?php endif; ?>
        </div>
    </div><br>
    <a onclick="window.location.reload(true);">
	<i class="fa fa-refresh" aria-hidden="true"></i>
        <button class="reload_button">更新</button>
    </a>
    <footer class="footer">
        <p>© 2024 CoderDojo Aizu. All rights reserved.</p>
    </footer>
</body>
</html>