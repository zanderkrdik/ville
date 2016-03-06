'use strict';

/**
 * The Sandbox
 * Provides placement and distance information to the players. 
 * 
 * Methods:
 * 
 * Add(Structure)
 * - validates the position is available
 * - adds the structure to the internal map
 * - records the structure's position on the map
 * - gives the structure an $el to build upon
 * - adds any lsiteners required to the structure
 * 
 * Remove(Structure) || Remove(Pos)
 * - remove from internal map
 * - remove position from map
 * - remove listeners
 * - delete the $el
 * 
 * ShortestPath(Structure, Structure) || ShortestPath(Pos,Pos)
 * - returns an array of Pos values dictating the shortest path.
 * - accounts for other structures.
 */

const
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;


const Model = Backbone.Model.extend({
    defaults: {
        $elBound: null, // the jquery node representing the drawing area.
        $realElement: null,
        scale: 1000, // the arbitrary internal scale of the drawing area
        unit_x: 100, // the x side length of a single cell, in terms of `scale`
        unit_y: 100, // the y side length of a single cell, in terms of `scale`
        width: null,
            // keep it square for now
        height: null,
        children: [],
        childrenPos: []       
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

        // <IMPORTANT> These defs are required.
        // The underlying canvas needs to know its arbitrary scale
        this.$el.get(0).width = this.model.get('width');
        this.$el.get(0).height = this.model.get('height');
        // </IMPORTANT>

        this.listenTo(this.model,'change', function() {
            console.log('model change');
        });

        this.render();
    }, 
    render: function() {
        console.log('Sandbox.view.render');
        this._drawgrid();
        this.model.get('$realElement').append(this.$el);
    },
    
    _highlightCell: function() {
        let ctx = this.$el.get(0).getContext('2d');
        let uX = this.model.get('unit_x');
        let uW = this.model.get('width');
        let uY = this.model.get('unit_y');
        let uH = this.model.get('height');

        
    },
        // A test function to allow us to see the grid
    _drawgrid: function () {
        
        let ctx = this.$el.get(0).getContext('2d');
        let uX = this.model.get('unit_x');
        let uW = this.model.get('width');
        let uY = this.model.get('unit_y');
        let uH = this.model.get('height');
        
        if (!ctx) {
            throw new Error('Sandbox: No canvas context found. Init error?');
        }
        
        // Columns
        for (let i = uX; i < uW; i = i + uX) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, uH);
            ctx.stroke();
        }

        // Rows
        for (let i = uY; i < uH; i = i + uY) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(uW, i);
            ctx.stroke();
        }
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
    }
    add(element) {
        if (!element) {
            return;
        }
        
        let requestedPos = element.model.get('pos');
        let children = this.model.get('children');
        let childrenPos = this.model.get('childrenPos');
        let scalingFactor = this.model.get('$realElement').css('width') / this.model.get('$realElement').get(0).width; 

        if (childrenPos.indexOf(requestedPos) !== -1) {
            console.log('Sandbox: Something already in that position');
            // TODO: Throw error
            return;
        }
        
        children.push(element);
        childrenPos.push(requestedPos);
        
        // Tell the shildren what to listen to
        element.model.listenTo(this.model,'Sandbox:render', () => {
            requestedPos = [(requestedPos[0] - 1) * this.model.get('unit_y')/2, (requestedPos[1] - 1) *  this.model.get('unit_x')/2];
            element.view.$el.css('top', requestedPos[0]);
            element.view.$el.css('left', requestedPos[1]);
            element.view.$el.css('width', this.model.get('unit_x') * scalingFactor);
            element.view.$el.css('height', this.model.get('unit_y') * scalingFactor);
            element.view.$el.css('background-size', this.model.get('unit_x') * scalingFactor);
            
            element.render();
        });
        
        // this.model.listenTo(element.view,'render', (view) => {
        //     console.log('reredner');
        //     requestedPos = [(requestedPos[0] - 1) * this.model.get('unit_y')/2, (requestedPos[1] - 1) *  this.model.get('unit_x')/2];
        //     view.$el.css('top', requestedPos[0]);
        //     view.$el.css('left', requestedPos[1]);
        // });        
    }
    render() {
        console.log('Sandbox.render');
        this.model.trigger('Sandbox:render');
    }
}

module.exports = Sandbox;