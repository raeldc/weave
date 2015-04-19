require('core');

var Controls = require('core/ui/controls'),
    Canvas   = require('core/ui/canvas');

// Register Node Components
CoreBuilder.Components.register(require('core/components/text'));
CoreBuilder.Components.register(require('core/components/title'));
CoreBuilder.Components.register(require('core/components/container'));

CoreBuilder.PageBuilder = function(config) {
    var page      = config.page      || null;
    var data      = config.data      || require('./demodata.js');
    var container = config.container || 'corebuilder-container';
    var overlay   = config.overlay   || 'corebuilder-overlay';

    CoreBuilder.UIConfig.Canvas.set('page',      page);
    CoreBuilder.UIConfig.Canvas.set('container', container);
    CoreBuilder.UIConfig.Canvas.set('overlay',   overlay);
    CoreBuilder.UIConfig.Canvas.set('editMode',  true);

    CoreBuilder.Nodes.setData(data);

    return (
        <div>
            <Controls />
            <Canvas />
        </div>
    );
}