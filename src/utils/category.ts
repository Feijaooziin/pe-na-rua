export function getCategoryLabel(category?: string) {
  switch (category) {
    case "tree":
      return "🌳 Árvore";

    case "fruit":
      return "🍎 Frutífera";

    case "plant":
      return "🌱 Planta";

    case "medicinal":
      return "🍵 Medicinal";

    case "ornamental":
      return "🌸 Ornamental";
  }
}

export function getCategoryColor(category?: string) {
  switch (category) {
    case "tree":
      return "#2e7d32";

    case "fruit":
      return "#ff9800";

    case "plant":
      return "#4caf50";

    case "medicinal":
      return "#009688";

    case "ornamental":
      return "#e91e63";
  }
}

export function getCategoryMarker(category?: string) {
  switch (category) {
    case "tree":
      return require("@/assets/images/marker2.png");

    case "fruit":
      return require("@/assets/images/marker2.png");

    case "plant":
      return require("@/assets/images/marker2.png");

    case "medicinal":
      return require("@/assets/images/marker2.png");

    case "ornamental":
      return require("@/assets/images/marker2.png");
  }
}
