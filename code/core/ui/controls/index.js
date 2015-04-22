var UIConfig             = require('core/stores/uiconfig.js'),
    UIControlsComponents = require('core/ui/controls/components.js'),
    UIControlsNodeconfig = require('core/ui/controls/nodeconfig.js'),
    UIControlsDevices    = require('core/ui/controls/devices.js'),
    Nodes                = require('core/stores/nodes.js'),
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
            <div id="corebuilder-controls">
                <TabbedArea defaultActiveKey={this.state.active_section} justified>
                    <TabPane eventKey="edit" tab={EditNodeTab}>
                        <UIControlsDevices />
                        <UIControlsNodeconfig />
                    </TabPane>
                    <TabPane eventKey="components" tab={ComponentsTab}>
                        <UIControlsComponents />
                    </TabPane>
                    <TabPane eventKey="history" tab={HistoryTab}>
                        Undo, Redo, Go back to your history of changes.
                    </TabPane>
                    <TabPane eventKey="config" tab={ConfigTab}>
                        <button className="btn btn-success" onClick={this.save}>Save</button>
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
    },

    save: function(event) {
        jQuery.post(UIConfig.Canvas.get('page'), {nodes: Nodes.toObject()}, function(result){

        });
    }
});

module.exports = Controls;