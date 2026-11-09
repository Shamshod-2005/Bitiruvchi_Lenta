import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Check,
  AlertTriangle,
  Loader2,
  ChevronDown,
  MapPin,
  Zap,
  ClipboardList,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { OrderFormData, Product, Template } from "../types";
import { products } from "../data/products";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
  selectedTemplate?: Template | null;
  initialQuantity?: number;
  initialComment?: string;
  onSuccessToast: (message: string, type: "success" | "error") => void;
}

const REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Andijon viloyati",
  "Buxoro viloyati",
  "Farg'ona viloyati",
  "Jizzax viloyati",
  "Xorazm viloyati",
  "Namangan viloyati",
  "Navoiy viloyati",
  "Qashqadaryo viloyati",
  "Samarqand viloyati",
  "Sirdaryo viloyati",
  "Surxondaryo viloyati",
  "Qoraqalpog'iston Respublikasi",
];

export default function OrderModal({
  isOpen,
  onClose,
  selectedProduct,
  selectedTemplate,
  initialQuantity = 1,
  initialComment = "",
  onSuccessToast,
}: OrderModalProps) {
  const { t } = useTranslation();
  const [orderMode, setOrderMode] = useState<"quick" | "full">("quick");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const productDropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      fullName: "",
      phone: "+998",
      institution: "",
      group: "",
      region: "",
      address: "",
      productName: "",
      quantity: 1,
      comment: "",
    },
  });

  const handleModeChange = (mode: "quick" | "full") => {
    setOrderMode(mode);
    if (mode === "quick") {
      clearErrors(["institution", "group", "region", "address"]);
    }
  };

  const selectedProductWatcher = watch("productName");
  const quantityWatcher = watch("quantity");

  // Tashqariga bosilganda dropdownlarni yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductDropdownOpen(false);
      }
      if (
        regionDropdownRef.current &&
        !regionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRegionDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Find currently selected product details to calculate price dynamically
  const currentProduct = products.find(
    (p) => p.name === selectedProductWatcher,
  );
  const totalPrice = currentProduct
    ? currentProduct.price * (quantityWatcher || 1)
    : 0;

  useEffect(() => {
    if (isOpen) {
      setIsProductDropdownOpen(false);
      setIsRegionDropdownOpen(false);
      reset({
        fullName: "",
        phone: "+998",
        institution: "",
        group: "",
        region: "",
        address: "",
        productName: selectedTemplate
          ? `Shablon #${selectedTemplate.id} — ${selectedTemplate.title} (${selectedTemplate.category})`
          : selectedProduct
            ? selectedProduct.name
            : products[0].name,
        quantity: initialQuantity,
        comment: initialComment || "",
      });
    }
  }, [isOpen, selectedProduct, selectedTemplate, initialQuantity, initialComment, reset]);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    const botToken =
      (import.meta as any).env.VITE_BOT_TOKEN?.trim() ||
      "9020125257:AAFD6qYz2z9ClmuQkXz4wACr-z4_1cxQZsA";
    const rawChatId =
      (import.meta as any).env.VITE_CHAT_ID?.trim() || "-1003927019373";

    // HTML xavfsizligi uchun belgilarni tozalash (escape)
    const escapeHtml = (str: string = "") =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Format the telegram message beautifully
    const templateContext = selectedTemplate
      ? `\n🖼 <b>Tanlangan shablon:</b> #${selectedTemplate.id} — ${escapeHtml(selectedTemplate.title)} (${escapeHtml(selectedTemplate.category)})`
      : "";

    const isQuick = orderMode === "quick";

    const telegramMessageHtml = isQuick
      ? `⚡️ <b>YANGI TEZKOR BUYURTMA</b> (Qayta qo'ng'iroq)

👤 <b>Ism:</b> ${escapeHtml(data.fullName)}
📞 <b>Telefon:</b> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>
🎗 <b>Mahsulot:</b> ${escapeHtml(data.productName)}${templateContext}
📦 <b>Soni:</b> ${data.quantity || 1} dona
💰 <b>Umumiy summa:</b> ${totalPrice.toLocaleString("uz-UZ")} so'm
📝 <b>Izoh:</b> ${escapeHtml(data.comment || "Yo'q")}`
      : `🎓 <b>YANGI BUYURTMA</b>

👤 <b>Ism:</b> ${escapeHtml(data.fullName)}
📞 <b>Telefon:</b> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>
🏫 <b>Ta'lim muassasasi:</b> ${escapeHtml(data.institution)}
🎓 <b>Sinf yoki kurs:</b> ${escapeHtml(data.group)}
🎗 <b>Mahsulot:</b> ${escapeHtml(data.productName)}${templateContext}
📦 <b>Soni:</b> ${data.quantity} dona
💰 <b>Umumiy narxi:</b> ${totalPrice.toLocaleString("uz-UZ")} so'm
📍 <b>Viloyat:</b> ${escapeHtml(data.region)}
🏠 <b>Manzil:</b> ${escapeHtml(data.address)}
📝 <b>Izoh:</b> ${escapeHtml(data.comment || "Yo'q")}`;

    const plainMessage = isQuick
      ? `⚡️ YANGI TEZKOR BUYURTMA (Qayta qo'ng'iroq)

👤 Ism: ${data.fullName}
📞 Telefon: ${data.phone}
🎗 Mahsulot: ${data.productName}
📦 Soni: ${data.quantity || 1} dona
💰 Umumiy summa: ${totalPrice.toLocaleString("uz-UZ")} so'm
📝 Izoh: ${data.comment || "Yo'q"}`
      : `🎓 YANGI BUYURTMA

👤 Ism: ${data.fullName}
📞 Telefon: ${data.phone}
🏫 Ta'lim muassasasi: ${data.institution}
🎓 Sinf yoki kurs: ${data.group}
🎗 Mahsulot: ${data.productName}
📦 Soni: ${data.quantity} dona
💰 Umumiy narxi: ${totalPrice.toLocaleString("uz-UZ")} so'm
📍 Viloyat: ${data.region}
🏠 Manzil: ${data.address}
📝 Izoh: ${data.comment || "Yo'q"}`;

    try {
      if (!botToken) {
        console.warn(
          "VITE_BOT_TOKEN topilmadi. Telegramga yuborish simulyatsiya qilindi.",
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        onSuccessToast(
          "Buyurtmangiz muvaffaqiyatli yuborildi. (Simulyatsiya)",
          "success",
        );
        reset();
        onClose();
        return;
      }

      // 1-urinish: HTML formatida yuborish
      let response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: rawChatId,
            text: telegramMessageHtml,
            parse_mode: "HTML",
          }),
        },
      );

      let responseData = await response.json();
      console.log("Telegram API javobi:", responseData);

      // Agar HTML parse qilishda xato bo'lsa, avtomatik oddiy matn ko'rinishida qayta yuborish
      if (
        !response.ok &&
        responseData.description &&
        responseData.description.toLowerCase().includes("parse")
      ) {
        response = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: rawChatId,
              text: plainMessage,
            }),
          },
        );
        responseData = await response.json();
      }

      if (response.ok && responseData.ok) {
        onSuccessToast("Buyurtmangiz muvaffaqiyatli yuborildi!", "success");
        reset();
        onClose();
      } else {
        const errorDesc = responseData.description || "Noma'lum xatolik";
        console.error("Telegram API xatosi:", errorDesc);
        throw new Error(`Telegram: ${errorDesc}`);
      }
    } catch (error) {
      console.error("Buyurtma yuborishda xatolik:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Buyurtma yuborishda xatolik yuz berdi. Qayta urinib ko'ring.";
      onSuccessToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          id="order-modal-container"
        >
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            id="order-modal-overlay"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white dark:bg-editorial-dark rounded-4xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] border border-gold/15"
            id="order-modal-box"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/10 flex justify-between items-center bg-linear-to-r from-gold/10 via-warm-bg/50 dark:via-white/5 to-white dark:to-editorial-dark">
              <div>
                <h3 className="text-xl font-bold text-editorial-dark dark:text-gray-100 flex items-center gap-2">
                  <span className="text-gold">🎓</span> {t("modal.title")}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t("modal.description")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gold/10 text-gray-400 hover:text-gold transition-colors"
                id="close-modal-btn"
                aria-label={t("common.close")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="overflow-y-auto p-6 space-y-5 flex-1"
              id="order-modal-form"
            >
              {/* Order Mode Switcher Tabs */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 p-1 bg-warm-bg dark:bg-white/5 rounded-2xl border border-gold/15">
                  <button
                    type="button"
                    onClick={() => handleModeChange("quick")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      orderMode === "quick"
                        ? "bg-gold text-white shadow-md shadow-gold/25"
                        : "text-gray-600 dark:text-gray-400 hover:text-gold"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{t("modal.quickOrderTab")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange("full")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      orderMode === "full"
                        ? "bg-gold text-white shadow-md shadow-gold/25"
                        : "text-gray-600 dark:text-gray-400 hover:text-gold"
                    }`}
                  >
                    <ClipboardList className="w-3.5 h-3.5" />
                    <span>{t("modal.fullOrderTab")}</span>
                  </button>
                </div>

                {orderMode === "quick" && (
                  <div className="p-3 rounded-2xl bg-gold/10 border border-gold/20 flex items-center gap-2.5 text-xs text-gold">
                    <Zap className="w-4 h-4 shrink-0 fill-gold" />
                    <p className="font-medium text-[11px] leading-tight">
                      {t("modal.quickOrderHint")}
                    </p>
                  </div>
                )}
              </div>
              {selectedTemplate && (
                <div className="rounded-3xl border border-gold/15 bg-warm-bg/70 dark:bg-white/5 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                    Tanlangan shablon
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white dark:bg-white/10 px-3 py-1 text-sm font-semibold text-editorial-dark dark:text-gray-100 shadow-sm">
                      #{selectedTemplate.id}
                    </span>
                    <span className="text-sm font-semibold text-editorial-dark dark:text-gray-100">
                      {selectedTemplate.title}
                    </span>
                    <span className="rounded-full border border-gold/10 bg-white dark:bg-white/10 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                      {selectedTemplate.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Product Info Summary Box */}
              {currentProduct && (
                <div className="bg-gold/5 border border-gold/15 rounded-3xl p-4 flex items-center gap-4">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-16 h-16 object-cover rounded-2xl border border-gold/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-editorial-dark dark:text-gray-100 text-sm sm:text-base">
                      {currentProduct.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("modal.productColor")} {currentProduct.color}
                    </p>
                    <p className="text-xs font-bold text-gold mt-1 uppercase tracking-wider">
                      {currentProduct.price.toLocaleString("uz-UZ")}{" "}
                      {t("modal.pricePerUnit")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      {t("modal.totalAmount")}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gold">
                      {totalPrice.toLocaleString("uz-UZ")}{" "}
                      {t("common.currency")}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                    {t("modal.fullName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("modal.namePlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("fullName", {
                      required: t("modal.errors.fullNameRequired"),
                    })}
                    id="input-fullname"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />{" "}
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                    {t("modal.phone")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("modal.phonePlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("phone", {
                      required: t("modal.errors.phoneRequired"),
                      pattern: {
                        value: /^\+998\d{9}$/,
                        message: t("modal.errors.phonePattern"),
                      },
                    })}
                    id="input-phone"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />{" "}
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {orderMode === "full" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* School or University */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                      {t("modal.institution")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("modal.institutionPlaceholder")}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.institution
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gold/25 focus:border-gold focus:ring-gold/10"
                      }`}
                      {...register("institution", {
                        required:
                          orderMode === "full"
                            ? t("modal.errors.institutionRequired")
                            : false,
                      })}
                      id="input-institution"
                    />
                    {errors.institution && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />{" "}
                        {errors.institution.message}
                      </p>
                    )}
                  </div>

                  {/* Class or Course */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                      {t("modal.group")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("modal.groupPlaceholder")}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.group
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gold/25 focus:border-gold focus:ring-gold/10"
                      }`}
                      {...register("group", {
                        required:
                          orderMode === "full"
                            ? t("modal.errors.groupRequired")
                            : false,
                      })}
                      id="input-group"
                    />
                    {errors.group && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />{" "}
                        {errors.group.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Product and Quantity Selectors inside form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name Custom Dropdown */}
                <div className="relative" ref={productDropdownRef}>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                    {t("modal.product")}
                  </label>
                  
                  {/* Yashirin input orqali react-hook-form validatsiyasi saqlanadi */}
                  <input
                    type="hidden"
                    {...register("productName", {
                      required: t("modal.errors.productRequired"),
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setIsProductDropdownOpen((prev) => !prev);
                      setIsRegionDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm flex items-center justify-between text-left transition-all bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 cursor-pointer shadow-xs ${
                      isProductDropdownOpen
                        ? "border-gold ring-2 ring-gold/20"
                        : "border-gold/25 hover:border-gold/50"
                    }`}
                    id="input-product-button"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {currentProduct?.image ? (
                        <img
                          src={currentProduct.image}
                          alt=""
                          className="w-6 h-6 rounded-lg object-cover border border-gold/20 shrink-0"
                        />
                      ) : (
                        <span className="text-gold shrink-0 text-base">🎗</span>
                      )}
                      <span className="truncate font-medium">
                        {selectedProductWatcher || t("modal.product")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {currentProduct && (
                        <span className="text-xs font-bold text-gold hidden sm:inline">
                          {currentProduct.price.toLocaleString("uz-UZ")} {t("common.currency")}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-gold transition-transform duration-200 ${
                          isProductDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isProductDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-2xl border border-gold/30 bg-white dark:bg-[#1a1a1a] shadow-2xl p-1.5 backdrop-blur-xl"
                        id="product-dropdown-menu"
                      >
                        {/* Agar maxsus shablon tanlangan bo'lsa */}
                        {selectedTemplate && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue(
                                "productName",
                                `Shablon #${selectedTemplate.id} — ${selectedTemplate.title} (${selectedTemplate.category})`,
                                { shouldValidate: true },
                              );
                              setIsProductDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left text-sm transition-all mb-1 cursor-pointer ${
                              selectedProductWatcher?.includes(selectedTemplate.title)
                                ? "bg-gold/15 dark:bg-gold/25 text-gold font-bold"
                                : "hover:bg-gold/10 dark:hover:bg-white/5 text-editorial-dark dark:text-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={selectedTemplate.image}
                                alt=""
                                className="w-8 h-8 rounded-lg object-cover border border-gold/20 shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-bold text-[11px] text-gold uppercase tracking-wider">
                                  Tanlangan shablon
                                </p>
                                <p className="truncate text-xs font-medium">
                                  #{selectedTemplate.id} — {selectedTemplate.title}
                                </p>
                              </div>
                            </div>
                            <span className="text-[11px] px-2 py-0.5 rounded-full border border-gold/30 bg-gold/10 text-gold shrink-0 font-medium">
                              {selectedTemplate.category}
                            </span>
                          </button>
                        )}

                        {products.map((p) => {
                          const isSelected = selectedProductWatcher === p.name;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setValue("productName", p.name, {
                                  shouldValidate: true,
                                });
                                setIsProductDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between gap-3 p-2 rounded-xl text-left text-sm transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-gold/15 dark:bg-gold/25 text-gold font-semibold"
                                  : "hover:bg-gold/10 dark:hover:bg-white/5 text-editorial-dark dark:text-gray-100"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-8 h-8 rounded-lg object-cover border border-gold/20 shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="truncate font-medium text-editorial-dark dark:text-gray-100 text-xs sm:text-sm">
                                    {p.name}
                                  </p>
                                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                    {p.color}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs font-bold text-gold">
                                  {p.price.toLocaleString("uz-UZ")} {t("common.currency")}
                                </span>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-gold shrink-0" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {errors.productName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />{" "}
                      {errors.productName.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                    {t("modal.quantity")}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const val = parseInt(watch("quantity") as any) || 1;
                        if (val > 1) setValue("quantity", val - 1);
                      }}
                      className="w-10 h-10 border border-gold/20 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gold/10 hover:text-gold focus:outline-none transition-colors flex items-center justify-center font-bold text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      className={`w-full text-center px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.quantity
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gold/25 focus:border-gold focus:ring-gold/10"
                      }`}
                      {...register("quantity", {
                        required: t("modal.errors.quantityRequired"),
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: t("modal.errors.quantityMin"),
                        },
                      })}
                      id="input-quantity"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const val = parseInt(watch("quantity") as any) || 1;
                        setValue("quantity", val + 1);
                      }}
                      className="w-10 h-10 border border-gold/20 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gold/10 hover:text-gold focus:outline-none transition-colors flex items-center justify-center font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  {errors.quantity && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />{" "}
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>

              {orderMode === "full" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Region Custom Dropdown */}
                  <div className="relative" ref={regionDropdownRef}>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                      {t("modal.region")}
                    </label>

                    <input
                      type="hidden"
                      {...register("region", {
                        required:
                          orderMode === "full"
                            ? t("modal.errors.regionRequired")
                            : false,
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setIsRegionDropdownOpen((prev) => !prev);
                        setIsProductDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm flex items-center justify-between text-left transition-all bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 cursor-pointer shadow-xs ${
                        errors.region
                          ? "border-red-300 focus:ring-red-200"
                          : isRegionDropdownOpen
                            ? "border-gold ring-2 ring-gold/20"
                            : "border-gold/25 hover:border-gold/50"
                      }`}
                      id="input-region-button"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="w-4 h-4 text-gold shrink-0" />
                        <span
                          className={`truncate ${
                            watch("region")
                              ? "font-medium"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {watch("region") || t("modal.regionPlaceholder")}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gold transition-transform duration-200 shrink-0 ml-2 ${
                          isRegionDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isRegionDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-2xl border border-gold/30 bg-white dark:bg-[#1a1a1a] shadow-2xl p-1.5 backdrop-blur-xl"
                          id="region-dropdown-menu"
                        >
                          {REGIONS.map((reg) => {
                            const isSelected = watch("region") === reg;
                            return (
                              <button
                                key={reg}
                                type="button"
                                onClick={() => {
                                  setValue("region", reg, {
                                    shouldValidate: true,
                                  });
                                  setIsRegionDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-left text-sm transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-gold/15 dark:bg-gold/25 text-gold font-semibold"
                                    : "hover:bg-gold/10 dark:hover:bg-white/5 text-editorial-dark dark:text-gray-100"
                                }`}
                              >
                                <span>{reg}</span>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-gold shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {errors.region && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />{" "}
                        {errors.region.message}
                      </p>
                    )}
                  </div>

                  {/* Detailed Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                      {t("modal.address")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("modal.addressPlaceholder")}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.address
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gold/25 focus:border-gold focus:ring-gold/10"
                      }`}
                      {...register("address", {
                        required:
                          orderMode === "full"
                            ? t("modal.errors.addressRequired")
                            : false,
                      })}
                      id="input-address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />{" "}
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Extra comments */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                  {t("modal.comment")}
                </label>
                <textarea
                  placeholder={t("modal.commentPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-gold/25 text-sm bg-white dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
                  {...register("comment")}
                  id="input-comment"
                />
              </div>

              {/* Notice */}
              <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                {t("modal.requiredHint")}
              </p>

              {/* Footer Buttons */}
              <div className="pt-5 border-t border-gold/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-gold/20 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:bg-gold/5 dark:hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
                  id="cancel-order-btn"
                >
                  {t("modal.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-gold hover:bg-gold-hover disabled:bg-gold/50 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 cursor-pointer"
                  id="submit-order-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />{" "}
                      {t("modal.submitting")}
                    </>
                  ) : orderMode === "quick" ? (
                    <>
                      <Zap className="w-4 h-4 fill-white" />{" "}
                      {t("modal.quickOrderSubmit")}
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> {t("modal.confirm")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
