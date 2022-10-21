const app = require('express')()    //alternative use
const { products, people } = require('./data')
const combinedJson = products.concat(people)
//just an experiment, see the original version
// concatenate both arrays, ids end up mixed up...


app.get('/', (req, res) => {
    res.json(combinedJson)
})
// get only data with specific properties, i.e. id and name, which in our case are present in bot arrays
app.get('/mapped', (req, res) => {
    let result = combinedJson.map(item => (item.id, item.name))
    res.json(result)
})
//since our data is now mixed get all with specific "id"
app.get('/filtered/:id', (req, res) => {
    let result = combinedJson.filter(item => item.id === Number(req.params.id))
    res.json(result)
})
//get only first found element with "id"
app.get('/find/:id', (req, res) => {
    let result = combinedJson.find(item => item.id === Number(req.params.id))
    res.json(result)
})

app.get('/whatever/:anything', (req, res) => {
    console.log(req.params)
    let seqNo = req.params.anything
    let toFind = combinedJson[seqNo]
    console.log(toFind)

    if (toFind) {
        res.status(200).json(toFind)
    }else{
        res.status(404).send('F*** **F')
    }


})

app.listen(5000, () => console.log("Yo man!"))
