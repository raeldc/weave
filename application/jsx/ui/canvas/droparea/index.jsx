var UICanvasActions = require('application/ui/canvas/actions.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            visible : false,
            position: null,
            target  : null,
            node    : null
        }
    },

    render: function() {
        return (
            <div id="ui-canvas-droparea" className={this.state.className}>
            </div>
        );
    },

    componentDidMount: function() {
        this.stopListeningToDroppingOnNode     = UICanvasActions.droppingOnNode.listen(this.displayDropArea);
        this.stopListeningToInsertingComponent = UICanvasActions.endInsertingComponent.listen(this.hideDropArea);
    },

    componentWillUnmount: function() {
        this.stopListeningToDroppingOnNode();
        this.stopListeningToInsertingComponent();
    },

    displayDropArea: function(id, node, event) {
        var $target, nodeOffset;

        if(this.state.node !== id) {
            this.state.node    = id;
            this.state.visible = true;
            this.state.target  = React.findDOMNode(node);
            console.log('display drop area');
            this.adaptDropArea(this.getNodePosition());
        }

        this.calculateCursorPosition(event.clientX, event.clientY);
    },

    adaptDropArea: function(nodePosition) {
        var nodePosition = nodePosition || this.getNodePosition();
        console.log('adapt drop area');
    },

    hideDropArea: function() {
        console.log('hide drop area');
        this.setState(this.getInitialState(), this.forceUpdate);
    },

    getNodePosition: function(target) {
        var target     = target || this.state.target,        
            $target    = jQuery(target),
            nodeOffset = $target.offset();

        this.nodePosition = {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window.canvas).scrollTop(),
            left  : nodeOffset.left
        };

        return this.nodePosition;
    },

    calculateCursorPosition: function(x, y) {
        if(!this.nodePosition) return;

        console.log('calculate position');
    }
});