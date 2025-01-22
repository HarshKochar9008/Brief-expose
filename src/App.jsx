import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import "./App.css";
import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [error, setError] = useState(null);

  const screenContentRef = useRef(null);
  const laptopImageRef = useRef(null);

  const apiKey = import.meta.env.VITE_REACT_APP_NEWS_API_KEY;
  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?language=en&country=us&apiKey=${apiKey}`
        );
        
        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("API Response Data:", data);

        // Filter articles to include only those with a valid image URL
        const filteredArticles = data.articles.filter((article) => {
          const imageUrl = article.urlToImage; // Get the image URL
          // console.log("Fetched Image URL:", imageUrl);
          return imageUrl !== null && imageUrl !== undefined && imageUrl !== ""; // Keep only articles with valid image URLs
        });

        setNewsArticles(filteredArticles); // Set the filtered articles

        // Fetch trending news (you can use a different endpoint if available)
        const trendingResponse = await fetch(
          `https://newsapi.org/v2/everything?q=trending&apiKey=${apiKey}`
        );

        if (!trendingResponse.ok) {
          throw new Error(`HTTP error! status: ${trendingResponse.status}`);
        }

        const trendingData = await trendingResponse.json();
        const filteredTrendingArticles = trendingData.articles.filter((article) => {
          const imageUrl = article.urlToImage;
          return imageUrl !== null && imageUrl !== undefined && imageUrl !== "";
        });

        setTrendingArticles(filteredTrendingArticles); // Set the trending articles
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      }
    };

    // Check if the API key is defined before making the request
    if (apiKey) {
      fetchNews();
    } else {
      console.error("API key is undefined. Please check your .env file.");
    }
  }, [apiKey]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = screenContentRef.current.scrollTop;
  
      // Apply translateY to laptopImage
      if (laptopImageRef.current) {
        laptopImageRef.current.style.transform = `translateY(${-scrollTop * 0.1}px)`;
      }
  
      // Apply the same scroll effect to the screen content
      if (screenContentRef.current) {
        screenContentRef.current.style.transform = `translateY(${-scrollTop * 0.1}px)`;
      }
    };
  
    const screenContent = screenContentRef.current;
    if (screenContent) {
      screenContent.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      if (screenContent) {
        screenContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  

  return (
    <div className="all">
      <div className="outer-container">
        <div className="screen-content" ref={screenContentRef}>
          <div className="content">
            <div className="app-container">
              <header className="header">
                <h1 className="logo">Brief</h1>
                <nav className="navigation">
                  <ul>
                    <li>Stories</li>
                    <li>Creator</li>
                    <li>Community</li>
                    <li>Subscribe</li>
                  </ul>
                </nav>
                <div className="user-controls">
                  <button className="write-button">
                    Write <EditNoteOutlinedIcon style={{ fontSize: "15px" }} />
                  </button>
                  <BookmarkOutlinedIcon style={{ fontSize: "12px" }} />
                  <div className="user-avatar"></div>
                </div>
              </header>

              <main className="main-content">
                <div className="featured-article">
                  <h2>Trending News</h2>
                  {trendingArticles.length > 0 ? (
                    trendingArticles.map((article, index) => (
                      <div className="trending-item" key={index}>
                        <img
                          src={article.urlToImage || "/default-image.jpg"}
                          alt={article.title}
                          style={{ width: '70px', height: 'auto', border: 'none', borderRadius: '5%', padding: '20%' }}
                        />
                        <p>{article.title}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                      </div>
                    ))
                  ) : (
                    <p>No trending articles found.</p>
                  )}
                </div>

                <section className="latest-news">
                  <h2>Latest News</h2>
                  {error ? (
                    <p className="error-message">{error}</p>
                  ) : (
                    <div className="news-grid">
                      {newsArticles.length > 0 ? (
                        newsArticles.map((article, index) => (
                          <div className="news-item" key={index}>
                            <img
                              src={article.urlToImage || "/default-image.jpg"}
                              alt={article.title}
                            />
                            <p>{article.title}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                          </div>
                        ))
                      ) : (
                        <p>No articles found.</p>
                      )}
                    </div>
                  )}
                  <a href="#" className="see-all-link">
                    See all
                  </a>
                </section>
              </main>
            </div>
          </div>
        </div>
        <img
          src="/pngegg.png"
          className="laptop-image"
          ref={laptopImageRef}
          alt="Laptop"
        />
      </div>
      <div className="info">
        <h2>About Brief</h2>
        <p>
          Brief is a virtual reality experience designed to help users explore,
          learn, and grow through engaging content. ~ Brief is designed to be an
          immersive experience that simulates real-world environments, allowing
          users to engage with content in a more interactive and memorable way.
          Our platform is constantly evolving to include new features and
          functionalities that enhance the user experience.
        </p>
        <p>
          Visit our website at{" "}
          <a href="https://www.briefvr.com/">briefVR.com</a> for more
          information.
        </p>
        <div className="card-section">
          <h2>Functionalities</h2>
          <ul>
            <li>Scroll inside the laptop screen to explore more content.</li>
            <li>Visit our website for more information.</li>
          </ul>
        </div>
      </div>

    <div className="contact-support">
      <h2>Contact Support</h2>
      <p>Reach out to us with any questions or concerns.</p>
      <ul>
        <li>Email: <a href="mailto:support@briefvr.com">support@briefvr.com</a></li>
        <li>Phone: +91 88888-88888</li>
        <li>Address: 123 Virtual Reality Lane, San Francisco, CA 94105</li>
      </ul>
    </div>
    </div>
  );
};

export default App;