var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'addNode',
    'deleteNode',
    'updateNode',
    'updateNodeCSS',
    'addChildNode',
    'insertNodeBeforeSibling',
    'insertNodeAfterSibling'
]);