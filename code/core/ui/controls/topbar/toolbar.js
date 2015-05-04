var Nodes       = require('core/stores/nodes.js'),
    Config      = require('core/stores/uiconfig.js'),
    ButtonGroup = require('react-bootstrap').ButtonGroup,
    Button      = require('react-bootstrap').Button;

module.exports = React.createClass({
    render: function() {
        return (
            <ButtonGroup className="ui-controls-topbar-toolbar">
                <Button className="btn-info btn-xs">Back to Admin</Button>
                <Button className="btn-success btn-xs" onClick={this.save}>Save</Button>
            </ButtonGroup>
        );
    },

    save: function(event) {
        jQuery.post(Config.Preview.get('page'), {nodes: Nodes.toObject()}, function(result){

        });
    }
});