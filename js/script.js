document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            initializeApp();
        }, 500);
    }, 2000); // Show loader for 2 seconds
});

function initializeApp() {
    // Initialize sample cafes data (10 cafes total)
    window.cafes = initSampleCafes();
    
    // Track current display mode
    window.showingAllCafes = false;
    
    // Initialize the application
    initializePreview();
    setupEventListeners();
    setupCityFiltering();
    setupMobileMenu();
    setupFlashMessages();
    loadFeaturedCafes(); // Load only 3 featured cafes initially
    updateStats();
    
    // Scroll to add-cafe section if hash present
    if (window.location.hash === '#add-cafe') {
        setTimeout(() => {
            document.getElementById('add-cafe').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// Sample cafes data - 10 cafes total
function initSampleCafes() {
    return [
        {
            id: 1,
            name: "Chai Point",
            location: "Connaught Place, Delhi",
            seats: 35,
            price: 120,
            cafe_type: "chai",
            image_url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Connaught+Place+Delhi",
            has_wifi: true,
            has_toilet: true,
            has_sockets: true,
            can_take_calls: false,
            rating: 4.5,
            is_featured: true
        },
        {
            id: 2,
            name: "Blue Tokai Coffee",
            location: "Hauz Khas, Delhi",
            seats: 30,
            price: 220,
            cafe_type: "coffee",
            image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Hauz+Khas+Delhi",
            has_wifi: true,
            has_toilet: true,
            has_sockets: true,
            can_take_calls: true,
            rating: 4.6,
            is_featured: true
        },
        {
            id: 3,
            name: "Third Wave Coffee",
            location: "Indiranagar, Bangalore",
            seats: 28,
            price: 180,
            cafe_type: "coffee",
            image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Indiranagar+Bangalore",
            has_wifi: true,
            has_toilet: true,
            has_sockets: true,
            can_take_calls: true,
            rating: 4.7,
            is_featured: true
        },
        {
            id: 4,
            name: "Leaping Windows",
            location: "Versova, Mumbai",
            seats: 20,
            price: 200,
            cafe_type: "coffee",
            image_url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Versova+Mumbai",
            has_wifi: true,
            has_toilet: true,
            has_sockets: true,
            can_take_calls: false,
            rating: 4.8,
            is_featured: false
        },
        {
            id: 5,
            name: "Indian Coffee House",
            location: "CP, Delhi",
            seats: 50,
            price: 80,
            cafe_type: "both",
            image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Indian+Coffee+House+Delhi",
            has_wifi: false,
            has_toilet: true,
            has_sockets: false,
            can_take_calls: true,
            rating: 4.2,
            is_featured: false
        },
        {
            id: 6,
            name: "Chaayos",
            location: "Saket, Delhi",
            seats: 40,
            price: 150,
            cafe_type: "chai",
            image_url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Saket+Delhi",
            has_wifi: true,
            has_toilet: true,
            has_sockets: true,
            can_take_calls: true,
            rating: 4.4,
            is_featured: false
        },
        {
            id: 7,
            name: "Starbucks",
            location: "MG Road, Bangalore",
            seats: 40,
            price: 250,
            cafe_type: "coffee",
            image_url: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=MG+Road+Bangalore",
            has_wifi: true,
            has_toilet: true,
            has_sockets: true,
            can_take_calls: false,
            rating: 4.4,
            is_featured: false
        },
        {
            id: 8,
            name: "Chai Kings",
            location: "Koramangala, Bangalore",
            seats: 25,
            price: 90,
            cafe_type: "chai",
            image_url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Koramangala+Bangalore",
            has_wifi: true,
            has_toilet: false,
            has_sockets: true,
            can_take_calls: true,
            rating: 4.3,
            is_featured: false
        },
        {
            id: 9,
            name: "The Bohri Cafe",
            location: "Bandra, Mumbai",
            seats: 40,
            price: 150,
            cafe_type: "both",
            image_url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Bandra+Mumbai",
            has_wifi: true,
            has_toilet: false,
            has_sockets: true,
            can_take_calls: true,
            rating: 4.3,
            is_featured: false
        },
        {
            id: 10,
            name: "Hyderabad Irani Cafe",
            location: "Banjara Hills, Hyderabad",
            seats: 45,
            price: 110,
            cafe_type: "both",
            image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            map_url: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
            has_wifi: false,
            has_toilet: true,
            has_sockets: false,
            can_take_calls: true,
            rating: 4.1,
            is_featured: false
        }
    ];
}

function initializePreview() {
    updatePreview();
    
    ['cafe-name', 'location', 'seats', 'coffee-price', 'image-url'].forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) input.addEventListener('input', updatePreview);
    });
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updatePreview);
    });
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updatePreview);
    });
}

function updatePreview() {
    // ... keep the existing updatePreview function code ...
    const nameInput = document.getElementById('cafe-name');
    if (nameInput) document.getElementById('preview-name').textContent = nameInput.value || 'Cafe Name';
    
    const locationInput = document.getElementById('location');
    if (locationInput) document.getElementById('preview-location').textContent = locationInput.value || 'Location';
    
    const seatsInput = document.getElementById('seats');
    if (seatsInput && seatsInput.value) {
        document.getElementById('preview-seats').textContent = seatsInput.value + ' seats';
    } else {
        document.getElementById('preview-seats').textContent = '0 seats';
    }
    
    const priceInput = document.getElementById('coffee-price');
    if (priceInput && priceInput.value) {
        document.getElementById('preview-price').textContent = priceInput.value;
    } else {
        document.getElementById('preview-price').textContent = '0';
    }
    
    // Live image preview from URL input
    const imageInput = document.getElementById('image-url');
    const previewImg = document.getElementById('preview-img');
    const previewImageContainer = document.querySelector('.preview-image');
    
    if (imageInput && previewImg) {
        const url = imageInput.value.trim();
        
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            // Show loading state
            previewImg.style.opacity = '0.5';
            
            // Create new image to test if it loads
            const testImage = new Image();
            testImage.onload = function() {
                // Image loaded successfully
                previewImg.src = url;
                previewImg.style.opacity = '1';
                previewImg.style.display = 'block';
                
                // Remove placeholder if it exists
                const placeholder = previewImageContainer.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            };
            
            testImage.onerror = function() {
                // Image failed to load
                previewImg.src = 'https://t3.ftcdn.net/jpg/02/69/01/66/360_F_269016655_I1w1sr0w5xqR4M6uaWbKcqEDK6v0zPr8.jpg';
                previewImg.style.opacity = '1';
                previewImg.style.display = 'block';
                
                // Show placeholder
                let placeholder = previewImageContainer.querySelector('.image-placeholder');
                if (!placeholder) {
                    placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    placeholder.textContent = 'Invalid image URL, showing default';
                    previewImageContainer.appendChild(placeholder);
                }
                placeholder.style.display = 'block';
            };
            
            testImage.src = url;
        } else {
            // Invalid URL or empty - show default
            previewImg.src = 'https://t3.ftcdn.net/jpg/02/69/01/66/360_F_269016655_I1w1sr0w5xqR4M6uaWbKcqEDK6v0zPr8.jpg';
            previewImg.style.opacity = '1';
            previewImg.style.display = 'block';
            
            // Show placeholder if URL is invalid
            if (url && !url.startsWith('http')) {
                let placeholder = previewImageContainer.querySelector('.image-placeholder');
                if (!placeholder) {
                    placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    previewImageContainer.appendChild(placeholder);
                }
                placeholder.textContent = 'Please enter a valid URL starting with http:// or https://';
                placeholder.style.display = 'block';
            } else {
                const placeholder = previewImageContainer.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            }
        }
    }
    
    const amenities = [
        {id: 'has-wifi', type: 'wifi'},
        {id: 'has-toilet', type: 'toilet'},
        {id: 'has-sockets', type: 'sockets'},
        {id: 'can-take-calls', type: 'calls'}
    ];
    
    amenities.forEach(amenity => {
        const checkbox = document.getElementById(amenity.id);
        const previewElement = document.querySelector(`.preview-amenity[data-amenity="${amenity.type}"]`);
        
        if (checkbox && previewElement) {
            if (checkbox.checked) {
                previewElement.classList.add('active');
                previewElement.style.opacity = '1';
                previewElement.style.backgroundColor = '#E8F5E9';
                previewElement.style.color = '#138808';
                previewElement.title = 'Available';
            } else {
                previewElement.classList.remove('active');
                previewElement.style.opacity = '0.5';
                previewElement.style.backgroundColor = '#F5F5F5';
                previewElement.style.color = '#6B7280';
                previewElement.title = 'Not available';
            }
        }
    });
    
    updateCafeTypeBadge();
}

function updateCafeTypeBadge() {
    const cafeTypeRadios = document.querySelectorAll('input[name="cafe-type"]');
    let selectedType = 'both';
    cafeTypeRadios.forEach(radio => {
        if (radio.checked) selectedType = radio.value;
    });
    
    const existingBadge = document.querySelector('.preview-type-badge');
    if (existingBadge) existingBadge.remove();
    
    const previewImage = document.querySelector('.preview-image');
    if (previewImage) {
        const typeNames = {
            'chai': 'Chai Cafe',
            'coffee': 'Coffee Shop',
            'both': 'Chai & Coffee'
        };
        
        const badge = document.createElement('div');
        badge.className = 'preview-type-badge';
        badge.textContent = typeNames[selectedType] || selectedType;
        previewImage.appendChild(badge);
    }
}

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Prevent body scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }
}

function setupCityFiltering() {
    const cityTags = document.querySelectorAll('.city-tag');
    
    cityTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const city = this.getAttribute('data-city') || this.textContent.trim().toLowerCase();
            
            document.querySelectorAll('.city-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cafes based on selected city
            let filteredCafes = window.cafes;
            if (city !== 'all') {
                filteredCafes = window.cafes.filter(cafe => 
                    extractCity(cafe.location) === city
                );
            }
            
            // Show loading state
            showLoadingCafes();
            
            // Display filtered cafes after a short delay for better UX
            setTimeout(() => {
                if (window.showingAllCafes) {
                    displayCafes(filteredCafes);
                } else {
                    // Show only first 3 cafes from filtered results
                    displayCafes(filteredCafes.slice(0, 3));
                }
                
                // Update stats badge
                updateStatsBadge(filteredCafes.length);
                
                // Hide loading
                hideLoadingCafes();
            }, 300);
        });
    });
}

function extractCity(location) {
    const locationLower = location.toLowerCase();
    
    const cityPatterns = {
        'delhi': ['delhi', 'new delhi', 'ncr', 'connaught place', 'cp', 'hauz khas', 'saket'],
        'bangalore': ['bangalore', 'bengaluru', 'indiranagar', 'koramangala', 'mg road', 'hsr'],
        'mumbai': ['mumbai', 'bombay', 'bandra', 'andheri', 'colaba', 'versova', 'powai'],
        'hyderabad': ['hyderabad', 'hitec city', 'banjara hills', 'gachibowli', 'jubilee hills'],
        'chennai': ['chennai', 'madras', 't nagar', 'tnagar', 'anna nagar', 'adyar'],
        'kolkata': ['kolkata', 'calcutta', 'park street', 'salt lake', 'howrah'],
        'pune': ['pune', 'koregaon park', 'kp', 'hinjewadi', 'wakad'],
        'ahmedabad': ['ahmedabad', 'amdavad', 'sg highway', 'vastrapur'],
        'jaipur': ['jaipur', 'pink city', 'malviya nagar', 'vaishali nagar'],
        'goa': ['goa', 'panaji', 'anjuna', 'baga', 'calangute', 'vagator']
    };
    
    for (const [city, patterns] of Object.entries(cityPatterns)) {
        if (patterns.some(pattern => locationLower.includes(pattern))) {
            return city;
        }
    }
    return 'other';
}

function setupFormValidation() {
    const cafeForm = document.getElementById('cafe-form');
    if (!cafeForm) return;
    
    const seatsInput = document.getElementById('seats');
    if (seatsInput) {
        seatsInput.addEventListener('input', function(e) {
            const value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 200) this.value = 200;
            if (isNaN(value)) this.value = 1;
        });
    }
    
    const priceInput = document.getElementById('coffee-price');
    if (priceInput) {
        priceInput.addEventListener('input', function(e) {
            const value = parseInt(this.value);
            if (value < 10) this.value = 10;
            if (value > 500) this.value = 500;
            if (isNaN(value)) this.value = 10;
        });
    }
    
    cafeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            addCafe();
        } else {
            showFormError('Please fill in all required fields correctly.');
        }
    });
}

function validateForm() {
    const requiredFields = ['cafe-name', 'location', 'seats', 'coffee-price', 'image-url', 'map-url'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            isValid = false;
            highlightFieldError(field, 'This field is required');
        } else if (field) {
            clearFieldError(field);
            
            if (fieldId === 'seats' && (field.value < 1 || field.value > 200)) {
                isValid = false;
                highlightFieldError(field, 'Please enter seats between 1-200');
            }
            
            if (fieldId === 'coffee-price' && (field.value < 10 || field.value > 500)) {
                isValid = false;
                highlightFieldError(field, 'Please enter price between ₹10-500');
            }
            
            if ((fieldId === 'image-url' || fieldId === 'map-url') && field.value) {
                if (!field.value.startsWith('http://') && !field.value.startsWith('https://')) {
                    isValid = false;
                    highlightFieldError(field, 'Please enter a valid URL starting with http:// or https://');
                }
            }
        }
    });
    
    return isValid;
}

function highlightFieldError(field, message) {
    field.classList.add('input-error');
    
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    const errorSpan = document.createElement('span');
    errorSpan.className = 'field-error';
    errorSpan.textContent = message;
    field.parentElement.appendChild(errorSpan);
}

function clearFieldError(field) {
    field.classList.remove('input-error');
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();
}

function showFormError(message) {
    const submitButton = document.querySelector('.cafe-form button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        submitButton.style.backgroundColor = '#ef4444';
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    }
    
    const firstError = document.querySelector('.input-error, .field-error');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function setupFlashMessages() {
    // Auto-remove flash messages after 5 seconds
    setTimeout(() => {
        const flashMessages = document.querySelectorAll('.flash-message');
        flashMessages.forEach(message => {
            message.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => message.remove(), 300);
        });
    }, 5000);
}

function showFlashMessage(message, type = 'success') {
    const flashContainer = document.getElementById('flash-messages');
    
    const flashDiv = document.createElement('div');
    flashDiv.className = `flash-message flash-${type}`;
    flashDiv.innerHTML = `
        <span>${message}</span>
        <button class="flash-close">&times;</button>
    `;
    
    flashContainer.appendChild(flashDiv);
    
    // Add close functionality
    const closeBtn = flashDiv.querySelector('.flash-close');
    closeBtn.addEventListener('click', function() {
        flashDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => flashDiv.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (flashDiv.parentNode) {
            flashDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => flashDiv.remove(), 300);
        }
    }, 5000);
}

function updateStatsBadge(count) {
    const badge = document.getElementById('shown-cafes-badge');
    if (badge) {
        badge.textContent = `${count} shown`;
    }
}

function updateStats() {
    const totalCafes = document.getElementById('total-cafes');
    if (totalCafes) {
        totalCafes.textContent = window.cafes.length;
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupSearch() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput && searchInput.value.trim()) {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                // Show loading
                showLoadingCafes();
                
                setTimeout(() => {
                    const filteredCafes = window.cafes.filter(cafe => 
                        cafe.location.toLowerCase().includes(searchTerm) ||
                        cafe.name.toLowerCase().includes(searchTerm)
                    );
                    
                    displayCafes(filteredCafes);
                    updateStatsBadge(filteredCafes.length);
                    
                    // Clear city tags active state
                    document.querySelectorAll('.city-tag').forEach(tag => tag.classList.remove('active'));
                    document.querySelector('.city-tag[data-city="all"]').classList.add('active');
                    
                    // Hide loading
                    hideLoadingCafes();
                    
                    // Scroll to cafe section
                    document.getElementById('cafes').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    }
}

function setupCafeCardInteractions() {
    // Will be called after cafes are loaded
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-cafe-btn')) {
            e.preventDefault();
            const cafeId = parseInt(e.target.dataset.cafeId);
            deleteCafe(cafeId);
        }
    });
}

function setupEventListeners() {
    setupFormValidation();
    setupSmoothScroll();
    setupSearch();
    setupCafeCardInteractions();
    
    const resetButton = document.getElementById('reset-form');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            setTimeout(updatePreview, 100);
            clearAllFieldErrors();
        });
    }
    
    const showAllBtn = document.getElementById('showAllBtn');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAllCafes();
        });
    }
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showFlashMessage('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }
}

function clearAllFieldErrors() {
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
}

function loadFeaturedCafes() {
    // Load only featured cafes initially (first 3)
    const featuredCafes = window.cafes.filter(cafe => cafe.is_featured);
    displayCafes(featuredCafes);
    window.showingAllCafes = false;
    
    // Update button text
    const showAllBtn = document.getElementById('showAllBtn');
    if (showAllBtn) {
        showAllBtn.innerHTML = '<i class="fas fa-eye"></i> See All Cafes';
    }
    
    updateStatsBadge(featuredCafes.length);
}

function showLoadingCafes() {
    const loadingDiv = document.getElementById('loading-cafes');
    if (loadingDiv) {
        loadingDiv.style.display = 'block';
    }
}

function hideLoadingCafes() {
    const loadingDiv = document.getElementById('loading-cafes');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

function displayCafes(cafes) {
    const cafeCardsContainer = document.getElementById('cafe-cards');
    if (!cafeCardsContainer) return;
    
    cafeCardsContainer.innerHTML = '';
    
    if (cafes.length === 0) {
        cafeCardsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-coffee" style="font-size: 3rem; color: var(--saffron); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--dark); margin-bottom: 1rem;">No cafes found</h3>
                <p style="color: var(--gray);">Try a different search or add a new cafe!</p>
            </div>
        `;
        return;
    }
    
    cafes.forEach(cafe => {
        const cafeCard = createCafeCard(cafe);
        cafeCardsContainer.appendChild(cafeCard);
    });
}

function createCafeCard(cafe) {
    const card = document.createElement('div');
    card.className = 'cafe-card';
    card.setAttribute('data-city', extractCity(cafe.location));
    
    card.innerHTML = `
        <div class="cafe-card-header">
            <div class="cafe-image" style="background-image: url('${cafe.image_url}');">
                <div class="cafe-price">${cafe.price}</div>
                <div class="cafe-tag">${cafe.cafe_type.charAt(0).toUpperCase() + cafe.cafe_type.slice(1)}</div>
            </div>
        </div>
        <div class="cafe-card-body">
            <h3 class="cafe-name">${cafe.name}</h3>
            <div class="cafe-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${cafe.location}</span>
            </div>
            <div class="cafe-features">
                <div class="feature">
                    <i class="fas fa-chair"></i>
                    <span>${cafe.seats} seats</span>
                </div>
                <div class="feature">
                    <i class="fas fa-rupee-sign"></i>
                    <span>₹${cafe.price}</span>
                </div>
                <div class="feature">
                    <i class="fas fa-${cafe.cafe_type === 'coffee' ? 'coffee' : 'mug-hot'}"></i>
                    <span>${cafe.cafe_type.charAt(0).toUpperCase() + cafe.cafe_type.slice(1)}</span>
                </div>
            </div>
            <div class="cafe-amenities">
                <div class="amenity ${cafe.has_wifi ? 'active' : ''}">
                    <i class="fas fa-wifi"></i>
                    <span>WiFi</span>
                </div>
                <div class="amenity ${cafe.has_toilet ? 'active' : ''}">
                    <i class="fas fa-restroom"></i>
                    <span>Toilet</span>
                </div>
                <div class="amenity ${cafe.can_take_calls ? 'active' : ''}">
                    <i class="fas fa-phone-alt"></i>
                    <span>Calls</span>
                </div>
                <div class="amenity ${cafe.has_sockets ? 'active' : ''}">
                    <i class="fas fa-plug"></i>
                    <span>Outlets</span>
                </div>
            </div>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <a href="${cafe.map_url}" target="_blank" class="btn btn-secondary btn-small">
                    <i class="fas fa-map"></i> View Map
                </a>
                <button class="btn btn-small delete-cafe-btn" data-cafe-id="${cafe.id}"
                    style="background-color: #ef4444; color: white; border: none;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    
    return card;
}

function toggleAllCafes() {
    const showAllBtn = document.getElementById('showAllBtn');
    const activeCity = document.querySelector('.city-tag.active');
    const city = activeCity ? activeCity.getAttribute('data-city') : 'all';
    
    // Show loading
    showLoadingCafes();
    
    setTimeout(() => {
        if (!window.showingAllCafes) {
            // Show all cafes
            let cafesToShow = window.cafes;
            if (city !== 'all') {
                cafesToShow = window.cafes.filter(cafe => extractCity(cafe.location) === city);
            }
            
            displayCafes(cafesToShow);
            window.showingAllCafes = true;
            
            // Update button text
            if (showAllBtn) {
                showAllBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Show Less';
                showAllBtn.classList.remove('btn-primary');
                showAllBtn.classList.add('btn-secondary');
            }
            
            // Update stats badge
            updateStatsBadge(cafesToShow.length);
        } else {
            // Show only featured cafes (first 3)
            let cafesToShow = window.cafes.filter(cafe => cafe.is_featured);
            if (city !== 'all') {
                const cityCafes = window.cafes.filter(cafe => extractCity(cafe.location) === city);
                cafesToShow = cityCafes.slice(0, 3);
            }
            
            displayCafes(cafesToShow);
            window.showingAllCafes = false;
            
            // Update button text
            if (showAllBtn) {
                showAllBtn.innerHTML = '<i class="fas fa-eye"></i> See All Cafes';
                showAllBtn.classList.remove('btn-secondary');
                showAllBtn.classList.add('btn-primary');
            }
            
            // Update stats badge
            updateStatsBadge(cafesToShow.length);
            
            // Scroll to cafes section
            document.getElementById('cafes').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Hide loading
        hideLoadingCafes();
    }, 500);
}

function addCafe() {
    const name = document.getElementById('cafe-name').value;
    const location = document.getElementById('location').value;
    const seats = parseInt(document.getElementById('seats').value);
    const price = parseInt(document.getElementById('coffee-price').value);
    const cafeType = document.querySelector('input[name="cafe-type"]:checked').value;
    const imageUrl = document.getElementById('image-url').value;
    const mapUrl = document.getElementById('map-url').value;
    
    const hasWifi = document.getElementById('has-wifi').checked;
    const hasToilet = document.getElementById('has-toilet').checked;
    const hasSockets = document.getElementById('has-sockets').checked;
    const canTakeCalls = document.getElementById('can-take-calls').checked;
    
    // Generate new ID
    const newId = window.cafes.length > 0 ? Math.max(...window.cafes.map(c => c.id)) + 1 : 1;
    
    const newCafe = {
        id: newId,
        name: name,
        location: location,
        seats: seats,
        price: price,
        cafe_type: cafeType,
        image_url: imageUrl,
        map_url: mapUrl,
        has_wifi: hasWifi,
        has_toilet: hasToilet,
        has_sockets: hasSockets,
        can_take_calls: canTakeCalls,
        rating: 4.0,
        is_featured: false // New cafes are not featured by default
    };
    
    // Add to cafes array
    window.cafes.push(newCafe);
    
    // Reset form
    document.getElementById('cafe-form').reset();
    updatePreview();
    
    // Show success message
    showFlashMessage(`Successfully added ${name} to our directory!`, 'success');
    
    // Update stats
    updateStats();
    
    // Show loading
    showLoadingCafes();
    
    setTimeout(() => {
        // If currently showing all cafes, display all including new one
        // Otherwise, stay with current view (showing only featured)
        if (window.showingAllCafes) {
            const activeCity = document.querySelector('.city-tag.active');
            const city = activeCity ? activeCity.getAttribute('data-city') : 'all';
            
            let cafesToShow = window.cafes;
            if (city !== 'all') {
                cafesToShow = window.cafes.filter(cafe => extractCity(cafe.location) === city);
            }
            
            displayCafes(cafesToShow);
            updateStatsBadge(cafesToShow.length);
        } else {
            // Just reload featured cafes (still only shows featured ones)
            loadFeaturedCafes();
        }
        
        // Hide loading
        hideLoadingCafes();
        
        // Scroll to cafes section
        document.getElementById('cafes').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

function deleteCafe(cafeId) {
    if (!confirm('Are you sure you want to delete this cafe?')) return;
    
    // Show loading
    showLoadingCafes();
    
    setTimeout(() => {
        const cafeIndex = window.cafes.findIndex(cafe => cafe.id === cafeId);
        if (cafeIndex !== -1) {
            const cafeName = window.cafes[cafeIndex].name;
            window.cafes.splice(cafeIndex, 1);
            
            // Update stats
            updateStats();
            
            // Update display based on current view
            if (window.showingAllCafes) {
                const activeCity = document.querySelector('.city-tag.active');
                const city = activeCity ? activeCity.getAttribute('data-city') : 'all';
                
                let cafesToShow = window.cafes;
                if (city !== 'all') {
                    cafesToShow = window.cafes.filter(cafe => extractCity(cafe.location) === city);
                }
                
                displayCafes(cafesToShow);
                updateStatsBadge(cafesToShow.length);
            } else {
                loadFeaturedCafes();
            }
            
            // Show success message
            showFlashMessage(`Successfully deleted ${cafeName}`, 'success');
        }
        
        // Hide loading
        hideLoadingCafes();
    }, 500);
}

// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedUpdatePreview = debounce(updatePreview, 300);
['cafe-name', 'location', 'seats', 'coffee-price', 'image-url'].forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) input.addEventListener('input', debouncedUpdatePreview);
});