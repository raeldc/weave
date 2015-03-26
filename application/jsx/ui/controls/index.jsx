var UIConfig             = require('application/stores/uiconfig.js'),
    UIControlsComponents = require('application/ui/controls/components.js'),
    UIControlsNodeconfig = require('application/ui/controls/nodeconfig.js'),
    UIControlsDevices    = require('application/ui/controls/devices.js'),
    TabbedArea           = require('react-bootstrap').TabbedArea,
    TabPane              = require('react-bootstrap').TabPane;

var Controls = React.createClass({
    getInitialState: function(){
        return UIConfig.Controls.toObject();
    },

    render: function() {
        var EditNodeTab   = <i className="glyphicon glyphicon-pencil"></i>;
        var ComponentsTab = <i className="glyphicon glyphicon-th"></i>;
        var HistoryTab    = <i className="glyphicon glyphicon-fast-backward"></i>;
        var ConfigTab     = <i className="glyphicon glyphicon-cog"></i>;

        return (
            <div id="alchemy-controls">
                <TabbedArea defaultActiveKey={1} justified>
                    <TabPane eventKey={1} tab={EditNodeTab}>
                        <UIControlsDevices />
                        <UIControlsNodeconfig />
                    </TabPane>
                    <TabPane eventKey={2} tab={ComponentsTab}>
                        <UIControlsComponents />
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

    componentDidMount: function() {
        this.stopListeningToControlsConfigChanges = UIConfig.Controls.listen(this.onControlsConfigChanged);
    },

    componentWillUnmount: function() {
        this.stopListeningToControlsConfigChanges();
    },

    onControlsConfigChanged: function(){
        this.setState(this.getInitialState());
    }
});

module.exports = Controls;