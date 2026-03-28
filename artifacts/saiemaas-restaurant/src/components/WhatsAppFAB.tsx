import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppFAB() {
  const handleClick = () => {
    window.open('https://wa.me/918108259655?text=Hi,%20I%20want%20to%20order%20from%20Saiemaa%27s', '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:shadow-[#25D366]/30 transition-shadow flex items-center justify-center group"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-card text-card-foreground px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border shadow-lg">
        Order on WhatsApp
      </span>
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30"></span>
    </motion.button>
  );
}
