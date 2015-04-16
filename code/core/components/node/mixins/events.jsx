module.exports = {
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

        this.attachEvents();
    },

    removeEvent: function(oldevent, fn) {
        var events = this.events || {};
        if(events[oldevent] === undefined) return;

        if(_.size(events[oldevent])) {
            events[oldevent] = _.without(events[oldevent], fn);
        }

        if(_.size(events[oldevent]) === 0) {
            delete events[oldevent];
        }

        this.attachEvents();
    },

    attachEvents: function() {
        var self       = this;
        var properties = this.nodeProperties;

        _.each(this.events, function(functions, index){
            if(_.size(functions)) {
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