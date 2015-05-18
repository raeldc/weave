var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'addNode',
    'deleteNode',
    'updateNode',
    'addColumn',
    'updateColumns',
    'updateColspan',
    'updateText',
    'updateNodeCSS',
    'addChildNode',
    'moveNodeToParent',
    'moveNodeBesideSibling',
    'insertNodeBesideSibling',
    'insertNodeBeforeSibling',
    'insertNodeAfterSibling'
]);