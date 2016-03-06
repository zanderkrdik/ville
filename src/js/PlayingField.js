'use strict';

const
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette');

const Model = Backbone.Model.extend({
    defaults: {
        $realElement: null,
        scale: 1000, // the arbitrary internal scale of the drawing area
        unit_x: 100, // the x side length of a single cell, in terms of `scale`
        unit_y: 100, // the y side length of a single cell, in terms of `scale`
        width: null,
        // keep it square for now
        height: null,
    },
    initialize: function (opts) {
        //console.log('PlayingField.Model.initialize');
     
        this.on('change', this._recalc);
    },
    _recalc: function () {
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
        this.model = new Model();
        this.model.set('$realElement', this.$el);
        this.render();
    },
    events: {
        'click': 'testClick',
    },
    testClick: function (e) {
        console.log('Field: testClick');
    },
    onBeforeRender: function () {
        console.log('PlayingField.MView:onBeforeRender');
    },
    onRender: function () {
        // <IMPORTANT> These defs are required.
        // The underlying canvas needs to know its arbitrary scale
        var $canvas = this.$el.find('canvas');
        console.log(this.model);
        $canvas.get(0).width = this.model.get('width');
        $canvas.get(0).height = this.model.get('height');
        // </IMPORTANT>

        this._drawgrid(this.$el.find('canvas'));
    },
    _drawgrid: function ($canvas) {
        'use strict';

        let ctx = $canvas.get(0).getContext('2d');
        let uX = this.model.get('unit_x');
        let uW = this.model.get('width');
        let uY = this.model.get('unit_y');
        let uH = this.model.get('height');

        if (!ctx) {
            throw new Error('PlayingField.MView._drawgrid: No canvas context found. Init error?');
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

module.exports = MView;
