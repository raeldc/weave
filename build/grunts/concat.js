var js = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/react/react-with-addons.min.js',
    'bower_components/underscore/underscore-min.js'
];

module.exports = {
    options: {
        separator: '\n',
    },
    lib: {
        src : js,
        dest: 'public/js/lib.js'
    },
    components: {
        src : 'build/tmp/core/components/**/*.js',
        dest: 'build/tmp/core/components.js'
    },
}