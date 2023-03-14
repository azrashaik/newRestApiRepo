"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const controller_1 = require("./controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
router.get('/', controller_1.getdataSets);
router.get('/:id', controller_1.getdataSetsById);
router.post('/', controller_1.addDataSets);
router.delete('/:id', controller_1.deleteDataSets);
