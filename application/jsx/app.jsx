// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.Dispatcher = require('application/alchemy/dispatcher.js');
Alchemy.Nodes      = require('application/stores/nodes.js');
Alchemy.Factory    = require('application/components/node/factory.js');

// Set Dependencies
Alchemy.Nodes.initialize(require('./demodata.js'));

// Register Node Components
Alchemy.Factory.registerComponent('default', require('application/components/node/node.js'));
Alchemy.Factory.registerComponent('ui-components', require('application/ui/components.js'));

React.render(
    Alchemy.Factory.createNode('root'),
    document.getElementById('alchemy-body')
);