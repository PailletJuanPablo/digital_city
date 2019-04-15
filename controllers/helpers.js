
const ba64 = require("ba64");

const showMongooseErrors = (res, errorsArray) => {
    let errorDetails = [];
    Object.keys(errorsArray.errors).map((key) => {
        let errorDetail = {
            field: key,
            message: errorsArray.errors[key].message
        }
        errorDetails.push(errorDetail);
    });
    return res.send({msg: 'Missing fields', errors: errorDetails}).status(500);
}

const saveImageFromBase64 = (base64Data, folder, filename) => {
    const ext = ba64.getExt(base64Data);
    let path = `public/uploads/${folder}/${filename.trim()}`;
    ba64.writeImageSync(path, base64Data);
    path = path.replace('public', '');
    return path + '.' + ext;
}


module.exports = {
    showMongooseErrors,
    saveImageFromBase64
}