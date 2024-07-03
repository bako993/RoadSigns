import Admin from "../models/admins.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find();
        res.status(StatusCodes.OK).json(admins);
    } catch (err) {
        next(err);
        console.log(err);
    }
}

export const getAdmin = async (req, res, next) => {
    const adminId = req.params.id;
    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Admin not found'
            });
        }
        res.status(StatusCodes.OK).json(admin);

    } catch (err) {
        next(err);
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: err.message
        });
    }
}

export const registerAdmin = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(StatusCodes.CREATED).json(newAdmin);

    } catch (err) {
        next(err);
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}

export const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);

        if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({id: existingAdmin._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        });

        res.status(StatusCodes.OK).json({
            token,
            name: existingAdmin.name,
            message: 'Admin Logged In Successfully'
        });
        
    } catch (err) {
        next(err);
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}

export const updateAdmin = async (req, res, next) => {
    const adminId = req.params.id;
    const { name, email, password } = req.body;

    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin not found' });
        }

        if (email) {
            admin.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            admin.password = hashedPassword;
        }

        if (name !== undefined) {
            admin.name = name;
        }

        await admin.save();
        
        res.status(StatusCodes.OK).json(admin);

    } catch (err) {
        next(err);
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
}

export const deleteAdmin = async (req, res, next) => {
    const adminId = req.params.id;
    
    try {
        const admin = await Admin.findOneAndDelete({ _id: adminId });

        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Admin not found'
            });
        }

        res.status(StatusCodes.NO_CONTENT).json({ message: 'Admin deleted successfully' });

    } catch (err) {
        next(err);
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}
