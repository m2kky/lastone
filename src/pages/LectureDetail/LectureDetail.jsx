import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lecturesData } from '../../data/lectureData';
import BackButton from './components/BackButton';
import './lectureDetail.css';

const getLectureById = (id) => {
  return lecturesData.find(lecture => lecture.id === id);
};

const getRelatedLectures = (currentId, limit = 3) => {
  return lecturesData.filter(lecture => lecture.id !== currentId).slice(0, limit);
};

export default function LectureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecture = getLectureById(id);
  const relatedLectures = getRelatedLectures(id);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!lecture) {
    return (
      <div className="lecture-not-found">
        <h1>Lecture not found</h1>
        <button onClick={() => navigate('/lectures')}>Back to Lectures</button>
      </div>
    );
  }

  const currentIndex = lecturesData.findIndex(l => l.id === id);
  const hasPrevLecture = currentIndex > 0;
  const hasNextLecture = currentIndex < lecturesData.length - 1;

  const handlePrevLecture = () => {
    if (hasPrevLecture) {
      navigate(`/lectures/${lecturesData[currentIndex - 1].id}`);
    }
  };

  const handleNextLecture = () => {
    if (hasNextLecture) {
      navigate(`/lectures/${lecturesData[currentIndex + 1].id}`);
    }
  };

  return (
    <main className="lecture-page">
      <BackButton />
      
      <div className="lecture-grid">
        <section className="player-column">
          <div className="player-wrap">
            {lecture.video && lecture.video.url && lecture.video.url !== '#' ? (
              <>
                <div className="video-container">
                  <iframe
                    src={lecture.video.url.replace('/view', '/preview')}
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
                <div className="player-overlay">
                  <button 
                    aria-label="المحاضرة السابقة" 
                    className={`nav-btn prev ${!hasPrevLecture ? 'disabled' : ''}`}
                    onClick={handlePrevLecture}
                    disabled={!hasPrevLecture}
                  >
                    ←
                  </button>
                  <button 
                    aria-label="المحاضرة التالية" 
                    className={`nav-btn next ${!hasNextLecture ? 'disabled' : ''}`}
                    onClick={handleNextLecture}
                    disabled={!hasNextLecture}
                  >
                    →
                  </button>
                </div>
              </>
            ) : (
              <div className="video-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🎥</div>
                  <h3>Video Coming Soon</h3>
                  <p>This lecture video will be available shortly</p>
                </div>
              </div>
            )}
          </div>

          <div className="tabs">
            <nav className="tabs-nav" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'overview'}
                className={activeTab === 'overview' ? 'active' : ''}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'elements'}
                className={activeTab === 'elements' ? 'active' : ''}
                onClick={() => setActiveTab('elements')}
              >
                Key Elements
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'resources'}
                className={activeTab === 'resources' ? 'active' : ''}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
            </nav>

            <div className="tab-content" role="tabpanel">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <p>{lecture.overview}</p>
                  {lecture.keyElements && (
                    <div className="learning-outcomes">
                      <h3>Learning Outcomes</h3>
                      <ul>
                        {lecture.keyElements.map((element, i) => (
                          <li key={i}>{element}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'elements' && (
                <div className="elements-content">
                  <ul className="elements-list">
                    {lecture.keyElements?.map((element, i) => (
                      <li key={i}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div className="resources-content">
                  <ul className="resources-list">
                    {lecture.resources?.map((resource, i) => (
                      <li key={i}>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                          <span className="resource-icon">📄</span>
                          <span className="resource-name">{resource.label}</span>
                          <span className="download-icon">↓</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className={`info-column ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <button 
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
          
          <div className="info-card">
            <h2 className="lecture-title-sidebar">{lecture.title}</h2>
            <p className="lecture-subtitle-sidebar">{lecture.subtitle}</p>
            
            <div className="meta-info">
              <div className="meta-item">
                <span className="meta-label">Duration</span>
                <span className="meta-value">{lecture.duration}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Level</span>
                <span className="meta-value">{lecture.level}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Language</span>
                <span className="meta-value">{lecture.language}</span>
              </div>
            </div>

            <div className="actions">

              {lecture.resources && lecture.resources.length > 0 && (
                <a 
                  className="btn secondary" 
                  href={lecture.resources[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📥 Download Resources
                </a>
              )}
              <button className="btn ghost">⭐ Add to Favorites</button>
              <button className="btn ghost">🔗 Share</button>
            </div>

            {lecture.speaker && (
              <div className="speaker-info">
                <img src={lecture.speaker.image} alt={lecture.speaker.name} />
                <div>
                  <h4>{lecture.speaker.name}</h4>
                  <p>{lecture.speaker.role}</p>
                </div>
              </div>
            )}

            <div className="related-lectures">
              <h3>Related Lectures</h3>
              <div className="related-list">
                {relatedLectures.map(relatedLecture => (
                  <div 
                    key={relatedLecture.id} 
                    className="related-item"
                    onClick={() => navigate(`/lectures/${relatedLecture.id}`)}
                  >
                    <div className="related-thumb">
                      {relatedLecture.thumbnail ? (
                        <img src={relatedLecture.thumbnail} alt={relatedLecture.title} />
                      ) : (
                        <div className="thumb-placeholder">🎥</div>
                      )}
                    </div>
                    <div className="related-info">
                      <h4>{relatedLecture.title}</h4>
                      <p>{relatedLecture.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}