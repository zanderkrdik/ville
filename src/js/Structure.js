'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;


const View = Backbone.View.extend({
    $defaultEl: $('#field'),
    tagName: 'div',
    className: 'structure',
    initialize: function () {
        console.log('Structure.view.init');
        this.render();
    },
    render: function () {
        console.log('Structure.view.render');
        let $attachEl =
            'undefined' !== typeof this.$parentEl ?
            this.$parentEl : this.$defaultEl;
        $attachEl.append(this.$el);
    },
    events: {
        'click': 'clicktest'
    }, 
    clicktest: () => console.log('ping')
    
});

const Model = Backbone.Model.extend({
    initialize: function () {
        console.log('Structure.model.init');
    }
});

class Structure {

    constructor() {
        this.model = new Model();
        this.view = new View({ $el: $('#field'), model: this.model });
        this.init();
    }

    static initialize($controls) {
        console.log('Structure.initialize(' + $controls + ')');
    }
    
    init() { console.warn('Structure.init not overridden')}

}

module.exports = Structure;
