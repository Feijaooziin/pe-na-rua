export function getCategoryLabel(category?: string) {
  switch (category) {
    case "fruit":
      return "🍎 Frutífera";

    case "plant":
      return "🌱 Planta";

    case "medicinal":
      return "🍵 Medicinal";

    case "ornamental":
      return "🌸 Ornamental";

    default:
      return "🌳 Árvore";
  }
}

export function getCategoryColor(category?: string) {
  switch (category) {
    case "fruit":
      return "#ff9800";

    case "plant":
      return "#4caf50";

    case "medicinal":
      return "#009688";

    case "ornamental":
      return "#e91e63";

    default:
      return "#2e7d32";
  }
}
