var Core     = require('core'),
    Controls = require('core/ui/controls'),
    Canvas   = require('core/ui/canvas');

// Register Node Components
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

    jQuery.getJSON(config.data, function(result){
        // TODO: The default should be initialized at the store object
        var data = _.extend({
            root: {
                id       : 'root', 
                className: 'corebuilder',
                component: 'container',
                css      : {
                    all    : {},
                    desktop: {},
                    laptop : {},
                    tablet : {},
                    phone  : {}
                },
            }
        }, result.entities.pop() || {});

        delete data['links'];

        CoreBuilder.Nodes.setData(data);

        React.render(
            <div>
                <Controls />
                <Canvas />
            </div>,

            config.target || document.body
        );
    });
}