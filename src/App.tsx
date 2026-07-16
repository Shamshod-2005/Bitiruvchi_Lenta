/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import OrderModal from './components/OrderModal';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import { Product } from './types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialQuantity, setInitialQuantity] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleOpenOrderModal = () => {
    setSelectedProduct(null);
    setInitialQuantity(1);
    setIsModalOpen(true);
  };

  const handleOrderProduct = (product: Product, quantity: number) => {
    setSelectedProduct(product);
    setInitialQuantity(quantity);
    setIsModalOpen(true);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-gold/20 selection:text-gold scroll-smooth" id="app-root-layout">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
      </AnimatePresence>

      {/* Sticky Header Navbar */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenOrderModal={handleOpenOrderModal} />

        {/* Products Catalogue */}
        <Products onOrderProduct={handleOrderProduct} />

        {/* About section / Advantages */}
        <About />

        {/* Image Gallery */}
        <Gallery />

        {/* Customer reviews */}
        <Reviews />

        {/* FAQ Section */}
        <FAQ />

        {/* Contact details & Map */}
        <Contact />
      </main>

      {/* Footer information */}
      <Footer />

      {/* Interactive Utilities */}
      <ScrollToTop />
      <FloatingActions />

      {/* Form Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        initialQuantity={initialQuantity}
        onSuccessToast={showToast}
      />
    </div>
  );
}

