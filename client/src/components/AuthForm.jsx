import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function AuthForm({ type = "login" }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      {/* Your animated form JSX here */}
    </motion.div>
  )
}