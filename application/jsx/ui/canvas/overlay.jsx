var UIActions       = require('application/ui/actions.js');
var Nodes           = require('application/stores/nodes.js');
var UIConfig        = require('application/stores/uiconfig.js');
var Components      = require('application/stores/components.js');
var DOM             = require('application/stores/dom.js');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var CONST           = require('application/constants/all.js');

var AdjustBoxMixin = {
    getInitialState: function() {
        return {
            position  : 'absolute',
            visibility: 'hidden',
            top       : 0,
            left      : 0,
            width     : 0,
            height    : 0,
            margin    : 0,
            padding   : 0
        }
    },

    showBox: function(nodeID) {
        if(nodeID !== undefined && this.props.children.indexOf(nodeID) !== -1) {
            this.isVisible = true;
            this.adjustBox(nodeID);
        }else {
            this.hideBox();
        }
    },

    hideBox: function() {
        this.isVisible = false;
        this.setState(this.getInitialState());
    },

    adjustBox: function(nodeID) {
        if(!this.isVisible) {
            return;
        }

        var node     = DOM.get(nodeID);
        var $node    = jQuery(node);
        var position = $node.position();

        var state = {
            visibility: 'visible',
        };

        if(this.props.type === 'overlay') {
            state.width  = $node.outerWidth();
            state.height = $node.outerHeight();
            state.top    = position.top  + parseInt($node.css('margin-top'));
            state.left   = position.left + parseInt($node.css('margin-left'));
        }else if(this.props.type === 'padding') {
            state.width  = $node.width();
            state.height = $node.height();
            state.top    = position.top  + parseInt($node.css('padding-top')) + parseInt($node.css('margin-top'));
            state.left   = position.left + parseInt($node.css('padding-left')) + parseInt($node.css('margin-left'));
        } else {
            state.width  = $node.outerWidth(true);
            state.height = $node.outerHeight(true);
            state.top    = position.top;
            state.left   = position.left;
        }

        this.setState(state);
    }
}

var SelectNodeMixin = {
    componentDidMount: function() {
        this.addSelectionListener();
    },

    componentDidUpdate: function() {
        this.removeSelectionListener();
        this.addSelectionListener();
        this.removeDeviceChangeListener();
        this.addDeviceChangeListener();
    },

    componentWillUnmount: function() {
        this.removeSelectionListener();
        this.removeDeviceChangeListener();
    },

    adjustBoxForSelectedNode: function(node) {
        DOM.on(CONST.DOM_UPDATED + '_' + node, this.adjustBox);
    },

    dontAdjustBoxForSelectedNode: function(node) {
        DOM.removeListener(CONST.DOM_UPDATED + '_' + node, this.adjustBox);
    },

    addSelectionListener: function() {
        UIActions.addNodeSelectedListener(this.props.children, this.showBox);
        UIActions.addNodeUnselectedListener(this.props.children, this.hideBox);

        UIActions.on(CONST.NODE_UNSELECTED, this.dontAdjustBoxForSelectedNode);
        UIActions.on(CONST.NODE_SELECTED, this.adjustBoxForSelectedNode);
    },

    removeSelectionListener: function() {
        UIActions.removeNodeSelectedListener(this.props.children, this.showBox);
        UIActions.removeNodeUnselectedListener(this.props.children, this.hideBox);

        UIActions.removeListener(CONST.NODE_UNSELECTED, this.dontAdjustBoxForSelectedNode);
        UIActions.removeListener(CONST.NODE_SELECTED, this.adjustBoxForSelectedNode);
    },

    adjustBoxOnDeviceChange: function() {
        UIActions.mouseOutNode(UIActions.hoveredNode);
        this.adjustBox(UIActions.selectedNode);
    },

    addDeviceChangeListener: function() {
        UIConfig.on(CONST.UI_DEVICE_CHANGED, this.adjustBoxOnDeviceChange);
    },

    removeDeviceChangeListener: function() {
        UIConfig.removeListener(CONST.UI_DEVICE_CHANGED, this.adjustBoxOnDeviceChange);
    },
};

var HoverBox = React.createClass({
    mixins: [PureRenderMixin, AdjustBoxMixin],

    getDefaultProps: function() {
        return {
            type    : 'overlay',
            children: []
        }
    },

    componentDidMount: function() {
        this.addHoverListener();
    },

    componentDidUpdate: function() {
        this.removeHoverListener();
        this.addHoverListener();
    },

    componentWillUnmount: function() {
        this.removeHoverListener();
    },

    addHoverListener: function() {
        // Also Listen to mouseOver
        UIActions.addNodeMouseOverListener(this.props.children, this.showBox);
        UIActions.addNodeMouseOutListener(this.props.children, this.hideBox);
    },

    removeHoverListener: function() {
        UIActions.removeNodeMouseOverListener(this.props.children, this.showBox);
        UIActions.removeNodeMouseOutListener(this.props.children, this.hideBox);
    },

    render: function() {
        return (
            <span className="ui-hover-box" style={this.state} />
        );
    },
});


var OverlayBox = React.createClass({
    mixins: [PureRenderMixin, AdjustBoxMixin, SelectNodeMixin],

    render: function(){
        return (
            <a className="ui-overlay-box" style={this.state} />
        );
    },

    getDefaultProps: function() {
        return {
            type    : 'overlay',
            children: []
        }
    }
});

// This sits on the parent so that it stays under the node that it is connected to.
var MarginBox = React.createClass({
    mixins: [PureRenderMixin, AdjustBoxMixin, SelectNodeMixin],

    getDefaultProps: function() {
        return {
            type    : 'margin',
            children: []
        }
    },

    render: function(){
        return <a className="ui-margin-box" style={this.state} />
    }
});

var PaddingBox = React.createClass({
    mixins: [PureRenderMixin, AdjustBoxMixin, SelectNodeMixin],

    getDefaultProps: function() {
        return {
            type: 'padding',
        }
    },

    render: function(){
        return <a className="ui-padding-box" style={this.state} />
    },
});

var DropBox = React.createClass({
    getInitialState: function() {
        return {
            display: 'none'
        }
    },

    render: function() {
        return <a className={"ui-drop-box" + " " + this.props.position} style={this.state} onDragOver={this.allowDrop} onDrop={this.onDrop}>Drop Here {this.props.position} {this.props.node}</a>
    },

    componentDidMount: function() {
        UIActions.on(CONST.UI_COMPONENT_DRAG_START, this.showDropArea);
        UIActions.on(CONST.UI_COMPONENT_DRAG_END, this.hideDropArea);
    },

    componentWillUnmount: function() {
        UIActions.removeListener(CONST.UI_COMPONENT_DRAG_START, this.showDropArea);
        UIActions.removeListener(CONST.UI_COMPONENT_DRAG_END, this.hideDropArea);
    },

    showDropArea: function(event, component) {
        this.setState({
            display: 'block'
        });
    },

    hideDropArea: function(event, component) {
        this.setState({
            display: 'none'
        });
    },

    allowDrop: function(event) {
        event.preventDefault();
    },

    onDrop: function(event) {
        var component = event.dataTransfer.getData('component');
        UIActions.insertComponentAsNode(component, this.props.node);
    }

});

module.exports = {
    HoverBox    : HoverBox,
    OverlayBox: OverlayBox,
    MarginBox   : MarginBox,
    PaddingBox  : PaddingBox,
    DropBox     : DropBox
}