var express = require("express");
var router = express.Router();
const Consoles = require('../models/consolesModel');
const mongoose = require('mongoose');


/* GET users listing. */
router.get("/consoles", async (req, res, next) => {
    /*Test de requete read*/
try {
    const consoles = await Consoles.find(function(err, consoles){
        if(err){
            res.send("Error");
        }
         res.send('/consoles', {
             items: consoles
         });
    });

   

} catch (err) {
    console.log(err);
    res.status(400).send(err);
}
});

/*Appel par id*/
router.get("/:id", async (req, res, next) => {
     
    /*Assignation de id request => paramètres + id*/

    const id = mongoose.Types.ObjectId(req.params.id);

    try {
        const consoles = await Consoles.findById(mongoose.Types.ObjectId(req.params.id)).exec();
       
        res.send(consoles);
        console.log(consoles(id));
        /*Sinon erreur*/       
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    });

    router.post('/listes/ajouter', async (req, res, next) => {

        var newConsoles = new Consoles();
        newConsoles.title = req.body.title;
    
        try {
            const consoles = await newConsoles.save(req.body);
            console.log('Haaaaaa', consoles);
            res.send(consoles);
            
        } catch(err) {
            res.status(400).send(err);
        }
    });

module.exports = router;