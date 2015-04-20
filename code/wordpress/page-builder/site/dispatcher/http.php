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
    /**
     * Send the response
     *
     * @param KDispatcherContextInterface $context  A dispatcher context object
     */
    protected function _actionSend(KDispatcherContextInterface $context)
    {
        $request  = $context->request;
        $response = $context->response;

        if(!$response->isDownloadable() && $request->getFormat() == 'html')
        {
            //Render the page
            $this->getObject('com://site/pagebuilder.controller.core',  array('response' => $response))
                ->layout($request->query->get('view', 'cmd') == 'builder' ? 'koowa' : 'wordpress')
                ->render();

            //Pass back to Wordpress
            if ($request->isGet() && $request->query->get('view', 'cmd') != 'builder') {
                return true;
            }
        }

        KDispatcherHttp::_actionSend($context);
    }
}
