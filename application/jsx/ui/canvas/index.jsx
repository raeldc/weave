var UICanvasFrame   = require('application/ui/canvas/frame.js'),
    UICanvasFactory = require('application/ui/canvas/factory.js'),
    UIConfig        = require('application/stores/uiconfig.js');

module.exports = React.createClass({
    displayName: 'Canvas',

    getInitialState: function(){
        return UIConfig.get('canvas');
    },

    render: function(){
        var css = <link type='text/css' rel='stylesheet' href='css/style.css' />;

        return (
            <div id="alchemy-canvas" className={this.state.device}>
                <UICanvasFrame head={css}>
                    {UICanvasFactory.createNode('root', this.props.editMode)}
                </UICanvasFrame>
            </div>
        );
    },

    canvasChanged: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        this.stopListeningToCanvasChanges = UIConfig.getStore('canvas').listen(this.canvasChanged);
    },

    componentWillUnmount: function() {
        this.stopListeningToCanvasChanges();
    }
});