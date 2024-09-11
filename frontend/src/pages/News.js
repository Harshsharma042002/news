import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apikey = 'bcceb6af9ddc857c34fd8c99a59f77cc';
        const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=20&apikey=${apikey}`;
        
        const response = await axios.get(url);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="news-container">
      <h1>News Articles</h1>
      {articles.length === 0 ? (
        <p>No news articles found.</p>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <div className="news-item" key={index}>
              {article.image && (
                <img src={article.image} alt={article.title} className="news-image" />
              )}
              <h2 className="news-title">{article.title}</h2>
              <p className="news-description">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
