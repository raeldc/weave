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
// refactor the next two functions later

function to_css_declaration($property, $value) {
    $ret = '';
    for($a = 0, $length = strlen($property); $a < $length; $a++) {
        if (ctype_upper($property[$a])) {
            $ret .= '-' . strtolower($property[$a]);
        } else {
            $ret .= $property[$a];
        }
    }
    $ret .= ': ' . str_replace(
        array(
            '\\'
        ),
        array(
            ''
        ),
        $value
    );
    return $ret;
}

function to_css_background_image($value) {
    return 'background-image: url(' . $value['backgroundImage'] . ')';
}

function corebuilder_factory_render_css() {
    $media_queries = array(
        'all' => 'all',
        'desktop' => 'screen',
        'laptop' => 'only screen and (min-width: 992px) and (max-width: 1199px)',
        'tablet' => 'only screen and (min-width: 768px) and (max-width: 991px)',
        'phone' => 'only screen and (min-width: 320px) and (max-width: 767px)'
    );
    $css = get_option(get_stylesheet() . '_css', array());

    echo "<style type=\"text/css\">\n";

    foreach($css as $device => $classes) {
        echo '@media ' . $media_queries[$device] . " {\n";

        foreach($classes as $class => $declarations) {
            echo "  " . $class . "{\n";

            if (!empty($declarations['properties'])) {
                foreach ($declarations['properties'] as $property => $value) {
                    echo "    " . to_css_declaration($property, $value) . ";\n";
                }
            }

            if (!empty($declarations['backgrounds'])) {
                foreach ($declarations['backgrounds'] as $property => $value) {
                    echo "    background-image: url(" . $value['backgroundImage'] . ");\n";
                    echo "    background-position: " . $value['backgroundPositionX'] . ' ' . $value['backgroundPositionY'] . ";\n";

                    $repeat_x = (!empty($value['backgroundRepeatX']) ? $value['backgroundRepeatX'] : FALSE);
                    $repeat_y = (!empty($value['backgroundRepeatY']) ? $value['backgroundRepeatY'] : FALSE);

                    if($repeat_x === 'true') {
                        $repeat_x = TRUE;
                    } elseif($repeat_x === 'false') {
                        $repeat_x = FALSE;
                    }

                    if($repeat_y === 'true') {
                        $repeat_y = TRUE;
                    } elseif($repeat_y==='false'){
                        $repeat_y = FALSE;
                    }

                    if ($repeat_x && $repeat_y) {
                        $repeat = 'repeat';
                    } elseif ($repeat_x) {
                        $repeat = 'repeat-x';
                    } elseif ($repeat_y) {
                        // echo "    repeat_y is " . $repeat_y . "\n";
                        $repeat = 'repeat-y';
                    } else {
                        $repeat = 'no-repeat';
                    }

                    echo "    background-repeat: " . $repeat . ";\n";

                    if(!empty($value['backgroundSize'])) {
                        echo '    background-size: ' . $value['backgroundSize'] . ";\n";
                    }
                }
            }
            echo "  }\n";
        }
        echo "}\n\n";
    }
    echo "</style>\n";
}
