import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const {id} = req.body;

    console.log('token', token);

    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({
         message: 'Auth Error' 
        });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (id && decoded.id !== id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ 
                message: 'Auth Error again' 
            });
        }
        req.id = decoded;
        next();

    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Invalid Token' });
    }
}