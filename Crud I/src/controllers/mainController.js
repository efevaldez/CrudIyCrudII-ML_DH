const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		let productsInSale = products.filter(product =>
			product.category === "in-sale"
		);
		let productsVisited = products.filter(product =>
			product.category === "visited"
		);
		res.render("index", {productsInSale, productsVisited, toThousand});
	},
	search: (req, res) => {
		// Do the magic
		let query = [];
		let key = req.query.keywords;
		products.forEach(element => {
			if(element.name.toLowerCase().includes(key.toLowerCase())){
			query.push(element)
			}
		});
			res.render("results", {query, toThousand});
	},
};

module.exports = controller;
