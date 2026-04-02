export type ProductLine = "cosmetics" | "textile" | "food";
export type CosmeticsGammeKey =
  | "huiles-pures"
  | "serums"
  | "hammam"
  | "eaux-florales"
  | "savons-noirs"
  | "huiles-massage";

export interface ProductDef {
  key: string;
  line: ProductLine;
  gamme?: CosmeticsGammeKey;
  inci: string[];
  photo?: string;
  tag?: string;
}

export interface GammeDef {
  key: CosmeticsGammeKey;
  number: string;
  products: ProductDef[];
}

export const GAMMES: GammeDef[] = [
  {
    key: "huiles-pures",
    number: "01",
    products: [
      { key: "huile-argan",   line: "cosmetics", gamme: "huiles-pures", inci: ["100% Argania Spinosa Kernel Oil"],            tag: "OR LIQUIDE DU MAROC" },
      { key: "huile-figue",   line: "cosmetics", gamme: "huiles-pures", inci: ["100% Opuntia Ficus-Indica Seed Oil"],          tag: "ULTRA RARE - PREMIUM" },
      { key: "huile-saad",    line: "cosmetics", gamme: "huiles-pures", inci: ["100% Cyperus Esculentus Oil"],                 tag: "TRADITION ANCESTRALE" },
      { key: "huile-ricin",   line: "cosmetics", gamme: "huiles-pures", inci: ["100% Ricinus Communis Seed Oil"],              tag: "MULTI-USAGE" },
      { key: "huile-rose",    line: "cosmetics", gamme: "huiles-pures", inci: ["100% Rosa Damascena Flower Oil"],              tag: "LUXE - VALLEE DU DADES" },
      { key: "huile-nigelle", line: "cosmetics", gamme: "huiles-pures", inci: ["100% Nigella Sativa Seed Oil"],               tag: "GOLFE +++ - GRAINE BENIE" },
    ],
  },
  {
    key: "serums",
    number: "02",
    products: [
      { key: "serum-anti-age",     line: "cosmetics", gamme: "serums", inci: ["Opuntia Ficus-Indica Seed Oil 60%", "Argania Spinosa Kernel Oil 35%", "Rosa Damascena Flower Oil 5%"],        tag: "BEST-SELLER" },
      { key: "serum-eclat",        line: "cosmetics", gamme: "serums", inci: ["Argania Spinosa Kernel Oil 50%", "Opuntia Ficus-Indica Seed Oil 30%", "Cyperus Esculentus Oil 20%"],          tag: "ECLAT NATUREL" },
      { key: "serum-cheveux",      line: "cosmetics", gamme: "serums", inci: ["Ricinus Communis Seed Oil 40%", "Nigella Sativa Seed Oil 30%", "Argania Spinosa Kernel Oil 30%"],            tag: "ANTI-CHUTE" },
      { key: "serum-sourcils",     line: "cosmetics", gamme: "serums", inci: ["Ricinus Communis Seed Oil 60%", "Opuntia Ficus-Indica Seed Oil 30%", "Rosa Damascena Flower Oil 10%"],      tag: "POUSSE & DENSITE" },
      { key: "serum-contour-yeux", line: "cosmetics", gamme: "serums", inci: ["Opuntia Ficus-Indica Seed Oil 70%", "Cyperus Esculentus Oil 20%", "Rosa Damascena Flower Oil 10%"],        tag: "ANTI-RIDES YEUX" },
      { key: "serum-corps",        line: "cosmetics", gamme: "serums", inci: ["Argania Spinosa Kernel Oil 50%", "Ricinus Communis Seed Oil 30%", "Nigella Sativa Seed Oil 20%"],           tag: "SOIN CORPS" },
    ],
  },
  {
    key: "hammam",
    number: "03",
    products: [
      { key: "gommage-nila",        line: "cosmetics", gamme: "hammam", inci: ["Indigofera Tinctoria (Nila)", "Argania Spinosa Kernel Oil", "Citrus Aurantium Flower Water", "Sucrose"],                       tag: "SIGNATURE BARBARIA" },
      { key: "gommage-aker-fassi",  line: "cosmetics", gamme: "hammam", inci: ["Punica Granatum Bark Powder", "Rosa Damascena Flower Water", "Sucrose", "Argania Spinosa Kernel Oil"],                        tag: "ECLAT & LUMINOSITE" },
      { key: "masque-ghassoul-rose",line: "cosmetics", gamme: "hammam", inci: ["Ghassoul (Lava Clay)", "Rosa Damascena Flower Water"],                                                                         tag: "PURIFIANT PROFOND" },
      { key: "gommage-sidr",        line: "cosmetics", gamme: "hammam", inci: ["Ziziphus Jujuba Leaf Powder (Sidr)", "Argania Spinosa Kernel Oil", "Mel (Honey)"],                                             tag: "RECETTE ANCESTRALE" },
      { key: "gommage-levres",      line: "cosmetics", gamme: "hammam", inci: ["Punica Granatum Bark Powder (Aker Fassi)", "Mel (Honey)", "Sucrose"],                                                          tag: "BEAUTE LEVRES" },
      { key: "masque-corps",        line: "cosmetics", gamme: "hammam", inci: ["Ghassoul (Lava Clay)", "Argania Spinosa Kernel Oil", "Citrus Aurantium Flower Water"],                                         tag: "SOIN CORPS COMPLET" },
    ],
  },
  {
    key: "eaux-florales",
    number: "04",
    products: [
      { key: "eau-rose",          line: "cosmetics", gamme: "eaux-florales", inci: ["100% Rosa Damascena Flower Water"],                                                   tag: "CLASSIQUE MAROCAIN" },
      { key: "eau-fleur-oranger", line: "cosmetics", gamme: "eaux-florales", inci: ["100% Citrus Aurantium Flower Water"],                                                 tag: "TRADITION FES" },
      { key: "hydrolat-romarin",  line: "cosmetics", gamme: "eaux-florales", inci: ["100% Rosmarinus Officinalis Water"],                                                  tag: "TENDANCE 2026" },
      { key: "hydrolat-lavande",  line: "cosmetics", gamme: "eaux-florales", inci: ["100% Lavandula Angustifolia Water"],                                                  tag: "APAISANT & CICATRISANT" },
      { key: "hydrolat-neroli",   line: "cosmetics", gamme: "eaux-florales", inci: ["100% Citrus Aurantium Amara Flower Water"],                                           tag: "LUXE ANTI-AGE" },
      { key: "brume-rose-oranger",line: "cosmetics", gamme: "eaux-florales", inci: ["Rosa Damascena Flower Water 50%", "Citrus Aurantium Flower Water 50%"],               tag: "DUO EMBLEMATIQUE" },
    ],
  },
  {
    key: "savons-noirs",
    number: "05",
    products: [
      { key: "savon-nila-oranger",   line: "cosmetics", gamme: "savons-noirs", inci: ["Olea Europaea Fruit Oil", "Aqua", "Indigofera Tinctoria (Nila)", "Citrus Aurantium Flower Water", "Potassium Hydroxide"],          tag: "SIGNATURE HAMMAM" },
      { key: "savon-aker-rose",      line: "cosmetics", gamme: "savons-noirs", inci: ["Olea Europaea Fruit Oil", "Aqua", "Punica Granatum Bark Powder", "Rosa Damascena Flower Water", "Potassium Hydroxide"],            tag: "ECLAT & TEINT" },
      { key: "savon-saad-musc",      line: "cosmetics", gamme: "savons-noirs", inci: ["Olea Europaea Fruit Oil", "Aqua", "Cyperus Esculentus Oil", "Musk (naturel)", "Potassium Hydroxide"],                               tag: "GOLFE +++ - LUXE" },
      { key: "savon-ghassoul-argan", line: "cosmetics", gamme: "savons-noirs", inci: ["Olea Europaea Fruit Oil", "Aqua", "Ghassoul (Lava Clay)", "Argania Spinosa Kernel Oil", "Potassium Hydroxide"],                    tag: "COMPLET & NOURRISSANT" },
      { key: "savon-sidr-nigelle",   line: "cosmetics", gamme: "savons-noirs", inci: ["Olea Europaea Fruit Oil", "Aqua", "Ziziphus Jujuba Leaf Powder", "Nigella Sativa Seed Oil", "Potassium Hydroxide"],                tag: "CAPILLAIRE SPECIAL" },
      { key: "savon-henne-jasmin",   line: "cosmetics", gamme: "savons-noirs", inci: ["Olea Europaea Fruit Oil", "Aqua", "Lawsonia Inermis (Henna)", "Jasminum Officinale Extract", "Potassium Hydroxide"],               tag: "PARFUM FLORAL" },
    ],
  },
  {
    key: "huiles-massage",
    number: "06",
    products: [
      { key: "massage-argan-oud",      line: "cosmetics", gamme: "huiles-massage", inci: ["Argania Spinosa Kernel Oil 95%", "Aquilaria Malaccensis Extract (Oud) 5%"],              tag: "GOLFE LUXE - PREMIUM" },
      { key: "massage-argan-rose",     line: "cosmetics", gamme: "huiles-massage", inci: ["Argania Spinosa Kernel Oil 97%", "Rosa Damascena Flower Oil 3%"],                        tag: "SPA FAVORI" },
      { key: "massage-figue-saad",     line: "cosmetics", gamme: "huiles-massage", inci: ["Opuntia Ficus-Indica Seed Oil 80%", "Cyperus Esculentus Oil 20%"],                       tag: "GESTE FEMININ ANCESTRAL" },
      { key: "massage-argan-jasmin",   line: "cosmetics", gamme: "huiles-massage", inci: ["Argania Spinosa Kernel Oil 97%", "Jasminum Officinale Oil 3%"],                          tag: "RELAXANT & ENVOUTANT" },
      { key: "massage-argan-musc",     line: "cosmetics", gamme: "huiles-massage", inci: ["Argania Spinosa Kernel Oil 95%", "Musk (naturel) 5%"],                                   tag: "MUSC SANS ALCOOL" },
      { key: "massage-argan-cannelle", line: "cosmetics", gamme: "huiles-massage", inci: ["Argania Spinosa Kernel Oil 97%", "Cinnamomum Zeylanicum Bark Oil 3%"],                   tag: "EFFET CHAUFFANT" },
    ],
  },
];

export const TEXTILE_PRODUCTS: ProductDef[] = [
  { key: "sac_femme", line: "textile", inci: [], photo: "/brand_photos/packaging-1.jpg" },
  { key: "sac_homme", line: "textile", inci: [], photo: "/brand_photos/packaging-3.jpg" },
  { key: "pouche",    line: "textile", inci: [], photo: "/brand_photos/packaging-5.jpg" },
  { key: "pins",      line: "textile", inci: [], photo: "/brand_photos/gift-box-flat.jpg" },
];

export const ALL_COSMETICS_PRODUCTS: ProductDef[] = GAMMES.flatMap((g) => g.products);

export const ALL_PRODUCTS: ProductDef[] = [...ALL_COSMETICS_PRODUCTS, ...TEXTILE_PRODUCTS];

export function getGammeByKey(key: CosmeticsGammeKey): GammeDef | undefined {
  return GAMMES.find((g) => g.key === key);
}

export function getProductByKey(key: string): ProductDef | undefined {
  return ALL_PRODUCTS.find((p) => p.key === key);
}
