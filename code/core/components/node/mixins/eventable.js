module.exports = {
    getInitialState: function() {
        if(this.properties === undefined) {
            this.properties = {};
        }
    },

    /**
     * Add an event
     * @param {string}   event The event name. Can be namespaced with "."
     * @param {Function} fn    The function attached to the event
     */
    addEvent: function(event, fn) {
        if(this.events === undefined) {
            this.events = {};
        }

        if(this.events[event] === undefined) {
            this.events[event] = fn;
        }

        return this;
    },

    /**
     * Remove the event using a namespace
     * @param  {String}   event The event name
     */
    removeEvent: function(event) {
        var events = this.events || {};

        if(events[event]) {
            delete events[event];
        }

        return this;
    },

    /**
     * Attach events into a properties object
     *     Best used within render() before the properties object
     *     is passed as props of an element
     * @param {object} properties The properties object
     * @return {object} The properties object with events
     */
    setEvents: function() {
        var self       = this;
        var properties = this.properties || {};
        var events     = {};

        // Attach the functions from different namespaces
        _.each(this.events || [], function(fn, index){
            var name = index.split('.').shift();

            if(!(events[name] instanceof Array)) {
                events[name] = [];
            }

            events[name].push(fn);
        });

        // Set the events to the properties object
        _.each(events, function(fns, event){
            if(_.size(fns)) {
                properties[event] = (function(fns){
                    return function(event){
                        _.each(fns, function(fn, index){
                            fn.call(self, event);
                        });
                    }
                })(fns);
            }
        })

        return properties;
    },
}