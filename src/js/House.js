'use strict';

const Structure = require('./Structure.js');

class House extends Structure {
    init() {
        this.view.$el.addClass('house');
    }
}

module.exports = House;