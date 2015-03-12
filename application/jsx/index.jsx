// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.Application = require('application/alchemy');
Alchemy.Dispatcher  = require('application/alchemy/dispatcher.js');
Alchemy.Nodes       = require('application/stores/nodes.js');
Alchemy.Factory     = require('application/components/factory.js');
Alchemy.Components  = require('application/stores/components.js');

// Set Dependencies
Alchemy.Nodes.initialize(require('./demodata.js'));

// Register Node Components
Alchemy.Components.register(require('application/components/text'));
Alchemy.Components.register(require('application/components/title'));
Alchemy.Components.register(require('application/components/container'));

require('application/lib/contentloaded.js').ready(window, function(){
    React.render(
        <Alchemy.Application />,
        document.body
    );
});
