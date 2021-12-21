// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage ({
    destination : (req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/images/products"));
    },
    filename : (req, file, cb)=>{
        cb(null, "liebre-" + Date.now() + path.extname(file.originalname));
    }
});

const uploadFile = multer({storage});

// ************ Controller Require ************
const {index, detail, create, store, edit, update, destroy} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/store', uploadFile.single("avatar"), store);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', detail);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/:id', uploadFile.single("avatar"), update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', destroy); 


module.exports = router;
