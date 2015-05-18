<?php
$colspan = function($device) use($nodes, $node) {
    $columns = $nodes[$node['parent']]['columns'];
    $colspan = $node['colspan'][$device];

    return $colspan * (12/(int)$columns);
};

$classes = is_array($node['classes']) ? $node['classes'] : array();
$classes = array_unique(array_merge($classes, array(
    $node['id'],
    'col-lg-'.$colspan('desktop'),
    'col-md-'.$colspan('laptop'),
    'col-sm-'.$colspan('tablet'),
    'col-xs-'.$colspan('phone')
)));

?>
<<?= $node['element'] ?> class="<?= implode(' ', $classes) ?>">
    <?php corebuilder_factory_render_children_html($node['children']) ?>
</<?= $node['element'] ?>>
