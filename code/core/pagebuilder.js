var Core     = require('core'),
    Controls = require('core/ui/controls'),
    Canvas   = require('core/ui/canvas'),
    Layout   = require('core/ui/layout');

// Register Node Components
CoreBuilder.Components.register(require('core/components/root'));
CoreBuilder.Components.register(require('core/components/row'));
CoreBuilder.Components.register(require('core/components/column'));
CoreBuilder.Components.register(require('core/components/text'));
CoreBuilder.Components.register(require('core/components/title'));
CoreBuilder.Components.register(require('core/components/container'));

CoreBuilder.PageBuilder = function(config) {
    var page      = config.page      || null,
        container = config.container || 'corebuilder-container',
        overlay   = config.overlay   || 'corebuilder-overlay';

    CoreBuilder.UIConfig.Canvas.set('page',      page);
    CoreBuilder.UIConfig.Canvas.set('container', container);
    CoreBuilder.UIConfig.Canvas.set('overlay',   overlay);
    CoreBuilder.UIConfig.Canvas.set('editMode',  true);

    React.render(
        <div>
            <div id="corebuilder-canvas" />
            <Controls />
        </div>, 
        document.body
    );

    jQuery.getJSON(config.data, function(result){
        var data = _.isArray(result.entities) ? result.entities.pop() : {};
        delete data['links'];

        CoreBuilder.Nodes.setData(data);

        React.render(<Layout />, document.getElementById('corebuilder-layout'));
        //React.render(<Canvas />, document.getElementById('corebuilder-canvas'));
    });
}