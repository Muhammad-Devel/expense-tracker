export const CHIQIM_CATEGORIES = [
  "Oziq-ovqat",
  "Transport",
  "Kommunal",
  "Kiyim-kechak",
  "Salomatlik",
  "Ta'lim",
  "Ko'ngilochar",
  "Uy-ro'zg'or",
  "Boshqa",
];

export const KIRIM_CATEGORIES = [
  "Maosh",
  "Freelance",
  "Sovg'a",
  "Investitsiya",
  "Bonus",
  "Boshqa",
];

const ICON_MAP = {
  "Oziq-ovqat": "🍎",
  Transport: "🚌",
  Kommunal: "💡",
  "Kiyim-kechak": "👕",
  Salomatlik: "💊",
  "Ta'lim": "📚",
  Ko'ngilochar: "🎬",
  "Uy-ro'zg'or": "🏠",
  Maosh: "💼",
  Freelance: "💻",
  "Sovg'a": "🎁",
  Investitsiya: "📈",
  Bonus: "⭐",
  Boshqa: "🗂️",
};

export const categoryIcon = (category) => ICON_MAP[category] || "🗂️";
