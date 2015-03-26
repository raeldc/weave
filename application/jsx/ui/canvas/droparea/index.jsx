var UICanvasActions = require('application/actions/canvas.js');

module.exports = React.createClass({
    nextState: {},
    nodeInfo : {},

    getInitialState: function() {
        return {
            visible : false,
            position: null,
            target  : null,
            node    : null,
            top     : 0,
            left    : 0,
            width   : 0,
            height  : 0
        }
    },

    render: function() {
        var style = {
            top   : this.state.top,
            left  : this.state.left,
            width : this.state.width,
            height: this.state.height,
        };

        var className = this.state.visible ? this.state.position : 'hidden';

        return (
            <div id="ui-canvas-droparea" style={style} className={className} />
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return false;
    },

    componentDidMount: function() {
        this.stopListeningToDroppingOnNode     = UICanvasActions.droppingOnNode.listen(this.displayDropArea);
        this.stopListeningToInsertingComponent = UICanvasActions.endInsertingComponent.listen(this.hideDropArea);
    },

    componentDidUpdate: function() {
        if(this.state.position) {
            UICanvasActions.droppingOnNodePosition(this.state.position);
        }
    },

    componentWillUnmount: function() {
        this.stopListeningToDroppingOnNode();
        this.stopListeningToInsertingComponent();
    },

    displayDropArea: function(id, node, event) {
        if(this.state.node !== id) {
            this.nextState.node     = id;
            this.nextState.visible  = true;
            this.nextState.target   = React.findDOMNode(node);
            this.nextState.position = null;

            this.adaptDropArea(this.getNodeInfo());

            this.calculateCursorPosition(event.clientX, event.clientY);
            this.setState(this.nextState, this.forceUpdate);
        } else {
            this.calculateCursorPosition(event.clientX, event.clientY);

            if(this.nextState.position !== this.state.position) {
                this.setState(this.nextState, this.forceUpdate);
            }
        }
    },

    adaptDropArea: function(nodeInfo) {
        if(!this.nextState.visible) return;

        nodeInfo = nodeInfo || this.nodeInfo || this.getNodeInfo();

        this.nextState.top    = nodeInfo.top;
        this.nextState.left   = nodeInfo.left;
        this.nextState.width  = nodeInfo.width;
        this.nextState.height = nodeInfo.height;
    },

    hideDropArea: function() {
        this.setState(this.getInitialState(), this.forceUpdate);
    },

    getNodeInfo: function(target) {
        var target     = target || this.nextState.target,
            $target    = jQuery(target),
            nodeOffset = $target.offset();

        this.nodeInfo = {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window.canvas).scrollTop(),
            left  : nodeOffset.left
        };

        return this.nodeInfo;
    },

    calculateCursorPosition: function(mouseX, mouseY) {
        if(!this.nodeInfo) return;

        var position = 'inner';

        if(mouseY < (this.nodeInfo.top + (this.nodeInfo.height * .2))) {
            position = 'top';
        }else if(mouseY > (this.nodeInfo.top + (this.nodeInfo.height - (this.nodeInfo.height * .2)))) {
            position = 'bottom';
        }

        if(mouseX < this.nodeInfo.left + (this.nodeInfo.width * .1)) {
            position = 'left'
        }else if(mouseX > this.nodeInfo.left + (this.nodeInfo.width - (this.nodeInfo.width * .1))) {
            position = 'right'
        }

        return this.nextState.position = position;
    }
});