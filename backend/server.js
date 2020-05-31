import express from 'express';
import data from './data';
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.get('/api/products', (req,res)=>{
    res.send(data.products);
});


app.listen(PORT, () => {
    console.log("listen to port 8000");
  });