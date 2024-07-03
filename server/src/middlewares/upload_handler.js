import multer from 'multer';
import StatesCodes  from 'http-status-codes';

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('SignImage');

export default function uploadFile(req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(StatesCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error uploading image'
            });
        } else {
            next();
        }
    });
}
