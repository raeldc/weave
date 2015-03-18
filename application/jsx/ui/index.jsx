var Dispatcher         = require('application/alchemy/dispatcher.js');
var ComponentSelection = require('application/ui/controls/components.js');
var UIConfig           = require('application/stores/uiconfig.js');
var OverlayActions     = require('application/ui/actions/overlay.js');
var Configuration      = require('application/ui/controls/configuration.js');
var CONST              = require('application/constants/all.js');
var TabbedArea         = require('react-bootstrap').TabbedArea;
var TabPane            = require('react-bootstrap').TabPane;

var UI = React.createClass({
    getInitialState: function(){
        return UIConfig.getConfig();
    },

    render: function() {

        var EditNodeTab   = <i className="glyphicon glyphicon-pencil"></i>;
        var ComponentsTab = <i className="glyphicon glyphicon-th"></i>;
        var HistoryTab    = <i className="glyphicon glyphicon-fast-backward"></i>;
        var ConfigTab     = <i className="glyphicon glyphicon-cog"></i>;

        return (
            <div id="alchemy-ui">
                <TabbedArea defaultActiveKey={1}>
                    <TabPane eventKey={1} tab={EditNodeTab}>
                        <h5 onDragOver={this.onDragOver}>Configure Component</h5>
                        <Configuration />
                    </TabPane>
                    <TabPane eventKey={2} tab={ComponentsTab}>
                        <ComponentSelection />
                    </TabPane>
                    <TabPane eventKey={3} tab={HistoryTab}>
                        Undo, Redo, Go back to your history of changes.
                    </TabPane>
                    <TabPane eventKey={4} tab={ConfigTab}>
                        General Configuration of the Template
                    </TabPane>
                </TabbedArea>
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
    }
});

module.exports = UI;