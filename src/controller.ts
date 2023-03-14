import { pool } from './datasets';
import * as express from 'express';
import { Request, Response } from 'express';



export const getdataSets = (req: Request, res: Response) => {
    pool.query("select * from dataSets", (error: string, result: any) => {
        if (error) { res.status(400).send(error) }
        else {
            res.status(200).json(result.rows)
        }
    });
}
export const getdataSetsById = (req: Request, res: Response) => {
    const id = req.params.id;
    pool.query("select * from dataSets where id = $1", [id], (error: string, result: any) => {
        if (error) { res.status(400).send({ "status": "failure", "message": "id does not exists" }) }
        else { res.status(200).json(result.rows) }
    })
}



export const addDataSets = (req: Request, res: Response) => {
    const { id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date } = req.body;
    pool.query("select s from dataSets s where s.id = $1", [id], (error: string, result: any) => {
        if (result.rows.length > 0) {
            res.status(400).json({
                "status": "failure",
                "message": "id already exists"
            })

        }

        else {
            if (error) { res.status(400).send(error) }

            else {

                pool.query("insert into dataSets(id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date) values($1,$2,$3,$4,$5,$6,$7,$8)", [id, data_schema, router_config, status, created_by, updated_by, created_date, updated_date], (error: any, result: any) => {
                    if (error) {
                        {
                            console.log(error)
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
export const deleteDataSets = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    await pool.query("delete from dataSets where id = $1", [id], (error: string, result: any) => {
        if (error) {
            res.send(error)
        }
        else {
            if (result.rowCount == 0) res.status(400) .send("Id does not exists in DataSets")
            else res.status(200).json({"status":"Successfully deleted","Message":"Data deleted from DataSets"})
        }
    })

}










