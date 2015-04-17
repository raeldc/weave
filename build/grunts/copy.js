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

    wp: {
        files: [
            {
                src: 'public/js/app.js',
                dest: 'code/wordpress/page-builder/resources/assets/js/app.js'
            },
            {
                src: 'public/css/style.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/style.css'
            }
        ]
    },

    wpdist: {
        files: [
            {
                src: 'public/js/app.min.js',
                dest: 'code/wordpress/page-builder/resources/assets/js/app.js'
            },
            {
                src: 'public/css/style.css',
                dest: 'code/wordpress/page-builder/resources/assets/css/style.css'
            }
        ]
    }
}