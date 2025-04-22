import { motion } from 'framer-motion';
// import { Typewriter } from 'react-simple-typewriter';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <motion.img
        src="/header-logo.png"
        alt="Logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-48 h-48 drop-shadow-lg"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-6 text-5xl font- text-gray-700"
      >
        {/* <Typewriter
          words={['Welcome to Your Dashnboard', 'Since 2005', 'Visualize. Excel. Create...']}
          loop={0} // 0 = infinite
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        /> */}
      </motion.div>
    </div>
  );
};

export default Home;
