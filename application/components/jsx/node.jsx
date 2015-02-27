var nodes = [
    {
        id: '1',
        element: 'div',
        className: 'row',
        style: {
            margin: '10px',
            border: '1px solid green',
        },
        children: ['2', '3', '4']
    },
    {
        id     : '2',
        element: 'div',
        text   : 'Col 1',
        className: 'col-md-4',
        style  : {
        },
    },
    {
        id     : '3',
        element: 'div',
        text   : 'Col 2',
        className: 'col-md-4',
        style  : {
        },
    },
    {
        id     : '4',
        element: 'div',
        text   : 'Col 4',
        className: 'col-md-4',
        style  : {
        },
    }
];

var aNode = React.createClass({
    getInitialState: function(){
        return nodes[0];
    },

    render: function() {
        return this.createNode(this.state);
    },

    createNode: function(properties) {
        var element  = properties.element  || 'div';
        var children = properties.children || properties.text || undefined;

        if(_.isArray(children)){
            children = this.createChildNodes(properties.children);
        }

        var node = React.createElement(element, {
            key      : properties.id,
            style    : properties.style,
            className: properties.className
        }, children);

        return node;
    },

    createChildNodes: function(children) {
        var self       = this;
        var childNodes = [];

        _.each(children, function(id){
            var child = _.findIndex(nodes, {id: id});
            if(_.isObject(nodes[child])){
                childNodes.push(self.createNode(nodes[child]));
            }
        });

        return childNodes;
    }
});