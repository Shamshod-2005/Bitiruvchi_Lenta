import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Gift, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Product } from "../types";

interface DiscountCalculatorProps {
  onOrderGroup: (product: Product, quantity: number) => void;
}

export default function DiscountCalculator({ onOrderGroup }: DiscountCalculatorProps) {
  const { t } = useTranslation();
  const [studentsCount, setStudentsCount] = useState<number>(25);

  // Chegirma pog'onalari
  const calculatePricing = (count: number) => {
    let pricePerUnit = 35000;
    let discountPercent = 0;
    let hasTeacherRibbonFree = false;

    if (count >= 31) {
      pricePerUnit = 27000;
      discountPercent = 23;
      hasTeacherRibbonFree = true;
    } else if (count >= 21) {
      pricePerUnit = 29000;
      discountPercent = 17;
      hasTeacherRibbonFree = true;
    } else if (count >= 11) {
      pricePerUnit = 32000;
      discountPercent = 10;
      hasTeacherRibbonFree = false;
    }

    const standardTotal = count * 35000;
    const discountedTotal = count * pricePerUnit;
    const savedAmount = standardTotal - discountedTotal;

    return {
      pricePerUnit,
      discountPercent,
      standardTotal,
      discountedTotal,
      savedAmount,
      hasTeacherRibbonFree,
    };
  };

  const pricing = calculatePricing(studentsCount);

  const handleOrder = () => {
    const groupProduct: Product = {
      id: "sinf-buyurtmasi",
      name: `Sinf uchun to'plam (${studentsCount} dona)`,
      price: pricing.pricePerUnit,
      color: "Tanlov asosida",
      colorHex: "#D4AF37",
      description: `Butun sinf uchun maxsus chegirmali lenta to'plami (${studentsCount} nafar o'quvchi).`,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop&q=60",
      label: "Premium",
    };

    onOrderGroup(groupProduct, studentsCount);
  };

  return (
    <section
      id="chegirma-kalkulyator"
      className="py-24 bg-warm-bg/40 dark:bg-editorial-dark border-b border-gold/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4 text-gold" /> Ulgurji chegirmalar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-dark dark:text-gray-100 mt-2 transition-colors duration-300">
            Sinfingiz uchun narxni hisoblang
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-light text-sm sm:text-base">
            Qancha ko'p buyurtma bersangiz, har bir lenta shuncha arzon bo'ladi. 20 tadan ortiq buyurtma uchun sinf rahbariga lenta sovg'a qilinadi!
          </p>
        </div>

        {/* Kalkulyator Kartochkasi */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-editorial-dark/95 rounded-4xl border border-gold/20 shadow-2xl p-6 sm:p-10 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Chap tomon: Slayder va O'quvchilar soni */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-editorial-dark dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" />
                  Sinfdagi o'quvchilar soni:
                </label>
                <span className="text-2xl font-black text-gold px-4 py-1 rounded-2xl bg-gold/10 border border-gold/25">
                  {studentsCount} <span className="text-xs uppercase font-medium">nafar</span>
                </span>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={studentsCount}
                  onChange={(e) => setStudentsCount(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-warm-bg dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-semibold px-1">
                  <span>5 nafar</span>
                  <span>20 nafar</span>
                  <span>40 nafar</span>
                  <span>60 nafar</span>
                </div>
              </div>

              {/* Chegirma pog'onalari indikatorlari */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    studentsCount >= 11 && studentsCount <= 20
                      ? "border-gold bg-gold/15 text-gold font-bold shadow-xs"
                      : "border-gold/15 bg-warm-bg/30 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <p className="text-[11px] font-semibold">11-20 dona</p>
                  <p className="text-xs font-bold text-gold mt-0.5">32 000 so'm</p>
                </div>
                <div
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    studentsCount >= 21 && studentsCount <= 30
                      ? "border-gold bg-gold/15 text-gold font-bold shadow-xs"
                      : "border-gold/15 bg-warm-bg/30 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <p className="text-[11px] font-semibold">21-30 dona</p>
                  <p className="text-xs font-bold text-gold mt-0.5">29 000 so'm</p>
                </div>
                <div
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    studentsCount >= 31
                      ? "border-gold bg-gold/15 text-gold font-bold shadow-xs"
                      : "border-gold/15 bg-warm-bg/30 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <p className="text-[11px] font-semibold">31+ dona</p>
                  <p className="text-xs font-bold text-gold mt-0.5">27 000 so'm</p>
                </div>
              </div>

              {/* Bonuslar ro'yxati */}
              <div className="space-y-2 pt-2">
                {pricing.hasTeacherRibbonFree && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold"
                  >
                    <Gift className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>Maxsus sovg'a: Sinf rahbari uchun lenta BEPUL qo'shiladi!</span>
                  </motion.div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Har bir o'quvchi ismi alohida oltin harflar bilan yoziladi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>O'zbekiston bo'ylab manzilgacha xavfsiz yetkazib berish</span>
                </div>
              </div>
            </div>

            {/* O'ng tomon: Hisoblangan Natija Kartasi */}
            <div className="md:col-span-5 bg-linear-to-br from-gold/15 via-gold/5 to-transparent dark:from-white/5 dark:via-white/2 dark:to-transparent rounded-3xl p-6 border border-gold/25 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  1 dona narxi:
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-editorial-dark dark:text-gray-100">
                    {pricing.pricePerUnit.toLocaleString("uz-UZ")}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold uppercase">so'm</span>
                  {pricing.discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full ml-auto">
                      -{pricing.discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {pricing.savedAmount > 0 && (
                <div className="p-3 rounded-2xl bg-gold/10 border border-gold/20">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    Sinfingiz tejaydigan mablag':
                  </p>
                  <p className="text-lg font-black text-gold">
                    +{pricing.savedAmount.toLocaleString("uz-UZ")} so'm
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gold/15">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Jami to'lov:
                </p>
                <p className="text-3xl font-black text-gold mt-1">
                  {pricing.discountedTotal.toLocaleString("uz-UZ")}{" "}
                  <small className="text-xs uppercase font-sans font-bold text-gray-400">so'm</small>
                </p>
              </div>

              <motion.button
                type="button"
                onClick={handleOrder}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 px-4 rounded-2xl bg-gold hover:bg-gold-hover text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-gold/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Sinf uchun buyurtma berish</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
