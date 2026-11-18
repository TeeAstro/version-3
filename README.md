# ATHAR THOBES, Concept 03

A third prototype built on everything the client has chosen so far, with a new layout:

- Concept 01's oxblood and ivory palette, and its calligraphic logo animation. Here the mark
  is written on oxblood, then the oxblood parts like two doors onto the desert photograph.
- The desert photograph of the man walking, framed like a print with an ivory margin.
- Clean, minimal and centred. No announcement bar and no hero subline.
- Men's only: one thobe (White, Black, Rose maroon, Green, Dark brown; lengths 56, 58, 60),
  one shirt (Olive green, Dark blue, Dark brown, Mushroom, Light brown; S, M, L) and one hat
  (Black, Brown, Beige; one size).
- The client's own product images on plain backgrounds.
- Free shipping in the United States.

Type: Newsreader (serif, light weight) and Albert Sans, self-hosted under the SIL Open Font
License.

This is a prototype for client presentation. There is no Shopify connection and no payment
processing. The bag is stored in the browser and the checkout is simulated.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` then `npm start`.
Deploy it as its own Vercel project so it gets its own link.

## Pages

| Address | Page |
|---|---|
| `/` | Homepage: opening, framed hero, the three pieces, the thobe in five colours, the name |
| `/shop` | All pieces, filter by type, view by piece or by colour, sort by price |
| `/products/thobe`, `/products/shirt`, `/products/hat` | Product pages; add `?colour=green` etc. to open a colour |
| `/bag` | Full bag page (there is also a bag drawer on every page) |
| `/checkout` | One-page simulated checkout; free US standard delivery |
| `/about` | The story of the name, fit, shipping and returns |

## Structure

```
src/
  app/                  pages and globals.css (palette and type scale)
  components/
    layout/             Header, Footer, Providers
    home/               Opening, Hero, ColourStrip
    product/            PieceTile, Gallery, ProductDetail, ShopView
    cart/               CartDrawer, CartLine, Checkout
    ui/                 Logo, Swatches, QuantityStepper, Newsletter
  context/CartContext.tsx
  data/products.ts      the three products, colours, sizes and photos
  utils/                catalog.ts (data access), types.ts, format.ts
public/
  brand/                logo files and the traced Arabic mark
  images/               product photos; strip/ holds the full-length thobe photos
  images/editorial/     the desert hero and the About page photo
```

## Moving to Shopify

Pages never import `src/data` directly. They call the functions in `src/utils/catalog.ts`.
Reimplement those with Storefront API queries, replace the store in `CartContext.tsx` with the
Storefront cart API, and send the checkout button to Shopify's hosted checkout.

## Placeholders

- Prices ($195, $95, $38), the hat's single size and the $25 international rate.
- Shirt colours other than olive green, and hat colours other than black, are digital recolours
  of the client's photos.
- The desert and About photographs are stock (see `CREDITS.md`).
- The Arabic mark was traced from a JPG; replace with vector artwork.
