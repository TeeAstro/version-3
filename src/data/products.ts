import type { Product } from "@/utils/types";

/**
 * Demonstration catalogue: one thobe, one shirt and one hat, in the
 * client's colours and sizes. Replace with Shopify data by changing
 * `utils/catalog.ts`; no page imports this file directly.
 *
 * Photographs: all three pieces use the client's own design images. The
 * thobe image shows all five colours. For the shirt and hat, colours other
 * than the one supplied are digital recolours, as previews.
 */

const img = (name: string) => `/images/${name}.jpg`;

export const products: Product[] = [
  {
    id: "p-thobe",
    slug: "thobe",
    name: "The Athar Thobe",
    category: "thobes",
    price: 195,
    summary: "One cut, refined until it was right. Five colours.",
    description:
      "Our single thobe. A notched band collar, a covered half placket and a wide, straight sleeve, in a matte cloth that keeps its line from morning to night.",
    details: [
      "Cotton and polyester blend, 165 gsm",
      "Notched band collar with a covered half placket",
      "Wide straight sleeve, side-seam pockets",
      "Machine wash cold, hang to dry",
    ],
    images: [img("thobe-white-1"), img("thobe-white-2")],
    colours: [
      { name: "White", hex: "#F4F2EE", images: [img("thobe-white-1"), img("thobe-white-2")], fullLength: img("strip/thobe-white") },
      { name: "Black", hex: "#202020", images: [img("thobe-black-1"), img("thobe-black-2")], fullLength: img("strip/thobe-black") },
      { name: "Rose maroon", hex: "#9F5C65", images: [img("thobe-rose-maroon-1"), img("thobe-rose-maroon-2")], fullLength: img("strip/thobe-rose-maroon") },
      { name: "Green", hex: "#B5C0B0", images: [img("thobe-green-1"), img("thobe-green-2")], fullLength: img("strip/thobe-green") },
      { name: "Dark brown", hex: "#46322A", images: [img("thobe-dark-brown-1"), img("thobe-dark-brown-2")], fullLength: img("strip/thobe-dark-brown") },
    ],
    sizeLabel: "Length in inches",
    sizes: ["56", "58", "60"],
    sizeGuide: {
      "56": "5 ft 7 in to 5 ft 9 in",
      "58": "5 ft 9 in to 5 ft 11 in",
      "60": "5 ft 11 in to 6 ft 1 in",
    },
  },
  {
    id: "p-shirt",
    slug: "shirt",
    name: "The Athar Shirt",
    category: "shirts",
    price: 95,
    summary: "A long band-collar shirt with a concealed placket. Five colours.",
    description:
      "The thobe's collar, cut to the thigh. A long, easy shirt with a concealed placket and a curved hem, made to be worn loose over trousers.",
    details: [
      "Cotton and linen blend",
      "Band collar, concealed button placket",
      "Long line with a curved hem",
      "Machine wash cold, hang to dry",
    ],
    images: [img("shirt-olive-green")],
    colours: [
      { name: "Olive green", hex: "#6E735A", images: [img("shirt-olive-green")] },
      { name: "Dark blue", hex: "#2A3852", images: [img("shirt-dark-blue")] },
      { name: "Dark brown", hex: "#4D372C", images: [img("shirt-dark-brown")] },
      { name: "Mushroom", hex: "#B7A999", images: [img("shirt-mushroom")] },
      { name: "Light brown", hex: "#A9845F", images: [img("shirt-light-brown")] },
    ],
    sizeLabel: "Size",
    sizes: ["S", "M", "L"],
    sizeGuide: {
      S: "Chest 36 to 38 in",
      M: "Chest 39 to 41 in",
      L: "Chest 42 to 44 in",
    },
  },
  {
    id: "p-hat",
    slug: "hat",
    name: "The Athar Hat",
    category: "hats",
    price: 38,
    summary: "A six-panel brimless cap with a rolled cuff. Three colours.",
    description:
      "A soft, brimless cap in six panels with a rolled cuff, finished with the Athar label at the side.",
    details: [
      "Cotton twill, six-panel crown",
      "Rolled cuff with woven Athar label",
      "One size, fits most",
      "Spot clean",
    ],
    images: [img("hat-black-1"), img("hat-black-4"), img("hat-black-3"), img("hat-black-2")],
    colours: [
      {
        name: "Black",
        hex: "#1F1B1B",
        images: [img("hat-black-1"), img("hat-black-4"), img("hat-black-3"), img("hat-black-2")],
      },
      { name: "Brown", hex: "#5B3F2E", images: [img("hat-brown")] },
      { name: "Beige", hex: "#CBB89C", images: [img("hat-beige")] },
    ],
    sizeLabel: "Size",
    sizes: ["One size"],
  },
];
