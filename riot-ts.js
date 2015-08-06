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
    function endsWith(s, searchString, position) {
        var subjectString = s.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    }
    ;
    function registerClass(element) {
        var tagName;
        var template;
        function registerTag(tagName, template) {
            var transformFunction = function (opts) {
                var _this = this;
                // copies prototype into "this"
                Object.keys(element.prototype).forEach(function (key) { return _this[key] = element.prototype[key]; });
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
            // compile using riot.compile
            {
                var templateNoNewLines = template.split('\n').join(' ');
                var dummyHtml = "<" + tagName + ">" + templateNoNewLines + "</" + tagName + ">";
                var compiled = riot.compile(dummyHtml, true);
                var stripped = compiled.substr(12 + tagName.length);
                var x = stripped.lastIndexOf(", function(opts) {");
                stripped = stripped.substr(0, x);
                var compiledTemplate = eval("[" + stripped + "]");
                var html = compiledTemplate.length > 0 ? compiledTemplate[0] : "";
                var css = compiledTemplate.length > 1 ? compiledTemplate[1] : "";
                var attr = compiledTemplate.length > 2 ? compiledTemplate[2] : undefined;
                riot.tag(tagName, html, css, attr, transformFunction);
            }
            //riot.tag(tagName, template, transformFunction);         
        }
        // gets tag name from tagName property
        if (Object.keys(element.prototype).indexOf("tagName") >= 0) {
            tagName = element.prototype.tagName;
        }
        else
            throw "tagName property not specified";
        // gets string template, directly, via #id or via http request
        if (Object.keys(element.prototype).indexOf("template") >= 0) {
            template = element.prototype.template;
            // Obsolete: load template from script tag
            //if (template.charAt(0) == "#") {
            //   var elementId = template.substr(1);
            //   template = document.getElementById(elementId).innerHTML;         
            //} else 
            if (endsWith(template, ".html")) {
                var req = new XMLHttpRequest();
                // TODO do it asynchronously
                req.open("GET", template, false);
                req.send();
                if (req.status == 200) {
                    template = req.responseText;
                    registerTag(tagName, template);
                }
                return;
            }
            else
                registerTag(tagName, template);
        }
        else
            throw "template property not specified";
    }
    Riot.registerClass = registerClass;
})(Riot || (Riot = {}));
// @component decorator
function component(tagname, template) {
    return function (target) {
        target.prototype["tagName"] = tagname;
        if (template !== undefined) {
            target.prototype["template"] = template;
        }
    };
}
// @template decorator
function template(template) {
    return function (target) {
        target.prototype["template"] = template;
    };
}
//# sourceMappingURL=riot-ts.js.map