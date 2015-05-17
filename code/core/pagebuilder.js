window._ = require('underscore');

var Core     = require('core'),
    Utils    = require('core/lib/utils.js'),
    Controls = require('core/ui/controls'),
    Preview  = require('core/ui/preview'),
    Layout   = require('core/ui/layout');

// Register Node Components
CoreBuilder.Components.register(require('core/components/root'));
CoreBuilder.Components.register(require('core/components/row'));
CoreBuilder.Components.register(require('core/components/column'));
CoreBuilder.Components.register(require('core/components/text'));
CoreBuilder.Components.register(require('core/components/title'));

CoreBuilder.PageBuilder = function(config) {
    var page      = config.page      || null,
        container = config.container || 'corebuilder-container',
        overlay   = config.overlay   || 'corebuilder-overlay';

    CoreBuilder.UIConfig.Preview.set('page', page);

    React.render(
        <div>
            <div id="corebuilder-preview" />
            <Controls />
        </div>, 
        document.body
    );

    jQuery.getJSON(config.data, function(result){
        var data = _.isArray(result.entities) ? result.entities.pop() : {};
        delete data['links'];

        CoreBuilder.Nodes.setData(_.extend({root: {id: 'root', component: 'root'}},data));

        React.render(<Layout />, document.getElementById('corebuilder-layout'));
        //React.render(<Preview />, document.getElementById('corebuilder-preview'));
    });
}