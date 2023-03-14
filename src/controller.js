"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataSets = exports.addDataSets = exports.getdataSetsById = exports.getdataSets = void 0;
const datasets_1 = require("./datasets");
const getdataSets = (req, res) => {
    datasets_1.pool.query("select * from dataSets", (error, result) => {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200).json(result.rows);
        }
    });
};
exports.getdataSets = getdataSets;
const getdataSetsById = (req, res) => {
    const id = req.params.id;
    datasets_1.pool.query("select * from dataSets where id = $1", [id], (error, result) => {
        if (error) {
            res.status(400).send({ "status": "failure", "message": "id does not exists" });
        }
        else {
            res.status(200).json(result.rows);
        }
    });
};
exports.getdataSetsById = getdataSetsById;
const addDataSets = (req, res) => {
    const { id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date } = req.body;
    datasets_1.pool.query("select s from dataSets s where s.id = $1", [id], (error, result) => {
        if (result.rows.length > 0) {
            res.status(400).json({
                "status": "failure",
                "message": "id already exists"
            });
        }
        else {
            if (error) {
                res.status(400).send(error);
            }
            else {
                datasets_1.pool.query("insert into dataSets(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) values($1,$2,$3,$4,$5,$6,$7,$8)", [id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date], (error, result) => {
                    if (error) {
                        {
                            console.log(error);
                            res.status(400).json({
                                "status": "failure",
                                "message": "failed to insert record"
                            });
                        }
                    }
                    else {
                        res.status(200).json({
                            "status": "success",
                            "message": "record inserted sccessfull",
                        });
                    }
                });
            }
        }
    });
};
exports.addDataSets = addDataSets;
const deleteDataSets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield datasets_1.pool.query("delete from dataSets where id = $1", [id], (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            if (result.rowCount == 0)
                res.status(400).send("Id does not exists in DataSets");
            else
                res.status(200).json({ "status": "Successfully deleted", "Message": "Data deleted from DataSets" });
        }
    });
});
exports.deleteDataSets = deleteDataSets;
