var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'addNode',
    'deleteNode',
    'updateNode',
    'addChildNode',
    'insertNodeBeforeSibling',
    'insertNodeAfterSibling'
]);