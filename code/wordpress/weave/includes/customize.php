<?php

class WP_Customize_ThemeBuilder_Styles extends WP_Customize_Control
{
    public $type = 'themebuilder_settings';

    public function render() {
        echo '<li id="corebuilder-customizer" class="customize-control"></li>';
    }
}