 /**
 * Input widget
 */

define( function ( require ) {

    var prefix = '_fui_',
        $ = require( "base/jquery" ),
        tpl = require( 'tpl/input' ),
        Utils = require( "base/utils" );

    return require( "base/utils" ).createClass( "Input", {

        base: require( "widget/widget" ),

        constructor: function ( options ) {

            var marker = Utils.getMarker();
            this.callBase( marker );

            var defaultOptions = {
                width: null,
                height: null,
                border: null,
                padding: null,
                color: null
            };

            this.__extendOptions( defaultOptions, options );

            this.widgetName = 'Input';
            this.__tpl = tpl;
            // input构件允许获取获得
            this.__allow_focus = true;

            if ( options !== marker ) {
                this.__render();
            }

        },

        getValue: function () {
            return this.__element.value;
        },

        setValue: function ( value ) {
            this.__element.value = value;
            return this;
        },

        selectAll: function () {
            this.__element.select();
        },

        selectRange: function ( startIndex, endIndex ) {

            if ( !startIndex ) {
                startIndex = 0;
            }

            if ( !endIndex ) {
                endIndex = 1000000000;
            }

            this.__element.setSelectionRange( startIndex, endIndex );

        },

        focus: function () {

            this.__element.focus();
            return this;

        },

        unfocus: function () {

            this.__element.blur();
            return this;

        },

        __render: function () {

            if ( this.__rendered ) {
                return this;
            }

            this.__initOptions();

            this.callBase();

            this.__initInputEvent();

        },

        __initInputEvent: function () {

            this.on( "keydown", function ( e ) {

                if ( e.keyCode === 13 ) {
                    this.trigger( "inputcomplete", {
                        value: this.getValue()
                    } );
                }

            } );

        },

        __initOptions: function () {

            this.__options.__css = Utils.getCssRules( [ 'width', 'height', 'border', 'padding', 'color' ], this.__options );

        }

    } );

} );