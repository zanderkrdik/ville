'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette');

const MView = Marionette.ItemView.extend({
    el: '#fieldcontrols',
    template: '#PlayingFieldControlsView',
    initialize: function() {
        console.log('Controls.view|initialize');
        this.render();
    },
    events: {
        'click #timecontrol': 'startstop',
        'click #zoomin': 'zoomin',
        'click #zoomout': 'zoomout'
    },
    startstop: function(e) {
        console.log('click');
    },
    zoomin: function(e) {
        console.log('click');
        this.trigger('zoomin');
    },
    zoomout: function(e) {
        console.log('click');
        this.trigger('zoomout');
    }

});

module.exports = MView;
    