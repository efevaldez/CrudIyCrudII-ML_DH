const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
function writeJson(dataBase) {
	fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), "utf-8")
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render("products", { products, toThousand });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let param = +req.params.id;
		let product = products.find(element => element.id === param);
		res.render("detail", { product });
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render("product-create-form");
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		if (req.file) {
			let nuevoId = 0;

			products.forEach(element => {
				if (element.id > nuevoId) {
					nuevoId = element.id
				}
			});

			nuevoId += 1;

			let nuevoProducto = {
				id: nuevoId,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description,
				image: req.file ? req.file.filename : "default-image.png"
			}
			console.log(req.file);
			products.push(nuevoProducto);

			writeJson(products);
			let updater = products.find(element => element.id === +req.params.id);
			res.send(updater);
			/* 
					res.redirect("/products/"); */
		} else {
			let error = new error("Pedazo de boludooo")
			res.send("Muy mal");
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productToEdit = products.find(element => element.id === +req.params.id);
		res.render("product-edit-form", { productToEdit });
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic

		if (req.file) {
			products.forEach(element => {
				if (element.id === +req.params.id) {
					element.name = req.body.name,
						element.price = req.body.price,
						element.discount = req.body.discount,
						element.category = req.body.category,
						element.description = req.body.description
					element.image = req.file ? req.file.filename : "default-image.png";
				}
			})
			writeJson(products);

			let updater = products.find(element => element.id === +req.params.id);
			res.send(updater);/* 
			res.redirect("/products/"); */
		} else {

			let error = new error("Pedazo de boludooo")
			res.send(error);
		}


	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
		let destroyer = products.find(element => element.id === +req.params.id);

		products.forEach(element => {
			if (element.id === destroyer.id) {
				products.splice(products.indexOf(element), 1);
			}
		});
		res.send(products)
	}
};

module.exports = controller;