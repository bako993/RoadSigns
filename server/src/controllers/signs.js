import ImageData from '../models/signs.js';
import { extractColor } from '../extractors/color.js'
import { extractText } from '../extractors/text.js';
import { extractPHash } from '../extractors/pHash.js';
import StatusCodes from 'http-status-codes'; 

export const getAllSigns = async (req, res) => {
    try {
        const images = await ImageData.find({});
        // Convert image data to base64 before sending
        const imagesWithBase64 = images.map(image => ({
            _id: image._id,
            name: image.name,
            description: image.description,
            image: {
                data: image.image.data.toString('base64'), // Convert Buffer to base64
                contentType: image.image.contentType
            }
        }));
        res.json(imagesWithBase64);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching images');
    }
}

export const getSignById = async (req, res) => {
    const { id } = req.params;
    try {
        const sign = await ImageData.findById(id);
        if (!sign) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Sign not found'
            });
        }
        res.status(StatusCodes.OK).json(sign);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error retrieving sign from database'
        });
    }
}

export const uploadSign = async(req, res) => {
    const newImage = new ImageData({
        name: req.body.name,
        description: req.body.description,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });

    try {
    
        const pHash = await extractPHash(req.file.buffer);
        newImage.pHash = pHash;

        const colorHistogram = await extractColor(req.file.buffer);
        newImage.imageColor = colorHistogram;

        const text = await extractText(req.file.buffer);
        newImage.imageText = text;

        await newImage.save();
        res.status(StatusCodes.OK).json({
            message: 'Image uploaded successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error saving image to database'
        });
    }
}

export const updateSign = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const allowedUpdates = ['name', 'description'];
    const filteredUpdates = Object.keys(updates)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
            obj[key] = updates[key];
            return obj;
        }, {});

    try {
        const updatedSign = await ImageData.findByIdAndUpdate(id, filteredUpdates, { new: true });
        if (!updatedSign) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Sign not found'
            });
        }
        res.status(StatusCodes.OK).json({
            message: 'Sign updated successfully',
            updatedSign
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error updating sign in database'
        });
    }
}

export const deleteSign = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSign = await ImageData.findByIdAndDelete(id);
        if (!deletedSign) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Sign not found'
            });
        }
        res.status(StatusCodes.OK).json({
            message: 'Sign deleted successfully',
            deletedSign
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error deleting sign from database'
        });
    }
}
