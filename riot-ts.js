var RiotEvents = { mount: "mount", unmount: "unmount", update: "update", updated: "updated" };
var RiotElement = (function () {
    function RiotElement() {
    }
    RiotElement.prototype.update = function (data) { };
    RiotElement.prototype.unmount = function (keepTheParent) { };
    RiotElement.prototype.on = function (eventName, fun) { };
    RiotElement.prototype.one = function (eventName, fun) { };
    RiotElement.prototype.off = function (events) { };
    RiotElement.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return RiotElement;
})();
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}
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
        else if (template.endsWith(".html")) {
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
//# sourceMappingURL=riot-ts.js.map