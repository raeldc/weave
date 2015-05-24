<?php

add_action( 'customize_register', function( $wp_customize ) {
    require __DIR__.'/includes/customize.php';

    /*-----------------------------------------------------------*
     * Defining our own 'Advanced Options' section
     *-----------------------------------------------------------*/

    $wp_customize->add_section(
        'themebuilder_styles',
        array(
            'title'     => 'Styling',
            'priority'  => 201
        )
    );

    /* Background Image */
    $wp_customize->add_setting(
        'themebuilder_styles',
        array(
            'default'      => '',
            'transport'    => 'postMessage'
        )
    );

    $wp_customize->add_control(
        new WP_Customize_ThemeBuilder_Styles(
            $wp_customize,
            'themebuilder_styles',
            array(
                'label'    => 'Background Image',
                'settings' => 'themebuilder_styles',
                'section'  => 'themebuilder_styles'
            )
        )
    );

    $wp_customize->remove_section('themes');
    $wp_customize->remove_section('title_tagline');
    $wp_customize->remove_section('static_front_page');
    $wp_customize->remove_section('colors');
    $wp_customize->remove_section('background_image');
    $wp_customize->remove_section('header_image');
    $wp_customize->remove_section('nav');
}, 100);

add_action('customize_controls_print_footer_scripts', function() {
?>
<script type="text/javascript">
jQuery(document).ready(function(){
    wp.customize.previewer.loading.done(function(){
        var data = <?= json_encode(get_option(get_stylesheet().'_nodes', array()))?>;

        if(_.isEmpty(data)) {
            data = {root: {component: 'root', id: 'root'}};
        }

        CoreBuilder.Nodes.setData(data);

        CoreBuilder.ThemeBuilder({
            preview: this.targetWindow()
        });
    });
});
</script>
<?
});

add_action('customize_controls_enqueue_scripts', function() {
    wp_enqueue_script(
        'themebuilder-customizer',
        get_template_directory_uri() . '/js/themebuilder.js',
        array('jquery', 'underscore'),
        '1.0.0',
        true
    );
});

add_action('customize_controls_print_styles', function() {
    echo '<link rel="stylesheet" href="'.get_template_directory_uri() . '/css/font-awesome.min.css'.'" type="text/css" media="all" />';
    echo '<link rel="stylesheet" href="'.get_template_directory_uri() . '/css/themebuilder.css'.'" type="text/css" media="all" />';
});

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'themebuilder-css-base',
        get_template_directory_uri() . '/css/base.css',
        array(),
        '1.0.0'
    );
});

add_action('customize_preview_init', function() {
    wp_enqueue_style(
        'themebuilder-css-overlay',
        get_template_directory_uri() . '/css/overlay.css',
        array(),
        '1.0.0'
    );
});

add_action('customize_controls_print_footer_scripts', function() {
    echo '<div id="corebuilder-layout"></div>';
});

add_action('customize_save', function() {
    if(isset($_POST['nodes']) && is_array($_POST['nodes'])) {
        update_option(get_stylesheet().'_nodes', $_POST['nodes']);
    }
});

require __DIR__.'/components/factory.php';
