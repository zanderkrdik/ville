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
        el: {
            width: null,
            height: null,
        },
        canvas: {
            width: null,
            height: null,
            scale: 1000,
            unitWidth: 50,
            unitHeight: 50
        },
    },
    initialize: function () {
        // Check for el 
        let el = this.get('el');
        if (!el.height || !el.width) {
            throw new Error('Must specify the element width & height on construction');
        }

        this.on('change', this._recalc);
        this._recalc();
    },
    _recalc: function () {
        console.log('PlayingField.model._recalc');
        this.attributes.canvas.width = this.attributes.canvas.scale;
        this.attributes.canvas.height = this.attributes.canvas.scale * (this.attributes.el.height / this.attributes.el.width);
    }
});

const MView = Marionette.LayoutView.extend({
    el: '#field',
    model: null,
    template: '#PlayingFieldView',
    initialize: function () {
        console.log('PlayingField.initialize');
        this.model = new Model({
            el: {
                width: this.$el.width(),
                height: this.$el.height(),
            }
        });
        this.render();
    },
    add: function (element, pos) {
        if (!element || !pos) {
            throw new Error('Both element & position must be specified upon PlayingField.addStructure');
        }

        let mCanvas = this.model.get('canvas');
        let wScalingFactor = (mCanvas.width / mCanvas.scale) / 2;
        let hScalingFactor = (mCanvas.height / mCanvas.scale) / 2;
        
        // Tell the shildren what to listen to
        element.listenTo(this, 'render', () => {
            let pospx = [(pos[0] - 1) * mCanvas.unitHeight / 2, (pos[1] - 1) * mCanvas.unitWidth / 2];
            element.$el
                .css('top', pospx[0])
                .css('left', pospx[1])
                .css('width', mCanvas.unitWidth * wScalingFactor)
                .css('height', mCanvas.unitHeight * hScalingFactor)
                .css('background-size', (mCanvas.unitWidth * wScalingFactor) + 'px ' + (mCanvas.unitHeight * hScalingFactor + 'px'));
            element.render();
        });
    },
    zoomin: function () {
        let mCanvas = this.model.get('canvas');
        mCanvas.scale = mCanvas.scale / 2;
        console.log('PlayingField.zoomin [%s]', mCanvas.scale);
        this.model.set('canvas', mCanvas);
        this.render();
    },
    zoomout: function () {
        let mCanvas = this.model.get('canvas');
        mCanvas.scale = mCanvas.scale * 2;
        console.log('PlayingField.zoomout [%s]', mCanvas.scale);
        this.model.set('canvas', mCanvas);
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
        let mCanvas = this.model.get('canvas');
        $canvas.get(0).width = mCanvas.width;
        $canvas.get(0).height = mCanvas.height;
        // </IMPORTANT>

        this._drawgrid($canvas);
    },
    _drawgrid: function ($canvas) {
        console.log('PlayingField._drawgrid');
        let ctx = $canvas.get(0).getContext('2d');
        let mCanvas = this.model.get('canvas');

        if (!ctx) {
            throw new Error('PlayingField.MView._drawgrid: No canvas context found. Init error?');
        }
        
        //clear any previously drawn elements
        ctx.clearRect(0, 0, mCanvas.width, mCanvas.height);
        
        // Columns
        for (let i = mCanvas.unitWidth; i < mCanvas.width; i = i + mCanvas.unitWidth) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, mCanvas.height);
            ctx.stroke();
        }

        // Rows
        for (let i = mCanvas.unitHeight; i < mCanvas.height; i = i + mCanvas.unitHeight) {
            ctx.beginPath()
            ctx.moveTo(0, i);
            ctx.lineTo(mCanvas.width, i);
            ctx.stroke();
        }
    }

});

module.exports = MView;
