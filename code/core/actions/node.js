var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'addNode',
    'deleteNode',
    'updateNode',
    'updateText',
    'updateNodeCSS',
    'addChildNode',
    'insertNodeBeforeSibling',
    'insertNodeAfterSibling'
]);