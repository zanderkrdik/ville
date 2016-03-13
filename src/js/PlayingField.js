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
    _FIXME_MaxXTiles: 8,
    defaults: {
        unit: {
            width: 1,
            height: 1
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
        this.set('unit', {
            width: el.width / this._FIXME_MaxXTiles,
            height: el.height / this._FIXME_MaxXTiles
        });
    },
    scale: function (sf) {
        if (this.attributes.unit.width * sf > this.attributes.el.width) {
            return false;
        }
        if (this.attributes.unit.width * sf < this.attributes.el.width / this._FIXME_MaxXTiles) {
            return false;
        }
        this.set('unit', {
            width: this.attributes.unit.width * sf,
            height: this.attributes.unit.height * sf
        });
        return true;

    }
});


const MView = Marionette.LayoutView.extend({
    _banner: null,
    Model: Model,
    template: '#PlayingFieldView',
    regions: {
        structure: '.structure'
    },  
    initialize: function () {
        this._banner = 'PlayingField[' + this.cid + ']';
        log.trace(this._banner + '.initialize');
    },
    onShow: function (element, pos) {
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
        if (this.model.scale(2)) {
            this.render();
        }
    },
    zoomout: function () {
        if (this.model.scale(0.5)) {
            this.render();
        }
    },
    events: {
        'click': 'testClick',
    },
    testClick: function (e) {
        log.trace(this._banner + ':testClick');
        //e.stopPropagation();
    },
    onBeforeRender: function () {
        log.trace(this._banner + ':onBeforeRender');
        this.model = new this.Model({
            el: {
                width: this._parent.$el.width(),
                height: this._parent.$el.height(),
            }
        });
     },
    onRender: function () {
        log.trace(this._banner + ':onRender');
        log.debug(this.$el.width());
        let $canvas = this.$el.find('canvas');
        if ($canvas) {
            let mel = this.model.get('el');
            // <IMPORTANT> This configures canvas' scale.
            $canvas.get(0).width = mel.width;
            $canvas.get(0).height = mel.height;
            // </IMPORTANT>
            this._drawgrid($canvas);
        }
    },
    _drawgrid: function ($canvas) {
        log.trace(this._banner + '._drawgrid');
        if (!$canvas) {
            throw new Error('Inavalid Usage: ' + this._banner + '._drawgrid(JQuery: $canvas)');
        }

        let ctx = $canvas.get(0).getContext('2d');
        if (!ctx) {
            throw new Error('No Context: ' + this._banner + '.MView._drawgrid: No canvas context found. Init error?');
        }

        let unit = this.model.get('unit');
        let mel = this.model.get('el');
        
        // clear any previously drawn elements
        ctx.clearRect(0, 0, mel.width, mel.height);
        
        // draw columns
        for (let i = unit.width; i < mel.width; i = i + unit.width) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, mel.height);
            ctx.stroke();
        }
        // draw rows
        for (let i = unit.height; i < mel.height; i = i + unit.height) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(mel.width, i);
            ctx.stroke();
        }
    },

});

module.exports = MView;
