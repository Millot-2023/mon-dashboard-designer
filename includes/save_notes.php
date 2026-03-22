<?php
if (isset($_POST['content'])) {
    $path = dirname(__DIR__) . '/data/notes.txt';
    file_put_contents($path, $_POST['content']);
    echo "OK";
}