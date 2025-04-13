import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Write the HTML file to the public directory with SEO and AdSense
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="UVAGI Game - Experience the ultimate gaming adventure with competitive gameplay, stunning graphics, and multiplayer features.">
    <meta name="keywords" content="UVAGI, online game, multiplayer game, competitive gaming, adventure game">
    <meta name="author" content="UVAGI Team">
    <meta property="og:title" content="UVAGI Game - Ultimate Gaming Adventure">
    <meta property="og:description" content="Join thousands of players in this immersive world of excitement and challenges.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://uvagigame.com">
    <meta property="og:image" content="https://uvagigame.com/images/uvagi-logo.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="https://uvagigame.com">
    <title>UVAGI Game - Ultimate Gaming Adventure | Competitive Multiplayer Game</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID" crossorigin="anonymous"></script>
    <style>
        /* All your existing CSS styles here */
        /* ... */
        
        /* Ad spaces */
        .ad-container {
            width: 100%;
            margin: 2rem 0;
            padding: 1rem;
            background-color: rgba(31, 41, 55, 0.5);
            border-radius: 0.5rem;
            text-align: center;
            min-height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .ad-label {
            font-size: 0.75rem;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }
        
        .ad-banner {
            width: 100%;
            max-width: 728px;
            height: 90px;
            background-color: rgba(147, 51, 234, 0.1);
            border: 1px dashed #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 0.875rem;
            margin: 0 auto;
        }
        
        .ad-square {
            width: 100%;
            max-width: 300px;
            height: 250px;
            background-color: rgba(147, 51, 234, 0.1);
            border: 1px dashed #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 0.875rem;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <header>
        <div class="container header-container">
            <div class="logo">
                <i class="fas fa-gamepad" style="color: #a78bfa; font-size: 2rem;"></i>
                <span class="logo-text">UVAGI</span>
            </div>
            <nav class="nav-links">
                <a href="#">Home</a>
                <a href="#">Features</a>
                <a href="#">Community</a>
                <a href="#">Support</a>
            </nav>
            <button class="play-button">Play Now</button>
            <button class="mobile-menu-button">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>
    
    <main>
        <!-- Top Ad Banner -->
        <div class="container">
            <div class="ad-container">
                <div>
                    <div class="ad-label">Advertisement</div>
                    <div class="ad-banner">
                        <script>
                            (adsbygoogle = window.adsbygoogle || []).push({
                                google_ad_client: "ca-pub-YOUR_ADSENSE_ID",
                                enable_page_level_ads: true,
                                overlays: {bottom: true}
                            });
                        </script>
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-YOUR_ADSENSE_ID"
                             data-ad-slot="YOUR_AD_UNIT_ID_TOP"
                             data-ad-format="auto"
                             data-full-width-responsive="true"></ins>
                        <script>
                             (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="hero">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-content">
                        <h1 class="hero-title">
                            Welcome to <span>UVAGI</span>
                        </h1>
                        <p class="hero-description">
                            Experience the ultimate gaming adventure. Join thousands of players in this immersive world of
                            excitement and challenges.
                        </p>
                        <div class="hero-buttons">
                            <button class="play-button">Play Now</button>
                            <button style="background: transparent; border: 1px solid #7e22ce; color: #a78bfa; padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; cursor: pointer;">
                                Watch Trailer
                            </button>
                        </div>
                    </div>
                    <div class="hero-image">
                        <div class="hero-logo">UVAGI</div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Middle Ad Square -->
        <div class="container">
            <div class="ad-container">
                <div>
                    <div class="ad-label">Advertisement</div>
                    <div class="ad-square">
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-YOUR_ADSENSE_ID"
                             data-ad-slot="YOUR_AD_UNIT_ID_MIDDLE"
                             data-ad-format="rectangle"
                             data-full-width-responsive="true"></ins>
                        <script>
                             (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="features">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Game Features</h2>
                    <p class="section-description">
                        Discover what makes UVAGI the most exciting game of the year
                    </p>
                </div>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h3 class="feature-title">Competitive Gameplay</h3>
                        <p class="feature-description">Compete against players worldwide in ranked matches and tournaments.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3 class="feature-title">Multiplayer Experience</h3>
                        <p class="feature-description">
                            Team up with friends or make new allies in our expansive multiplayer universe.
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <h3 class="feature-title">Stunning Graphics</h3>
                        <p class="feature-description">Immerse yourself in breathtaking visuals and detailed environments.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="stats">
            <div class="container">
                <div class="stats-grid">
                    <div class="stats-content">
                        <div class="stats-number">1M+</div>
                        <h2 class="stats-title">Players Worldwide</h2>
                        <p class="stats-description">
                            Join our growing community of gamers and experience the thrill of UVAGI.
                        </p>
                    </div>
                    <div class="stats-cards">
                        <div class="stat-card">
                            <div class="stat-card-number">200+</div>
                            <div class="stat-card-text">Unique Characters</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-number">50+</div>
                            <div class="stat-card-text">Game Modes</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-number">100+</div>
                            <div class="stat-card-text">Maps & Worlds</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-number">24/7</div>
                            <div class="stat-card-text">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Bottom Ad Banner -->
        <div class="container">
            <div class="ad-container">
                <div>
                    <div class="ad-label">Advertisement</div>
                    <div class="ad-banner">
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-YOUR_ADSENSE_ID"
                             data-ad-slot="YOUR_AD_UNIT_ID_BOTTOM"
                             data-ad-format="auto"
                             data-full-width-responsive="true"></ins>
                        <script>
                             (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="cta">
            <div class="container">
                <div class="cta-container">
                    <h2 class="cta-title">Ready to Join the Adventure?</h2>
                    <p class="cta-description">
                        Download now and get exclusive in-game items for new players!
                    </p>
                    <button class="cta-button">Download UVAGI</button>
                </div>
            </div>
        </section>
    </main>
    
    <footer>
        <div class="container footer-container">
            <div class="footer-logo">
                <i class="fas fa-gamepad" style="color: #a78bfa;"></i>
                <span class="footer-logo-text">UVAGI</span>
            </div>
            <div class="footer-links">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="#">Contact</a>
            </div>
            <div class="footer-copyright">© <span id="current-year"></span> UVAGI. All rights reserved.</div>
        </div>
    </footer>
    
    <script>
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
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
        
        // Trailer button functionality
        const trailerButton = document.querySelector('.hero-buttons button:nth-child(2)');
        
        if (trailerButton) {
            trailerButton.addEventListener('click', function() {
                alert('Watch Trailer clicked! Add your trailer video functionality here.');
            });
        }
        
        // Download button functionality
        const downloadButton = document.querySelector('.cta-button');
        
        if (downloadButton) {
            downloadButton.addEventListener('click', function() {
                alert('Download clicked! Add your download functionality here.');
            });
        }
        
        // Initialize Google AdSense
        window.addEventListener('load', function() {
            if (typeof adsbygoogle !== 'undefined') {
                adsbygoogle.push({});
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// API routes for backend functionality
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Here you would typically save this to a database or send an email
  console.log('Contact form submission:', { name, email, message });
  
  // Send a response back
  res.json({ success: true, message: 'Thank you for your message!' });
});

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Here you would typically validate and save user data to a database
  console.log('New user registration:', { username, email });
  
  // Send a response back
  res.json({ success: true, message: 'Registration successful!' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Here you would typically validate credentials against a database
  console.log('Login attempt:', { username });
  
  // Send a response back (this is a mock response)
  res.json({ 
    success: true, 
    message: 'Login successful!',
    user: {
      username,
      displayName: username,
      level: 1,
      xp: 0
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the UVAGI game landing page`);
});

// Log instructions for how to use the server
console.log('\nAPI Endpoints:');
console.log('- POST /api/contact - Contact form submission');
console.log('- POST /api/register - User registration');
console.log('- POST /api/login - User login');
console.log('\nTo use these endpoints, send a POST request with JSON data.');