import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const layoutStyles = {
  default: '',
  auth: 'bg-gradient-to-br from-gray-50 to-blue-50',
  protected: 'bg-white'
};

export default function Layout({ children, type = 'default' }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen ${layoutStyles[type]}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['default', 'auth', 'protected'])
};