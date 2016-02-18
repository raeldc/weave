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

    pagebuilder_dist: {
        files: [
            {
                src : 'node_modules/jquery/dist/jquery.min.js',
                dest: 'public/js/jquery.min.js'
            },
            {
                src : 'node_modules/jquery/dist/jquery.min.map',
                dest: 'public/js/jquery.min.map'
            },
            {
                cwd   : 'node_modules/font-awesome/fonts',
                src   : '**/*',
                dest  : 'public/fonts/',
                expand: true
            },
            {
                cwd : 'node_modules/font-awesome/css',
                src : '**/*',
                dest: 'public/css/',
                expand: true
            }
        ]
    },

    wp_pagebuilder_watch: {
        files: [
            {
                src : 'node_modules/jquery/dist/jquery.min.js',
                dest: 'code/wordpress/pagebuilder/resources/assets/js/jquery.min.js'
            },
            {
                src : 'node_modules/jquery/dist/jquery.min.map',
                dest: 'code/wordpress/pagebuilder/resources/assets/js/jquery.min.map'
            },
            {
                src : 'public/js/pagebuilder.js',
                dest: 'code/wordpress/pagebuilder/resources/assets/js/pagebuilder.js'
            },
            {
                src : 'public/css/ui.css',
                dest: 'code/wordpress/pagebuilder/resources/assets/css/ui.css'
            },
            {
                src : 'public/css/base.css',
                dest: 'code/wordpress/pagebuilder/resources/assets/css/base.css'
            },
            {
                src : 'public/css/overlay.css',
                dest: 'code/wordpress/pagebuilder/resources/assets/css/overlay.css'
            }
        ]
    },

    wp_themebuilder_watch: {
        files: [
            {
                src : 'public/js/themebuilder.js',
                dest: 'code/wordpress/weave/js/themebuilder.js'
            },
            {
                src : 'public/css/themebuilder.css',
                dest: 'code/wordpress/weave/css/themebuilder.css'
            },
            {
                src : 'public/css/base.css',
                dest: 'code/wordpress/weave/css/base.css'
            },
            {
                src : 'public/css/overlay.css',
                dest: 'code/wordpress/weave/css/overlay.css'
            }
        ]
    },

    wp_pagebuilder_dist: {
        files: [
            {
                src : 'node_modules/jquery/dist/jquery.min.js',
                dest: 'code/wordpress/pagebuilder/resources/assets/js/jquery.min.js'
            },
            {
                src : 'node_modules/jquery/dist/jquery.min.map',
                dest: 'code/wordpress/pagebuilder/resources/assets/js/jquery.min.map'
            },
            {
                cwd   : 'node_modules/font-awesome/fonts',
                src   : '**/*',
                dest  : 'code/wordpress/pagebuilder/resources/assets/fonts/',
                expand: true
            },
            {
                src : 'public/js/pagebuilder.min.js',
                dest: 'code/wordpress/pagebuilder/resources/assets/js/pagebuilder.js'
            },
            {
                cwd : 'node_modules/font-awesome/css',
                src : '**/*',
                dest: 'code/wordpress/pagebuilder/resources/assets/css/',
                expand: true
            },
            {
                src : 'public/css/ui.css',
                dest: 'code/wordpress/pagebuilder/resources/assets/css/ui.css'
            },
            {
                src : 'public/css/base.css',
                dest: 'code/wordpress/pagebuilder/resources/assets/css/base.css'
            },
            {
                src : 'public/css/overlay.css',
                dest: 'code/wordpress/pagebuilder/resources/assets/css/overlay.css'
            }
        ]
    },

    wp_themebuilder_dist: {
        files: [
            {
                cwd   : 'node_modules/font-awesome/fonts',
                src   : '**/*',
                dest  : 'code/wordpress/weave/fonts/',
                expand: true
            },
            {
                src : 'public/js/themebuilder.min.js',
                dest: 'code/wordpress/weave/js/themebuilder.js'
            },
            {
                cwd : 'node_modules/font-awesome/css',
                src : '**/*',
                dest: 'code/wordpress/weave/css/',
                expand: true
            },
            {
                src : 'public/css/themebuilder.css',
                dest: 'code/wordpress/weave/css/themebuilder.css'
            },
            {
                src : 'public/css/base.css',
                dest: 'code/wordpress/weave/css/base.css'
            },
            {
                src : 'public/css/overlay.css',
                dest: 'code/wordpress/weave/css/overlay.css'
            }
        ]
    }
}