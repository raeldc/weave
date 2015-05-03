var LayoutActions        = require('core/actions/layout.js'),
    UICanvasOverlayMixin = require('core/ui/canvas/overlay/mixin.js');

module.exports = React.createClass({
    mixins: [UICanvasOverlayMixin],    

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
        this.stopListeningToSelectNode = LayoutActions.selectNode.listen(this.displayOverlay);
    },

    componentWillUnmount: function() {
        this.stopListeningSelectNode();
        this.stopListeningUnselectNode();
    },

    listenToReverseSelection: function() {
        this.stopListeningToUnSelectNode = LayoutActions.unSelectNode.listen(this.hideOverlay);
    },

    stopListeningToReverseSelection: function() {
        this.stopListeningToUnSelectNode();
    }
});