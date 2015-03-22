module.exports = {
    componentWillMount: function() {
        this.attachEvents();
    },

    addEvent: function(event, fn) {
        if(this.events === undefined) {
            this.events = {};
        }

        if(this.events[event] === undefined) {
            this.events[event] = [];
        }

        // Danger, potential memory leak if not used properly
        if(typeof fn === 'function') {
            this.events[event].push(fn);
        }
    },

    attachEvents: function() {
        var self       = this;
        var properties = this.nodeProperties;

        _.each(this.events, function(functions, index){
            if(properties[index] === undefined) {
                properties[index] = (function(functions){
                    return function(event){
                        _.each(functions, function(fn, index){
                            fn.call(self, event);
                        });
                    }
                })(functions);
            }
        });
    },
}