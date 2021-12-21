// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {index, detail, create, store, edit, update, destroy} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/store', store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', detail);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/:id', update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', destroy); 


module.exports = router;
