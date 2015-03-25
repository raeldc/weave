var UIConfig        = require('application/stores/uiconfig.js'),
    UICanvasActions = require('application/ui/canvas/actions.js');

module.exports = {
    getInitialState: function() {
        this.nextState = {
            left     : 0,
            right    : 0,
            width    : 0,
            height   : 0,
            visible  : false,
            className: 'hidden',
            target   : null
        };

        return _.clone(this.nextState);
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

        this.nextState.node    = id;
        this.nextState.visible = true;
        this.nextState.target  = React.findDOMNode(node);

        this.adaptOverlay();
    },

    hideOverlay: function() {
        this.stopListeningToReverseSelection();
        this.setState(this.getInitialState(), this.forceUpdate);
    },

    adaptOverlay: function() {
        var position, 
            state = {},
            $dom  = jQuery(this.nextState.target || null);

        if($dom && this.nextState.visible) {
            position     = $dom.offset();
            this.nextState.width  = $dom.outerWidth();
            this.nextState.height = $dom.outerHeight();
            this.nextState.top    = position.top - jQuery(window.canvas).scrollTop();
            this.nextState.left   = position.left
        }

        this.setState(this.nextState);
    }
};