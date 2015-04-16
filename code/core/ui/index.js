var Controls = require('core/ui/controls');
var Canvas   = require('core/ui/canvas');

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