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
    Timer.prototype.ticks = function () {
        this.time++;
        this.update();
    };
    Timer.prototype.mounted = function () {
        console.log("timer has been mounted");
    };
    Timer.prototype.unmounted = function () {
        console.log("timer has been unmounted");
    };
    Timer.prototype.updating = function () {
        console.log("timer is going to be updated");
    };
    Timer.prototype.updated = function () {
        console.log("timer has been updated");
    };
    Timer = __decorate([
        template("elements/timer.html")
    ], Timer);
    return Timer;
})(Riot.Element);
Timer.register();
//# sourceMappingURL=timer.js.map