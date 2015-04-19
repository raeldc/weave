module.exports = {
    main: {
        files: [
            {
                src: 'node_modules/jquery/dist/jquery.min.js',
                dest: 'public/js/jquery.min.js'
            },
            {
                src: 'node_modules/jquery/dist/jquery.min.map',
                dest: 'public/js/jquery.min.map'
            },
            {
                src: 'node_modules/interact.js/interact.min.js',
                dest: 'public/js/interact.js'
            },
            /*
            {
                src: 'node_modules/underscore/underscore-min.map',
                dest: 'public/js/underscore-min.map'
            },
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'node_modules/bootstrap/fonts/**',
                dest: 'public/fonts/'
            }
            */
        ]
    },

    wp_pagebuilder_watch: {
        files: [
            {
                src : 'node_modules/jquery/dist/jquery.min.js',
                dest: 'code/wordpress/page-builder/resources/assets/js/jquery.min.js'
            },
            {
                src : 'public/js/pagebuilder.js',
                dest: 'code/wordpress/page-builder/resources/assets/js/pagebuilder.js'
            },
            {
                src : 'public/css/ui.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/ui.css'
            },
            {
                src : 'public/css/base.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/base.css'
            },
            {
                src : 'public/css/overlay.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/overlay.css'
            }
        ]
    },

    wp_pagebuilder_dist: {
        files: [
            {
                src : 'node_modules/jquery/dist/jquery.min.js',
                dest: 'code/wordpress/page-builder/resources/assets/js/jquery.min.js'
            },
            {
                cwd   : 'public/fonts',
                src   : '**/*',
                dest  : 'code/wordpress/page-builder/resources/assets/fonts/',
                expand: true
            },
            {
                src : 'public/js/pagebuilder.min.js',
                dest: 'code/wordpress/page-builder/resources/assets/js/pagebuilder.js'
            },
            {
                src : 'public/css/ui.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/ui.css'
            },
            {
                src : 'public/css/base.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/base.css'
            },
            {
                src : 'public/css/overlay.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/overlay.css'
            }
        ]
    }
}