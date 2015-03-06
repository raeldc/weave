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
Alchemy.Factory.registerComponent('default', require('application/components/node'));

// Render the UI
React.render(
    React.createElement(require('application/ui')),
    document.getElementById('alchemy-ui')
);

// Render the Theme
React.render(
    Alchemy.Factory.createNode('root'),
    document.getElementById('alchemy-body')
);
