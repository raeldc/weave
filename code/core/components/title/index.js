module.exports = {
    name       : 'title',
    group      : 'content',
    title      : 'Header Title',
    description: 'Header Title',
    iconClass  : 'glyphicon glyphicon-header',
    node       : require('../node/node.js'),
    layout     : require('../node/layout.js'),
    paneview   : require('../node/paneview.js'),
    defaults   : {
        element: 'h1',
        text   : '[Title]'
    },
    configurables: {
        resize: false,
        text: true,
    },
    rules: {
        parents: ['column']
    }
}