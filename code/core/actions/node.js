var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'addNode',
    'deleteNode',
    'updateNode',
    'updateColspan',
    'updateText',
    'updateNodeCSS',
    'addChildNode',
    'insertNodeBeforeSibling',
    'insertNodeAfterSibling'
]);