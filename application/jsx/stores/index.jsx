Reflux = require('reflux');

var StoreDefinition = {
    init: function() {
        this.data = {};
    },

    get: function(index) {
        return this.getObject(index);
    },

    getStore: function(index) {
        return this.data[index];
    },

    getObject: function(index) {
        var data = this.data[index];

        if(_.isObject(data) && typeof data['toObject'] === 'function') {
            return data.toObject();
        } else {
            return data;
        }
    },

    toObject: function() {
        var result = {};

        _.each(this.data, function(data, index){
            if(_.isObject(data) && typeof data['toObject'] === 'function') {
                result[index] = data.toObject();
            } else {
                result[index] = data;
            }
        });

        return result;
    },

    set: function(index, data) {
        if(_.isObject(data) && !_.isArray(data)) {
            var object = this.getStore(index);
            if(object instanceof Store) {
                // Since the current object is already a Store, we just want to update the contents of the object
                // without removing the listeners attached to it
                var newkeys = _.keys(data);
                var oldkeys = _.keys(object.toObject());
                newkeys     = _.difference(oldkeys, newkeys);

                this.removeObjects(newkeys);

                _.each(data, function(value, key) {
                    object.set(key, value);
                });
            } 
            else this.data[index] = new Store(data);
        } else {
            this.data[index] = data;
        }

        return this;
    },

    removeObject: function(key) {
        delete this.data[key];
    },

    removeObjects: function(keys) {
        _.each(keys, function(key) {
            this.removeObject(key);
        }.bind(this));
    },

    setData: function(data) {
        if(_.isObject(data)) {
            _.each(data, function(data, index){
                this.set(index, data);
            }.bind(this));
        }

        return this;
    },

    setActions: function(actions, definitions) {
        if(_.isObject(definitions)){
            _.extend(this, definitions);
        }

        if(_.isArray(actions)) {
            _.each(actions, function(actions){
                this.listenToMany(actions);
            }.bind(this));
        } else {
            this.listenToMany(actions);
        }

        return this;
    }
};

var Store = function(data, actions, definition) {
    var store = Reflux.createStore({mixins: [StoreDefinition, definition || {}]});

    store.setData(data || {});
    store.setActions(actions);

    return store;
}


module.exports = Store;