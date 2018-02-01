(function() {
  'use strict';

  const slideshow = [{
    'image': 'images/slideshow_1.jpeg',
    'caption': 'Cloudy with a chance of moon'
  }, {
    'image': 'images/slideshow_2.jpeg',
    'caption': 'Half moon mountain'
  }, {
    'image': 'images/slideshow_3.jpeg',
    'caption': 'Moonrise'
  }];

  const slideshowContainer = document.getElementsByClassName('slideshow-wrapper')[0];

  let activeSlide = slideshow[0];

  const setActiveSlide = activeSlide => {
    // Set all slides display none

    //img.style.display = 'block';
    //document.getElementById('caption').textContent = slide.caption;
    const slides = slideshowContainer.getElementsByTagName('img');
    Array.from(slides).forEach(slide => {
      

      if (slide.getAttribute('src') === activeSlide.image) {
        slide.style.display = 'block';
        document.getElementById('caption').textContent = activeSlide.caption;
      } else {
        slide.style.display = 'none';
      }
    });


  };

  slideshow.forEach(slide => {
    const img = document.createElement("img");
    img.setAttribute('src', slide.image);
    img.setAttribute('alt', slide.caption);

    // if (slide.image === activeSlide) {
    //   img.style.display = 'block';
    //   document.getElementById('caption').textContent = slide.caption;
    // }

    slideshowContainer.appendChild(img);
  });

  setActiveSlide(activeSlide);
})();
