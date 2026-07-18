import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, AlertTriangle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { OrderFormData, Product, Template } from "../types";
import { products } from "../data/products";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
  selectedTemplate?: Template | null;
  initialQuantity?: number;
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
  onSuccessToast,
}: OrderModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
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

  const selectedProductWatcher = watch("productName");
  const quantityWatcher = watch("quantity");

  // Find currently selected product details to calculate price dynamically
  const currentProduct = products.find(
    (p) => p.name === selectedProductWatcher,
  );
  const totalPrice = currentProduct
    ? currentProduct.price * (quantityWatcher || 1)
    : 0;

  useEffect(() => {
    if (isOpen) {
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
        comment: "",
      });
    }
  }, [isOpen, selectedProduct, selectedTemplate, initialQuantity, reset]);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    const botToken = (import.meta as any).env.VITE_BOT_TOKEN?.trim();
    const chatId =
      (import.meta as any).env.VITE_CHAT_ID?.trim() || "-1003927019373";

    // Format the telegram message beautifully
    const templateContext = selectedTemplate
      ? `
🖼 <b>Tanlangan shablon:</b> #${selectedTemplate.id} — ${selectedTemplate.title} (${selectedTemplate.category})`
      : "";

    const telegramMessage = `🎓 <b>YANGI BUYURTMA</b>

👤 <b>Ism:</b> ${data.fullName}
📞 <b>Telefon:</b> ${data.phone}
🏫 <b>Ta'lim muassasasi:</b> ${data.institution}
🎓 <b>Sinf yoki kurs:</b> ${data.group}
🎗 <b>Mahsulot:</b> ${data.productName}${templateContext}
📦 <b>Soni:</b> ${data.quantity} dona
💰 <b>Umumiy narxi:</b> ${totalPrice.toLocaleString("uz-UZ")} so'm
📍 <b>Viloyat:</b> ${data.region}
🏠 <b>Manzil:</b> ${data.address}
📝 <b>Izoh:</b> ${data.comment || "Yo'q"}`;

    try {
      if (!botToken) {
        // If there's no bot token, simulate a successful call in development so the flow doesn't crash
        console.warn(
          "VITE_BOT_TOKEN topilmadi. Telegramga yuborish simulyatsiya qilindi.",
        );
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
        onSuccessToast(
          "Buyurtmangiz muvaffaqiyatli yuborildi. (Simulyatsiya)",
          "success",
        );
        reset();
        onClose();
        return;
      }

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        },
      );

      const responseData = await response.json();

      if (response.ok && responseData.ok) {
        onSuccessToast("Buyurtmangiz muvaffaqiyatli yuborildi.", "success");
        reset();
        onClose();
      } else if (response.status === 401) {
        throw new Error(
          "Telegram bot token noto'g'ri yoki bot guruhga qo'shilmagan. Token va guruh ID ni tekshiring.",
        );
      } else {
        throw new Error(
          responseData.description || "Telegram API xatoligi yuz berdi",
        );
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
            className="relative w-full max-w-2xl bg-white rounded-4xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] border border-gold/15"
            id="order-modal-box"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/10 flex justify-between items-center bg-linear-to-r from-gold/10 via-warm-bg/50 to-white">
              <div>
                <h3 className="text-xl font-bold text-editorial-dark font-serif flex items-center gap-2">
                  <span className="text-gold">🎓</span> {t("modal.title")}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
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
              {selectedTemplate && (
                <div className="rounded-3xl border border-gold/15 bg-warm-bg/70 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                    Tanlangan shablon
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-editorial-dark shadow-sm">
                      #{selectedTemplate.id}
                    </span>
                    <span className="text-sm font-semibold text-editorial-dark">
                      {selectedTemplate.title}
                    </span>
                    <span className="rounded-full border border-gold/10 bg-white px-3 py-1 text-xs font-medium text-gray-600">
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
                    <h4 className="font-serif font-bold text-editorial-dark text-sm sm:text-base">
                      {currentProduct.name}
                    </h4>
                    <p className="text-xs text-gray-500">
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
                    <p className="text-base sm:text-lg font-serif font-bold text-gold">
                      {totalPrice.toLocaleString("uz-UZ")}{" "}
                      {t("common.currency")}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.fullName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("modal.namePlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
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
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.phone")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("modal.phonePlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* School or University */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.institution")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("modal.institutionPlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.institution
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("institution", {
                      required: t("modal.errors.institutionRequired"),
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
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.group")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("modal.groupPlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.group
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("group", {
                      required: t("modal.errors.groupRequired"),
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

              {/* Product and Quantity Selectors inside form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.product")}
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-2xl border border-gold/25 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all bg-white"
                    {...register("productName", {
                      required: t("modal.errors.productRequired"),
                    })}
                    id="input-product"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {p.price.toLocaleString("uz-UZ")}{" "}
                        {t("common.currency")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.quantity")}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const val = parseInt(watch("quantity") as any) || 1;
                        if (val > 1) setValue("quantity", val - 1);
                      }}
                      className="w-10 h-10 border border-gold/20 rounded-full text-gray-600 hover:bg-gold/10 hover:text-gold focus:outline-none transition-colors flex items-center justify-center font-bold text-lg"
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
                      className="w-10 h-10 border border-gold/20 rounded-full text-gray-600 hover:bg-gold/10 hover:text-gold focus:outline-none transition-colors flex items-center justify-center font-bold text-lg"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Region */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.region")}
                  </label>
                  <select
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all bg-white ${
                      errors.region
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("region", {
                      required: t("modal.errors.regionRequired"),
                    })}
                    id="input-region"
                  >
                    <option value="">{t("modal.regionPlaceholder")}</option>
                    {REGIONS.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />{" "}
                      {errors.region.message}
                    </p>
                  )}
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    {t("modal.address")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("modal.addressPlaceholder")}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.address
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("address", {
                      required: t("modal.errors.addressRequired"),
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

              {/* Extra comments */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                  {t("modal.comment")}
                </label>
                <textarea
                  placeholder={t("modal.commentPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-gold/25 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
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
                  className="px-5 py-2.5 rounded-full border border-gold/20 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gold/5 transition-colors focus:outline-none cursor-pointer"
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
