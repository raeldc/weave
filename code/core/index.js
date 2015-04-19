// Declare global variables
window._       = require('underscore');
window.React   = require('react');
window.CoreBuilder = {};

CoreBuilder.UI         = require('core/ui');
CoreBuilder.Nodes      = require('core/stores/nodes.js');
CoreBuilder.Components = require('core/stores/components.js');
CoreBuilder.UIConfig   = require('core/stores/uiconfig.js');

// Register Node Components
CoreBuilder.Components.register(require('core/components/text'));
CoreBuilder.Components.register(require('core/components/title'));
CoreBuilder.Components.register(require('core/components/container'));

CoreBuilder.initialize = function(config) {
    var src  = config.src  || null;
    var data = config.data || require('./demodata.js');

    return <CoreBuilder.UI src={src} data={data} contentID="builder-content" />
}