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
        this.class = this.model.get('class');
        this.render();
        
    },
    render: function () {
        console.log(this.class + '.view.render');
        let $attachEl =
            'undefined' !== typeof this.$parentEl ?
            this.$parentEl : this.$defaultEl;
        let pos = this.model.get('pos');
        
        pos = [(pos[0] - 1) * 50, (pos[1] - 1) * 50];
        this.$el.css('top', pos[0]);
        this.$el.css('left', pos[1]);

        $attachEl.append(this.$el);
    },
    events: {
        'click': 'clicktest'
    }, 
    clicktest: function() {
        console.log(this.class + ': Click');
    }
    
});

const Model = Backbone.Model.extend({
    initialize: function () {
        console.log(this.get('class') + '.model.init');
    }
});

class Structure {

    constructor(opts) {
        // TODO: Breaks if we don't have SOMETHIGN specified
        // TODO: Change xy to rc in opts. 

        if (!opts || !(opts.pos || (opts.x && opts.y)) || (opts.pos && (opts.x || opts.y))) {
            console.log('broken');
            return;
        }
        this.class = this.constructor.name;
        
        let a;
        
        if (opts.pos) {
            a = {
                class: this.class,
                pos: opts.pos,
                x: opts.pos[0],
                y: opts.pos[1]    
            }
        } else {
            a = {
                class: this.class,
                pos: [opts.x, opts.y],
                x: opts.x,
                y: opts.y    
            }
        }
        
        this.model = new Model(a);
        this.view = new View({ $el: $('#field'), model: this.model });
        this.init();
    }
    
    init() { console.warn('Structure.init not overridden')}

}

module.exports = Structure;
