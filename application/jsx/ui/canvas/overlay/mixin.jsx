var UIConfig        = require('application/stores/uiconfig.js'),
    UICanvasActions = require('application/ui/canvas/actions.js');

module.exports = {
    getInitialState: function() {
        return {
            left     : 0,
            right    : 0,
            width    : 0,
            height   : 0,
            visible  : false,
            className: 'hidden',
            target   : null
        };
    },

    shouldComponentUpdate: function() {
        // Don't update on setState. forceUpdate is always used.
        return false;
    },

    componentDidMount: function() {
        this.stopListeningToFrameChanged = UICanvasActions.frameChanged.listen(this.adaptOverlay);
        this.stopListeningToNodeTouched  = UICanvasActions.nodeTouched.listen(this.adaptOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningToFrameChanged();
        this.stopListeningToNodeTouched();
    },

    displayOverlay: function(id, node) {
        this.listenToReverseSelection();

        this.setState({
            node     : id,
            visible  : true,
            className: this.props.type,
            target   : React.findDOMNode(node),
        }, this.adaptOverlay);
    },

    hideOverlay: function() {
        this.stopListeningToReverseSelection();
        this.setState(this.getInitialState(), this.forceUpdate);
    },

    adaptOverlay: function() {
        var position, 
            state = {},
            $dom  = jQuery(this.state.target || null);

        if($dom && this.state.visible) {
            position     = $dom.offset();
            state.width  = $dom.outerWidth();
            state.height = $dom.outerHeight();
            state.top    = position.top - jQuery(window.canvas).scrollTop();
            state.left   = position.left

            this.setState(state, this.forceUpdate);
        }
    }
};