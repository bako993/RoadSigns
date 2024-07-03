
import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Uploader from '../../components/uploader/Uploader';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [photo, setPhoto] = useState(null); 
    const [similarImages, setSimilarImages] = useState([]);
  
    const fetchImages = async () => {
        try {
          const response = await fetch('http://localhost:6500/signs');
    
          if (!response.ok) {
            throw new Error('Failed to fetch images.');
          }
    
          const data = await response.json();
          setImages(data);
        } catch (error) {
          console.error('Error fetching images:', error);
          alert('Failed to fetch images. Please try again.');
        }
      };
    
      // Fetch images on component mount
      useEffect(() => {
        fetchImages();
      }, []);

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '0px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
      };

  return (
    <div className='page-container'>
      <Header/>
      <h1 className='headline-text'>Learn about the RoadSigns</h1>
      <div className='upload-container'>
        <Uploader />
      </div>

      {/* display images */}
      <div className='slider-container'>
      <Slider {...settings} className="image-slider">
              {images.map((image, index) => (
                  <div className="image-item" key={index}>
                      <img src={`data:${image.image.contentType};base64,${image.image.data}`} 
                      alt={image.name}
                       />
                      <div className="image-details">
                        <h2>{image.name}</h2>
                        <h3>{image.description}</h3>
                    </div>
                  </div>
                  
              ))}
      </Slider>
      </div>
      
      <Footer/>
    </div>
  );
};

export default Home;




















// import React, { useState, useEffect } from 'react';
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';
// import Uploader from '../../components/uploader/Uploader';
// import './Home.css';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Home = () => {
//     const [images, setImages] = useState([]);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [photo, setPhoto] = useState(null); 
//     const [similarImages, setSimilarImages] = useState([]);
  
//     const fetchImages = async () => {
//         try {
//           const response = await fetch('http://localhost:6500/signs');
    
//           if (!response.ok) {
//             throw new Error('Failed to fetch images.');
//           }
    
//           const data = await response.json();
//           setImages(data);
//         } catch (error) {
//           console.error('Error fetching images:', error);
//           alert('Failed to fetch images. Please try again.');
//         }
//       };
    
//       // Fetch images on component mount
//       useEffect(() => {
//         fetchImages();
//       }, []);

//       const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//         ],
//       };

//   return (
//     <div className='page-container'>
//       <Header/>
//       <h1 className='headline-text'>Learn about the RoadSigns</h1>
//       <div className='upload-container'>
//         <Uploader />
//       </div>

//       {/* display images */}
//       <div className='slider-container'>
//       <Slider {...settings} className="image-slider">
//               {images.map((image, index) => (
//                   <div className="image-item" key={index}>
//                       <img src={`data:${image.image.contentType};base64,${image.image.data}`} 
//                       alt={image.name}
//                        />
//                       <h2>{image.name}</h2>
//                       <h3>{image.description}</h3>
//                   </div>
//               ))}
//       </Slider>
//       </div>
      
//       <Footer/>
//     </div>
//   );
// };

// export default Home;


