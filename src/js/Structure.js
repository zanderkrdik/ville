'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone'),
   Marionette = require('backbone.marionette');


const Model = Backbone.Model.extend({
    defaults: {
        jsclass: 'Structure'    
    },
    initialize: function () {
        console.log(this.get('jsclass') + '.model.init');
    }
});

const MView = Marionette.ItemView.extend({
    model: null,
    $defaultEl: $('#field'),
    tagName: 'div',
    className: 'structure house',
    initialize: function (opts) {
        // TODO: Breaks if we don't have SOMETHIGN specified
        // TODO: Change xy to rc in opts. 

        if (!opts || !(opts.pos || (opts.x && opts.y)) || (opts.pos && (opts.x || opts.y))) {
            console.log('broken');
            return;
        }
        
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
        
        this.listenTo(this.model,'change:pos', function(i) {
            this.render();
        });


    },
    render: function () {
        console.log(this.model.get('jsclass') + '.view.render');
        let $attachEl =
            'undefined' !== typeof this.$parentEl ?
            this.$parentEl : this.$defaultEl;
        $attachEl.append(this.$el);
    },
    events: {
        'click': 'clicktest'
    }, 
    clicktest: function(e) {
        e.stopPropagation();
        console.log(this.class + ': Click');
    }
    
});


module.exports = MView;
