const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '35f876034fc54fbe9dde70291778dbe3'
   });

const handleApiCall = (req,res) => {   
app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .data(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))

}
const handleImage = (req,res, postgres) => {
    const {id} = req.body;
   postgres.select('*').from('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {res.json(entries[0])})
    .catch(err => res.status(400).json('unable to get entries'));
    
}

module.exports = {
    handleImage,
    handleApiCall
}


