var themeManager = new ((function () {
    function class_1() {
        var _this = this;
        this.setTheme("light");
        Riot.styleParser = function (css) { return _this.parseCss(css); };
    }
    class_1.prototype.flipTheme = function () {
        if (this.theme == "light")
            this.setTheme("dark");
        else
            this.setTheme("light");
        Riot.updateStyles();
    };
    class_1.prototype.setTheme = function (newTheme) {
        if (newTheme == "light") {
            this.backcolor = "red";
            this.forecolor = "green";
        }
        else if (newTheme == "dark") {
            this.backcolor = "yellow";
            this.forecolor = "blue";
        }
        else
            throw "unknown theme";
        this.theme = newTheme;
    };
    class_1.prototype.parseCss = function (css) {
        var _this = this;
        // matches all identifiers starting with dollar sign
        return css.replace(/\$([_a-zA-Z][_a-zA-Z0-9]*)/g, function (a, b) {
            if (_this[b] !== undefined && typeof _this[b] === 'string') {
                return _this[b];
            }
            else
                throw "css variable \"$" + b + "\" not found";
        });
    };
    return class_1;
})())();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
        this.sequence += "2";
    };
    test_lifecycle.prototype.unmounted = function () {
        this.sequence += "4";
    };
    test_lifecycle.prototype.updating = function () {
        this.sequence += "1";
    };
    test_lifecycle.prototype.updated = function () {
        this.sequence += "3";
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
var DynamicCssTag = (function (_super) {
    __extends(DynamicCssTag, _super);
    function DynamicCssTag() {
        _super.apply(this, arguments);
    }
    /*
    constructor(opts)
    {
       super();
 
       this.on("all", (eventName)=>
       {
          console.info(eventName)
       })
    }
    */
    /*
    init(opts)
    {
       console.log(this.isMounted);
       this.on("all", (eventName)=>
       {
          console.info(eventName)
          console.log(this.isMounted)
       })
    }
    */
    DynamicCssTag.prototype.handleFlipTheme = function (e) {
        themeManager.flipTheme();
    };
    DynamicCssTag = __decorate([
        template("elements/dynamic-css.html")
    ], DynamicCssTag);
    return DynamicCssTag;
})(Riot.Element);
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(opts) {
        var _this = this;
        _super.call(this);
        this.mylist = ["one", "two", "three"];
        this.time = opts.time || 0;
        this.timerHandle = setInterval(function () { return _this.ticks(); }, 1000);
        this.on("unmount", function () {
            clearInterval(_this.timerHandle);
        });
    }
    Object.defineProperty(Timer.prototype, "aprop", {
        get: function () {
            return this.time + 1;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.ticks = function () {
        this.time++;
        this.update();
    };
    Timer.prototype.mounted = function () {
        //console.log("timer has been mounted");    
    };
    Timer.prototype.unmounted = function () {
        //console.log("timer has been unmounted");   
    };
    Timer.prototype.updating = function () {
        //console.log("timer is going to be updated");      
    };
    Timer.prototype.updated = function () {
        //console.log("timer has been updated");      
    };
    Timer = __decorate([
        template("elements/timer.html")
    ], Timer);
    return Timer;
})(Riot.Element);
function startIndex() {
    window.onload = function () {
        riot.util.errorHandler = function (err) {
            console.log(err + " in " + err.riotData.tagName);
        };
        riot.mount('*');
    };
}
/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="typings/jasmine/jasmine.d.ts" />
// jasmine boot.js links to window.onload 
function startTests() {
    var startJasmine = window.onload;
    window.onload = function (e) {
        riot.util.errorHandler = function (err) {
            console.log(err + " in " + err.riotData.tagName);
        };
        riot.mount('*');
        RunSpecs();
        startJasmine(null);
    };
}
// simulates the old Jasmine 1.3 waitsFor()
function waitFor(F) {
    beforeEach(function (done) {
        setInterval(function () {
            if (F())
                done();
        }, 250);
    });
}
function querySelector(s) {
    return document.querySelector(s);
}
function getClass(el) {
    return el._tag;
}
// quickly checks if instance implements the class 
function implements(instance, classFunction) {
    var instanceMembers = {};
    for (var i in instance)
        instanceMembers[i] = true;
    var classMembers = [];
    for (var i in classFunction.prototype)
        classMembers.push(i);
    for (var t = 0; t < classMembers.length; t++) {
        if (instanceMembers[classMembers[t]] === undefined) {
            return false;
        }
    }
    return true;
}
function RunSpecs() {
    describe("Element creation", function () {
        var instance, el;
        beforeAll(function () {
            var root = querySelector('#put_here');
            el = test1.createElement();
            root.appendChild(el);
            instance = getClass(el);
        });
        it('creates correct element bodies', function () {
            expect(instance.inner_div.innerHTML).toBe("test1 element");
        });
        it('creates elements with correct template', function () {
            expect(el.innerHTML).toBe('<div id="inner_div">test1 element</div>');
        });
        // expect(implements(el, TestElement)).toBe(true);
    });
    describe("@template decorator", function () {
        var instance, el;
        var instance1, el1;
        beforeAll(function () {
            var root = querySelector('#put_here');
            el = test2.createElement();
            root.appendChild(el);
            instance = getClass(el);
            el1 = test_template_from_url.createElement();
            root.appendChild(el1);
            instance1 = getClass(el1);
        });
        it('creates correct element bodies', function () {
            expect(instance.inner_div.innerHTML).toBe("test2 element");
        });
        it('creates elements with correct template', function () {
            expect(el.innerHTML).toBe('<div id="inner_div">test2 element</div>');
        });
        it('can load templates from .html files', function () {
            expect(el1.innerHTML).toBe("<div>template from URL</div>");
        });
    });
    describe("Object cloning", function () {
        var el, instance;
        beforeAll(function () {
            var root = querySelector('#put_here');
            el = TestGetterSetter.createElement();
            root.appendChild(el);
            instance = getClass(el);
        });
        waitFor(function () { return instance.isMounted; });
        it('works with getter and setter', function () {
            expect(instance.myval).toBe(42);
            instance.myval = 64;
            expect(instance.myval).toBe(64);
            expect(el.innerHTML).toBe('<div id="inner">getter=64</div>');
            expect(instance["inner"].innerHTML).toBe("getter=64");
        });
    });
    // TODO: test object well-formed
    // TODO: test el is observable
    describe("lifecycle helper methods", function () {
        var el, instance;
        beforeAll(function () {
            var root = querySelector('#put_here');
            el = test_lifecycle.createElement();
            root.appendChild(el);
            instance = getClass(el);
        });
        waitFor(function () { return instance.sequence != ""; });
        it('are executed, all in the correct order', function () {
            expect(instance.sequence).toBe("123");
            instance.unmount();
            expect(instance.sequence).toBe("1234");
        });
    });
    describe("createElement()", function () {
        var el1, el2, el3, i1, i2, i3;
        beforeAll(function () {
            var root = querySelector('#put_here');
            el1 = test_options.createElement();
            el2 = test_options.createElement({ bar: "BAR" });
            el3 = test_options.createElement({ bar: "BAR", foo: "FOO" });
            root.appendChild(el1);
            root.appendChild(el2);
            root.appendChild(el3);
            i1 = getClass(el1);
            i2 = getClass(el2);
            i3 = getClass(el3);
        });
        it('works with no parameter specified', function () {
            expect(i1.bar).toBe("default bar");
            expect(i1.foo).toBe("default foo");
        });
        it('works with partial parameter specified', function () {
            expect(i2.bar).toBe("BAR");
            expect(i2.foo).toBe("default foo");
        });
        it('works with full parameter specified', function () {
            expect(i3.bar).toBe("BAR");
            expect(i3.foo).toBe("FOO");
        });
    });
    describe("Observable", function () {
        var eventRaised = false;
        beforeAll(function () {
            var obs = new TestObservable();
            obs.on("something-done", function () {
                eventRaised = true;
            });
            obs.doSomething();
        });
        waitFor(function () { return eventRaised; });
        it("can be observed for its events", function () {
            expect(eventRaised).toBe(true);
        });
    });
    describe("Mixin", function () {
        var root = querySelector('#put_here');
        var el = TestMixins.createElement();
        root.appendChild(el);
        it("mixes methods from a plain JavaScript object", function () {
            var tag = el._tag;
            expect(tag.check1()).toBe("ok1");
        });
        it("mixes methods from a TypeScript class .prototype", function () {
            var tag = el._tag;
            expect(tag.check2()).toBe("ok2");
        });
    });
    describe("dynamic css parser", function () {
        it("parses styles correctly at startup", function () {
            var styles = riot.styleNode.innerHTML.replace(/\r/g, '').replace(/\n/g, '');
            expect(styles).toMatch(/\bmytheme { color: green; background-color: red; }/);
        });
        it("updates styles by manual update", function () {
            themeManager.flipTheme();
            var styles = riot.styleNode.innerHTML.replace(/\r/g, '').replace(/\n/g, '');
            expect(styles).toMatch(/\bmytheme { color: blue; background-color: yellow; }/);
        });
    });
}
/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="themeManager.ts" />
/// <reference path="elements/specElements.ts" />
/// <reference path="elements/dynamic-css.ts" />
/// <reference path="elements/timer.ts" />
/// <reference path="index.ts" />
/// <reference path="specRunner.ts" />
//# sourceMappingURL=app.js.map