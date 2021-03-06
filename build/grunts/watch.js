module.exports = {
    wp_themebuilder: {
        files: [
            'public/js/themebuilder.js',
            'public/css/less/**/*.less',
        ],
        tasks: ['less', 'copy:wp_themebuilder_watch']
    },

    css_livereload: {
        options: {
            livereload: true
        },
        files: [
            'public/css/**/*.css'
        ]
    },

    js_livereload: {
        options: {
            livereload: true
        },
        files: [
            'public/js/themebuilder.js'
        ]
    }
}