const express = require('express')
const mongoose=require('mongoose')
const Product=require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', function (req, res) {
    res.send('Hello Node API')
  })

  app.get('/humeina', function (req, res) {
    res.send('Hello Humeina')
  })

 app.get ('/product',async(req,res)=>{
    try{
        const product=await Product.find({});
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
 })

 app.get('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
 })

app.post('/product',async(req,res)=>{
    try{
        const product= await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})  
//Update a product
app.put('product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,re.body);
        if(product){
            return res.status(404).jason({message: "cannot find my product with ID ${id}"})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message : error.message})
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://fathimahumaina:123456admin@cluster0.lguwkh3.mongodb.net/node-api')
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000,()=>{
        console.log("Node API app is running on port 3000")
    })
   
}).catch(()=>{
    console.log(error)
})
