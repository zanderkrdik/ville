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
    jsclass: 'Structure',
    Model: Model,
    $defaultEl: $('#field'),
    tagName: 'div',
    className: 'structure house',
    initialize: function (opts) {
        console.log(this.jsclass + ".initialize");
      
        // TODO: Breaks if we don't have SOMETHIGN specified
        // TODO: Change xy to rc in opts. 

        if (!opts || !(opts.pos || (opts.x && opts.y)) || (opts.pos && (opts.x || opts.y))) {
            console.log('broken');
            return;
        }
        
        let a;
 
        if (opts.pos) {
            a = {
                pos: opts.pos,
                x: opts.pos[0],
                y: opts.pos[1]    
            };
        } else {
            a = {
                pos: [opts.x, opts.y],
                x: opts.x,
                y: opts.y    
            };
        }
        
        a.jsclass = this.jsclass;
        
        this.model = new Model(a);
        this.listenTo(this.model,'change:pos', function(i) {
            this.render();
        });

        this.on('render', function() {
            this.render();
        });

    },
    render: function () {
        console.log(this.jsclass + '.render');
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
