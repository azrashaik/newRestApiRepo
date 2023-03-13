const express = require('express');
const dataSetsRoutes = require('./routes');

const app = express();
const port = 3004;
app.use(express.json());
app.get('/',(req,res) => {
    res.send("hi im Azra..!")
})



app.use('/api/datasets', dataSetsRoutes);
app.listen(port, () => console.log(`App listing on port${port}`));