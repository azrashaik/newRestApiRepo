const pool = require('./datasets')

const express = require('express');



const getdataSets = (req, res) => {
    pool.query("select * from dataSets", (error, result) => {
        if (error) { res.status(400).send(error) }
        else {
            res.status(200).json(result.rows)
        }
    });
}
const getdataSetsById = (req, res) => {
    const id = req.params.id;
    pool.query("select * from dataSets where id = $1", [id], (error, result) => {
        if (error) { res.status(400).send(error) }
        else { res.status(200).json(result.rows) }
    })
}



    const addDataSets = (req, res) => {
        const { id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date } = req.body;
        
        pool.query("select s from dataSets s where s.id = $1", [id], (error, result) => {
            if (result.rows.length > 0) {
                res.status(400).json({ "status":"failure",
                    "message": "id already exists" })
            }

            else {
                if (error) { res.status(400).send(error) }

                else {

                    pool.query("insert into dataSets(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) values ($1,$2,$3,$4,$5,$6,$7,$8)", [id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date] , (error, result) => {
                        if (error) {
                            {
                                res.status(400).json({
                                    "status": "failure",
                                    "message": "failed to insert record"
                                })
                            }
                        }
                        else {
                            res.status(200).json({
                                "status": "success",
                                "message": "record inserted sccessfull",
                            })
                        }
                    })
                }
            }




        })


    }
    const deleteDataSets=(req,res) =>{
        const id = req.params.id;

        pool.query("DELETE FROM dataSets WHERE id=$1",[id],(error,result) =>{
            const noResultFound = !result.rows.length;
            if(noResultFound){
                res.status(400).json({ "status":"failure",
                    "message": "data does not exists" })
            }
        })


    }


module.exports = {
    getdataSets,
    getdataSetsById,
    addDataSets,
    deleteDataSets,

}