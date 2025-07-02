// Spotlight effect for cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

// Video play/pause on hover
function setupVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Ensure videos are muted for autoplay
        video.muted = true;
        video.playsInline = true;
        
        // For iOS devices
        video.addEventListener('loadedmetadata', function() {
            video.currentTime = 0.1; // Small hack for iOS
        });
        
        // Mouse/touch events
        const playVideo = () => {
            video.play().catch(e => console.log("Video play attempt:", e));
        };
        
        const pauseVideo = () => {
            video.pause();
        };
        
        video.addEventListener('mouseenter', playVideo);
        video.addEventListener('mouseleave', pauseVideo);
        video.addEventListener('touchstart', playVideo);
        video.addEventListener('touchend', pauseVideo);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', setupVideos);

// Form handling with EmailJS
document.addEventListener("DOMContentLoaded", function() {
  // Initialize EmailJS
  emailjs.init("9c9UABgvXx_XjFIfd");
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      
      emailjs.sendForm("service_5buonrg", "template_5gqsi34", this)
        .then(() => {
          // Show success message
          const successMessage = document.getElementById('successMessage');
          if (successMessage) {
            successMessage.style.display = 'block';
            setTimeout(() => {
              successMessage.style.display = 'none';
            }, 3000);
          }
          
          // Reset form
          this.reset();
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
          alert("Failed to send message. Please try again later.");
        })
        .finally(() => {
          // Reset button state
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});

// Mobile menu toggle (if needed)
const setupMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  
  // Initialize AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  
  // Handle scroll events for any scroll-based animations
  window.addEventListener('scroll', () => {
    // Add any scroll-based functionality here
  });
});

// Responsive adjustments
window.addEventListener('resize', () => {
  // Handle any responsive adjustments needed
});


// Function to handle 3D planet responsiveness
/*function adjustPlanetSize() {
    const planet = document.querySelector('.planet-3D');
    if (!planet) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Reset to default values first
    planet.style.width = '100%';
    planet.style.right = '-20%';
    planet.style.top = '10%';
    
    if (vw < 768) {
        // Mobile
        planet.style.width = '150%';
        planet.style.right = '-50%';
        planet.style.top = '5%';
    }
    
    if (vw < 576) {
        // Small mobile
        planet.style.width = '180%';
        planet.style.right = '-80%';
    }
    
    // Adjust for landscape orientation
    if (vw > vh && vw < 1000) {
        planet.style.width = '80%';
        planet.style.right = '-10%';
    }
}*/

// Add this to your JavaScript
function optimize3DModels() {
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const models = document.querySelectorAll('spline-viewer');
    
    models.forEach(model => {
        if (isMobile) {
            // Reduce quality on mobile
            model.setAttribute('loading', 'lazy');
            model.setAttribute('render-quality', 'medium');
        } else {
            model.setAttribute('render-quality', 'high');
        }
    });
}

// Call this on load and resize
window.addEventListener('load', optimize3DModels);
window.addEventListener('resize', optimize3DModels);
/*
// Run on load and resize
window.addEventListener('load', adjustPlanetSize);
window.addEventListener('resize', adjustPlanetSize);

// Also adjust when orientation changes
window.addEventListener('orientationchange', adjustPlanetSize);

function adjustModelBox() {
    const modelBoxes = document.querySelectorAll('.model-box');
    const introCard = document.querySelector('.intro');
    
    modelBoxes.forEach(box => {
        // Reset styles before applying new ones
        box.style.position = '';
        box.style.top = '';
        box.style.right = '';
        box.style.transform = '';
        box.style.width = '';
        box.style.height = '';
        
        // Get viewport width
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        
        if (vw < 768) {
            // Mobile
            box.style.height = '200px';
            if (vw < 400) {
                box.style.height = '150px';
            }
        } 
        else if (vw >= 768 && vw < 992) {
            // Tablet
            box.style.height = '300px';
        } 
        else {
            // Desktop
            box.style.position = 'absolute';
            box.style.width = '400px';
            box.style.height = '400px';
            
            if (box.parentElement.classList.contains('intro')) {
                box.style.right = '-50px';
                box.style.top = '20%';
            } else {
                box.style.right = '5%';
                box.style.top = '50%';
                box.style.transform = 'translateY(-50%)';
            }
            
            if (vw >= 1200) {
                box.style.width = '500px';
                box.style.height = '500px';
                if (box.parentElement.classList.contains('intro')) {
                    box.style.right = '-100px';
                    box.style.top = '10%';
                }
            }
        }
    });
}

// Run on load and resize
window.addEventListener('load', adjustModelBox);
window.addEventListener('resize', adjustModelBox);
*/
