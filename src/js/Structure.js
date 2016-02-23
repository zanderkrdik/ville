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
        this.class = this.model.get('class');
        console.log(this.class + '.view.init');
        this.on('render', function() {
            console.log('rendering!');
        });
        
        this.listenTo(this.model,'change:pos', function(i) {
            this.render();
        })


    },
    render: function () {
        console.log(this.class + '.view.render');
        let $attachEl =
            'undefined' !== typeof this.$parentEl ?
            this.$parentEl : this.$defaultEl;

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
            };
        } else {
            a = {
                class: this.class,
                pos: [opts.x, opts.y],
                x: opts.x,
                y: opts.y    
            };
        }
        
        this.model = new Model(a);
        this.view = new View({ $el: $('#field'), model: this.model });
        this.init();
    }
    
    init() { console.warn('Structure.init not overridden'); }
    
    render() {
        this.view.render();
    }

}

module.exports = Structure;
