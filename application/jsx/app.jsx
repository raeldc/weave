// Node Properties
var _nodes = [
    {
        id: 'root',
        className: 'row',
        children: [],
        text : ''
    }
];

// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.Dispatcher = require('application/alchemy/dispatcher.js');
Alchemy.Nodes      = require('application/stores/nodes.js');
Alchemy.Factory    = require('application/components/node/factory.js');

// Set Dependencies
Alchemy.Nodes.setDispatcher(Alchemy.Dispatcher).setNodes(_nodes);

// Register Node Components
Alchemy.Factory.registerComponent('default', require('application/components/node/node.js'));

React.render(
    Alchemy.Factory.createNode('root'),
    document.getElementById('alchemy-body')
);