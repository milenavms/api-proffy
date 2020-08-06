import express from  'express';

const app = express();

app.use(express.json())



app.get('/users', (req, res) => {
    return res.json("uncusn");
});



 


//ouvir requisiçoes http
app.listen(3333);





