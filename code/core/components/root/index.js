module.exports = {
    name       : 'root',
    title      : 'Root',
    description: '',
    iconClass  : '',
    node       : require('core/components/root/node.js'),
    layout     : require('core/components/root/layout.js'),
    defaults   : {
        element: 'div',
        classes: 'container-fluid'
    },
    rules: {
        
    }
}