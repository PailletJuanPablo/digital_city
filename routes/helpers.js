
exports.uploadHelper = () => {
    var multer = require('multer');
    var storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, `./public/uploads/offers/`);
      },
      filename: function(req, file, cb) {
       // var ext = file.originalname.substring(file.originalname.indexOf('.')); 
        cb(null, req.currentUser._id + '-' + new Date().getSeconds() + '-' + file.originalname.trim() );
      }
    });

    return storage;
    
}