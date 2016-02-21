'use strict';

const Structure = require('./Structure.js');

class Barn extends Structure {
    init() {
        this.view.$el.addClass('barn');
        //this.render();
        //console.log(this);
    }
    
    describe() {
        console.log(typeof this);
    }
}

module.exports = Barn;