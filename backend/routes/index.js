var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


const consolesModel = require('../models/consolesModel');
const usersModel = require('../models/usersModel');

router.get("/", function(req, res, next){
	res.render('index');
})
//toutes les consoles
router.get('/datas', function(req, res, next) {

	consolesModel.find().then(Consoles =>{
		res.json({			
			data: Consoles
		});		
	}).catch(e =>{
		res.json({
			confirmation: 'Error',
			message: e.message
		})
	});
	
});


//tous les users
router.get('/datas/users', function(req, res, next) {

	usersModel.find().then(Users =>{
		res.json({			
			data: Users
		});		
	}).catch(e =>{
		res.json({
			confirmation: 'Error',
			message: e.message
		})
	});
	
});

//Update console
//ICI GET POUR TESTER DANS URL
//ex: http://localhost:3000/datas/update?id=5db57cb9281d1a04407ecfdf&price=280
router.get('/datas/update', (req, res) =>{
	const query = req.query //get id + key=values
	const consoleId = query.id
	delete query['id']

	consolesModel.findByIdAndUpdate(consoleId, query, {new:true})
	.then(Consoles =>{
		res.json({
			confirmation: 'Success',
			data: Consoles
		});
	})
	.catch(e =>{
		res.json({
			confirmation:'error',
			message: e.message
		});
	});
});

//delete
//http://localhost:3000/datas/remove?id=5db5a231e495fe1bb0d583e9
router.get('/datas/remove', (req, res) =>{
	const query = req.query

	consolesModel.findByIdAndRemove(query.id)
	.then(Consoles =>{
		res.json({
			confirmation: 'Success',
			data: 'La console' + query.id + ' à été éffacée avec succès'
		});
	}).catch(e =>{
		res.json({
			confirmation:'error',
			message: e.message
		});
	});
})

//console par id
router.get("/datas/:id", async (req, res, next) => {
     
    /*Assignation de id request => paramètres + id*/

    const id = req.params.id

    try {
        consolesModel.findById(id).then(Consoles =>{
        	res.json({
        		data: Consoles
        	});
        });
       
        
        /*Sinon erreur*/       
    } catch (err) {
    	res.json({
    		confirmation: "Error",
    		message: "Console : " + id + " non trouvée"
    	})
        console.log(err);
        res.status(400).send(err);
    }
    });

//users par id
router.get("/datas/users/:id", async (req, res, next) => {
     
    /*Assignation de id request => paramètres + id*/

    const id = req.params.id

    try {
        usersModel.findById(id).then(Users =>{
        	res.json({
        		data: Users
        	});
        });
       
        
        /*Sinon erreur*/       
    } catch (err) {
    	res.json({
    		confirmation: "Error",
    		message: "Utilisateurs : " + id + " non trouvée"
    	})
        console.log(err);
        res.status(400).send(err);
    }
    });

//Creer une console
router.post('/datas', (req, res) =>{

	consolesModel.create(req.body).
	then(Console =>{
		res.json({
    	confirmation: "Succes",
    	data: Console
    }).catch(e =>{
    	res.json({
    	confirmation: "Error",
    	data: e.message
    	});
    });
});
});

//Creer un utilisateur
router.post('/datas/users', (req, res) =>{

	usersModel.create(req.body).
	then(Users =>{
		res.json({
    	confirmation: "Succes",
    	data: Users
    }).catch(e =>{
    	res.json({
    	confirmation: "Error",
    	data: e.message
    	});
    });
});

})

module.exports = router;
