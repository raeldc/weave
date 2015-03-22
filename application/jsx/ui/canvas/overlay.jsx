var UIConfig        = require('application/stores/uiconfig.js'),
    UICanvasActions = require('application/ui/canvas/actions.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            style: {
                display     : 'none',
                visibility  : 'hidden',
            },
            visible: false,
            selectedNode: null
        };
    },

    render: function() {
        var shapes = [];

        if(this.state.visible) {
            shapes.push(
                <rect key="inner-box" className="box" x={this.state.position.left} y={this.state.position.top} height={this.state.height} width={this.state.width} />
            );
        }

        return (
            <svg style={this.state.style} id={"ui-overlay-" + this.props.type}>
                {shapes}
            </svg>
        );
    },

    shouldComponentUpdate: function() {
        // Don't update on setState. forceUpdate is always used.
        return false;
    },

    componentDidMount: function() {
        if(this.props.type === 'hover') {
            this.stopListeningToMouseOver = UICanvasActions.mouseOverNode.listen(this.displayOverlay);
        }else if(this.props.type === 'select') {
            this.stopListeningToSelectNode   = UICanvasActions.selectNode.listen(this.displayOverlay);
        }

        this.stopListeningToCanvasScrolled = UICanvasActions.canvasScrolled.listen(this.adaptOverlay);
        this.stopListeningToDeviceChange   = UICanvasActions.deviceChanged.listen(this.adaptOverlay);
    },

    componentWillUnmount: function() {
        if(this.props.type === 'hover') {
            this.stopListeningToMouseOver();
            this.stopListeningToMouseOut();
        }else if(this.props.type === 'select') {
            this.stopListeningToSelectNode();
            this.stopListeningToUnselectNode();
        }

        this.stopListeningToCanvasScrolled();
        this.stopListeningToDeviceChange();
    },

    displayOverlay: function(id, node) {

        this.adaptOverlay({
            style: {
                display   : 'block',
                visibility: 'visible',
            },
            visible     : true,
            selectedNode: React.findDOMNode(node),
            node        : id
        });

        if(this.props.type === 'hover') {
            this.stopListeningToMouseOut  = UICanvasActions.mouseOutNode.listen(this.hideOverlay);
        }else if(this.props.type === 'select') {
            this.stopListeningToUnselectNode = UICanvasActions.unSelectNode.listen(this.hideOverlay);
        }
    },

    adaptOverlay: function(state) {
        var position, 
            scrollTop = jQuery(window.canvas).scrollTop(),
            state     = state || {},
            visible   = state.visible || this.state.visible || false,
            $dom      = jQuery(state.selectedNode || this.state.selectedNode || null);

        if($dom && visible) {
            position       = $dom.offset();
            state.width    = $dom.outerWidth();
            state.height   = $dom.outerHeight();
            state.position = {
                top : position.top - scrollTop,
                left: position.left
            }
        }

        this.setState(state);
        this.forceUpdate();
    },

    hideOverlay: function() {
        if(this.props.type === 'hover') {
            this.stopListeningToMouseOut();
        }else if(this.props.type === 'select'){
            this.stopListeningToUnselectNode();
        }

        this.setState(this.getInitialState());
    }
});