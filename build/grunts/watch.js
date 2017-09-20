
module.exports = {
    wp_themebuilder: {
        files: [
            'public/js/themebuilder.js',
            'public/css/less/**/*.less',
        ],
        tasks: ['less', 'copy:wp_themebuilder_watch']
    },

    desktop: {
        options: {
            livereload: true
        },
        files: [
            './code/desktop/css/**/*.less'
        ],
        tasks: ['less:desktop']
    },
    desktop_livereload: {
        options: {
            livereload: true
        },
        files: [
            './code/desktop/css/**/*.css'
        ]
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