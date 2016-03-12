'use strict';

const $ = require('jquery');

const Structure = require('./Structure.js');

const MView = Structure.extend({
    jsclass: 'Structure|Barn',
    className: 'structure barn',
        clicktest: function (e) {
        console.log(this.jsclass + ':clicktest');
        this.preventPropagation(e);
        if (!this.model.get('selected')) {
            $(e.currentTarget).css('background-color', 'red');
            this.model.set('selected', true);
        } else {
            $(e.currentTarget).css('background-color', '');
            this.model.set('selected', false);
        }
    }

});

module.exports = MView;
