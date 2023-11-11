document.addEventListener('DOMContentLoaded', function () {
  const square = document.getElementById('colorSquare');

  window.addEventListener('scroll', function () {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    // Generate a random color based on scroll position
    const hue = (scrollPercentage * 1.8) % 360;
    const color = `hsl(${hue}, 100%, 50%)`;

    square.style.backgroundColor = color;
  });
});
