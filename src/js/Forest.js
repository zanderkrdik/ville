'use strict';

const Structure = require('./Structure.js');

class Forest extends Structure {
    init() {
        this.view.$el.addClass('forest');
    }
}

module.exports = Forest;