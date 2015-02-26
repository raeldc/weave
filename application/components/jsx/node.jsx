var aNode = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function() {
        var element  = this.state.element  || 'div';
        var children = this.state.children || this.state.text || '';

        var node = React.createElement(element, [], children);

        return node;
    }
});