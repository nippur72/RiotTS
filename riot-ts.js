var Riot;
(function (Riot) {
    var Observable = (function () {
        function Observable() {
            riot.observable(this);
        }
        Observable.prototype.on = function (events, callback) { };
        Observable.prototype.one = function (events, callback) { };
        Observable.prototype.off = function (events) { };
        Observable.prototype.trigger = function (eventName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        return Observable;
    })();
    Riot.Observable = Observable;
    var Element = (function () {
        function Element() {
        }
        Element.prototype.update = function (data) { };
        Element.prototype.unmount = function (keepTheParent) { };
        Element.prototype.on = function (eventName, fun) { };
        Element.prototype.one = function (eventName, fun) { };
        Element.prototype.off = function (events) { };
        Element.prototype.trigger = function (eventName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        Element.prototype.mixin = function (mixinObject, instance) { };
        Element.register = function () {
            registerClass(this);
        };
        Element.createElement = function (options) {
            var tagName = this.prototype.tagName;
            var el = document.createElement(tagName);
            riot.mount(el, tagName, options);
            return el;
        };
        return Element;
    })();
    Riot.Element = Element;
    // new extend, works with getters and setters
    function extend(d, element) {
        var map = Object.keys(element.prototype).reduce(function (descriptors, key) {
            descriptors[key] = Object.getOwnPropertyDescriptor(element.prototype, key);
            return descriptors;
        }, {});
        Object.defineProperties(d, map);
    }
    /* old extend, without getters and setters
    function extend(d, element) {
       Object.keys(element.prototype).forEach((key) => d[key] = element.prototype[key]);
    }
    */
    function registerAll() {
        Riot.waitingToBeRegistered.map(function (el) { return el.register(); });
        Riot.waitingToBeRegistered = [];
    }
    Riot.registerAll = registerAll;
    Riot.waitingToBeRegistered = [];
    function registerClass(element) {
        function registerTag(template) {
            var transformFunction = function (opts) {
                // copies prototype into "this"            
                extend(this, element);
                // calls class constructor applying it on "this"
                element.apply(this, [opts]);
                if (element.prototype.mounted !== undefined)
                    this.on("mount", this.mounted);
                if (element.prototype.unmounted !== undefined)
                    this.on("unmount", this.unmounted);
                if (element.prototype.updating !== undefined)
                    this.on("update", this.updating);
                if (element.prototype.updated !== undefined)
                    this.on("updated", this.updated);
            };
            var compiled = riot.compile(template, true);
            var r = compiled.indexOf("riot.tag(");
            var stripped = compiled.substr(r + 9);
            var x = stripped.lastIndexOf(", function(opts) {");
            stripped = stripped.substr(0, x);
            var compiledTemplate = eval("[" + stripped + "]");
            var tagName = compiledTemplate.length > 0 ? compiledTemplate[0] : "";
            var html = compiledTemplate.length > 1 ? compiledTemplate[1] : "";
            var css = compiledTemplate.length > 2 ? compiledTemplate[2] : "";
            var attr = compiledTemplate.length > 3 ? compiledTemplate[3] : undefined;
            riot.tag(tagName, html, css, attr, transformFunction);
            return tagName;
        }
        var template;
        // gets string template, directly, via #id or via http request
        if (Object.keys(element.prototype).indexOf("template") >= 0) {
            template = element.prototype.template;
            if (template.indexOf("<") < 0) {
                var req = new XMLHttpRequest();
                // TODO do it asynchronously
                req.open("GET", template, false);
                req.send();
                if (req.status == 200) {
                    template = req.responseText;
                    element.prototype.tagName = registerTag(template);
                }
                return;
            }
            else {
                element.prototype.tagName = registerTag(template);
            }
        }
        else
            throw "template property not specified";
    }
    Riot.registerClass = registerClass;
})(Riot || (Riot = {}));
// @template decorator
function template(template) {
    return function (target) {
        target.prototype["template"] = template;
        Riot.waitingToBeRegistered.push(target);
    };
}
//# sourceMappingURL=riot-ts.js.map