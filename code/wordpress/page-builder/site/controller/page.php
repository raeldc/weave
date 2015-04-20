<?php

class ComPagebuilderControllerPage extends KControllerView
{
    public function __construct(KObjectConfig $config)
    {
        parent::__construct($config);

        if($this->isDispatched()) {
            show_admin_bar(false);
        }
    }
}