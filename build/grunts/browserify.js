module.exports = {
    dist: {
        options: {
            separator  : '\n',
            ignoreMTime: true,
        },
        files: {
            'public/js/app.js': 'code/core/index.js'
        }
    },
}