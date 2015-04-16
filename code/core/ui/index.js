var Controls = require('application/ui/controls');
var Canvas   = require('application/ui/canvas');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <Controls ref="controls"/>
                <Canvas   ref="canvas" editMode={true} />
            </div>
        )
    }
});