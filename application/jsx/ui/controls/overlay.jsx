var Dispatcher      = require('application/alchemy/dispatcher.js');
var Factory         = require('application/components/factory.js');
var UIConfig        = require('application/stores/uiconfig.js');
var Nodes           = require('application/stores/nodes.js');
var DOM             = require('application/stores/dom.js');
var LifeCycleMixin  = require('application/components/node/mixins/lifecycle.js');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var OverlayActions  = require('application/ui/actions/overlay.js');
var CONST           = require('application/constants/all.js');
var cx              = require('react/lib/cx');

var resizeData = {
    startX       : 0,
    startY       : 0,
    currentX     : 0,
    currentY     : 0,
    currentHeight: 0,
    currentWidth : 0,
    newHeight    : 0,
    newWidth     : 0
}

var Controls = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState: function() {
        return {
            isSelected: false
        };
    },

    render: function(){
        var className = this.state.isSelected ? 'ui-controls selected' : 'ui-controls';

        return (
            <a className={className}>
                <span className="fa fa-arrows grab"></span>
            </a>
        );
    },

    componentDidMount: function(){
        UIConfig.on(CONST.NODE_SELECTED   + '_' + this.props.node, this.onSelectNode);
        UIConfig.on(CONST.NODE_UNSELECTED + '_' + this.props.node, this.onUnSelectNode);
    },

    componentWillUnmount: function(){
        UIConfig.removeListener(CONST.NODE_SELECTED   + '_' + this.props.node, this.onSelectNode);
        UIConfig.removeListener(CONST.NODE_UNSELECTED + '_' + this.props.node, this.onUnSelectNode);
    },

    onSelectNode: function(node){
        if(node === this.props.node) {
            this.initiateResize();
            this.setState({
                isSelected: true
            });
        }
    },

    onUnSelectNode: function(node){
        this.disableResize();
        this.setState({
            isSelected: false
        });
    },

    initiateResize: function() {
        var node    = Nodes.get(this.props.node);
        var parent  = DOM.get(node.parent);
        var $node   = jQuery(DOM.get(node.id));
        var $parent = jQuery(parent);

        interact(this.getDOMNode())
        .resizable({
            edges   : { left: false, right: true, bottom: true, top: false },
            restrict: {
                restriction: parent,
                endOnly    : false
            }
        })
        .on('resizemove', function (event) {
            // update the element's style
            if(event.edges.right) {
                OverlayActions.changeWidth(node.id, event.rect.width);
            }

            if(event.edges.bottom){
                OverlayActions.changeHeight(node.id, event.rect.height);
            }
        });
    },

    disableResize: function() {
        interact(this.getDOMNode()).unset();
    }
});

var Overlay = React.createClass({
    mixins: [PureRenderMixin],

    render: function(){
        return (
            <a className="ui-overlay" onClick={this.selectNode} />
        );
    },

    selectNode: function(event) {
        OverlayActions.selectNode(this.props.node);
        event.stopPropagation();
    }
});

module.exports = {
    Controls: Controls,
    Overlay : Overlay
}