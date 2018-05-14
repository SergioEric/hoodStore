var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera } from '@ionic-native/camera';
var DashPage = /** @class */ (function () {
    // private itemDoc: AngularFirestoreDocument;
    // item: Observable<Item>;
    function DashPage(navCtrl, navParams, auth, storage, camera, afs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.storage = storage;
        this.camera = camera;
        this.afs = afs;
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            targetWidth: 600,
            targetHeight: 400,
        };
        this.getImageUrl();
    }
    DashPage.prototype.method = function () {
        // this.auth.
    };
    DashPage.prototype.getImageUrl = function () {
        this.imageURL = this.storage.ref('scotchs').getDownloadURL();
        console.log(this.imageURL);
    };
    DashPage.prototype.generateTime = function () {
        var date = new Date();
        var time = date.getTime() + "_" + date.getMilliseconds() + "_" + date.getSeconds() + "_" + date.getDay() + "_" + date.getMonth();
        return time;
    };
    DashPage.prototype.takePhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.camera.getPicture(this.options)];
                    case 1:
                        result = _a.sent();
                        this.product_image_to_upload = "data:image/jpeg;base64," + result;
                        //${new Date().getTime()}_${file.name}
                        this.URL_OK = true;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        alert(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashPage.prototype.uploadFile = function (event) {
        var file = event.target.files[0];
        var filePath = "products-image/" + new Date().getTime() + "_" + file.name;
        var task = this.storage.upload(filePath, file);
        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        this.imageURL = task.downloadURL();
        this.URL_OK = true;
    };
    DashPage.prototype.submitProduct = function () {
        var _this = this;
        if (!this.product_name ||
            !this.product_cost ||
            !this.product_description) {
            alert("campo vacio");
        }
        else {
            if (this.URL_OK != true) {
                alert("toma una foto o sube una desde la galeria");
            }
            else {
                alert("todo bien");
                var picture = this.storage.ref("products-image/" + this.generateTime());
                picture.putString(this.product_image_to_upload, 'data_url').then(function (res) {
                    _this.imageURL = res.downloadURL;
                    _this.porcentaje = (res.bytesTransferred) / 1024 + " KB";
                    alert(_this.imageURL);
                    _this.afs.collection('products').add({
                        product_name: _this.product_name,
                        product_cost: _this.product_cost,
                        product_description: _this.product_description,
                        product_image: _this.imageURL
                    }).then(function (doc) {
                        alert("agregado a firebase");
                    }).catch(function (error) {
                        alert("no se subio el P: " + error.message);
                    });
                }, function (error) {
                    alert("subiendoFoto: " + error.message);
                    return;
                });
            }
        }
    };
    DashPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashPage');
    };
    DashPage = __decorate([
        Component({
            selector: 'page-dash',
            templateUrl: 'dash.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AuthService,
            AngularFireStorage,
            Camera,
            AngularFirestore])
    ], DashPage);
    return DashPage;
}());
export { DashPage };
//# sourceMappingURL=dash.js.map