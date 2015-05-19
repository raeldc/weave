'use strict'

import Nodes       from 'core/stores/nodes.js'
import Config      from 'core/stores/uiconfig.js'
import Button      from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap'

export default class ToolBar extends React.Component {
    render() {
        return (
            <ButtonGroup className="ui-controls-topbar-toolbar">
                <Button className="btn-info btn-xs">Back to Admin</Button>
                <Button className="btn-success btn-xs" onClick={this.save}>Save</Button>
            </ButtonGroup>
        );
    }

    save(event) {
        jQuery.post(Config.Preview.get('page'), {nodes: Nodes.toObject()}, function(result){

        });
    }
}