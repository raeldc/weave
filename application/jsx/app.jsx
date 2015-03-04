// Node Properties
var _nodes = [
    {
        id: 'root',
        className: 'row',
        children: [1, 2, 3]
    }
];

// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.Dispatcher = require('application/alchemy/dispatcher.js');
Alchemy.Nodes      = require('application/alchemy/nodes.js');
Alchemy.Factory    = require('application/components/node/factory.js');

// Set Dependencies
Alchemy.Nodes.setDispatcher(Alchemy.Dispatcher).setNodes(_nodes);
Alchemy.Factory.setNodes(Alchemy.Nodes);

React.render(
    Alchemy.Factory.createNode('root'),
    document.getElementById('alchemy-body')
);