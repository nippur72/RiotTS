/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="typings/jasmine/jasmine.d.ts" />
// jasmine boot.js links to window.onload 
var startJasmine = window.onload;
window.onload = function (e) {
    Riot.registerAll();
    riot.mount('*');
    RunSpecs();
    startJasmine(null);
};
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
    describe("register()", function () {
        it('throws an error if no template is specified', function () {
            expect(function () { return testNoTemplate.register(); }).toThrow("template property not specified");
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
            instance.unmount();
        });
        waitFor(function () { return instance.sequence != ""; });
        it('are executed, all in the correct order', function () {
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
}
//# sourceMappingURL=specRunner.js.map