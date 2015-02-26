module.exports = {
    dynamic_mappings: {
        files: [
            {
            expand: true,
                cwd: 'application/components/jsx',
                src: ['**/*.jsx'],
                dest: 'application/components/js',
                ext: '.js'
            }
        ]
    }
};
