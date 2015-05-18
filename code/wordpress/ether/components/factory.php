<?php

function corebuilder_factory_render_html($node)
{
    static $nodes;

    if(is_null($nodes)) {
        $nodes = get_option(get_stylesheet().'_nodes', array());
    }

    if(isset($nodes[$node]))
    {
        $node = $nodes[$node];

        if(!isset($node['children'])) {
            $node['children'] = array();
        }

        @include __DIR__.'/'.$node['component'].'.php';
    }
}

function corebuilder_factory_render_children_html($children)
{
    if(is_array($children))
    {
        foreach($children as $child) {
            corebuilder_factory_render_html($child);
        }
    }
}
