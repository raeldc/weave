var Factory   = require('core/components/node/factory.js'),
    Classable = require('core/components/node/mixins/classable.js');

module.exports = React.createClass({
    mixins: [Classable],

    componentWillMount: function() {
        this.addClass('invisible');

        this.stopListeningToStartDrag = LayoutActions.startDrag.listen(this.grabNode);
        this.stopListeningToStopDrag  = LayoutActions.stopDrag.listen(this.hideContainer);
    },

    componentWillUnmount: function() {
        this.stopListeningToStartDrag();
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

        React.render(Factory.createNode(node, 'layout'), container);

        this.previousX = event.clientX;
        this.previousY = event.clientY;

        jQuery(document).on('mousemove.dragcontainer', this.followCursor);

        this.removeClass('invisible');

        this.properties.style = info;

        this.forceUpdate();
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