import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Modal Component with minimal smooth animations
const ArticleModal = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{article.title}</h2>
                <motion.button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  ×
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex justify-center mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-24 h-24 object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {article.description}
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Points:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Understanding the importance of mental health in daily life</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Recognizing signs and symptoms of mental health issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Available resources and support systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">How to access professional help and counseling services</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Benefits of Mental Health Awareness:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Promoting mental health awareness helps create supportive communities, reduces stigma, 
                    and encourages individuals to seek help when needed. It also improves overall quality 
                    of life and helps people develop better coping strategies for stress and challenges.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Consult with healthcare professionals for personalized advice
                </p>
                <motion.button
                  onClick={onClose}
                  className="bg-[#1B69DE] hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function Health_Articles() {
  const scrollRef = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "Mental Health Awareness",
      description: "Focuses on reducing stigma around mental illnesses and promoting access to psychological support and counseling.",
      image: "https://imgs.search.brave.com/GkJITX0L8e7ezKzTIuBnAs6aM_fDIAHguP-jSDT7OeE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWVudGFsLWhl/YWx0aC1hd2FyZW5l/c3MtbW9udGgtbWF5/LXRlbXBsYXRlLWJh/Y2tncm91bmQtYmFu/bmVyLWNhcmQtcG9z/dGVyXzc4MTkyOS0y/MjkuanBnP2dhPUdB/MS4xLjM3MDI2NzY1/NS4xNzU0ODk3NDk1/JnNlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw"
    },
    {
      id: 2,
      title: "Heart Health Tips",
      description: "Essential guidelines for maintaining cardiovascular health and preventing heart disease through lifestyle changes.",
      image: "https://imgs.search.brave.com/a-8hyr-l1gSPHF1jnjafnlyaNXz9OFlBL1OjE7o87vs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/Mzk5NzkyMy92ZWN0/b3IvaGVhbHRoY2Fy/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9S05kMUhIRU5Y/N1RLN05oWVIzM19K/RmkwZ3QxNWhXZl96/Szk4WWxHcFAxYz0"
    },
    {
      id: 3,
      title: "Diabetes Management",
      description: "Comprehensive approach to managing diabetes through proper diet, exercise, and medication adherence.",
      image: "https://imgs.search.brave.com/awp5MnTpNjw986W2EeQyrXXdn3zJWQzZ-_QNwi1BfQg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNjk0/MjAxNS9wZXhlbHMt/cGhvdG8tNjk0MjAx/NS5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA"
    },
    {
      id: 4,
      title: "Nutrition Guidelines",
      description: "Evidence-based nutritional recommendations for optimal health and disease prevention.",
      image: "https://imgs.search.brave.com/2m5k26GaaAPW60SnLzw44TUHcEnPPgTCpICBYLs8g9Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cGNybS5vcmcvc2l0/ZXMvZGVmYXVsdC9m/aWxlcy8yMDIwLTA2/LzIwMzI4LUNPTV9E/aWV0YXJ5X0d1aWRl/bGluZXNfUmVjb21t/ZW5kYXRpb25fU29j/aWFsX0dyYXBoaWNf/RkIuanBn"
    },
    {
      id: 5,
      title: "Exercise & Fitness",
      description: "Safe and effective exercise routines for different age groups and fitness levels.",
      image: "https://imgs.search.brave.com/DmC0h1Mf2jZWi1xCkLkq-79D7eghHaG0xsfUyuUTMZk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjE3Nzkz/MTgyMDktMTZhMmNm/MmExYzA5P2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZpeGxpYj1yYi00/LjEuMCZpeGlkPU0z/d3hNakEzZkRCOE1I/eHpaV0Z5WTJoOE5Y/eDhjR2g1YzJsallX/d2xNakJtYVhSdVpY/TnpmR1Z1ZkRCOGZE/QjhmSHd3"
    },
    {
      id: 6,
      title: "Sleep Hygiene",
      description: "Importance of quality sleep and practical tips for improving sleep patterns and habits.",
      image: "https://imgs.search.brave.com/g2pwqOlT_pniDN4EMKvfbBNlgVhDTAGVSNUpp33I-7Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bm9zbGVlcGxlc3Nu/aWdodHMuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDEyLzA1/L3NsZWVwLWh5Z2ll/bmUuanBn"
    },
    
  ];

  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div style={{ width: '99vw' }}>
      {/* Heading */}
      <h1 className='text-2xl mx-14 mt-5 font-bold p-0 m-0'>HealthCare Tips</h1>
      <div className='flex justify-center'>
        <div className="relative w-[96%]">

          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
            className="absolute -left-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full text-gray-600 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Always-visible left edge blur */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-10 z-20 "
            style={{
              background: '  ',
            }}
          />

          {/* Scrollable card container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-6 p-3 no-scrollbar mx-7"
          >
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="min-w-[380px] max-w-[380px] bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col select-none relative"
              >
                {/* Image */}
                <div className="relative h-40 flex justify-center items-center p-4 rounded-t-2xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className=" h-42 object-contain"
                  />
                </div>

                <hr className="my-2 border-gray-200" />
                
                {/* Content */}
                <div className="flex flex-col flex-grow p-4 justify-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className='mb-2'>{article.description}</p>
                  <div className='flex justify-center mt-2'>
                    <motion.button 
                      onClick={() => openModal(article)}
                      className='border bg-[#e7f6ff] border-[#1B69DE] w-30 rounded-4xl p-2 text-[#1B69DE] hover:bg-[#1B69DE] hover:text-white hover:transition-all'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      Read More
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Always-visible right edge blur */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-12 z-20"
            style={{
              background: '   '
            }}
          />

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
            className="absolute -right-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full text-gray-600 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Article Modal */}
      <ArticleModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        article={selectedArticle}
      />
      
      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Health_Articles;
