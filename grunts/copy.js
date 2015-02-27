module.exports = {
    main: {
        files: [
            {
                src: 'bower_components/jquery/dist/jquery.min.map',
                dest: 'public/js/jquery.min.map'
            },
            {
                src: 'bower_components/underscore/underscore-min.map',
                dest: 'public/js/underscore-min.map'
            },
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'bower_components/bootstrap/fonts/**',
                dest: 'public/fonts/'
            }
        ]
    }
}