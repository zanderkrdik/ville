'use strict';

const
    $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

const View = Backbone.View.extend({
    // Spec either `el` or `tagName` & `className` to bind the view
    el: '#field',
    $canvas: $('<canvas style="position:absolute;" id="drawingspace" width=1000 height=1000></canvas>'),
    initialize: function () {
        console.log('FOV.view.init');
        console.log(this.$el.width());
        console.log(this.$el.height());
        //this._creategrid();
        
        
        this.grid = {
            
        }
        
        
        
        
        
        
        
        
        this.render();
    },

    render: function () {
        console.log('FOV.view.render');
        this.$canvas.width(this.$el.width());
        this.$canvas.height(this.$el.height());
        this._drawgrid();
        this.$el.html(this.$canvas);
    },

    events: {
        'click': 'clicktest'
    },

    clicktest: function () {
        console.log('FOV clicktest');
    },

    // let's see how backbone really scales.
    _creategrid: function () {
        var CellModel = Backbone.Model.extend({
            defaults: {
                x: 0,
                y: 0,
                xyid: 0
            },
            initialize: function () {

            }
        });

        var self = this;
        var GridCollection = Backbone.Collection.extend({
            model: CellModel,
            initialize: function () {
                let canvas = self.$canvas.get(0);
                let ctx = canvas.getContext('2d');

                if (!ctx) {
                    // TODO: Throw error
                    console.warn('no canvas');
                    return;
                }

                let i = 0;
                let modi = 100 % canvas.width;
                let maxi = canvas.width - modi;
                let modj = 100 % canvas.height;
                let maxj = canvas.height - modj;
                 
                 while (i < maxi) {
                    i = i + modi;
                    let j = 0;
                      while (j < maxj) {
                          j = j + modj;
                          //console.log('I: %i, J: %i',i,j);
                          //this.add(new this.model({i, j}));
                      }
                 }
                
            }
        });

        var gridcoll = new GridCollection();
        console.log(gridcoll);
    },

    // A test function to allow us to see the grid
    _drawgrid: function () {
        let canvas = this.$canvas.get(0);
        let ctx = canvas.getContext('2d');

        if (!ctx) {
            // TODO: Throw error
            console.warn('no canvas');
            return;
        }

        // TODO: [1] REfector these two axis instruction sets into something nice.
        
        let i = 0;
        let modi = 100 % canvas.width;
        let maxi = canvas.width - modi;

        while (i < maxi) {
            i = i + modi;
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 1000);
            ctx.stroke();
        }

        i = 0;
        modi = 100 % canvas.height;
        maxi = canvas.height - modi;

        while (i < maxi) {
            i = i + modi;
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(1000, i);
            ctx.stroke();
        }
        
        // /TODO:[1]
    }

});

const Model = Backbone.Model.extend({
    defaults: {
    },
    initialize: function () {
        console.log('FOV.model.init');
    }
});

class FieldOfView {

    constructor() {
        this.model = new Model();
        this.view = new View({ $el: $('#field'), model: this.model });
        this.init();
    }

    static initialize($controls) {
        console.log('FOV.initialize(' + $controls + ')');
    }

    init() { console.warn('FOV.init not overridden') }



}

module.exports = FieldOfView;
