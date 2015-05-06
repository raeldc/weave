var LayoutActions        = require('core/actions/layout.js'),
    UIPreviewOverlayMixin = require('core/ui/preview/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UIPreviewOverlayMixin],    

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
        this.stopListeningToDisplayHoverOverlay = LayoutActions.displayHoverOverlay.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningToDisplayHoverOverlay();
        this.stopListeningToMouseOutNode();
    },

    listenToReverseSelection: function() {
        this.stopListeningToMouseOutNode  = LayoutActions.mouseOutNode.listen(this.hideOverlay);
    },

    stopListeningToReverseSelection: function() {
        this.stopListeningToMouseOutNode();
    }
});