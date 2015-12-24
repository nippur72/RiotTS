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
var DynamicCssTag = (function (_super) {
    __extends(DynamicCssTag, _super);
    function DynamicCssTag() {
        _super.apply(this, arguments);
    }
    DynamicCssTag.prototype.handleFlipTheme = function (e) {
        themeManager.flipTheme();
    };
    DynamicCssTag = __decorate([
        template("elements/dynamic-css.html")
    ], DynamicCssTag);
    return DynamicCssTag;
})(Riot.Element);
var themeManager = new ((function () {
    function class_1() {
        this.setTheme("light");
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
        return css.replace(/$backcolor/g, this.backcolor).replace(/$forecolor/g, this.forecolor);
    };
    return class_1;
})())();
//# sourceMappingURL=dynamic-css.js.map