import sharp from 'sharp';

export async function extractPHash(imageData) {
    try {
        // Check image format
        const metadata = await sharp(imageData).metadata();
        console.log('Image metadata:', metadata);
        
        if (!metadata.format) {
            throw new Error('Unsupported image format.');
        }

        // Resize image to a fixed size (e.g., 32x32) for consistent hashing
        console.log('Resizing image...');
        const resizedImage = await sharp(imageData).resize(32, 32).raw().toBuffer();
        console.log('Image resized successfully.');
        
        return resizedImage;
    } catch (error) {
        console.error('Error computing pHash:', error);
        throw error;
    }
}