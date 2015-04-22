<ktml:style  src="media://pagebuilder/css/ui.css" />
<ktml:script src="media://pagebuilder/js/jquery.min.js" />
<ktml:script src="media://pagebuilder/js/pagebuilder.js" />

<?php
    $id   = object('request')->query->get('id', 'int');
    $type = object('request')->query->get('type', 'cmd');
    $url  = object('http.url', array('url' => object('request')->getUrl()));
?>

<script>
jQuery(document).ready(function(){
    CoreBuilder.PageBuilder({
        page  : '<?= $url->setQuery('component=pagebuilder&view=page&type='.$type.'&id='.$id) ?>',
        data  : '<?= $url->setQuery('component=pagebuilder&view=page&format=json&id='.$id) ?>',
        target: document.body
    });
});
</script>
