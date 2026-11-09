import img1 from "../../assets/img1.jpg";
import img12 from "../../assets/img12.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img7 from "../../assets/img7.jpg";
import img8 from "../../assets/img8.jpg";
import img9 from "../../assets/img9.jpg";
import img27 from "../../assets/hero_img.jpg";
import img22 from "../../assets/img22.jpg";
import img24 from "../../assets/img24.jpg";
import img25 from "../../assets/img25.jpg";
import img26 from "../../assets/img26.jpg";
import { Product } from "../types";

const createProduct = (
  id: string,
  name: string,
  price: number,
  color: string,
  colorHex: string,
  description: string,
  image: string,
  label?: "Eng mashhur" | "Premium" | "Yangi",
): Product => ({
  id,
  name,
  price,
  color,
  colorHex,
  description,
  image,
  label,
});

export const products: Product[] = [
  createProduct(
    "oltin-yozuvli",
    "Sharfli lenta",
    25000,
    "Ko'k ",
    "#031440",
    "Premium darajadagi atlas matodan tayyorlangan, yaltiroq oq rangli harflar bilan bezatilgan maxsus bitiruvchi lentasi. Matni uzoq yillar davomida o'chmaydi va yaltirab turadi.",
    img1,
    "Eng mashhur",
  ),

  createProduct(
    "premium-lenta",
    "Premium lenta",
    40000,
    "Tilla rangli",
    "#701a75",
    "Premium darajadagi atlas matodan tayyorlangan, yaltiroq tilla rangli harflar bilan bezatilgan maxsus bitiruvchi lentasi. Matni uzoq yillar davomida o'chmaydi va yaltirab turadi.",
    img3,
    "Premium",
  ),
  createProduct(
    "individual-lenta",
    "Maxsus buyurtma lenta",
    50000,
    "Individual",
    "#d97706",
    "Sizning shaxsiy xohishingiz, maktabingiz yoki universitetingiz brend ranglari va logotipi tushirilgan, o'zingiz tanlagan shrift va matnli eksklyuziv lenta.",
    img4,
  ),

  createProduct(
    "lenta-7",
    "Bordo premium lenta",
    32000,
    "Bordo",
    "#991b1b",
    "Hashamatli bordo rangli shoyi matodan tayyorlangan premium lenta.",
    img7,
  ),
  createProduct(
    "lenta-8",
    "Oltin aksentli lenta",
    29000,
    "Oltin",
    "#ca8a04",
    "Oltin yaltiragichli matn va bezaklar bilan bezatilgan lentalar to'plami.",
    img8,
  ),
  createProduct(
    "lenta-9",
    "Kumush chiroqli lenta",
    31000,
    "Kumush",
    "#64748b",
    "Kumush metallik yaltirashga ega, zamonaviy tarzdagi lenta.",
    img9,
  ),

  createProduct(
    "lenta-12",
    "Binafsharang lenta",
    37000,
    "Binafsha",
    "#7c3aed",
    "Turli rangli shaxsiy tanlovga mos ishlab chiqilgan eksklyuziv binafsharang lenta.",
    img12,
  ),
  createProduct(
    "lenta-22",
    "Zumrad yashil lenta",
    37000,
    "Yashil",
    "#059669",
    "Yorqin zumrad yashil atlas matodan tayyorlangan hashamatli lenta.",
    img22,
  ),
  createProduct(
    "lenta-24",
    "Moviy feruza lenta",
    37000,
    "Moviy",
    "#0284c7",
    "Dengiz mavjidek jilolanuvchi nafis feruza rangli lenta.",
    img24,
  ),
  createProduct(
    "lenta-27",
    "Klassik qizil lenta",
    37000,
    "Qizil",
    "#dc2626",
    "Oltin yozuvlar bilan uyg'unlashgan an'anaviy yorqin qizil lenta.",
    img27,
  ),
  createProduct(
    "lenta-25",
    "Nafis pushti lenta",
    37000,
    "Pushti",
    "#db2777",
    "Bitiruvchi qizlar uchun maxsus tayyorlangan nozik pushti lenta.",
    img25,
  ),
  createProduct(
    "lenta-26",
    "To'q ko'k shoyi lenta",
    37000,
    "To'q ko'k",
    "#1e3a8a",
    "Rasmiy va jiddiy tadbirlar uchun mos keluvchi to'q ko'k shoyi lenta.",
    img26,
  ),
];
