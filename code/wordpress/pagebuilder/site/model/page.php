<?php

class ComPagebuilderModelPage extends KModelAbstract
{
    public function __construct(KObjectConfig $config)
    {
        parent::__construct($config);

        $this->getState()->insert('id', 'int', null, true);
    }

    protected function _actionFetch(KModelContext $context)
    {
        $result = get_post_meta($this->getState()->id, 'pagebuilder_nodes');

        if(is_array($result) && count($result) && is_array($result[0])) {
            return $this->create($result);
        }

        return $this->create(array(array()));
    }
}