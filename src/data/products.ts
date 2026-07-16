import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'oltin-yozuvli',
    name: "Oltin yozuvli lenta",
    price: 25000,
    color: "Qizil va oltin",
    colorHex: "#dc2626", // Red base with gold accent
    description: "Premium darajadagi atlas matodan tayyorlangan, yaltiroq oltin rangli harflar bilan bezatilgan maxsus bitiruvchi lentasi. Matni uzoq yillar davomida o'chmaydi va yaltirab turadi.",
    image: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?q=80&w=600&auto=format&fit=crop",
    label: "Eng mashhur"
  },
  {
    id: 'kumush-yozuvli',
    name: "Kumush yozuvli lenta",
    price: 30000,
    color: "Ko'k va kumush",
    colorHex: "#1d4ed8", // Royal blue with silver accent
    description: "Elegant ko'k rangli matoda yaltiroq kumush rangli metallik yozuvlar. Zamonaviy dizayn va yuqori sifatli tikuv texnologiyasi uyg'unligi.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop",
    label: "Yangi"
  },
  {
    id: 'premium-lenta',
    name: "Premium lenta",
    price: 40000,
    color: "Bordo",
    colorHex: "#701a75", // Maroon/Bordo
    description: "Qirollik bordo rangli qalin shoyi matodan ishlangan maxsus lenta. Ikki cheti oltin iplar bilan hoshiyalangan, bitiruv kechangiz uchun eng hashamatli tanlov.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    label: "Premium"
  },
  {
    id: 'individual-lenta',
    name: "Maxsus buyurtma lenta",
    price: 50000,
    color: "Individual",
    colorHex: "#d97706", // Gold/Amber custom indicator
    description: "Sizning shaxsiy xohishingiz, maktabingiz yoki universitetingiz brend ranglari va logotipi tushirilgan, o'zingiz tanlagan shrift va matnli eksklyuziv lenta.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop"
  }
];
