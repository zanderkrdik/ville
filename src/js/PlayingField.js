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
        // `el` represents the core drawing element
        // this representation used to calculate locations
        // bound to the view's change events.
        el: {
            width: null,
            height: null,
        },
        canvas: {
            width: null,
            height: null,
            scale: 1000,
            unitWidth: 100,
            unitHeight: 100
        },
    },
    initialize: function () {
        let el = this.get('el');
        if (!el.height || !el.width) {
            throw new Error('Must specify the element width & height on construction');
        }

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

        // Tell the children to listen to our render event
        //let self = this;
        element.listenTo(this, 'render', function (self) {
            let mCanvas = self.model.get('canvas');
            let mEl = self.model.get('el');
            let wScalingFactor = (mEl.width / mCanvas.scale);
            let hScalingFactor = (mEl.height / mCanvas.scale);
            let pospx = [(pos[0] - 1) * mCanvas.unitHeight, (pos[1] - 1) * mCanvas.unitWidth];
            element.$el
                .css('top', pospx[0]* hScalingFactor)
                .css('left', pospx[1]* wScalingFactor)
                .css('width', mCanvas.unitWidth * wScalingFactor)
                .css('height', mCanvas.unitHeight * hScalingFactor)
                .css('background-size', (mCanvas.unitWidth * wScalingFactor) + 'px ' + (mCanvas.unitHeight * hScalingFactor + 'px'));
            element.render();
        }, this);
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
        this.model._recalc();
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
        console.log(mCanvas.height);
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
