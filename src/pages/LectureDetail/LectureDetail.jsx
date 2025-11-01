import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { lecturesData } from '../../data/lectureData';

const getLectureById = (id) => {
  return lecturesData.find(lecture => lecture.id === id);
};

const getRelatedLectures = (currentId, limit = 3) => {
  return lecturesData.filter(lecture => lecture.id !== currentId).slice(0, limit);
};
import BackButton from './components/BackButton';
import Hero from './components/Hero';
import Overview from './components/Overview';
import KeyElementsList from './components/KeyElementsList';
import ExamplesGallery from './components/ExamplesGallery';
import ResourcesList from './components/ResourcesList';
import SpeakerCard from './components/SpeakerCard';
import RelatedLectures from './components/RelatedLectures';
import './lectureDetail.css';

export default function LectureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecture = getLectureById(id);
  const relatedLectures = getRelatedLectures(id);

  if (!lecture) {
    return (
      <div className="lecture-not-found">
        <h1>Lecture not found</h1>
        <button onClick={() => navigate('/lectures')}>Back to Lectures</button>
      </div>
    );
  }

  return (
    <div className="lecture-detail-page">
      <BackButton />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero lecture={lecture} />
        <Overview overview={lecture.overview} />
        <KeyElementsList elements={lecture.keyElements} />
        {lecture.examples && lecture.examples.length > 0 && (
          <ExamplesGallery examples={lecture.examples} />
        )}
        <ResourcesList resources={lecture.resources} />
        <SpeakerCard speaker={lecture.speaker} />
        {relatedLectures.length > 0 && (
          <RelatedLectures lectures={relatedLectures} />
        )}
      </motion.div>
    </div>
  );
}