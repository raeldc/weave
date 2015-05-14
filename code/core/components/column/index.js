module.exports = {
    name       : 'column',
    title      : 'Column',
    description: '',
    iconClass  : '',
    node       : require('core/components/column/node.js'),
    layout     : require('core/components/column/layout.js'),
    defaults   : {
        element: 'div',
        colspan: {
            desktop: 1,
            laptop : 2
        }
    },
    rules: {
        parents: ['row']
    }
}