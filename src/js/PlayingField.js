'use strict';

/**
 * PlayingField
 * Controls the positioning of elements on the visual playing field.
 */

const
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    log = require('loglevel')
        .getLogger('PlayingField');

const Model = Backbone.Model.extend({
    defaults: {
        unit: {
            width: null,
            height: null
        },
        el: {
            width: null,
            height: null,
        },
    },
    initialize: function () {
        let el = this.get('el');
        if (!el.height || !el.width) {
            throw new Error('Must specify the element width & height on construction');
        }
        //this.on('change:el', this._recalc)
        this._recalc(el);
    },
    _recalc: function() {
        log.trace('PlayingField.model._recalc');
        let el = this.get('el');
        this.set('unit', {
            width: el.width / 10,
            height: el.height / 10
        });
    },
    scale: function(sf) {
        this.set('unit', {
            width: this.attributes.unit.width * sf,
            height: this.attributes.unit.height * sf
        });
    }
});

const MView = Marionette.LayoutView.extend({
    el: '#field',
    Model: Model,
    template: '#PlayingFieldView',
    initialize: function () {
        log.trace('PlayingField.initialize');
        this.model = new this.Model({
            el: {
                width: this.$el.width(),
                height: this.$el.height(),
            }
        });
    },
    add: function (element, pos) {
        if (!element || !pos) {
            throw new Error('Both element & position must be specified upon PlayingField.addStructure');
        }

        //Tell the children to listen to our render event
        element.listenTo(this, 'render', function (self) {
            let unit = self.model.get('unit');
            let pospx = [(pos[0] - 1) * unit.height, (pos[1] - 1) * unit.width];
            element.$el
                .css('top', pospx[0])
                .css('left', pospx[1])
                .css('width', unit.width)
                .css('height', unit.height)
                .css('background-size', unit.width + 'px ' + unit.height + 'px');
            element.render();
        }, this);
    },
    zoomin: function () {
        this.model.scale(0.5);
        this.render();
    },
    zoomout: function () {
        this.model.scale(2);
        this.render();
    },
    events: {
        'click': 'testClick',
    },
    testClick: function (e) {
        log.trace('PlayingField:testClick');
        e.stopPropagation();
    },
    onBeforeRender: function () {
        log.trace('PlayingField:onBeforeRender');
        //this.model._recalc();
    },
    onRender: function () {
        log.trace('PlayingField:onRender');
        let $canvas = this.$el.find('canvas');
        if ($canvas) {
            let mel = this.model.get('el');
            // <IMPORTANT> These defs are required.
            // The underlying canvas needs to know its arbitrary scale
            $canvas.get(0).width = mel.width;
            $canvas.get(0).height = mel.height;
            // </IMPORTANT>
            this._drawgrid($canvas);
        }
    },
    _drawgrid: function ($canvas) {
        log.trace('PlayingField._drawgrid');
        if (!$canvas) {
            throw new Error('Inavalid Usage: PlayingField._drawgrid(JQuery: $canvas)');
        }

        let ctx = $canvas.get(0).getContext('2d');
        if (!ctx) {
            throw new Error('PlayingField.MView._drawgrid: No canvas context found. Init error?');
        }

        let unit = this.model.get('unit');
        let mel = this.model.get('el');

        log.debug('mel: %s', JSON.stringify(mel));
        log.debug('unit: %s', JSON.stringify(unit));
        
        //clear any previously drawn elements
        ctx.clearRect(0, 0, mel.width, mel.height);
        // Columns
        for (let i = unit.width; i < mel.width; i = i + unit.width) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, mel.height);
            ctx.stroke();
        }
        // Rows
        for (let i = unit.height; i < mel.height; i = i + unit.height) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(mel.width, i);
            ctx.stroke();
        }
    }

});

module.exports = MView;
