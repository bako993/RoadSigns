import Vibrant from 'node-vibrant';

export async function extractColor(imageData) {
    try {
        const vibrant = new Vibrant(imageData);
        const swatches = await vibrant.getPalette();

        // Extract color frequencies
        const colorHistogram = [];
        for (const swatch in swatches) {
            if (swatches.hasOwnProperty(swatch)) {
                colorHistogram.push(swatches[swatch].getPopulation());
            }
        }

        return colorHistogram;
    } catch (error) {
        console.error('Error extracting color histogram:', error);
        throw error;
    }
}