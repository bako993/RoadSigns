import Tesseract from 'tesseract.js'

export async function extractText(imageData) {
    try {
        const result = await Tesseract.recognize(imageData, 'eng+nld', { logger: e => console.log(e) });
        console.log(result.data.text);
        return result.data.text ? result.data.text.trim() : null;
    } catch (error) {
        console.error('Error extracting text:', error);
        return null;
    }
}