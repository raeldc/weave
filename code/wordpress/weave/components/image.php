<?php
if (empty($node['classes'])) {
    $node['classes'] = array();
}
if (empty($node['attributes']['src'])) {
    $node['attributes']['src'] = '#';
}

$classes = array_unique(array_merge($node['classes'], array($node['id'])));
?>
<img class="<?= implode(' ', $classes) ?>" src="<?= $node['attributes']['src'] ?>" />
