System.register(["riot", "riot-compiler"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var riot, compile;
    var Observable, Element, precompiledTags, base;
    function extend(d, element) {
        var map = Object.keys(element.prototype).reduce(function (descriptors, key) {
            descriptors[key] = Object.getOwnPropertyDescriptor(element.prototype, key);
            return descriptors;
        }, {});
        Object.defineProperties(d, map);
    }
    function registerClass(element) {
        function registerTag(compiledTag) {
            var transformFunction = function (opts) {
                extend(this, element);
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
            riot.tag2(compiledTag.tagName, compiledTag.html, compiledTag.css, compiledTag.attribs, transformFunction, riot.settings.brackets);
            return compiledTag.tagName;
        }
        function loadTemplateFromHTTP(template) {
            var req = new XMLHttpRequest();
            req.open("GET", template, false);
            req.send();
            if (req.status == 200)
                return req.responseText;
            else
                throw req.responseText;
        }
        ;
        var compiled;
        if (element.prototype.template !== undefined) {
            var tagTemplate = element.prototype.template;
            if (tagTemplate.indexOf("<") < 0) {
                if (precompiledTags[tagTemplate] !== undefined) {
                    compiled = precompiledTags[tagTemplate];
                }
                else {
                    tagTemplate = loadTemplateFromHTTP(tagTemplate);
                    compiled = compile(tagTemplate, true, { entities: true })[0];
                }
            }
            else {
                compiled = compile(tagTemplate, true, { entities: true })[0];
            }
            element.prototype.tagName = registerTag(compiled);
        }
        else
            throw "template property not specified";
    }
    exports_1("registerClass", registerClass);
    function template(template) {
        return function (target) {
            target.prototype["template"] = template;
            registerClass(target);
        };
    }
    exports_1("template", template);
    return {
        setters:[
            function (riot_1) {
                riot = riot_1;
            },
            function (compile_1) {
                compile = compile_1;
            }],
        execute: function() {
            Observable = (function () {
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
            }());
            exports_1("Observable", Observable);
            Element = (function () {
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
                Element.createElement = function (options) {
                    var tagName = this.prototype.tagName;
                    var el = document.createElement(tagName);
                    riot.mount(el, tagName, options);
                    return el;
                };
                return Element;
            }());
            exports_1("Element", Element);
            exports_1("precompiledTags", precompiledTags = {});
            exports_1("base", base = riot);
        }
    }
});
//# sourceMappingURL=riot-ts.js.map