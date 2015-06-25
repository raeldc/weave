<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="UTF-8">
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <?php if(did_action('customize_preview_init')): ?>
            <div id="corebuilder-preview"></div>
            <div id="corebuilder-overlay"></div>
        <?php else: ?>
            <?php corebuilder_factory_render_html('root') ?>
        <?php endif ?>
        <?php wp_footer(); ?>
    </body>
</html>
