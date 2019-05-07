const Box = require('../models/Box')

class BoxController {
    async store(req,res){
        const box = await Box.create({title : req.body.title})
        return res.json(box)
    }
    
    async show(req,res){
        const boxFiles = await Box.findById(req.params.id).populate({
            path : 'files',
            options : {sort : {createdAt : -1}}
        })
        return res.json(boxFiles)
    }
}

module.exports = new BoxController()