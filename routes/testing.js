const CompanyModel = require('../models/Company_examples').CompanyModel;
const CategoryModel = require('../models/Company_examples').CategoryModel;
const ProductModel = require('../models/Company_examples').ProductModel;
// ID COMPANY: 5cb1620c718e1d3eac06c044
// ID COMPANY 2: 5cb16d7829bc272e4c7c025c
// ID 3 5cb16dbcc0d8331f24786a8d
// Importamos express
var express = require('express');
// Definimos una variable router que contendrá el módulo de rutas de express
var router = express.Router();

const createWithSubDocumentsTesting = async (req, res) => {
  // const category = await CategoryModel.create({name: 'TestingCat'});
  //   return res.send(category);

  //const productTocreate = ProductModel.create({name: 'Prod one', price: 123, currency: 'USD'});
  /*
const productTocreate = new ProductModel({name: 'Prod 3', price: 1234, currency: 'USD', company: '5cb1620c718e1d3eac06c044' });
await productTocreate.save();
 return res.send(productTocreate);

*/
/*
const company = await CompanyModel.findById('5cb1620c718e1d3eac06c044').populate('products');
return res.send(company);*/
/*
const test = await CompanyModel.findById('5cb1620c718e1d3eac06c044');
const products = await test.getCompanyDataWithCustomProducts(test);
return res.send(products);
*/
/*
const companies = await CompanyModel.find();
return res.send(companies);
*/
/*
 let productsAr = [{name: 'product 1', price: '12345', curreny: 'USD'}, {name: 'product 2'}];

const companies = await CompanyModel.find();
companies.map((company) => {
    productsAr.map((prod) => {
        const toCreate = {...prod, company: company._id};
        ProductModel.create(toCreate).then((created) => {
        })
    })
})
const pro = await ProductModel.create({name: 'test11'});
return res.send(pro)*/
/*
  const companyToCreate = new CompanyModel({ name: 'Company 3', description: '12313223', rating: 123123 });
  await companyToCreate.save();
  return res.send(companyToCreate);*/
};

router.get('/first', createWithSubDocumentsTesting);

module.exports = router;
