(function(window){
    //I recommend this
    'use strict';
    function define_html5_test() {
        var html5_test = {};
        html5_test.existsElement = function(tag) {
            var element = document.createElement(tag);
            return Object.prototype.toString.call(element) !== '[object HTMLUnknownElement]';
        }
        html5_test.inputType = function(type) {
            var element = document.createElement('input');
            element.type = type;
            var supported = false;
            if (element.type === type){
                supported = true;
            }
            element.value = "I'm Baymax";
            var valueSupported = (element.value === "I'm Baymax");
            switch (type) {
                case "email":
                case "url":
                    if (!input.validationMessage) {
                        supported = false;
                    }
                    break;
                case "color":
                case "date":
                case "datetime":
                case "month":
                case "number":
                case "time":
                case "week":
                    if (valueSupported) {
                        supported = false;
                    } 
                    break;
                default:
                    supported = false;
            }
            element.value = '';
            return supported;
        }
        return html5_test;
    }
    function define_css_test() {
        var css_test = {};
        var div = document.createElement('div');
        var vendors = 'khtml ms o moz webkit'.split(' ');
        css_test.supports = function(style, withPrefix) {
            withPrefix = typeof withPrefix !== 'undefined' ? withPrefix : false;

            if (style in div.style)
                return true;
            if (!withPrefix) {
                style = style.replace(/^[a-z]/, function(val) {
                    return val.toUpperCase();
                });
                var len = vendors.length;
                for (var i = 0; i < len; ++i) {
                    if (vendors[i]+style in div.style)
                        return true;
                }
            }
            
            return false;
        }
        css_test.validProp = function(prop, val) {
            if (!this.supports(prop))
                return false;
            div.style[prop] = val;
            return (div.style[prop] === val);
        }
        return css_test;
    }
    function define_performance() {
        var performance = {};
    }
    function define_library(){
        var Baymax = {};
        var name = "Timmy";
        Baymax.greet = function(){
            alert("Hello I'm Baymax!");
        }
        Baymax.html5_test = define_html5_test();
        Baymax.css_test = define_css_test();
        Baymax.performance = define_performance();
        return Baymax;
    }
    //define globally if it doesn't already exist
    if(typeof(Baymax) === 'undefined'){
        window.Baymax = define_library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);