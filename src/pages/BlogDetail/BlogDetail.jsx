import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blogData';
import './blogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <h1 className="not-found-title">Article Not Found</h1>
          <div className="not-found-actions">
            <Link to="/blog" className="back-link">
              ← Back to all insights
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get recommended articles (other posts)
  const recommendedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="blog-detail-page">
      {/* Hero Section */}
      <motion.section 
        className="blog-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="blog-hero-content">
          <Link to="/blog" className="back-link">
            ← Back to all insights
          </Link>
          
          <motion.div 
            className="blog-category"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.category}
          </motion.div>
          
          <motion.h1 
            className="blog-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {post.title}
          </motion.h1>
          
          <motion.p 
            className="blog-hero-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {post.excerpt}
          </motion.p>
          
          <motion.div 
            className="blog-meta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {post.author}
            </span>
            <span className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {post.date}
            </span>
            <span className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Cover Image */}
      <motion.div 
        className="blog-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img src={post.image} alt={post.title} />
      </motion.div>

      {/* Article Content */}
      <motion.article 
        className="blog-article"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="article-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <div className="article-divider"></div>
          
          <div className="article-tags">
            {post.tags.map(tag => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Author Info */}
      <motion.section 
        className="author-info"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="author-content">
          <div className="author-avatar">
            <img src="/images/mekky_about.png" alt={post.author} />
          </div>
          <div className="author-details">
            <h3 className="author-name">{post.author}</h3>
            <p className="author-bio">
              Marketing automation strategist and performance trainer who helps businesses build smarter, scalable systems.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Recommended Articles */}
      <motion.section 
        className="recommended-articles"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="recommended-content">
          <h2 className="recommended-title">More Insights</h2>
          <div className="recommended-grid">
            {recommendedPosts.map((recPost, index) => (
              <motion.div
                key={recPost.id}
                className="recommended-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <Link to={`/blog/${recPost.slug}`} className="recommended-link">
                  <div className="recommended-image">
                    <img src={recPost.image} alt={recPost.title} />
                  </div>
                  <div className="recommended-info">
                    <span className="recommended-category">{recPost.category}</span>
                    <h3 className="recommended-card-title">{recPost.title}</h3>
                    <p className="recommended-excerpt">{recPost.excerpt}</p>
                    <div className="recommended-meta">
                      <span>{recPost.date}</span>
                      <span>{recPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BlogDetail;