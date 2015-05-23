<?php
/**
 * Nooku Framework for Wordpress - http://nooku.org/framework
 *
 * @copyright   Copyright (C) 2007 - 2015 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link        https://github.com/nooku/nooku-framework-wordpress for the canonical source repository
 */

defined('KOOWA') or die; ?>
<ktml:style  src="media://pagebuilder/css/overlay.css" />
<ktml:style  src="media://pagebuilder/css/base.css" />

<wpml action="the_content">
<div id="corebuilder-container"></div>
</wpml>

<wpml action="wp_footer">
<div id="corebuilder-overlay"></div>
</wpml>