var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var test1 = (function (_super) {
    __extends(test1, _super);
    function test1() {
        _super.apply(this, arguments);
    }
    test1 = __decorate([
        template("\n\n<test1>\n   <div id=\"inner_div\">test1 element</div>\n</test1>\n\n")
    ], test1);
    return test1;
})(Riot.Element);
test1.register();
var test2 = (function (_super) {
    __extends(test2, _super);
    function test2() {
        _super.apply(this, arguments);
    }
    test2 = __decorate([
        template('<test2><div id="inner_div">test2 element</div></test2>')
    ], test2);
    return test2;
})(Riot.Element);
test2.register();
var test_template_from_url = (function (_super) {
    __extends(test_template_from_url, _super);
    function test_template_from_url() {
        _super.apply(this, arguments);
    }
    test_template_from_url = __decorate([
        template("elements/test-template.html")
    ], test_template_from_url);
    return test_template_from_url;
})(Riot.Element);
test_template_from_url.register();
var testNoTemplate = (function (_super) {
    __extends(testNoTemplate, _super);
    function testNoTemplate() {
        _super.apply(this, arguments);
    }
    return testNoTemplate;
})(Riot.Element);
var testNoTagName = (function (_super) {
    __extends(testNoTagName, _super);
    function testNoTagName() {
        _super.apply(this, arguments);
    }
    testNoTagName = __decorate([
        template("<test-no-tag><span></span></test-no-tag>")
    ], testNoTagName);
    return testNoTagName;
})(Riot.Element);
var testDoubleRegister = (function (_super) {
    __extends(testDoubleRegister, _super);
    function testDoubleRegister() {
        _super.apply(this, arguments);
    }
    testDoubleRegister = __decorate([
        template("<test-double-register><div></div></test-double-register>")
    ], testDoubleRegister);
    return testDoubleRegister;
})(Riot.Element);
var test_lifecycle = (function (_super) {
    __extends(test_lifecycle, _super);
    function test_lifecycle() {
        _super.apply(this, arguments);
        this.sequence = "";
    }
    test_lifecycle.prototype.mounted = function () {
        this.sequence += "3";
    };
    test_lifecycle.prototype.unmounted = function () {
        this.sequence += "4";
    };
    test_lifecycle.prototype.updating = function () {
        this.sequence += "1";
    };
    test_lifecycle.prototype.updated = function () {
        this.sequence += "2";
    };
    test_lifecycle = __decorate([
        template("<test-lifecycle><div>this is test-lifecycle</div></test-lifecycle>")
    ], test_lifecycle);
    return test_lifecycle;
})(Riot.Element);
var test_options = (function (_super) {
    __extends(test_options, _super);
    function test_options(options) {
        _super.call(this);
        //this.bar = options.bar !== undefined ? options.bar : "default bar";
        this.bar = options.bar || "default bar";
        this.foo = options.foo || "default foo";
    }
    test_options = __decorate([
        template("<test-options><div></div></test-options>")
    ], test_options);
    return test_options;
})(Riot.Element);
var TestGetterSetter = (function (_super) {
    __extends(TestGetterSetter, _super);
    function TestGetterSetter() {
        _super.apply(this, arguments);
        this.a = 42;
    }
    Object.defineProperty(TestGetterSetter.prototype, "myval", {
        get: function () {
            return this.a;
        },
        set: function (v) {
            this.a = v;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    TestGetterSetter = __decorate([
        template("<test-getter><div id='inner'>getter={myval}</div></test-getter>")
    ], TestGetterSetter);
    return TestGetterSetter;
})(Riot.Element);
var TestObservable = (function (_super) {
    __extends(TestObservable, _super);
    function TestObservable() {
        _super.apply(this, arguments);
    }
    TestObservable.prototype.doSomething = function () {
        this.trigger("something-done");
    };
    return TestObservable;
})(Riot.Observable);
var MixinPlainObject = {
    method1: function () { return "ok1"; }
};
var MixinClass = (function () {
    function MixinClass() {
    }
    MixinClass.prototype.method2 = function () {
        return "ok2";
    };
    return MixinClass;
})();
var TestMixins = (function (_super) {
    __extends(TestMixins, _super);
    function TestMixins() {
        _super.call(this);
        this.mixin(MixinPlainObject);
        this.mixin(MixinClass.prototype);
    }
    TestMixins.prototype.check1 = function () {
        return this.method1();
    };
    TestMixins.prototype.check2 = function () {
        return this.method2();
    };
    TestMixins = __decorate([
        template("<span></span>")
    ], TestMixins);
    return TestMixins;
})(Riot.Element);
TestMixins.register();
//# sourceMappingURL=specElements.js.map