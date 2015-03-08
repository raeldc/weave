// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.Application = require('application/alchemy');
Alchemy.Dispatcher  = require('application/alchemy/dispatcher.js');
Alchemy.Nodes       = require('application/stores/nodes.js');
Alchemy.Factory     = require('application/components/factory.js');

// Set Dependencies
Alchemy.Nodes.initialize(require('./demodata.js'));

// Register Node Components
Alchemy.Factory.registerComponent('default', require('application/components/node'));
Alchemy.Factory.registerComponent('controls-overlay', require('application/ui/controls/overlay.js'));

require('application/lib/contentloaded.js').ready(window, function(){
    React.render(
        <Alchemy.Application />,
        document.body
    );
});
