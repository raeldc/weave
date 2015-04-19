<ktml:style  src="media://pagebuilder/css/ui.css" />
<ktml:script src="media://pagebuilder/js/jquery.min.js" />
<ktml:script src="media://pagebuilder/js/app.js" />

<?php
    $url = object('http.url', array('url' => object('request')->getUrl()));
    $url->setQuery('view=preview&page='.object('request')->query->get('page_id', 'cmd'), true);
?>

<script>
jQuery(document).ready(function(){
    React.render(
        CoreBuilder.initialize({
            src: '<?= $url ?>'
        }),
        document.body
    );
});
</script>
