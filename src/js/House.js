'use strict';

const Structure = require('./Structure.js');

class House extends Structure {
    init() {
        this.view.$el.addClass('house');
        //this.render();
        //console.log(this);
    }
    
    describe() {
        console.log(this);
    }
}

module.exports = House;