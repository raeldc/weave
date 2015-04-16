// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.UI         = require('application/ui');
Alchemy.Nodes      = require('application/stores/nodes.js');
Alchemy.Components = require('application/stores/components.js');
Alchemy.UIConfig   = require('application/stores/uiconfig.js');

// Set Dependencies
Alchemy.Nodes.setData(require('./demodata.js'));

// Register Node Components
Alchemy.Components.register(require('application/components/text'));
Alchemy.Components.register(require('application/components/title'));
Alchemy.Components.register(require('application/components/container'));

require('application/lib/contentloaded.js').ready(window, function(){
    React.render(
        <Alchemy.UI />,
        document.body
    );
});
