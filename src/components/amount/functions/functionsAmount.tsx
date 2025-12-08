import { Amount, List } from "@interfaces";
import { UpdateManyProductList } from "@actions/listsActions";
import { AppDispatch } from "src/middleware/store/store";

export const handleUpdateList = (lists: List[], formData: Amount) => {
  const listToUpdate: List[] = [];

  lists.map((item) => {
    let find = false;

    const articulo = item.articulo.toLowerCase();

    formData.tags?.map((tag) => {
      const searchTag = tag.trim().toLowerCase();

      // Controlar que en la descripcion este incluido el tag pero el mismo debe tener espacios vacios a su izquierda y derecha
      // para evitar que se encuentre un tag dentro de otro tag
      // Ejemplo: "tag1" no debe encontrar "tag12" o "tag123"
      // Si el tag es "tag1" y el articulo es "tag12", no debe encontrarlo
      if (tag.trim() === "") return; // Ignorar tags vacíos

      if (tag.includes("%")) {
        const parts = tag.split("%");
        let countParts = parts.length;

        parts.forEach((part) => {
          part = part.trim();
          if (articulo.includes(part.toLowerCase())) {
            countParts--;
          }
        });

        if (countParts === 0) {
          find = true;
        }
      }

      if (articulo.includes(searchTag + " ")) {
        find = true;
      } else if (articulo.includes(" " + searchTag)) {
        find = true;
      } else if (articulo.startsWith(searchTag + " ")) {
        find = true;
      } else if (articulo.endsWith(" " + searchTag)) {
        find = true;
      } else if (articulo === searchTag) {
        find = true;
      } else if (articulo === " " + searchTag) {
        find = true;
      } else if (articulo === searchTag + " ") {
        find = true;
      } else if (articulo === " " + searchTag + " ") {
        find = true;
      }
    });

    if (find) {
      const productList = {
        ...item,
        unidad: formData.unidad || "",
        cantidad: formData.cantidad || "",
        tipo: formData.tipo || "",
        medida: formData.medida || "",
      };

      listToUpdate.push(productList);
    }
  });

  return listToUpdate;
};

export const updateItems = async (
  listToUpdate: List[],
  dispatch: AppDispatch
) => {
  // enviar a UpdateManyProductList la lista de items sin marca
  try {
    // enviar de a lotes de 50 items
    const chunkSize = 50;
    for (let i = 0; i < listToUpdate.length; i += chunkSize) {
      const chunk = listToUpdate.slice(i, i + chunkSize);
      await dispatch(UpdateManyProductList(chunk));
    }
  } catch (error) {
    console.error("Error al cargar las listas", error);
  }
};
