// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.UI         = require('core/ui');
Alchemy.Nodes      = require('core/stores/nodes.js');
Alchemy.Components = require('core/stores/components.js');
Alchemy.UIConfig   = require('core/stores/uiconfig.js');

// Set Dependencies
Alchemy.Nodes.setData(require('./demodata.js'));

// Register Node Components
Alchemy.Components.register(require('core/components/text'));
Alchemy.Components.register(require('core/components/title'));
Alchemy.Components.register(require('core/components/container'));

require('core/lib/contentloaded.js').ready(window, function(){
    React.render(
        <Alchemy.UI />,
        document.body
    );
});
