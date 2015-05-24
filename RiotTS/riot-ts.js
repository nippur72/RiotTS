var RiotEvents = { mount: "mount", unmount: "unmount", update: "update", updated: "updated" };
var RiotElement = (function () {
    function RiotElement() {
    }
    RiotElement.prototype.update = function (data) {
    };
    RiotElement.prototype.unmount = function (keepTheParent) {
    };
    RiotElement.prototype.on = function (eventName, fun) {
    };
    RiotElement.prototype.one = function (eventName, fun) {
    };
    RiotElement.prototype.off = function (events) {
    };
    RiotElement.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return RiotElement;
})();
riot.class = function (element) {
    var tagName;
    var template;
    // gets string template, directly or via #id
    if (Object.keys(element.prototype).indexOf("template") >= 0) {
        template = element.prototype.template;
        if (template.charAt(0) == "#") {
            var elementId = template.substr(1);
            template = document.getElementById(elementId).innerHTML;
        }
    }
    else
        throw "template not specified";
    // gets tag name
    if (Object.keys(element.prototype).indexOf("tagName") >= 0) {
        tagName = element.prototype.tagName;
    }
    else
        throw "tagName property not specified";
    var transformFunction = function (opts) {
        var _this = this;
        // copies prototype into "this"
        Object.keys(element.prototype).forEach(function (key) { return _this[key] = element.prototype[key]; });
        // calls class constructor applying it on "this"
        element.apply(this, [opts]);
    };
    riot.tag(tagName, template, transformFunction);
};
//# sourceMappingURL=riot-ts.js.map