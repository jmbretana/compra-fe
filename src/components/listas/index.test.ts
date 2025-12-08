import { describe, it, expect } from "vitest";
import ListasComponent from "./index"; // Importar desde el archivo donde se encuentra la exportación

describe("Exportación del componente ListasComponent", () => {
  it("debería exportar el componente ListasComponent", () => {
    expect(ListasComponent).toBeDefined(); // Verifica que ListasComponent no sea undefined o null
  });
});
