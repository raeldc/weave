<?php
$classes = $node['classes'];
?>

<<?= $node['element'] ?> class="<?= implode(' ', $classes) ?>">
    <?= $node['text'] ?>
</<?= $node['element'] ?>>
