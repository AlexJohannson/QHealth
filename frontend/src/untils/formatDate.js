function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export { formatDate };