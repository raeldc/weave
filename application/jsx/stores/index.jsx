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
            this.data[index] = new Store(data);
        } else {
            this.data[index] = data;
        }

        return this;
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