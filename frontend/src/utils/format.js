export const formatSum = (value = 0) => {
  const rounded = Math.round(value);
  return new Intl.NumberFormat("uz-UZ").format(rounded) + " so'm";
};

export const formatCompact = (value = 0) => {
  return new Intl.NumberFormat("uz-UZ", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export const periodLabel = (period) => {
  if (period === "daily") return "Kunlik";
  if (period === "yearly") return "Yillik";
  return "Oylik";
};
