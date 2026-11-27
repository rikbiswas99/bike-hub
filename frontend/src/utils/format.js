// Small helper used by several pages: 185000 -> "₹1,85,000"
export const formatPrice = (price) =>
  price ? "₹" + new Intl.NumberFormat("en-IN").format(price) : "Not available";