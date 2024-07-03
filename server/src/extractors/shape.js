import sharp from 'sharp';

export async function extractContours(imageBuffer) {
    try {
      // Convert image buffer to sharp object
      const image = sharp(imageBuffer);
  
      // Convert to grayscale
      const grayscaleImage = await image.grayscale();
  
      // Apply Canny edge detection
      const edges = await grayscaleImage
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
          // Perform Canny edge detection algorithm
          const edgeData = new Uint8Array(data.length);
          for (let y = 0; y < info.height; y++) {
            for (let x = 0; x < info.width; x++) {
              const intensity = data[(y * info.width + x) * 4];
              if (intensity > 80) {
                // Set edge pixel to white
                edgeData[(y * info.width + x) * 4] = 255;
                edgeData[(y * info.width + x) * 4 + 1] = 255;
                edgeData[(y * info.width + x) * 4 + 2] = 255;
                edgeData[(y * info.width + x) * 4 + 3] = 255;
              }
            }
          }
          return { data: edgeData, info };
        });
  
      // Extract contour coordinates from edges
      const contours = [];
      for (let y = 0; y < edges.info.height; y++) {
        for (let x = 0; x < edges.info.width; x++) {
          const intensity = edges.data[(y * edges.info.width + x) * 4];
          if (intensity === 255) {
            contours.push([x, y]);
          }
        }
      }
  
      return contours;
    } catch (error) {
      console.error('Error detecting contours:', error);
      throw error;
    }
  }