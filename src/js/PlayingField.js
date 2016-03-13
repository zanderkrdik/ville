'use strict';

/**
 * PlayingField
 * Controls the positioning of elements on the visual playing field.
 */

const
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette');

const Model = Backbone.Model.extend({
    defaults: {
        $realElement: null,
        // the arbitrary internal scale of the drawing area
        scale: 1000, 
        // the x side length of a single cell, in terms of `scale`
        unit_x: 50, 
        // the y side length of a single cell, in terms of `scale`
        unit_y: 50,
        width: null,
        // keep it square for now
        height: null,
    },
    initialize: function (opts) {
        this.on('change', this._recalc);
    },
    _recalc: function () {
        console.log('PlayingField.model._recalc');
        let $rel = this.attributes.$realElement;
        this.attributes.width = this.attributes.scale;
        this.attributes.height = this.attributes.scale * ($rel.height() / $rel.width());
    }
});

const MView = Marionette.LayoutView.extend({
    el: '#field',
    model: null,
    template: '#PlayingFieldView',
    initialize: function () {
        console.log('PlayingField.initialize');
        this.model = new Model();
        this.model.set('$realElement', this.$el);
        this.render();
    },
    add: function (element) {
        if (!element) {
            return;
        }

        let requestedPos = element.model.get('pos');
        let wScalingFactor = (this.model.get('width') / this.model.get('scale'))/2;
        let hScalingFactor = (this.model.get('height') / this.model.get('scale'))/2;
        
        // Tell the shildren what to listen to
        element.listenTo(this, 'render', () => {
            requestedPos = [(requestedPos[0] - 1) * this.model.get('unit_y') / 2, (requestedPos[1] - 1) * this.model.get('unit_x') / 2];
            element.$el.css('top', requestedPos[0]);
            element.$el.css('left', requestedPos[1]);
            element.$el.css('width', this.model.get('unit_x') * wScalingFactor);
            element.$el.css('height', this.model.get('unit_y') * hScalingFactor);
            element.$el.css('background-size', (this.model.get('unit_x') * wScalingFactor) + 'px ' + (this.model.get('unit_y') * hScalingFactor +'px'));

            element.render();
        });

    },
    zoomin: function() {
        let scale = this.model.get('scale');
        console.log('PlayingField.zoomin [%s]', scale);
        this.model.set('scale',scale / 2);
        this.render();
    },
    zoomout: function() {
        let scale = this.model.get('scale');
        console.log('PlayingField.zoomout [%s]', scale);
        this.model.set('scale',scale * 2);
        this.render();
    },
    events: {
        'click': 'testClick',
    },
    testClick: function (e) {
        e.stopPropagation();
        console.log('PlayingField:testClick');
    },
    onBeforeRender: function () {
        console.log('PlayingField:onBeforeRender');
    },
    onRender: function () {
        console.log('PlayingField:onRender');
        // <IMPORTANT> These defs are required.
        // The underlying canvas needs to know its arbitrary scale
        let $canvas = this.$el.find('canvas');
        $canvas.get(0).width = this.model.get('width');
        $canvas.get(0).height = this.model.get('height');
        // </IMPORTANT>

        this._drawgrid($canvas);
    },
    _drawgrid: function ($canvas) {
        let ctx = $canvas.get(0).getContext('2d');
        let uX = this.model.get('unit_x');
        let uW = this.model.get('width');
        let uY = this.model.get('unit_y');
        let uH = this.model.get('height');

        if (!ctx) {
            throw new Error('PlayingField.MView._drawgrid: No canvas context found. Init error?');
        }
        
        //clear any previously drawn elements
        ctx.clearRect(0,0,uW,uH);
        
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

module.exports = MView;
