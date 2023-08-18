// Get a reference to the button element
const alertButton = document.getElementById('alertButton');

// Add a click event listener to the button
alertButton.addEventListener('click', () => {
  // Display an alert when the button is clicked
  alert('Button clicked! You can add more sophisticated interactions using JavaScript.');
});

// Form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
    event.preventDefault();
    alert('Please fill in all fields.');
  } else if (!isValidEmail(email.value)) {
    event.preventDefault();
    alert('Please enter a valid email address.');
  }
});

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Image slider
const sliderContainer = document.querySelector('.image-slider .slider-container');
const images = sliderContainer.querySelectorAll('img');

let currentIndex = 0;

function showImage(index) {
  if (index < 0) {
    index = images.length - 1;
  } else if (index >= images.length) {
    index = 0;
  }
  images.forEach((image, i) => {
    image.style.transform = i === index ? 'translateX(0)' : 'translateX(-100%)';
  });
  currentIndex = index;
}

// Start the slider
showImage(currentIndex);

// Move to the next image every 3 seconds
setInterval(() => {
  showImage(currentIndex + 1);
}, 3000);

// Search functionality
const searchInput = document.getElementById('searchInput');
const itemsToFilter = document.querySelectorAll('.items');

searchInput.addEventListener('input', filterItems);

function filterItems() {
  const searchTerm = searchInput.value.toLowerCase();
  
  itemsToFilter.forEach(item => {
    const itemName = item.querySelector('.name').textContent.toLowerCase();
    
    if (itemName.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Initial filtering
filterItems();

// Direct to most relevant search
searchInput.addEventListener('keydown', navigateSearchResults);

function navigateSearchResults(event) {
  const key = event.key;

  if (key === 'Enter') {
    event.preventDefault();

    const visibleItems = Array.from(itemsToFilter).filter(item => item.style.display === 'block');
    
    if (visibleItems.length > 0) {
      const mostRelevantItem = findMostRelevantItem(visibleItems, searchInput.value.toLowerCase());
      
      if (mostRelevantItem) {
        // Scroll to the most relevant item
        mostRelevantItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

function findMostRelevantItem(items, searchTerm) {
  let mostRelevantItem = null;
  let highestMatchScore = 0;

  items.forEach(item => {
    const itemName = item.querySelector('.name').textContent.toLowerCase();
    const matchScore = calculateMatchScore(itemName, searchTerm);
    
    if (matchScore > highestMatchScore) {
      highestMatchScore = matchScore;
      mostRelevantItem = item;
    }
  });

  return mostRelevantItem;
}

function calculateMatchScore(itemName, searchTerm) {
  const wordsInSearchTerm = searchTerm.split(' ');
  let matchScore = 0;

  wordsInSearchTerm.forEach(word => {
    if (itemName.includes(word)) {
      matchScore++;
    }
  });

  return matchScore;
}
