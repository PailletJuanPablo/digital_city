let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = Schema({
  name: String,
  price: Number,
  currency: String,
  company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

let categorySchema = Schema({
  name: String
});

let companySchema = Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  description: String,
  ratings: Number
});

productSchema.set('toJSON', { getters: true, virtuals: true });

productSchema.post('save', async (doc, next) => {
  companyToAdd = await CompanyModel.findById(doc.company);
  if (companyToAdd) {
    if (!companyToAdd.products) {
      companyToAdd.products = [];
    }
    companyToAdd.products.push(doc._id);
    await companyToAdd.save();
    console.log(companyToAdd);
  }
});

productSchema.pre('save', function(next) {
  if (!this.price) {
    this.price = 0;
  }

  next();
});



// assign a function to the "methods" object of our animalSchema
companySchema.methods.getCompanyDataWithCustomProducts = async company => {
  const productsData = await ProductModel.find({ company: company._id });
  company = company.toObject();
  company.productsData = productsData;
  return company;
};

const CompanyModel = mongoose.model('Company', companySchema);
const ProductModel = mongoose.model('Product', productSchema);
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = {
  CompanyModel,
  ProductModel,
  CategoryModel
};
