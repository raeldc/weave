var _          = require('underscore');
var Dispatcher = require('flux').Dispatcher;

_.extend(Dispatcher.prototype, {
    addNode: function(parent, properties, reference, position) {
        var properties    = properties || {element: 'div'};
        properties.id     = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        properties.parent = parent || 'root';

        Alchemy.Properties.add(properties);

        this.insertNode(parent, properties, reference, position)
    },

    insertNode: function(parent, properties, reference, position) {
        if(properties.id === undefined) {
            return this.addNode(parent, properties, reference, position);
        }

        var parent        = Alchemy.Properties.get(parent);
        var reference     = reference  || _.last(parent.children);
        var position      = position   || 'after';
        var children      = [];
        properties.parent = parent.id;

        if(_.size(parent.children) > 0){
            _.each(parent.children || [], function(value, index){
                if(value === reference) {
                    if(position === 'before') {
                        children.push(properties.id);
                        children.push(value);
                    }else {
                        children.push(value);
                        children.push(properties.id);
                    }
                }else {
                    children.push(value);
                }
            });
        }else {
            children.push(properties.id);
        }

        Alchemy.Properties.set(parent.id, {children: children});
    },

    removeNode: function(id) {
        Alchemy.Properties.remove(id);
    },

    moveNode: function(id, parent, reference, position) {
        var node       = Alchemy.Properties.get(id);
        var prevparent = Alchemy.Properties.get(node.parent);

        // Remove the node from the previous parent
        Alchemy.Properties.set(node.parent, {children: _.without(prevparent.children, id)})

        // Insert the node to the new parent
        this.insertNode(parent, node, reference, position);
    }
});

module.exports = Dispatcher;