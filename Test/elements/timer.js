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
//# sourceMappingURL=timer.js.map