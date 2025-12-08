import { describe, it, expect } from "vitest";
import ImportComponent from "./index"; // Importar desde el archivo donde se encuentra la exportación

describe("Exportación del componente ImportComponent", () => {
  it("debería exportar el componente ImportComponent", () => {
    expect(ImportComponent).toBeDefined(); // Verifica que ImportComponent no sea undefined o null
  });
});
