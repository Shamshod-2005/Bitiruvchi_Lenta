/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import OrderModal from "./components/OrderModal";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import FloatingActions from "./components/FloatingActions";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Toast from "./components/Toast";
import { Product, Template } from "./types";
import TemplatePage from "./components/TemplatePage";
import MobileBottomNav from "./components/MobileBottomNav";
import RibbonConstructor from "./components/RibbonConstructor";
import DiscountCalculator from "./components/DiscountCalculator";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [initialQuantity, setInitialQuantity] = useState(1);
  const [initialComment, setInitialComment] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleOpenOrderModal = () => {
    setSelectedProduct(null);
    setSelectedTemplate(null);
    setInitialQuantity(1);
    setInitialComment("");
    setIsModalOpen(true);
  };

  const handleOrderProduct = (
    product: Product,
    quantity: number,
    customNote?: string,
  ) => {
    setSelectedProduct(product);
    setSelectedTemplate(null);
    setInitialQuantity(quantity);
    setInitialComment(customNote || "");
    setIsModalOpen(true);
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-editorial-dark text-gray-800 dark:text-gray-100 font-sans selection:bg-gold/20 selection:text-gold scroll-smooth transition-colors duration-300"
      id="app-root-layout"
    >
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

        {/* Jonli Lenta Konstruktori (vaqtinchalik kommentda) */}
        {/* <RibbonConstructor onOrderCustomRibbon={handleOrderProduct} /> */}

        {/* Lenta shablonlari */}
        <TemplatePage
          onSelectTemplate={(template) => {
            setSelectedTemplate(template);
            setSelectedProduct({
              id: template.id,
              name: `Lenta shabloni: ${template.title}`,
              price: 0,
              color: template.category,
              colorHex: "#2563EB",
              description: template.description,
              image: template.image,
              label: template.popular ? "Eng mashhur" : undefined,
            });
            setIsModalOpen(true);
          }}
        />

        {/* Products Catalogue */}
        <Products onOrderProduct={handleOrderProduct} />

        {/* Sinf uchun chegirma kalkulyatori */}
        <DiscountCalculator onOrderGroup={handleOrderProduct} />

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
      <div className="pb-24 md:pb-0">
        <Footer />
      </div>

      {/* Interactive Utilities */}
      <ScrollToTop />
      <FloatingActions />
      <MobileBottomNav onOpenOrderModal={handleOpenOrderModal} />

      {/* Form Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        selectedTemplate={selectedTemplate}
        initialQuantity={initialQuantity}
        initialComment={initialComment}
        onSuccessToast={showToast}
      />
    </div>
  );
}
