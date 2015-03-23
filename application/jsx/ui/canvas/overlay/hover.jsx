var UICanvasActions      = require('application/ui/canvas/actions.js'),
    UICanvasOverlayMixin = require('application/ui/canvas/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UICanvasOverlayMixin],    

    getInitialState: function() {
        return {type: 'hover'};
    },

    render: function() {
        return (
            <rect className={this.state.type} 
                x={this.state.left} 
                y={this.state.top} 
                height={this.state.height} 
                width={this.state.width} 
                rx="5" 
                ry="5" />
        );
    },

    componentDidMount: function() {
        this.stopListeningToMouseOver = UICanvasActions.mouseOverNode.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningToMouseOver();
        this.stopListeningToMouseOut();
    },

    listenToReverseSelection: function() {
        this.stopListeningToMouseOut  = UICanvasActions.mouseOutNode.listen(this.hideOverlay);
    },

    unListenToReverseSelection: function() {
        this.stopListeningToMouseOut();
    }
});