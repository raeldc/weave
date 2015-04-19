var Controls = require('core/ui/controls');
var Canvas   = require('core/ui/canvas');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <Controls />
                <Canvas src={this.props.src} contentID={this.props.contentID} editMode={true} />
            </div>
        )
    }
});