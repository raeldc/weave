var UICanvasFrame   = require('application/ui/canvas/frame.js'),
    UICanvasFactory = require('application/ui/canvas/factory.js'),
    UIConfig        = require('application/stores/uiconfig.js'),
    UICanvasActions = require('application/ui/canvas/actions.js'),
    UICanvasOverlay = require('application/ui/canvas/overlay.js');

module.exports = React.createClass({
    displayName: 'Canvas',

    getInitialState: function(){
        return UIConfig.Canvas.toObject();
    },

    render: function(){
        var css = <link type="text/css" rel="stylesheet" href="css/style.css" />;

        return (
            <div id="alchemy-canvas" className={this.state.device}>
                <UICanvasFrame head={css} ref="iframe">
                    <UICanvasOverlay type="hover" ref="overlay" window={this.state.window} />
                    {UICanvasFactory.createNode('root', this.props.editMode)}
                </UICanvasFrame>
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.device !== nextState.device;
    },

    componentDidMount: function() {
        window.canvas          = React.findDOMNode(this.refs.iframe).contentWindow;
        window.canvas.onscroll = this.onFrameScroll;

        this.stopListeningToCanvasChanges = UIConfig.Canvas.listen(this.changeCanvas);
    },

    componentDidUpdate: function() {
        UICanvasActions.deviceChanged(this.state.device);
    },

    componentWillUnmount: function() {
        this.stopListeningToCanvasChanges();
        React.findDOMNode(this.refs.iframe).contentWindow.unscroll = undefined;
    },

    onFrameScroll: function(event) {
        UICanvasActions.canvasScrolled(null, event);
        event.stopPropagation();
    },

    changeCanvas: function() {
        this.setState(this.getInitialState());
    }
});