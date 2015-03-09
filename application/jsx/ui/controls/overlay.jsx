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

    render: function(){
        var selectedClassName = this.props.selectedClassName || '';

        return (
            <div className={"controls" + selectedClassName}>
                <span className="fa fa-arrows grab"></span>
                <span className="resize-width"></span>
                <span className="resize-height" draggable onDragStart={this.initializeResizeForHeight} onDrag={this.resizeHeight} onDragEnd={this.onDragEnd}></span>
            </div>
        );
    },

    initializeResize: function(event, propertyToResize) {
        var node    = Nodes.get(this.props.node);
        var $node   = jQuery(DOM.get(node.id));
        var $parent = jQuery(DOM.get(node.parent));

        resizeData.$node            = $node;
        resizeData.$parent          = $parent;
        resizeData.startX           = event.clientX || event.pageX;
        resizeData.startY           = event.clientY || event.pageY;
        resizeData.boundsX          = $parent.offset().left + $parent.width();
        resizeData.boundsY          = $parent.offset().top + $parent.height();
        resizeData.currentWidth     = $node.width();
        resizeData.currentHeight    = $node.height();
        resizeData.propertyToResize = propertyToResize;

        event.stopPropagation();
    },

    initializeResizeForHeight: function(event) {
        this.initializeResize(event, 'height');
    },

    onDragEnd: function(event) {
        switch(resizeData.propertyToResize) {
            case 'height':
                OverlayActions.changeHeight(this.props.node, resizeData.newHeight);
            break;
            case 'width':

            break;
        }

        event.stopPropagation();
    },

    resizeHeight: function(event) {
        this.setCurrentResizeData(event);

        resizeData.$node.height(resizeData.newHeight);

        event.stopPropagation();
    },

    setCurrentResizeData: function(event) {
        var currentX = event.clientX || event.pageX;
        var currentY = event.clientY || event.pageY;

        if(currentX < resizeData.boundsX && currentX !== 0) {
            resizeData.currentX = currentX;
        }

        if(currentY < resizeData.boundsY && currentY !== 0) {
            resizeData.currentY = currentY;
        }

        resizeData.newHeight = resizeData.currentHeight + (resizeData.currentY - resizeData.startY);
        resizeData.newWidth  = resizeData.currentWidth + (resizeData.currentX - resizeData.startX);
    },
});

var Overlay = React.createClass({
    mixins: [PureRenderMixin],

    render: function(){
        return (
            <div className="overlay" onMouseDown={this.onMouseDown} />
        );
    },

    onMouseDown: function(event) {
        OverlayActions.selectNode(this.props.node);
        event.stopPropagation();
    },
});

module.exports = React.createClass({
    mixins: [LifeCycleMixin],

    render: function() {
        var className         = this.state.className || '';
        var selectedClassName = this.state.selectedClassName || '';

        return (
            <div style={this.state.style} className={'ui-control-overlay ' + className} id={this.props.id}>
                <Controls selectedClassName={selectedClassName} key="controls" node={this.props.id} />
                <Overlay key="overlay" node={this.props.id}/>
                {this.props.children}
            </div>
        );
    },

    onSelectNode: function(node){
        if(node === this.props.id) {
            this.setState({
                selectedClassName: ' selected'
            });
        }
    },

    onUnSelectNode: function(node){
        this.setState({
            selectedClassName: ''
        });
    },

    componentDidMount: function(){
        UIConfig.on(CONST.NODE_SELECTED + '_' + this.props.id, this.onSelectNode);
        UIConfig.on(CONST.NODE_UNSELECTED + '_' + this.props.id, this.onUnSelectNode);
    },

    componentWillUnmount: function(){
        UIConfig.removeListener(CONST.NODE_SELECTED + '_' + this.props.id, this.onSelectNode);
        UIConfig.removeListener(CONST.NODE_UNSELECTED + '_' + this.props.id, this.onUnSelectNode);
    }
});
