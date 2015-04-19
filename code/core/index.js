// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.Alchemy = {};

Alchemy.UI         = require('core/ui');
Alchemy.Nodes      = require('core/stores/nodes.js');
Alchemy.Components = require('core/stores/components.js');
Alchemy.UIConfig   = require('core/stores/uiconfig.js');

// Register Node Components
Alchemy.Components.register(require('core/components/text'));
Alchemy.Components.register(require('core/components/title'));
Alchemy.Components.register(require('core/components/container'));

Alchemy.initialize = function(config) {
    var src  = config.src  || null;
    var data = config.data || require('./demodata.js');

    return <Alchemy.UI src={src} data={data} contentID="builder-content" />
}