var Factory       = require('core/components/node/factory.js'),
    Nodes         = require('core/stores/nodes.js'),
    LayoutStore   = require('core/stores/layout.js'),
    LayoutActions = require('core/actions/layout.js'),
    Classable     = require('core/components/node/mixins/classable.js');

module.exports = React.createClass({
    mixins: [Classable],

    componentWillMount: function() {
        this.addClass('invisible');

        this.stopListeningToStartDrag = LayoutActions.startDrag.listen(this.grabNode);
        this.stopListeningToStopDrag  = LayoutActions.stopDrag.listen(function(){
            this.hideContainer();
            // We only want to respond if there is a drag subject
            if(LayoutStore.get('drag_subject')) {
                this.moveNode();
            }
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.stopListeningToStartDrag();
        this.stopListeningToStopDrag();
    },

    render: function() {
        this.addClass('drag-container');
        this.setClass();

        this.properties.ref = 'container';
        return React.createElement('div', this.properties);
    },

    followCursor: function(event) {
        var x = this.previousX - this.properties.style.left;
        var y = this.previousY - this.properties.style.top;

        this.properties.style.left = event.clientX - x;
        this.properties.style.top  = event.clientY - y;

        this.previousX = event.clientX;
        this.previousY = event.clientY;

        this.forceUpdate();
    },

    hideContainer: function(){
        this.addClass('invisible');

        this.previousX = undefined;
        this.previousY = undefined;

        jQuery(document).unbind('mousemove.dragcontainer');

        this.forceUpdate();

        React.unmountComponentAtNode(React.findDOMNode(this.refs.container));
    },

    grabNode: function(node, instance, event) {
        var container = React.findDOMNode(this.refs.container);
        var subject   = React.findDOMNode(instance);
        var info      = this.getNodeInfo(instance);

        // Make a clone of the node inside the container
        React.render(Factory.createNode(node, 'layout'), container);

        // Record the current clientX and clientY
        this.previousX = event.clientX;
        this.previousY = event.clientY;

        // Register the mousemove event on the document
        jQuery(document).on('mousemove.dragcontainer', this.followCursor);

        // Show the container
        this.removeClass('invisible');

        // Adapt the size and coordinates of the container to the drag_subject
        this.properties.style = info;

        this.forceUpdate();
    },

    moveNode: function() {
        var drag_subject  = LayoutStore.get('drag_subject');
        var drop_subject  = LayoutStore.get('drop_subject');
        var drop_position = LayoutStore.get('drop_position');

        if(drag_subject && drag_subject !== drop_subject) {
            Nodes.moveNodeBesideSibling(drag_subject, drop_subject, drop_position);
        }

        LayoutStore.remove('drag_subject');
        LayoutStore.remove('drop_subject');
        LayoutStore.remove('drop_position');
    },

    getNodeInfo: function(instance) {
        var $target    = jQuery(React.findDOMNode(instance)),
            nodeOffset = $target.offset();

        return {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window.preview).scrollTop(),
            left  : nodeOffset.left
        }
    },
});