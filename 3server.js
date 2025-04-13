// API handling functions for UVAGI Game website

// Generic function to handle form submissions
async function submitForm(url, formData) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      
      return data;
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  }
  
  // Contact form handler
  async function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const subjectInput = form.querySelector('#subject');
    const messageInput = form.querySelector('#message');
    
    try {
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
      };
      
      const result = await submitForm('/api/contact', formData);
      
      // Show success message
      alert(result.message);
      
      // Reset form
      form.reset();
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    }
  }
  
  // Newsletter signup handler
  async function handleNewsletterSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    
    try {
      const formData = {
        email: emailInput.value,
      };
      
      const result = await submitForm('/api/newsletter', formData);
      
      // Show success message
      alert(result.message);
      
      // Reset form
      form.reset();
    } catch (error) {
      alert('Error subscribing to newsletter: ' + error.message);
    }
  }
  
  // Event registration handler
  async function handleEventRegistration(event) {
    event.preventDefault();
    
    const button = event.target;
    const eventId = button.getAttribute('data-event-id');
    
    // In a real application, you would collect user information
    // For this example, we'll use a prompt
    const name = prompt('Please enter your name:');
    const email = prompt('Please enter your email:');
    
    if (!name || !email) {
      alert('Name and email are required to register for an event.');
      return;
    }
    
    try {
      const formData = {
        eventId,
        name,
        email,
      };
      
      const result = await submitForm('/api/event-registration', formData);
      
      // Show success message
      alert(result.message);
    } catch (error) {
      alert('Error registering for event: ' + error.message);
    }
  }
  
  // User registration handler
  async function handleUserRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const usernameInput = form.querySelector('#username');
    const emailInput = form.querySelector('#email');
    const passwordInput = form.querySelector('#password');
    
    try {
      const formData = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      
      const result = await submitForm('/api/register', formData);
      
      // Show success message
      alert(result.message);
      
      // Reset form
      form.reset();
    } catch (error) {
      alert('Error registering: ' + error.message);
    }
  }
  
  // User login handler
  async function handleUserLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const usernameInput = form.querySelector('#username');
    const passwordInput = form.querySelector('#password');
    
    try {
      const formData = {
        username: usernameInput.value,
        password: passwordInput.value,
      };
      
      const result = await submitForm('/api/login', formData);
      
      // Show success message
      alert(result.message);
      
      // Store user data in localStorage (in a real app, you'd use secure cookies)
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      
      // Redirect to dashboard or home page
      window.location.href = '/';
    } catch (error) {
      alert('Error logging in: ' + error.message);
    }
  }
  
  // Download tracking handler
  function trackDownload(downloadId, platform) {
    // Send download tracking info to server
    fetch('/api/download/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ downloadId, platform }),
    }).catch(error => {
      console.error('Error tracking download:', error);
    });
  }
  
  // Load game stats
  async function loadGameStats() {
    try {
      const response = await fetch('/api/game/stats');
      const data = await response.json();
      
      // Update stats on the page
      const statsElements = document.querySelectorAll('[data-stat]');
      statsElements.forEach(element => {
        const statKey = element.getAttribute('data-stat');
        if (data[statKey]) {
          element.textContent = data[statKey];
        }
      });
    } catch (error) {
      console.error('Error loading game stats:', error);
    }
  }
  
  // Load upcoming events
  async function loadEvents() {
    try {
      const response = await fetch('/api/game/events');
      const events = await response.json();
      
      const eventsContainer = document.querySelector('.events-grid');
      if (!eventsContainer) return;
      
      // Clear existing events
      eventsContainer.innerHTML = '';
      
      // Add events to the page
      events.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        const eventHtml = `
          <div class="event-card">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
              <span class="event-date">${formattedDate}</span>
              <h3 class="event-title">${event.title}</h3>
              <p class="event-description">${event.description}</p>
              <a href="#" class="event-button" data-event-id="${event.id}" onclick="handleEventRegistration(event)">
                ${event.registrationOpen ? 'Register Now' : 'Coming Soon'}
              </a>
            </div>
          </div>
        `;
        
        eventsContainer.innerHTML += eventHtml;
      });
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }
  
  // Load leaderboard
  async function loadLeaderboard() {
    try {
      const response = await fetch('/api/game/leaderboard');
      const players = await response.json();
      
      const leaderboardContainer = document.querySelector('.leaderboard-table');
      if (!leaderboardContainer) return;
      
      // Clear existing leaderboard
      leaderboardContainer.innerHTML = '';
      
      // Add table header
      leaderboardContainer.innerHTML = `
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      
      const tableBody = leaderboardContainer.querySelector('tbody');
      
      // Add players to the leaderboard
      players.forEach(player => {
        const playerRow = `
          <tr>
            <td>${player.rank}</td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <img src="${player.avatar}" alt="${player.username}" style="width: 30px; height: 30px; border-radius: 50%;">
                ${player.username}
              </div>
            </td>
            <td>${player.score.toLocaleString()}</td>
          </tr>
        `;
        
        tableBody.innerHTML += playerRow;
      });
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  }
  
  // Load FAQs
  async function loadFAQs() {
    try {
      const response = await fetch('/api/faqs');
      const faqs = await response.json();
      
      const faqContainer = document.querySelector('.faq-container');
      if (!faqContainer) return;
      
      // Clear existing FAQs
      faqContainer.innerHTML = '';
      
      // Add FAQs to the page
      faqs.forEach(faq => {
        const faqHtml = `
          <div class="faq-item">
            <div class="faq-question">
              ${faq.question}
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
              <p>${faq.answer}</p>
            </div>
          </div>
        `;
        
        faqContainer.innerHTML += faqHtml;
      });
      
      // Add click event listeners to FAQ questions
      const faqQuestions = document.querySelectorAll('.faq-question');
      faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
          const answer = this.nextElementSibling;
          const isActive = answer.classList.contains('active');
          
          // Close all answers
          document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('active');
          });
          
          // Toggle the clicked answer
          if (!isActive) {
            answer.classList.add('active');
          }
          
          // Update icons
          document.querySelectorAll('.faq-question i').forEach(icon => {
            icon.className = 'fas fa-chevron-down';
          });
          
          if (!isActive) {
            this.querySelector('i').className = 'fas fa-chevron-up';
          }
        });
      });
    } catch (error) {
      console.error('Error loading FAQs:', error);
    }
  }
  
  // Initialize page-specific functionality
  function initializePage() {
    // Determine which page we're on
    const path = window.location.pathname;
    
    // Common initialization for all pages
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', function() {
        alert('Mobile menu clicked! Add your menu toggle functionality here.');
      });
    }
    
    // Play buttons functionality
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
      button.addEventListener('click', function() {
        alert('Play Now clicked! Add your game launch functionality here.');
      });
    });
    
    // Page-specific initialization
    if (path === '/' || path === '/index.html') {
      // Home page
      const downloadButton = document.querySelector('.cta-button');
      if (downloadButton) {
        downloadButton.addEventListener('click', function() {
          trackDownload('main-game', navigator.platform);
          alert('Download started! Thank you for downloading UVAGI.');
        });
      }
    } 
    else if (path === '/features' || path === '/features.html') {
      // Features page
      const downloadButton = document.querySelector('.cta-button');
      if (downloadButton) {
        downloadButton.addEventListener('click', function() {
          trackDownload('main-game', navigator.platform);
          alert('Download started! Thank you for downloading UVAGI.');
        });
      }
    } 
    else if (path === '/community' || path === '/community.html') {
      // Community page
      loadGameStats();
      loadEvents();
      
      // Newsletter form
      const newsletterForm = document.querySelector('.newsletter-form');
      if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
      }
    } 
    else if (path === '/support' || path === '/support.html') {
      // Support page
      loadFAQs();
      
      // Contact form
      const supportForm = document.getElementById('supportForm');
      if (supportForm) {
        supportForm.addEventListener('submit', handleContactForm);
      }
    }
  }
  
  // Run initialization when DOM is loaded
  document.addEventListener('DOMContentLoaded', initializePage);