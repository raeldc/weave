<?php
/**
 * Simplins Page Builder
 *
 * @copyright   Copyright (C) 2015 Israel Canasa and Creatizens, Ltd (http://www.simplins.com)
 * @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link        https://src.simplins.com/simplins/page-builder for the canonical source repository
 */

/*
Plugin Name: Simplins Page Builder
Plugin URI: https://www.simplins.com/page-builder
Description: Page Builder allows you to easily design and build simply to complex WordPress Pages. Designed and Created by Simplins.
Author: Simplins - Makers of the World's Simplest WordPress Plugins.
Version: 0.1
Author URI: https://www.simplins.com
*/

add_action('koowa_before_bootstrap', 'simplins_pagebuilder_bootstrap');

function simplins_pagebuilder_bootstrap()
{
    $manager = KObjectManager::getInstance();
    $manager->getObject('lib:object.bootstrapper')
        ->registerComponent('pagebuilder', __DIR__, 'pagebuilder')
        ->registerComponent('pagebuilder', __DIR__.'/site', 'site');
}