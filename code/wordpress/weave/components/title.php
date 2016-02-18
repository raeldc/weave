<?php
$classes = is_array($node['classes']) ? $node['classes'] : array();
$classes = array_unique(array_merge($classes, array($node['id'])));
?>

<<?= $node['element'] ?> class="<?= implode(' ', $classes) ?>">
    <?= $node['text'] ?>
</<?= $node['element'] ?>>
