var LayoutActions        = require('core/actions/layout.js'),
    UIPreviewOverlayMixin = require('core/ui/preview/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UIPreviewOverlayMixin],    

    getInitialState: function() {
        return {type: 'select'};
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
        this.stopListeningToDisplaySelectOverlay = LayoutActions.displaySelectOverlay.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningToDisplaySelectOverlay();
        this.stopListeningToUnselectNode();
    },

    listenToReverseSelection: function() {
        this.stopListeningToUnselectNode = LayoutActions.unSelectNode.listen(this.hideOverlay);
    },

    stopListeningToReverseSelection: function() {
        this.stopListeningToUnselectNode();
    }
});