<?php

class ComPagebuilderControllerPage extends KControllerModel
{
    /**
     * Constructor
     *
     * @param   KObjectConfig $config Configuration options
     */
    public function __construct(KObjectConfig $config)
    {
        parent::__construct($config);

        $request = $this->getRequest();

        if($this->isDispatched() && $request->getFormat() == 'html') {
            show_admin_bar(false);
        }

        // Make sure the query uses the id as "p" or "page_id" depending on post type
        add_filter('request', function($query) use ($request)
        {
            $identifier         = $request->query->get('type', 'cmd') == 'page' ? 'page_id' : 'p';
            $query[$identifier] = $request->query->id;

            return $query;
        });

        $this->addCommandCallback('before.edit', 'normalizeData');
    }

    public function normalizeData(KDispatcherContextInterface $context)
    {
        if($context->request->query->has('id', 'int')) {
            $context->request->data['id'] = $context->request->query->get('id', 'int');
        }

        return true;
    }
}