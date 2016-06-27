<?php
if(empty($node['classes'])) {
    $node['classes'] = array();
}
$classes = array_unique(array_merge($node['classes'], array('row', $node['id'])));
?>
<<?= $node['element'] ?> class="<?= implode(' ', $classes) ?>">
    <?php corebuilder_factory_render_children_html($node['children']) ?>
</<?= $node['element'] ?>>
