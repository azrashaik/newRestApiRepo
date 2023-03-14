import { Request, Response } from 'express';
import express from 'express';
import { router } from './routes';

const app = express();
const port = 3004;
app.use(express.json());
app.get('/', (req, res) => {
    res.send("hi im Azra..!")
})



app.use('/api/datasets', router);
app.listen(port, () => console.log(`App listing on port${port}`));