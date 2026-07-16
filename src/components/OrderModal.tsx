import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, AlertTriangle, Loader2 } from "lucide-react";
import { OrderFormData, Product } from "../types";
import { products } from "../data/products";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
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
  initialQuantity = 1,
  onSuccessToast,
}: OrderModalProps) {
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
        productName: selectedProduct ? selectedProduct.name : products[0].name,
        quantity: initialQuantity,
        comment: "",
      });
    }
  }, [isOpen, selectedProduct, initialQuantity, reset]);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    const botToken = (import.meta as any).env.VITE_BOT_TOKEN?.trim();
    const chatId =
      (import.meta as any).env.VITE_CHAT_ID?.trim() || "-1003927019373";

    // Format the telegram message beautifully
    const telegramMessage = `🎓 <b>YANGI BUYURTMA</b>

👤 <b>Ism:</b> ${data.fullName}
📞 <b>Telefon:</b> ${data.phone}
🏫 <b>Ta'lim muassasasi:</b> ${data.institution}
🎓 <b>Sinf yoki kurs:</b> ${data.group}
🎗 <b>Mahsulot:</b> ${data.productName}
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
            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] border border-gold/15"
            id="order-modal-box"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/10 flex justify-between items-center bg-gradient-to-r from-gold/10 via-warm-bg/50 to-white">
              <div>
                <h3 className="text-xl font-bold text-editorial-dark font-serif flex items-center gap-2">
                  <span className="text-gold">🎓</span> Rasmiylashtirish
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Lenta buyurtma qilish uchun quyidagi ma'lumotlarni to'ldiring
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gold/10 text-gray-400 hover:text-gold transition-colors"
                id="close-modal-btn"
                aria-label="Yopish"
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
                      Rangi: {currentProduct.color}
                    </p>
                    <p className="text-xs font-bold text-gold mt-1 uppercase tracking-wider">
                      {currentProduct.price.toLocaleString("uz-UZ")} so'm / dona
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      Umumiy summa:
                    </p>
                    <p className="text-base sm:text-lg font-serif font-bold text-gold">
                      {totalPrice.toLocaleString("uz-UZ")} so'm
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    Ism familiyangiz *
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Sardorbek Rahimov"
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("fullName", {
                      required: "Ism familiyangizni kiriting",
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
                    Telefon raqamingiz *
                  </label>
                  <input
                    type="text"
                    placeholder="+998901234567"
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("phone", {
                      required: "Telefon raqamingizni kiriting",
                      pattern: {
                        value: /^\+998\d{9}$/,
                        message: "Telefon formati: +998901234567",
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
                    Maktab yoki universitet *
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: 144-maktab yoki TUIT"
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.institution
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("institution", {
                      required: "Ta'lim muassasasini kiriting",
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
                    Sinf yoki kurs *
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: 11-A sinf yoki 4-kurs"
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.group
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("group", {
                      required: "Sinf yoki kursingizni kiriting",
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
                    Lenta turi *
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-2xl border border-gold/25 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all bg-white"
                    {...register("productName", {
                      required: "Lenta turini tanlang",
                    })}
                    id="input-product"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {p.price.toLocaleString("uz-UZ")} so'm
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">
                    Soni (dona) *
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
                        required: "Lenta sonini kiriting",
                        valueAsNumber: true,
                        min: { value: 1, message: "Minimal buyurtma 1 dona" },
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
                    Viloyat *
                  </label>
                  <select
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all bg-white ${
                      errors.region
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("region", {
                      required: "Viloyatingizni tanlang",
                    })}
                    id="input-region"
                  >
                    <option value="">Viloyatni tanlang</option>
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
                    Yetkazish manzili *
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Chilonzor tumani, 4-daha, 12-uy"
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.address
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gold/25 focus:border-gold focus:ring-gold/10"
                    }`}
                    {...register("address", {
                      required: "Yetkazish manzilini kiriting",
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
                  Qo'shimcha izohlar (ixtiyoriy)
                </label>
                <textarea
                  placeholder="Lentaga yoziladigan ismlar ro'yxatini yoki maxsus xohishlaringizni shu yerda qoldirishingiz mumkin..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-gold/25 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
                  {...register("comment")}
                  id="input-comment"
                />
              </div>

              {/* Notice */}
              <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                * Belgisi qo'yilgan maydonlarni to'ldirish majburiydir.
                Buyurtmangiz yuborilgandan so'ng, operatorimiz 15 daqiqa ichida
                buyurtmani tasdiqlash uchun siz bilan bog'lanadi.
              </p>

              {/* Footer Buttons */}
              <div className="pt-5 border-t border-gold/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-gold/20 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gold/5 transition-colors focus:outline-none cursor-pointer"
                  id="cancel-order-btn"
                >
                  Bekor qilish
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
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Buyurtmani tasdiqlash
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
