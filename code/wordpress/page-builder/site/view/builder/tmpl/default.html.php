<ktml:style  src="media://pagebuilder/css/ui.css" />
<ktml:script src="media://pagebuilder/js/jquery.min.js" />
<ktml:script src="media://pagebuilder/js/pagebuilder.js" />

<?php
    $page = object('http.url', array('url' => object('request')->getUrl()));
    $page->setQuery('view=preview&page='.object('request')->query->get('page_id', 'cmd'), true);
?>

<script>
jQuery(document).ready(function(){
    React.render(
        CoreBuilder.PageBuilder({
            page: '<?= $page ?>'
        }),
        document.body
    );
});
</script>
