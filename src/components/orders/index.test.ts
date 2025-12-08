import { describe, it, expect } from "vitest";
import OrdersComponent from "./index"; // Importar desde el archivo donde se encuentra la exportación

describe("Exportación del componente OrdersComponent", () => {
  it("debería exportar el componente OrdersComponent", () => {
    expect(OrdersComponent).toBeDefined(); // Verifica que OrdersComponent no sea undefined o null
  });
});
