const express = require('express');
const app = express()

app.use(express.json());

app
.post('/getAddress', (req, res) => {
    // curl --request POST --header "Content-Type: application/json" --data '{"orderId":"real"}' http://localhost:8002/getAddress
    console.log(req.body)
    console.log(req.body.orderId)
    if(req.body.orderId.startsWith("real")) {
        res.header("Content-Type", "application/text").send("Real Service: This is a response from the real service. \n\n").status(200);
    }
    else 
    {
        res.header("Content-Type", "application/text").send("Real Service: This is a response from the real service BUT you should never see this message; anything that does not start with 'real' should be handled by Mockoon. \n\n").status(200);
    }
})

app.listen('8002', () => {
    console.log('Real Servce is listening...')
})
