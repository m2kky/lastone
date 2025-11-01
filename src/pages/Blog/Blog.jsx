import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts, blogCategories } from '../../data/blogData';
import '../../styles/blog.css';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  return (
    <div className="blog-page">



      {/* Blog Posts - Hover Expand */}
      <section className="blog-section">
        <div className="blog-container">
          <motion.h2 
            className="blog-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Latest Articles
          </motion.h2>
          
          <motion.div 
            className="blog-expand-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="blog-expand-grid">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="blog-expand-card"
                  initial={{ width: "5rem", height: "30rem" }}
                  animate={{
                    width: hoveredPost === post.id ? "25rem" : "8rem",
                    height: "30rem",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onHoverStart={() => setHoveredPost(post.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                >
                  <Link to={`/blog/${post.slug}`} className="blog-expand-link">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="blog-expand-image"
                    />
                    
                    <AnimatePresence>
                      {hoveredPost === post.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="blog-expand-overlay"
                        />
                      )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                      {hoveredPost === post.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="blog-expand-content"
                        >
                          <div className="blog-expand-meta">
                            <span className="blog-expand-category">{post.category}</span>
                            <span className="blog-expand-date">{post.date}</span>
                          </div>
                          
                          <h3 className="blog-expand-title">{post.title}</h3>
                          <p className="blog-expand-excerpt">{post.excerpt}</p>
                          
                          <div className="blog-expand-tags">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="blog-expand-tag">{tag}</span>
                            ))}
                          </div>
                          
                          <div className="blog-expand-read">
                            <span>Read More</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;