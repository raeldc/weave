var _ = require('underscore');

module.exports = {
    addNode: function(parent, properties, reference, position) {
        var parent     = Alchemy.Properties.get(parent || 'root');
        var properties = properties || {element: 'div'};
        var reference  = reference  || _.size(parent.children) - 1;
        var position   = position   || 'after';
        var children   = [];

        // Check if this node is new, then give it an id
        if(properties.id === undefined) {
            properties.id = new Date().getTime();
            Alchemy.Properties.add(properties);
        }

        if(_.size(parent.children) > 0){
            _.each(parent.children || [], function(value, index){
                if(index === reference) {
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

        parent.children = children;

        Alchemy.Properties.set(parent.id, parent);
    }
};