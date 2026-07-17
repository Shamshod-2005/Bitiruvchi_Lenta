import {
  Filter,
  Minus,
  Plus,
  Search,
  ShoppingBag
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { products } from "../data/products";
import { Product } from "../types";

interface ProductsProps {
  onOrderProduct: (product: Product, quantity: number) => void;
}

const FILTER_COLORS = [
  { name: "Barchasi", value: "all" },
  { name: "Qizil", value: "qizil" },
  { name: "Ko'k", value: "ko'k" },
  { name: "Bordo", value: "bordo" },
  { name: "Individual", value: "individual" },
];

export default function Products({ onOrderProduct }: ProductsProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColorFilter, setSelectedColorFilter] = useState("all");
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>(
    {
      "oltin-yozuvli": 1,
      "kumush-yozuvli": 1,
      "premium-lenta": 1,
      "individual-lenta": 1,
    },
  );

  const handleQuantityChange = (
    productId: string,
    action: "increment" | "decrement",
  ) => {
    const currentQty = quantities[productId] || 1;
    if (action === "increment") {
      setQuantities({ ...quantities, [productId]: currentQty + 1 });
    } else if (action === "decrement" && currentQty > 1) {
      setQuantities({ ...quantities, [productId]: currentQty - 1 });
    }
  };

  const handleInputChange = (productId: string, value: string) => {
    const parsed = parseInt(value) || 1;
    setQuantities({ ...quantities, [productId]: parsed < 1 ? 1 : parsed });
  };

  // Filter products based on search query and color filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesColor =
      selectedColorFilter === "all" ||
      product.color.toLowerCase().includes(selectedColorFilter.toLowerCase());

    return matchesSearch && matchesColor;
  });

  const getLabelStyle = (label?: string) => {
    switch (label) {
      case "Eng mashhur":
        return "bg-gold text-white";
      case "Premium":
        return "bg-editorial-dark text-white";
      case "Yangi":
        return "bg-gold/10 text-gold border border-gold/30";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section
      id="mahsulotlar"
      className="py-24 bg-warm-bg/40 border-t border-b border-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest">
            Mahsulotlar katalogi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-editorial-dark mt-2">
            {t("products.title")}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-600 mt-4 leading-relaxed font-light text-sm sm:text-base">
            {t("products.subtitle")}
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white rounded-3xl p-6 shadow-lg shadow-gold/5 border border-gold/10 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Color filter tab */}
          <div className="w-full md:w-auto flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gold" />{" "}
              {t("products.filter")}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColorFilter(color.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none ${
                    selectedColorFilter === color.value
                      ? "bg-gold text-white shadow-md shadow-gold/20"
                      : "bg-warm-bg text-gray-600 hover:bg-gold/10 hover:text-gold"
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("products.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gold/10 text-xs focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all bg-warm-bg/30 text-editorial-dark placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const qty = quantities[product.id] || 1;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-[2rem] overflow-hidden border border-gold/10 shadow-sm hover:shadow-2xl hover:border-gold/30 transition-all duration-300 flex flex-col justify-between group"
                    id={`product-card-${product.id}`}
                  >
                    {/* Card Top: Image & Badge */}
                    <div className="relative aspect-square overflow-hidden bg-warm-bg/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />

                      {/* Ribbon Label Badge */}
                      {product.label && (
                        <span
                          className={`absolute top-4 left-4 text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm ${getLabelStyle(product.label)}`}
                        >
                          {product.label}
                        </span>
                      )}

                      {/* Visual swatch circle overlay */}
                      <span
                        className="absolute bottom-4 right-4 w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: product.colorHex }}
                        title={`Asosiy rang: ${product.color}`}
                      />
                    </div>

                    {/* Card Body: Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-serif font-bold text-editorial-dark group-hover:text-gold transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        <p className="text-[10px] text-gold font-bold uppercase tracking-widest">
                          Rangi: {product.color}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-light">
                          {product.description}
                        </p>
                      </div>

                      {/* Action block */}
                      <div className="mt-6 pt-5 border-t border-gold/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                            {t("products.price")}
                          </span>
                          <span className="text-xl font-serif font-bold text-editorial-dark">
                            {product.price.toLocaleString("uz-UZ")}{" "}
                            <small className="text-xs uppercase tracking-widest font-sans font-semibold text-gray-500">
                              so'm
                            </small>
                          </span>
                        </div>

                        {/* Interactive Quantity Box */}
                        <div className="flex items-center justify-between bg-warm-bg/30 p-1.5 rounded-xl border border-gold/5">
                          <span className="text-xs uppercase tracking-widest text-gray-500 font-medium pl-2">
                            {t("products.quantity")}
                          </span>
                          <div className="flex items-center gap-1 bg-white border border-gold/10 rounded-lg shadow-sm">
                            <button
                              onClick={() =>
                                handleQuantityChange(product.id, "decrement")
                              }
                              className="p-1 px-2.5 text-gray-500 hover:bg-warm-bg rounded-l-lg transition-colors focus:outline-none"
                              aria-label="Kamaytirish"
                            >
                              <Minus className="w-3 h-3 text-gold" />
                            </button>
                            <input
                              type="text"
                              value={qty}
                              onChange={(e) =>
                                handleInputChange(product.id, e.target.value)
                              }
                              className="w-10 text-center text-xs font-bold text-editorial-dark focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(product.id, "increment")
                              }
                              className="p-1 px-2.5 text-gray-500 hover:bg-warm-bg rounded-r-lg transition-colors focus:outline-none"
                              aria-label="Ko'paytirish"
                            >
                              <Plus className="w-3 h-3 text-gold" />
                            </button>
                          </div>
                        </div>

                        {/* Order button */}
                        <button
                          onClick={() => onOrderProduct(product, qty)}
                          className="w-full py-3.5 px-4 rounded-xl bg-gold hover:bg-gold-hover text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shadow-gold/10 hover:shadow-lg hover:shadow-gold/20"
                        >
                          <ShoppingBag className="w-4 h-4" />{" "}
                          {t("products.order")}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gold/10 shadow-lg shadow-gold/5 p-8 max-w-md mx-auto">
            <span className="text-3xl text-gold">🔍</span>
            <h3 className="text-lg font-serif font-bold text-editorial-dark mt-4">
              {t("products.notFoundTitle")}
            </h3>
            <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed">
              {t("products.notFoundDescription")}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedColorFilter("all");
              }}
              className="mt-5 px-6 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-gold/20"
            >
              {t("products.clear")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
