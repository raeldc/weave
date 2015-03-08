var Dispatcher    = require('application/alchemy/dispatcher.js');
var UIConfig      = require('application/stores/uiconfig.js');
var Configuration = require('application/ui/controls/configuration.js');
var CONST         = require('application/constants/all.js');

var UI = React.createClass({
    getInitialState: function(){
        return UIConfig.getConfig();
    },

    render: function() {
        return (
            <div id="alchemy-ui">
                <div className="row">
                    <div className="col-md-8">Node Tree</div>
                    <div className="col-md-4">
                        <Configuration />
                    </div>
                </div>
            </div>
        );
    },

    onChange: function(){
        this.setState(UIConfig.getConfig());
    },

    componentDidMount: function() {
        UIConfig.on(CONST.UI_CONFIG_CHANGED, this.onChange);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.UI_CONFIG_CHANGED, this.onChange);
    },

    toggleLayoutEditMode: function() {
        Dispatcher.dispatch({action: CONST.UI_TOGGLE_LAYOUT_EDIT_MODE});
    },

    toggleQuickEditMode: function() {
        Dispatcher.dispatch({action: CONST.UI_TOGGLE_QUICK_EDIT_MODE});
    }
});

module.exports = UI;