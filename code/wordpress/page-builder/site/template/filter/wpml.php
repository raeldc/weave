<?php
/**
 * Simplins Page Builder
 *
 * @copyright   Copyright (C) 2015 Israel Canasa and Creatizens, Ltd (http://www.simplins.com)
 * @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link        https://src.simplins.com/simplins/page-builder for the canonical source repository
 */

/**
 * WPML Template Filter
 *
 * Render html content on WordPress hooks
 *
 * @author  Israel Canasa <https://www.simplins.com>
 * @package Pagebuilder\Template\Filter\Wpml
 */
class ComKoowaTemplateFilterWpml extends ComKoowaTemplateFilterTag
{
    public function filter(&$text)
    {
        parent::filter($text);
        $this->_renderTags();
    }

    /**
     * This use the current screen object of Wordpress to display the contents of the help tag
     * @return void
     */
    protected function _renderTags()
    {
        foreach ($this->_parsed_tags as $key => $html)
        {
            $action = $this->getObject('filter.cmd')->sanitize($html->action);

            add_action($html->action, function() use($html)
            {
                echo $html->content;
            });
        }
    }
}
