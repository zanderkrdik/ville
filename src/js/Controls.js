'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    log = require('loglevel');

const MView = Marionette.ItemView.extend({
    el: '#fieldcontrols',
    template: '#PlayingFieldControlsView',
    initialize: function() {
        log.trace('Controls.view|initialize');
        this.render();
    },
    events: {
        'click #timecontrol': 'startstop',
        'click #zoomin': 'zoomin',
        'click #zoomout': 'zoomout'
    },
    startstop: function(e) {
        log.trace('click');
    },
    zoomin: function(e) {
        log.trace('click');
        this.trigger('zoomin');
    },
    zoomout: function(e) {
        log.trace('click');
        this.trigger('zoomout');
    }

});

module.exports = MView;
    