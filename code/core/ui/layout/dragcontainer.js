var Factory       = require('core/components/node/factory.js'),
    Nodes         = require('core/stores/nodes.js'),
    LayoutStore   = require('core/stores/layout.js'),
    LayoutActions = require('core/actions/layout.js'),
    Classable     = require('core/components/node/mixins/classable.js');

module.exports = React.createClass({
    mixins: [Classable],

    componentWillMount: function() {
        this.addClass('hidden');

        this.stopListeningToStartDrag = LayoutActions.startDrag.listen(this.grabNode);
        this.stopListeningToStopDrag  = LayoutActions.stopDrag.listen(this.hideContainer);
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
        if(this.properties.style) {
            var x = this.previousX - this.properties.style.left;
            var y = this.previousY - this.properties.style.top;

            this.properties.style.left = event.clientX - x;
            this.properties.style.top  = event.clientY - y;

            this.previousX = event.clientX;
            this.previousY = event.clientY;

            this.forceUpdate();
        }
    },

    hideContainer: function(){
        this.addClass('hidden');

        this.previousX = undefined;
        this.previousY = undefined;

        jQuery(document).unbind('mousemove.dragcontainer');
        React.unmountComponentAtNode(React.findDOMNode(this.refs.container));

        this.forceUpdate();
    },

    grabNode: function(node, instance, event) {
        var info, container;

        if(instance) {
            container = React.findDOMNode(this.refs.container);
            info      = this.getNodeInfo(instance);

            // Make a clone of the node inside the container
            React.render(Factory.createNode(node, {type: 'layout'}), container);

            // Record the current clientX and clientY
            this.previousX = event.clientX;
            this.previousY = event.clientY;

            // Register the mousemove event on the document
            jQuery(document).on('mousemove.dragcontainer', this.followCursor);

            // Show the container
            this.removeClass('hidden');

            // Adapt the size and coordinates of the container to the drag_subject
            this.properties.style = info;

            this.forceUpdate();
        }
    },

    getNodeInfo: function(instance) {
        var $target    = jQuery(React.findDOMNode(instance)),
            nodeOffset = $target.offset();

        return {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window).scrollTop(),
            left  : nodeOffset.left
        }
    },
});