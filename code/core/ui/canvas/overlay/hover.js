var LayoutActions        = require('core/actions/layout.js'),
    UICanvasOverlayMixin = require('core/ui/canvas/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UICanvasOverlayMixin],    

    getInitialState: function() {
        return {type: 'hover'};
    },

    render: function() {
        var className = this.state.visible ? this.state.type : 'hidden';

        return (
            <rect className={className} 
                x={this.state.left} 
                y={this.state.top} 
                height={this.state.height} 
                width={this.state.width} />
        );
    },

    componentDidMount: function() {
        this.stopListeningToMouseOverNode = LayoutActions.mouseOverNode.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningToMouseOverNode();
        this.stopListeningToMouseOutNode();
    },

    listenToReverseSelection: function() {
        this.stopListeningToMouseOutNode  = LayoutActions.mouseOutNode.listen(this.hideOverlay);
    },

    stopListeningToReverseSelection: function() {
        this.stopListeningToMouseOutNode();
    }
});