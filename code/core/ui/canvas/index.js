var UICanvasFrame   = require('core/ui/canvas/frame.js'),
    UICanvasFactory = require('core/ui/canvas/factory.js'),
    UIConfig        = require('core/stores/uiconfig.js'),
    UICanvasActions = require('core/actions/canvas.js'),
    UICanvasOverlay = require('core/ui/canvas/overlay'),
    UIDropArea      = require('core/ui/canvas/droparea');

module.exports = React.createClass({
    displayName: 'Canvas',

    getInitialState: function(){
        return UIConfig.Canvas.toObject();
    },

    render: function(){
        return (
            <div id="alchemy-canvas" className={this.state.device}>
                <UICanvasFrame ref="iframe">
                    <UICanvasOverlay />
                    <UIDropArea />
                    {UICanvasFactory.createNode('root', this.props.editMode)}
                </UICanvasFrame>
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.device !== nextState.device;
    },

    componentDidMount: function() {
        window.canvas = React.findDOMNode(this.refs.iframe).contentWindow;
        
        jQuery(window.canvas).scroll(this.onFrameEvent);
        jQuery(window.canvas).resize(this.onFrameEvent);

        this.stopListeningToCanvasChanges = UIConfig.Canvas.listen(this.changeCanvas);
    },

    componentWillUnmount: function() {
        this.stopListeningToCanvasChanges();
        jQuery(window.canvas).unbind('scroll');
        jQuery(window.canvas).unbind('resize');
    },

    onFrameEvent: function(event) {
        UICanvasActions.frameChanged(null, event);
        event.stopPropagation();
    },

    changeCanvas: function() {
        this.setState(this.getInitialState());
    },
});