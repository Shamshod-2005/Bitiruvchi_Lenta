import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Palette,
  Type,
  GraduationCap,
  Check,
  ArrowRight,
  Award,
  Crown,
  Star,
  Layers,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Product } from "../types";

interface RibbonConstructorProps {
  onOrderCustomRibbon: (
    product: Product,
    quantity: number,
    customNote?: string,
  ) => void;
}

interface RibbonColor {
  id: string;
  name: string;
  bgGradient: string;
  sheenGradient: string;
  hex: string;
  borderGold: string;
}

const RIBBON_COLORS: RibbonColor[] = [
  {
    id: "navy",
    name: "To'q ko'k",
    bgGradient: "from-[#020b24] via-[#051c59] to-[#020b24]",
    sheenGradient: "rgba(30, 80, 200, 0.25)",
    hex: "#031440",
    borderGold: "#D4AF37",
  },
  {
    id: "burgundy",
    name: "Bordo",
    bgGradient: "from-[#2e050c] via-[#5c0d1b] to-[#2e050c]",
    sheenGradient: "rgba(180, 40, 60, 0.25)",
    hex: "#4a0d17",
    borderGold: "#E5C158",
  },
  {
    id: "emerald",
    name: "Zumrad",
    bgGradient: "from-[#021d15] via-[#064230] to-[#021d15]",
    sheenGradient: "rgba(20, 140, 100, 0.25)",
    hex: "#043325",
    borderGold: "#D4AF37",
  },
  {
    id: "black",
    name: "Qora atlas",
    bgGradient: "from-[#0c0c0e] via-[#1a1a1f] to-[#0c0c0e]",
    sheenGradient: "rgba(255, 255, 255, 0.15)",
    hex: "#141416",
    borderGold: "#F5D77F",
  },
  {
    id: "red",
    name: "Klassik qizil",
    bgGradient: "from-[#52090e] via-[#8c121b] to-[#52090e]",
    sheenGradient: "rgba(220, 50, 60, 0.25)",
    hex: "#7f131a",
    borderGold: "#F7E096",
  },
  {
    id: "purple",
    name: "Binafsha",
    bgGradient: "from-[#200836] via-[#3f1366] to-[#200836]",
    sheenGradient: "rgba(140, 60, 220, 0.25)",
    hex: "#331252",
    borderGold: "#E8C86A",
  },
];

interface RibbonStyleTemplate {
  id: string;
  name: string;
  headerTitle: string;
  icon: "cap" | "crown" | "star";
  badgeText: string;
}

const TEMPLATES: RibbonStyleTemplate[] = [
  {
    id: "classic",
    name: "Klassik Gerbli",
    headerTitle: "BITIRUVCHI",
    icon: "cap",
    badgeText: "ALTIN BITIRUVCHI",
  },
  {
    id: "premium",
    name: "Premium Elegant",
    headerTitle: "BITIRUVCHI",
    icon: "crown",
    badgeText: "PREMIUM MAKTAB",
  },
  {
    id: "modern",
    name: "Yulduzli Modern",
    headerTitle: "GRADUATE",
    icon: "star",
    badgeText: "TOP TALABA",
  },
];

const FONTS = [
  { id: "font-serif", name: "Klassik Oltin", class: "font-serif tracking-normal" },
  { id: "font-sans", name: "Zamonaviy", class: "font-sans font-black tracking-wider uppercase" },
  { id: "font-mono", name: "Akademik", class: "font-mono tracking-wide uppercase" },
];

export default function RibbonConstructor({
  onOrderCustomRibbon,
}: RibbonConstructorProps) {
  const { t } = useTranslation();
  const [studentName, setStudentName] = useState("Azizbek Karimov");
  const [schoolName, setSchoolName] = useState("1-sonli ixtisoslashtirilgan maktab");
  const [classGrade, setClassGrade] = useState("11-A sinf");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [selectedColor, setSelectedColor] = useState<RibbonColor>(RIBBON_COLORS[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<RibbonStyleTemplate>(TEMPLATES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);

  const handleOrder = () => {
    const customProduct: Product = {
      id: `custom-${selectedColor.id}-${selectedTemplate.id}`,
      name: `Maxsus lenta: ${studentName}`,
      price: 35000,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      description: `Shablon: ${selectedTemplate.name} | Ism: ${studentName} | ${schoolName}, ${classGrade} (${graduationYear})`,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=60",
      label: "Premium",
    };

    const customNote = `🎓 Lenta shabloni: "${selectedTemplate.name}" | Ism: "${studentName}" | Maktab: "${schoolName}" | Sinf: "${classGrade}" | Yil: "${graduationYear}" | Rang: "${selectedColor.name}"`;
    onOrderCustomRibbon(customProduct, 1, customNote);
  };

  return (
    <section
      id="konstruktor"
      className="py-24 bg-linear-to-b from-warm-bg/70 via-warm-bg/30 to-warm-bg/60 dark:from-editorial-dark dark:via-[#141414] dark:to-editorial-dark border-b border-gold/15 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold" /> Haqiqiy Lenta Konstruktori
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-dark dark:text-gray-100 mt-2 transition-colors duration-300">
            O'z lentangizni jonli ko'ring
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-light text-sm sm:text-base">
            Haqiqiy bitiruvchi lentasi shaklida ismingiz, maktabingiz va naqshlarini moslang. Oltin harflar jilosini jonli ko'ring!
          </p>
        </div>

        {/* Konstruktor Asosiy Bloki */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* ============================================================== */}
          {/* CHAP TOMON: HAQIQIY LENTA SHAKLI (REALISTIC SASH PREVIEW)      */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full flex flex-col items-center py-4">
              {/* Orqa fon hashamatli nuri */}
              <div className="absolute top-1/3 w-64 h-80 bg-gold/15 blur-3xl rounded-full pointer-events-none" />

              {/* LENTANING YUQORI QISMI: YELKA NISHONI (ROSETTE / PIN) */}
              <div className="relative z-20 -mb-5 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#9B7B1E] via-[#D4AF37] to-[#FFF0B3] p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-radial from-[#1e1b12] to-[#0a0906] flex items-center justify-center border border-gold/40">
                    <GraduationCap className="w-6 h-6 text-[#F9E298] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                  </div>
                </div>
              </div>

              {/* ASOSIY LENTA TANASI (REALISTIC VERTICAL GRADUATION SASH) */}
              <motion.div
                layout
                className={`relative w-64 sm:w-72 min-h-[600px] sm:min-h-[640px] bg-linear-to-b ${selectedColor.bgGradient} shadow-2xl flex flex-col justify-between items-center px-4 pt-8 pb-10 transition-colors duration-500`}
                style={{
                  boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 0 35px rgba(0,0,0,0.5)`,
                }}
              >
                {/* 1. Chetdagi Oltin Ipak Hoshiyalar (Double Gold Trim Borders) */}
                <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-linear-to-b from-[#E5C158] via-[#FFF3B8] to-[#B38728] opacity-90 shadow-[0_0_4px_rgba(212,175,55,0.6)]" />
                <div className="absolute top-0 bottom-0 left-4 w-px bg-gold/40" />

                <div className="absolute top-0 bottom-0 right-2.5 w-0.5 bg-linear-to-b from-[#E5C158] via-[#FFF3B8] to-[#B38728] opacity-90 shadow-[0_0_4px_rgba(212,175,55,0.6)]" />
                <div className="absolute top-0 bottom-0 right-4 w-px bg-gold/40" />

                {/* 2. Atlas matodagi yorug'lik to'lqini effekti (Silk Satin Highlight) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    background: `linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 55%, transparent 80%)`,
                  }}
                />

                {/* 3. LENTADAGI MATNLAR KOMPOZITSIYASI */}
                <div className="relative z-10 w-full flex flex-col items-center text-center space-y-6 pt-2">
                  {/* Yuqori Gerb / Emblema & Maktab */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center gap-1.5 text-gold/80">
                      <span className="text-[10px]">★</span>
                      {selectedTemplate.icon === "crown" ? (
                        <Crown className="w-5 h-5 text-gold drop-shadow-md" />
                      ) : selectedTemplate.icon === "star" ? (
                        <Star className="w-5 h-5 text-gold fill-gold/40 drop-shadow-md" />
                      ) : (
                        <Award className="w-5 h-5 text-gold drop-shadow-md" />
                      )}
                      <span className="text-[10px]">★</span>
                    </div>

                    {/* Maktab nomi (yoyilgan nafis yozuv) */}
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#F9E8B2] px-2 max-w-[220px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] leading-tight">
                      {schoolName || "Maktab nomi"}
                    </p>
                  </div>

                  {/* KATTA ASOSIY YARDIMCHI SARLAVHA: "BITIRUVCHI" */}
                  <div className="relative py-2 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1 opacity-75">
                      <span className="w-6 h-px bg-linear-to-r from-transparent to-gold" />
                      <span className="text-[9px] font-semibold tracking-widest text-gold uppercase">
                        2025 – 2026
                      </span>
                      <span className="w-6 h-px bg-linear-to-l from-transparent to-gold" />
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl font-black tracking-[0.25em] uppercase font-serif"
                      style={{
                        background:
                          "linear-gradient(135deg, #ECC876 0%, #FFF8D6 30%, #D4AF37 55%, #FFF0B3 75%, #AA771C 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.8))",
                      }}
                    >
                      {selectedTemplate.headerTitle}
                    </h3>

                    {/* Oltin dafna chizig'i */}
                    <div className="flex items-center gap-1 text-gold/70 mt-1">
                      <span className="text-xs">❖</span>
                      <span className="w-12 h-0.5 bg-linear-to-r from-transparent via-gold to-transparent" />
                      <span className="text-xs">❖</span>
                    </div>
                  </div>

                  {/* BITIRUVCHI ISMI (Asosiy ajralib turuvchi oltin matn) */}
                  <div className="w-full px-2 py-3">
                    <p className="text-[10px] uppercase tracking-widest text-[#F3E5AB]/75 mb-1">
                      Sinf faxri
                    </p>
                    <motion.div
                      key={studentName + selectedFont.id}
                      initial={{ scale: 0.96, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-xl sm:text-2xl font-bold ${selectedFont.class} break-words leading-snug px-1`}
                      style={{
                        background:
                          "linear-gradient(180deg, #FFFFFF 0%, #FFF4C2 25%, #ECC876 60%, #C4972B 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.9))",
                      }}
                    >
                      {studentName || "Ism Familiya"}
                    </motion.div>
                  </div>

                  {/* SINF VA YIL */}
                  <div className="flex flex-col items-center space-y-1 pt-2">
                    <span className="px-3.5 py-1 rounded-full border border-gold/40 bg-black/30 backdrop-blur-xs text-xs font-semibold text-[#F7E096] tracking-wider drop-shadow-sm">
                      {classGrade || "11-sinf"}
                    </span>
                    <p
                      className="text-lg font-black tracking-widest font-serif"
                      style={{
                        background:
                          "linear-gradient(135deg, #ECC876 0%, #FFF8D6 50%, #B8962E 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {graduationYear}
                    </p>
                  </div>
                </div>

                {/* 4. PASTKI NAQSH VA ORNAMENT (BOTTOM EMBELLISHMENT) */}
                <div className="relative z-10 flex flex-col items-center mt-6">
                  <div className="flex items-center gap-2 text-gold/60 text-xs">
                    <span>✦</span>
                    <span className="w-10 h-px bg-gold/50" />
                    <span>👑</span>
                    <span className="w-10 h-px bg-gold/50" />
                    <span>✦</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.28em] text-gold/80 font-bold mt-1">
                    Muborak bo'lsin!
                  </span>
                </div>

                {/* 5. PASTKI V-KESIM SHAKLI (V-SHAPED BOTTOM CUTOUT) */}
                <div
                  className="absolute -bottom-6 inset-x-0 h-6 bg-transparent"
                  style={{
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  }}
                />

                {/* 6. HAQIQIY OLTIN POPUKLAR / CHACHAKLAR (GOLDEN FRINGE TASSELS) */}
                <div className="absolute -bottom-7 inset-x-2 flex justify-between items-start pointer-events-none z-20">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-b-sm bg-linear-to-b from-[#FFF0B3] via-[#D4AF37] to-[#7A5711] shadow-xs"
                      style={{
                        height: `${22 + (i % 3) * 4}px`,
                        opacity: 0.95,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Lenta ko'rinishi real vaqtda yangilanmoqda
            </p>
          </div>

          {/* ============================================================== */}
          {/* O'NG TOMON: BOSHQARUV VA MOSLASHTIRISH PANELI                   */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 bg-white dark:bg-editorial-dark/95 rounded-3xl p-6 sm:p-8 border border-gold/15 shadow-xl space-y-6">
            {/* 1. Shablon uslubini tanlash */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gold" /> Lenta shabloni
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tmpl)}
                    className={`py-2.5 px-2 rounded-2xl border text-xs font-medium transition-all text-center cursor-pointer flex flex-col items-center gap-1 ${
                      selectedTemplate.id === tmpl.id
                        ? "border-gold bg-gold/15 text-gold font-bold shadow-xs"
                        : "border-gold/15 bg-warm-bg/30 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:border-gold/40"
                    }`}
                  >
                    <span className="text-sm">
                      {tmpl.icon === "crown" ? "👑" : tmpl.icon === "star" ? "⭐" : "🎓"}
                    </span>
                    <span>{tmpl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Ism-familiya */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                Bitiruvchi ismi va familiyasi
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Masalan: Azizbek Karimov"
                className="w-full px-4 py-2.5 rounded-2xl border border-gold/25 text-sm bg-warm-bg/40 dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all font-medium"
              />
            </div>

            {/* 3. Maktab va Sinf / Yil */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                  Maktab / Litsey nomi
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Masalan: 1-maktab"
                  className="w-full px-4 py-2.5 rounded-2xl border border-gold/25 text-sm bg-warm-bg/40 dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">
                  Sinf
                </label>
                <input
                  type="text"
                  value={classGrade}
                  onChange={(e) => setClassGrade(e.target.value)}
                  placeholder="11-A"
                  className="w-full px-4 py-2.5 rounded-2xl border border-gold/25 text-sm bg-warm-bg/40 dark:bg-white/5 text-editorial-dark dark:text-gray-100 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                />
              </div>
            </div>

            {/* 4. Mato rangi (6 xil) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-gold" /> Atlas mato rangi:
                </span>
                <span className="text-gold font-semibold text-xs">
                  {selectedColor.name}
                </span>
              </label>
              <div className="grid grid-cols-6 gap-2">
                {RIBBON_COLORS.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`h-11 rounded-2xl flex items-center justify-center transition-all duration-200 border-2 shadow-xs cursor-pointer ${
                      selectedColor.id === color.id
                        ? "border-gold scale-110 shadow-lg shadow-gold/30 ring-2 ring-gold/40"
                        : "border-white/30 hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <Check className="w-4 h-4 text-gold drop-shadow-xs" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Shrift uslubi */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-gold" /> Oltin harflar shrifti
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FONTS.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => setSelectedFont(font)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                      selectedFont.id === font.id
                        ? "border-gold bg-gold/15 text-gold font-bold shadow-xs"
                        : "border-gold/15 bg-warm-bg/30 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:border-gold/40"
                    }`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Narx va Buyurtma berish tugmasi */}
            <div className="pt-3 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                  Individual lenta narxi:
                </p>
                <p className="text-2xl font-black text-gold">
                  35 000 <span className="text-xs uppercase font-sans">so'm</span>
                </p>
              </div>

              <motion.button
                type="button"
                onClick={handleOrder}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-linear-to-r from-[#B8962E] via-gold to-[#D4AF37] hover:from-gold hover:to-[#B8962E] text-editorial-dark font-black text-xs uppercase tracking-widest shadow-xl shadow-gold/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Shu lentani buyurtma berish</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
