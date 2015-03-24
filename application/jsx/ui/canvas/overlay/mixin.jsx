var UIConfig        = require('application/stores/uiconfig.js'),
    UICanvasActions = require('application/ui/canvas/actions.js');

module.exports = {
    getInitialState: function() {
        return {
            left        : 0,
            right       : 0,
            width       : 0,
            height      : 0,
            visible     : false,
            className   : 'hidden',
            selectedNode: null
        };
    },

    shouldComponentUpdate: function() {
        // Don't update on setState. forceUpdate is always used.
        return false;
    },

    componentDidMount: function() {
        this.stopListeningToCanvasScrolled  = UICanvasActions.canvasScrolled.listen(this.adaptOverlay);
        this.stopListeningToDeviceChange    = UICanvasActions.deviceChanged.listen(this.adaptOverlay);
        this.stopListeningToNodeManipulated = UICanvasActions.nodeManipulated.listen(this.adaptOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningToCanvasScrolled();
        this.stopListeningToDeviceChange();
    },

    displayOverlay: function(id, node) {
        this.listenToReverseSelection();

        this.setState({
            node        : id,
            visible     : true,
            className   : this.props.type,
            selectedNode: React.findDOMNode(node),
        }, this.adaptOverlay);
    },

    adaptOverlay: function() {
        var position, 
            state = {},
            $dom  = jQuery(this.state.selectedNode || null);

        if($dom && this.state.visible) {
            position     = $dom.offset();
            state.width  = $dom.outerWidth();
            state.height = $dom.outerHeight();
            state.top    = position.top - jQuery(window.canvas).scrollTop();
            state.left   = position.left

            this.setState(state, this.forceUpdate);
        }
    },

    hideOverlay: function() {
        this.unListenToReverseSelection();
        this.setState(this.getInitialState(), this.forceUpdate);
    }
};