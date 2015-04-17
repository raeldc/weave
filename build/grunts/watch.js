module.exports = {
    options: {
        livereload: true
    },

    main: {
        files: [
            'public/js/app.js',
            'public/css/less/**/*.less',
        ],
        tasks: ['less', 'copy:main']
    },

    wp: {
        files: [
            'public/js/app.js',
            'public/css/less/**/*.less',
        ],
        tasks: ['less', 'copy:wp']
    }
}