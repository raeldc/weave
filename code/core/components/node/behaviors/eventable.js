/**
 * Attach events into a component before render
 * @param {component} The component where the events will be attached
 */
function beforeRender(component) {
    let events = {};

    // Attach the functions from different namespaces
    _.each(component.events || [], function(fn, index){
        let name = index.split('.').shift();

        if(!(events[name] instanceof Array)) {
            events[name] = [];
        }

        events[name].push(fn);
    });

    // Set the events to the properties object
    _.each(events, function(fns, event){
        if(_.size(fns)) {
            component.setProperty(event, (function(fns, component){
                return function(event){
                    _.each(fns, function(fn, index){
                        fn.call(component, event);
                    });
                }
            })(fns, component))
        }
    })
}

/**
 * Add an event
 * @param {string}   event The event name. Can be namespaced with "."
 * @param {Function} fn    The function attached to the event
 */
export function addEvent(component, event, fn) {
    if(component.events === undefined) {
        component.events = {};
    }

    if(component.events[event] === undefined) {
        component.events[event] = fn;
    }

    return this;
}

/**
 * Remove the event using a namespace
 * @param  {String}   event The event name
 */
export function removeEvent(component, event) {
    component.events = component.events || {};

    if(component.events[event]) {
        delete component.events[event];
    }

    return this;
}

export default {beforeRender, addEvent, removeEvent}