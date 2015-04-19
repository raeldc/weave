<ktml:style  src="media://pagebuilder/css/style.css" />
<ktml:script src="media://pagebuilder/js/jquery.min.js" />
<ktml:script src="media://pagebuilder/js/app.js" />

<?php
    $url = object('request')->getUrl();
    $url->setQuery('view=preview&page='.object('request')->query->get('page_id', 'cmd'), true);
?>

<script>
jQuery(document).ready(function(){
    React.render(
        Alchemy.initialize({
            src: '<?= $url ?>'
        }),
        document.body
    );
});
</script>
