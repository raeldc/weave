module.exports = {
    getInitialState: function() {
        this.addEvent('onMouseOver', this.addHoverClass);
        this.addEvent('onMouseOut', this.removeHoverClass);
        this.addEvent('onClick', this.expClick);
    },

    addHoverClass: function(event) {
        this.addClass('hover');
        this.forceUpdate();
        event.stopPropagation();
    },

    removeHoverClass: function(event) {
        this.removeClass('hover');
        this.forceUpdate();
        event.stopPropagation();
    },

    expClick: function(event) {
        console.log('click');
        event.stopPropagation();
    },
}