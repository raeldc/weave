<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Alchemy v0.01 Prototype</title>

        <link href="/css/font-awesome.min.css" rel="stylesheet">
        <link href="/css/ui.css" rel="stylesheet">

        <script src="/js/jquery.min.js"></script>
        <script src="/js/pagebuilder.js"></script>

        <script type="text/javascript">
            jQuery(document).ready(function(){
                CoreBuilder.PageBuilder({
                    page  : '/preview.php',
                    data  : '/demodata.json',
                    target: document.body
                });
            });
        </script>
    </head>
    <body></body>
</html>