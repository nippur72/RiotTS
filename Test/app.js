/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function main() {
    riot.route(function (id, username) {
        console.log("hash changed to: " + id + "/" + username);
    });
    riot.route.start();
    riot.mount('*');
    riot.route("welcome/nino.porcino");
    var p = new Car();
    p.trigger("start");
}
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        _super.call(this);
        this.on('start', function () {
            console.log("car started!");
        });
    }
    return Car;
})(Riot.Observable);
//# sourceMappingURL=app.js.map