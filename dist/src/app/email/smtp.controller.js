"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const input_1 = require("./input");
const smtp_service_1 = require("./smtp.service");
let SmtpController = class SmtpController {
    constructor(smtpService) {
        this.smtpService = smtpService;
    }
    async sendMail(payload) {
        return this.smtpService.sendMail(payload);
    }
};
exports.SmtpController = SmtpController;
__decorate([
    (0, routing_controllers_1.Post)("send"),
    (0, routing_controllers_1.HttpCode)(200),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.SendMailRequest]),
    __metadata("design:returntype", Promise)
], SmtpController.prototype, "sendMail", null);
exports.SmtpController = SmtpController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/"),
    __metadata("design:paramtypes", [smtp_service_1.SmtpService])
], SmtpController);
//# sourceMappingURL=smtp.controller.js.map