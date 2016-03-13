'use strict';

const 
    log = require('loglevel'),
    $ = require('jquery');

const Structure = require('./Structure.js');

const MView = Structure.extend({
    jsclass: 'Barn',
    className: 'structure barn',
    clicktest: function (e) {
        log.trace(this._banner + ':clicktest');
        this.preventPropagation(e);
        // if (!this.model.get('selected')) {
        //     $(e.currentTarget).css('background-color', 'red');
        //     this.model.set('selected', true);
        // } else {
        //     $(e.currentTarget).css('background-color', '');
        //     this.model.set('selected', false);
        // }
    }

});

module.exports = MView;
