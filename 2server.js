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

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Ensure all HTML files are in the public directory
const ensureHtmlFiles = () => {
  // Copy the HTML files from previous blocks to the public directory
  // You would typically have these files in your project already
  
  // For demonstration, we'll create a simple placeholder if files don't exist
  const pages = ['index.html', 'features.html', 'community.html', 'support.html'];
  
  pages.forEach(page => {
    const filePath = path.join(publicDir, page);
    if (!fs.existsSync(filePath)) {
      console.log(`Creating placeholder for ${page} - in production, you should have these files ready`);
      // In a real scenario, you would copy your actual HTML files here
    }
  });
};

// Call the function to ensure HTML files exist
ensureHtmlFiles();

// Routes for serving HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/features', (req, res) => {
  res.sendFile(path.join(publicDir, 'features.html'));
});

app.get('/community', (req, res) => {
  res.sendFile(path.join(publicDir, 'community.html'));
});

app.get('/support', (req, res) => {
  res.sendFile(path.join(publicDir, 'support.html'));
});

// API Routes

// Contact form submission from support page
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Log the contact request
    
    console.log('Contact form submission:', { name, email, subject, message });
    
    // Send success response
    res.json({ 
      success: true, 
      message: 'Thank you for your message! Our support team will get back to you within 24 hours.' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again later.' 
    });
  }
});

// Newsletter signup from community page
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }
    
    // Here you would typically:
    // 1. Save to email marketing database
    // 2. Send confirmation email
    // 3. Add to mailing list
    
    console.log('Newsletter signup:', { email });
    
    // Send success response
    res.json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    });
  } catch (error) {
    console.error('Error processing newsletter signup:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again later.' 
    });
  }
});

// Event registration from community page
app.post('/api/event-registration', (req, res) => {
  try {
    const { eventId, name, email } = req.body;
    
    // Validate required fields
    if (!eventId || !name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    // Here you would typically:
    // 1. Check event capacity
    // 2. Register user for event
    // 3. Send confirmation email
    
    console.log('Event registration:', { eventId, name, email });
    
    // Send success response
    res.json({ 
      success: true, 
      message: 'You have successfully registered for this event!' 
    });
  } catch (error) {
    console.error('Error processing event registration:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again later.' 
    });
  }
});

// User authentication endpoints
app.post('/api/register', (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    // Here you would typically:
    // 1. Check if user already exists
    // 2. Hash password
    // 3. Save user to database
    // 4. Generate verification email
    
    console.log('User registration:', { username, email });
    
    // Send success response
    res.json({ 
      success: true, 
      message: 'Registration successful! Please check your email to verify your account.' 
    });
  } catch (error) {
    console.error('Error processing registration:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again later.' 
    });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    // Here you would typically:
    // 1. Verify credentials against database
    // 2. Generate JWT token
    // 3. Set session/cookies
    
    console.log('Login attempt:', { username });
    
    // Send success response (mock user data)
    res.json({ 
      success: true, 
      message: 'Login successful!',
      user: {
        username,
        displayName: username,
        level: 1,
        xp: 0,
        avatar: '/placeholder.svg?height=100&width=100'
      },
      token: 'mock-jwt-token-would-be-here-in-production'
    });
  } catch (error) {
    console.error('Error processing login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again later.' 
    });
  }
});

// Game-specific API endpoints
app.get('/api/game/stats', (req, res) => {
  // This would typically fetch real-time game statistics from a database
  res.json({
    activePlayers: 1042879,
    dailyMatches: 287654,
    topPlayer: "GamerX2023",
    serverStatus: "Online"
  });
});

app.get('/api/game/events', (req, res) => {
  // This would typically fetch upcoming events from a database
  res.json([
    {
      id: 1,
      title: "UVAGI Championship Tournament",
      date: "2025-05-15T18:00:00Z",
      description: "Compete against the best players for a chance to win $100,000 in prizes.",
      image: "/placeholder.svg?height=200&width=400",
      registrationOpen: true
    },
    {
      id: 2,
      title: "Community Meetup - Los Angeles",
      date: "2025-06-05T20:00:00Z",
      description: "Meet fellow players and the development team in person at our LA event.",
      image: "/placeholder.svg?height=200&width=400",
      registrationOpen: true
    },
    {
      id: 3,
      title: "Season 5 Launch Party",
      date: "2025-07-01T17:00:00Z",
      description: "Be the first to experience the new season with special in-game rewards.",
      image: "/placeholder.svg?height=200&width=400",
      registrationOpen: false
    }
  ]);
});

app.get('/api/game/leaderboard', (req, res) => {
  // This would typically fetch leaderboard data from a database
  res.json([
    { rank: 1, username: "GamerX2023", score: 15782, avatar: "/placeholder.svg?height=50&width=50" },
    { rank: 2, username: "ProRacer99", score: 14956, avatar: "/placeholder.svg?height=50&width=50" },
    { rank: 3, username: "SpeedDemon", score: 14821, avatar: "/placeholder.svg?height=50&width=50" },
    { rank: 4, username: "NightRider", score: 14567, avatar: "/placeholder.svg?height=50&width=50" },
    { rank: 5, username: "RoadWarrior", score: 14302, avatar: "/placeholder.svg?height=50&width=50" }
  ]);
});

// FAQ API endpoint
app.get('/api/faqs', (req, res) => {
  // This would typically fetch FAQs from a database
  res.json([
    {
      id: 1,
      question: "What are the system requirements for UVAGI?",
      answer: "UVAGI requires at minimum: Windows 10 64-bit, Intel Core i5-4460 or AMD Ryzen 3 1200, 8 GB RAM, NVIDIA GTX 1050 Ti or AMD RX 560, 75 GB available space, and a broadband Internet connection."
    },
    {
      id: 2,
      question: "How do I create an account?",
      answer: "To create a UVAGI account: Visit our official website, click on the 'Sign Up' button, fill in your email address, username, and password, verify your email address, complete your profile information, download the game client and log in."
    },
    {
      id: 3,
      question: "Is UVAGI free to play?",
      answer: "UVAGI offers both free and premium options. The base game is free to play with access to core features and gameplay. We offer a Premium Pass for $9.99/month that includes exclusive content and benefits."
    },
    {
      id: 4,
      question: "How do I report a bug or player?",
      answer: "To report a bug: In-game, press ESC and select 'Report Bug', fill out the form with details, include screenshots if available, and submit. To report a player: Click on the player's name, select 'Report Player', choose the reason, provide details, and submit."
    },
    {
      id: 5,
      question: "How do I recover my password?",
      answer: "If you've forgotten your password: Go to the login page, click on 'Forgot Password', enter your email address, check your email for a reset link, click the link and follow instructions to create a new password, then log in with your new password."
    }
  ]);
});

// Download tracking endpoint
app.post('/api/download/track', (req, res) => {
  const { downloadId, platform } = req.body;
  
  // Here you would typically:
  // 1. Log the download for analytics
  // 2. Update download counter
  
  console.log('Download tracked:', { downloadId, platform });
  
  res.json({ success: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'An unexpected error occurred on the server. Please try again later.' 
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the UVAGI game website`);
  console.log('\nAvailable pages:');
  console.log('- Home: http://localhost:${PORT}/index.html');
  console.log('- Features: http://localhost:${PORT}/features.html');
  console.log('- Community: http://localhost:${PORT}/community.html');
  console.log('- Support: http://localhost:${PORT}/support.html');
  console.log('\nAPI Endpoints:');
  console.log('- POST /api/contact - Contact form submission');
  console.log('- POST /api/newsletter - Newsletter signup');
  console.log('- POST /api/event-registration - Event registration');
  console.log('- POST /api/register - User registration');
  console.log('- POST /api/login - User login');
  console.log('- GET /api/game/stats - Game statistics');
  console.log('- GET /api/game/events - Upcoming events');
  console.log('- GET /api/game/leaderboard - Player leaderboard');
  console.log('- GET /api/faqs - Frequently asked questions');
  console.log('- POST /api/download/track - Track downloads');
});