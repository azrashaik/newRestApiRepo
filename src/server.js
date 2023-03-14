"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 3004;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("hi im Azra..!");
});
app.use('/api/datasets', routes_1.router);
app.listen(port, () => console.log(`App listing on port${port}`));
