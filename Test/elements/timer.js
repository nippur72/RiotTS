var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(opts) {
        var _this = this;
        _super.call(this);
        this.mylist = ["one", "two", "three"];
        this.time = opts.time || 0;
        this.timerHandle = setInterval(function () { return _this.ticks(); }, 1000);
        this.on(RiotEvents.unmount, function () {
            clearInterval(_this.timerHandle);
        });
    }
    Object.defineProperty(Timer.prototype, "template", {
        get: function () {
            return "elements/timer.html";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "tagName", {
        get: function () {
            return "timer";
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.ticks = function () {
        this.time++;
        this.update();
    };
    return Timer;
})(RiotElement);
//# sourceMappingURL=timer.js.map