// Automatic and manual image slider
var imageSlider = document.getElementById('imageSlider');
var images = document.querySelector('.images');
var imageWidth = document.querySelector('.images img').clientWidth;
var currentIndex = 0;
var slideInterval = 3000; // Change slide interval as needed
var transitionDuration = 0.5; // Adjust transition duration as needed
var startX = 0;
var isDragging = false;

function slideImages() {
  currentIndex = (currentIndex + 1) % images.children.length;
  var offset = -currentIndex * imageWidth;
  images.style.transition = 'transform ' + transitionDuration + 's ease';
  images.style.transform = 'translateX(' + offset + 'px)';
}

function resetSlide() {
  // Reset to the first image after the last image
  if (currentIndex === images.children.length - 1) {
    setTimeout(function() {
      images.style.transition = 'none'; // Disable transition for instant reset
      currentIndex = 0;
      images.style.transform = 'translateX(0)';
    }, transitionDuration * 1000);
  }
}

function handleTouchStart(event) {
  isDragging = true;
  startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  if (!isDragging) return;
  var currentX = event.touches[0].clientX;
  var diffX = startX - currentX;
  images.style.transition = 'none'; // Disable transition during drag
  var currentTranslate = -currentIndex * imageWidth;
  var translate = currentTranslate - diffX;
  images.style.transform = 'translateX(' + translate + 'px)';
}

function handleTouchEnd() {
  isDragging = false;
  var threshold = imageWidth / 3; // Swipe threshold to change image
  var deltaX = startX - event.changedTouches[0].clientX;
  if (Math.abs(deltaX) > threshold) {
    if (deltaX > 0) {
      currentIndex = Math.min(currentIndex + 1, images.children.length - 1);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
  }
  var offset = -currentIndex * imageWidth;
  images.style.transition = 'transform ' + transitionDuration + 's ease';
  images.style.transform = 'translateX(' + offset + 'px)';
}

setInterval(slideImages, slideInterval);
images.addEventListener('transitionend', resetSlide);
imageSlider.addEventListener('touchstart', handleTouchStart);
imageSlider.addEventListener('touchmove', handleTouchMove);
imageSlider.addEventListener('touchend', handleTouchEnd);
