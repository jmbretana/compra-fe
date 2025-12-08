import { Brand, Product, Amount } from "@interfaces";

// Helper function to calculate Levenshtein distance between two strings
const calculateLevenshteinDistance = (str1: string, str2: string): number => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) track[0][i] = i;
  for (let j = 0; j <= str2.length; j++) track[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return track[str2.length][str1.length];
};

// Calculate similarity score between 0 and 1
const calculateSimilarity = (str1: string, str2: string): number => {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1.0; // Both strings are empty

  const distance = calculateLevenshteinDistance(
    str1.toLowerCase(),
    str2.toLowerCase()
  );
  return (maxLength - distance) / maxLength;
};

// Main fuzzy matching function
export const fuzzyMatchProduct = (
  searchTerm: string,
  product: Product,
  threshold: number = 0.7
): { matched: boolean; similarity: number; matchType: string } => {
  // Normalize strings
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const normalizedDesc = product.descripcion.trim().toLowerCase();

  // Check exact matches first
  if (normalizedDesc === normalizedSearch) {
    return { matched: true, similarity: 1, matchType: "exact" };
  }

  // Check if search term is contained in description
  if (normalizedDesc.includes(normalizedSearch)) {
    return { matched: true, similarity: 0.9, matchType: "contains" };
  }

  // Check tags
  if (product.tags) {
    const tagMatch = product.tags.some((tag) => {
      const normalizedTag = tag.trim().toLowerCase();
      return (
        normalizedTag === normalizedSearch ||
        normalizedSearch.includes(normalizedTag)
      );
    });
    if (tagMatch) {
      return { matched: true, similarity: 0.85, matchType: "tag" };
    }
  }

  // Calculate fuzzy match score
  const similarity = calculateSimilarity(normalizedSearch, normalizedDesc);

  return {
    matched: similarity >= threshold,
    similarity,
    matchType: similarity >= threshold ? "fuzzy" : "none",
  };
};

// Enhanced version of checkIfProductExists that uses fuzzy matching
export const findBestProductMatch = (
  description: string,
  products: Product[]
): { product: Product | null; similarity: number; matchType: string } => {
  if (!description || !products.length) {
    return { product: null, similarity: 0, matchType: "none" };
  }

  let bestMatch = {
    product: null as Product | null,
    similarity: 0,
    matchType: "none" as string,
  };

  products.forEach((product) => {
    const result = fuzzyMatchProduct(description, product);
    if (result.similarity > bestMatch.similarity) {
      bestMatch = {
        product,
        similarity: result.similarity,
        matchType: result.matchType,
      };
    }
  });

  return bestMatch;
};

export const checkIfProductExists = (
  description: string,
  dataProductsMaster: Product[]
) => {
  let productMaster = "";

  const descrip = description.toLowerCase();

  dataProductsMaster.map((product: Product) => {
    product.tags?.map((tag) => {
      if (descrip.includes(tag.trim().toLowerCase()))
        productMaster = product.descripcion.toLowerCase();
    });

    if (product.descripcion.includes(descrip)) {
      productMaster = product.descripcion.toLowerCase();
    }
  });

  return productMaster;
};

export const checkIfProductMasterExists = (
  description: string,
  productMaster: Product
) => {
  let vProductMaster = "";
  const descrip = description.toLowerCase();

  productMaster.tags?.map((tag) => {
    const tagLower = tag.trim().toLowerCase();
    if (descrip.includes(tagLower)) vProductMaster = productMaster.descripcion;
  });

  if (
    productMaster.descripcion
      .toLocaleLowerCase()
      .includes(description.toLocaleLowerCase())
  ) {
    vProductMaster = productMaster.descripcion;
  }

  return vProductMaster;
};

export const checkAmount = (description: string, amountItems: Amount[]) => {
  let amountItemReturn: Amount = {
    unidad: "",
    cantidad: "",
    tags: [],
    tipo: "",
    medida: "",
  };
  const descrip = description.toLowerCase().replace(",", ".");

  amountItems.map((amountItem: Amount) => {
    amountItem.tags?.map((tag) => {
      // Check if the tag is included in the description
      if (descrip.includes(tag.trim().toLowerCase())) {
        amountItemReturn = amountItem;
      }
    });
  });

  return amountItemReturn;
};

export const checkIfBrandProductExists = (
  description: string,
  dataBrands: Brand[]
) => {
  let brandMaster = "";

  const descrip = description.toLowerCase();

  dataBrands.map((brand: Brand) => {
    brand.tags?.map((tag) => {
      if (descrip.includes(tag.trim().toLowerCase()))
        brandMaster = brand.nombre.toLowerCase();
    });

    if (brand.nombre.includes(descrip)) {
      brandMaster = brand.nombre.toLowerCase();
    }
  });

  return brandMaster;
};
