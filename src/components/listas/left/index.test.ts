import { describe, it, expect } from "vitest";
import ListaMenu from "./index"; // Importar desde el archivo donde se encuentra la exportación

describe("Exportación del componente ListaMenu", () => {
  it("debería exportar el componente ListaMenu", () => {
    expect(ListaMenu).toBeDefined(); // Verifica que ListaMenu no sea undefined o null
  });
});
