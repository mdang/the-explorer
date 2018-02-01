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
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let activeIndex = 0;

  const setActiveSlide = activeSlide => {
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

  const disableButton = button => {
    button.disabled = true;
  };

  const enableButton = button => {
    button.disabled = false;
  };

  slideshow.forEach(slide => {
    const img = document.createElement("img");
    img.setAttribute('src', slide.image);
    img.setAttribute('alt', slide.caption);

    slideshowContainer.appendChild(img);
  });

  prevBtn.addEventListener('click', e => {
    enableButton(nextBtn);

    activeIndex--;
    setActiveSlide(slideshow[activeIndex]);

    if (activeIndex === 0) {
      disableButton(prevBtn);
    }
  });

  nextBtn.addEventListener('click', e => {
    enableButton(prevBtn);

    activeIndex++;
    setActiveSlide(slideshow[activeIndex]);

    if (activeIndex === slideshow.length - 1) {
      disableButton(nextBtn);
    }
  });

  setActiveSlide(slideshow[activeIndex]);
  disableButton(prevBtn);
})();
