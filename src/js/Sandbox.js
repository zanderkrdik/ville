'use strict';

/**
 * The Sandbox
 * Provides placement and distance information to the players. 
 * 
 */




const
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

const SCALE = 1000;

const Model = Backbone.Model.extend({
    defaults: {
        $realElement: null,
        scale: SCALE,
        width: null,
            // keep it square for now
        height: null,        
    },
    initialize: function() {
        console.log('Sandbox.model.initialize');
        
        this.on('change:$realElement', (i) => {
            let $rel = i.attributes.$realElement;
            i.attributes.width = i.attributes.scale;
            i.attributes.height = i.attributes.scale * ($rel.height() / $rel.width());
            return i;
        });
        
    },    
});

const View = Backbone.View.extend({
    tagName: 'canvas',
    className: 'Sandbox',
    initialize: function() {
        console.log('Sandbox.view.initialize');
        this.canvas = this.$el.get(0);
        this.canvas.width = this.model.get('width');
        this.canvas.height = this.model.get('height');
        this.$parentEl = this.model.get('$realElement');
        this.cell = {
            width: 100,
            height: 100
        };
        this.render();
    }, 
    render: function() {
        console.log('Sandbox.view.render');
        this._drawgrid();

        this.$parentEl.append(this.$el);
    },
        // A test function to allow us to see the grid
    _drawgrid: function () {
        let ctx = this.canvas.getContext('2d');

        if (!ctx) {
            // TODO: Throw error
            console.warn('no canvas');
            return;
        }

        // TODO: [1] REfector these two axis instruction sets into something nice.
        
        let i = 0;
        let maxi = this.canvas.width - this.cell.width;

        while (i < maxi) {
            i = i + this.cell.width;
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.canvas.height);
            ctx.stroke();
        }

        i = 0;
        maxi = this.canvas.height - this.cell.height;

        while (i < maxi) {
            i = i + this.cell.height;
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(this.canvas.width, i);
            ctx.stroke();
        }
        
        // /TODO:[1]
    }

});

        const sColl = Backbone.Collection.extend({
            model: Model,
            locations: [],
            initialize: function() {
                console.log('Sandbox.constructor.structureCollection.initialize');
            },
            add: function(item) {
                if (!item || !item.attributes) {
                    return;
                }
                //item.view.render()
                console.log(item.attributes);
                let pos = item.attributes.pos;
                if (!pos) {
                    return;
                }
                if (this.locations.indexOf(pos) === -1) {
                    this.locations.push(pos);
                    console.log(this.locations);
                } else {
                    console.log('dupe!');
                }
                return item;
            }
        });

// Creates a model of the local world
// handles the addition and subtraction of elements
// handles the placement of elements
class Sandbox {
    constructor($el) {
        this.model = new Model();//{$realElement: $el});
        this.model.set('$realElement', $el);
        this.view = new View({model: this.model});
        this.structureCollection = new sColl({model: this.model});
    }
    add(element) {
        if (!element) {
            return;
        }
        //TODO: make sure it is an instance of a structure
        console.log(element);
        element.render();
    }
    render() {
        console.log('render');
        //this.structureCollection.trigger('render');
    }
}

module.exports = Sandbox;