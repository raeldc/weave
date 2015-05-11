var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'addNode',
    'deleteNode',
    'updateNode',
    'updateColumns',
    'updateColspan',
    'updateText',
    'updateNodeCSS',
    'addChildNode',
    'moveNodeToParent',
    'insertNodeBesideSibling',
    'insertNodeBeforeSibling',
    'insertNodeAfterSibling'
]);