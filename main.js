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
        var perf = {};
        var memory = window.performance.memory;
        var timing = window.performance.timing;
        perf.networkLatency = function() {
            return timing.responseEnd - 
                timing.fetchStart;
        }
        perf.redirectTime = function() {
            return timing.redirectEnd - timing.redirectStart;
        }
        perf.memoryUsage = function() { //available in Chrome
            if (memory != undefined) {
                return memory.usedJSHeapSize / memory.totalJSHeapSize;
            }
            else {
                return undefined;
            }
        }

        var counter  = 0;
        perf.lastframe = 0;
        perf.fpsRunning = false;
        perf.renderFunc = null;
        perf.fpsUpdate = function() {
            console.log(perf.fps());
            if (perf.fpsRunning) {
                perf.lastframe = performance.now();
                perf.renderFunc();
                window.requestAnimationFrame(perf.fpsUpdate);
            }
            counter ++;
            if (counter == 200){
                perf.fpsRunning = false;
            }
        }
        perf.fpsStart = function(renderFunc){
            perf.renderFunc = renderFunc;
            perf.fpsRunning = true;
            perf.fpsUpdate();
        }
        perf.fpsEnd = function() {
            perf.fpsRunning = false;
        }
        perf.fps = function() {
            return parseInt(1000/(performance.now() - perf.lastframe)); 
        }
        return perf;
    }

    function define_testcase() {
        var testcase = {};

        return testcase;
    }

    function define_library(){
        var Baymax = {};
        var name = "Timmy";
        Baymax.greet = function(){
            alert("Hello I'm Baymax!");
        }
        Baymax.aboutBrowser = function() {
            var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
            if(/trident/i.test(M[1])){
                tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
                return {name:'IE',version:(tem[1]||'')};
                }   
            if(M[1]==='Chrome'){
                tem=ua.match(/\bOPR\/(\d+)/)
                if(tem!=null)   {return {name:'Opera', version:tem[1]};}
                }   
            M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
            return {
                type: 'browser',
                os: navigator.platform,
                browser_name: M[0],
                browser_version: M[1]
            };
        }
        Baymax.html5_test = define_html5_test();
        Baymax.css_test = define_css_test();
        Baymax.performance = define_performance();
        Baymax.testcase = define_testcase();
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