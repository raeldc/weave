module.exports = {
    name       : 'title',
    group      : 'content',
    title      : 'Header Title',
    description: 'Header Title',
    iconClass  : 'glyphicon glyphicon-header',
    node       : require('../node/node.js'),
    paneview   : require('../node/paneview.js'),
    defaults   : {
        element: 'h1',
        text   : 'Title (click here to edit)'
    },
    configurables: {
        resize: false,
        text: true,
    }
}