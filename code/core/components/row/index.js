module.exports = {
    name       : 'row',
    title      : 'Row',
    description: '',
    iconClass  : '',
    node       : require('core/components/node/node.js'),
    layout     : require('core/components/row/layout.js'),
    defaults   : {
        element: 'div',
        columns: 4,
        classes: ['row']
    }
}