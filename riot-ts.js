var Riot;
(function (Riot) {
    Riot.Events = { mount: "mount", unmount: "unmount", update: "update", updated: "updated" };
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
    Riot.endsWith = endsWith;
    ;
})(Riot || (Riot = {}));
riot.class = function (element) {
    var tagName;
    var template;
    function registerTag(tagName, template) {
        var transformFunction = function (opts) {
            var _this = this;
            // copies prototype into "this"
            Object.keys(element.prototype).forEach(function (key) { return _this[key] = element.prototype[key]; });
            // calls class constructor applying it on "this"
            element.apply(this, [opts]);
        };
        riot.tag(tagName, template, transformFunction);
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
        if (template.charAt(0) == "#") {
            var elementId = template.substr(1);
            template = document.getElementById(elementId).innerHTML;
        }
        else if (Riot.endsWith(template, ".html")) {
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
};
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