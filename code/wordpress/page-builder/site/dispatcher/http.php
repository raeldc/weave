<?php
/**
 * Simplins Page Builder
 *
 * @copyright   Copyright (C) 2015 Israel Canasa and Creatizens, Ltd (http://www.simplins.com)
 * @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link        https://src.simplins.com/simplins/page-builder for the canonical source repository
 */

/**
 * HTTP Dispatcher
 *
 * @author  Israel Canasa <https://www.simplins.com>
 * @package Pagebuilder\Dispatcher\Http
 */
class ComPagebuilderDispatcherHttp extends ComKoowaDispatcherHttp
{
    public function getRequest()
    {
        $request = parent::getRequest();

        $query = $request->query;

        // Force tmpl=koowa for form layouts
        if ($query->view == 'builder') {
            $query->tmpl = 'koowa';
        }

        return $request;
    }
}
