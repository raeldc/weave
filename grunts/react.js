module.exports = {
    dynamic_mappings: {
        files: [
            {
            expand: true,
                cwd: 'application/jsx',
                src: ['**/*.jsx'],
                dest: 'application/js',
                ext: '.js'
            }
        ]
    }
};
