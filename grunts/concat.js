var js = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/react/react-with-addons.min.js'
];

module.exports = {
    options: {
        separator: '\n',
    },
    lib: {
        src: js,
        dest: 'public/js/lib.js'
    },
    components: {
        src: 'application/components/**/*.js',
        dest: 'application/components.js'
    },
}