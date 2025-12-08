import { useState, useEffect } from "react";

// Definimos los breakpoints según los estándares de Material UI
// https://mui.com/material-ui/customization/breakpoints/
const breakpoints = {
  xs: 0, // extra-small: 0px o mayor
  sm: 600, // small: 600px o mayor
  md: 900, // medium: 900px o mayor
  lg: 1200, // large: 1200px o mayor
  xl: 1536, // extra-large: 1536px o mayor
};

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Hook personalizado para detectar breakpoints de pantalla y dispositivos
 */
export const useBreakpoints = () => {
  // Estado que almacena el breakpoint actual
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("md");

  // Estado que almacena las dimensiones actuales
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Calcular el breakpoint basado en el ancho actual
  const calculateBreakpoint = (width: number): Breakpoint => {
    if (width < breakpoints.sm) return "xs";
    if (width < breakpoints.md) return "sm";
    if (width < breakpoints.lg) return "md";
    if (width < breakpoints.xl) return "lg";
    return "xl";
  };

  // Actualizar dimensiones y breakpoint actual
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions({ width, height });
      setCurrentBreakpoint(calculateBreakpoint(width));
    };

    // Establecer valores iniciales
    handleResize();

    // Agregar event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Limpiar event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Funciones para verificar breakpoints
  return {
    // Retorna las dimensiones actuales
    dimensions,

    // Retorna el breakpoint actual
    currentBreakpoint,

    // Verifica si la pantalla es de un breakpoint específico
    isBreakpoint: (bp: Breakpoint) => currentBreakpoint === bp,

    // Funciones para verificar si la pantalla está en un rango específico
    isXs: () => currentBreakpoint === "xs",
    isSm: () => currentBreakpoint === "sm",
    isMd: () => currentBreakpoint === "md",
    isLg: () => currentBreakpoint === "lg",
    isXl: () => currentBreakpoint === "xl",

    // Funciones para verificar rangos
    isXsOrSmaller: () => dimensions.width < breakpoints.sm,
    isSmOrSmaller: () => dimensions.width < breakpoints.md,
    isMdOrSmaller: () => dimensions.width < breakpoints.lg,
    isLgOrSmaller: () => dimensions.width < breakpoints.xl,

    isSmOrLarger: () => dimensions.width >= breakpoints.sm,
    isMdOrLarger: () => dimensions.width >= breakpoints.md,
    isLgOrLarger: () => dimensions.width >= breakpoints.lg,
    isXlOrLarger: () => dimensions.width >= breakpoints.xl,

    // Función para verificar dispositivos móviles
    isMobile: () => {
      // Verificar por user agent
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileAgents = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
      ];
      const isMobileUserAgent = mobileAgents.some((agent) =>
        userAgent.includes(agent)
      );

      // Verificar por tamaño
      const isMobileSize = dimensions.width < breakpoints.md; // Consideramos móvil si es menor a 'md'

      // Verificar modo responsive en DevTools
      const isDevToolsResponsive =
        window.orientation !== undefined ||
        (/Mobi|Android/i.test(navigator.userAgent) && dimensions.width < 1000);

      return isMobileUserAgent || isMobileSize || isDevToolsResponsive;
    },

    // Función para verificar tablets
    isTablet: () => {
      const width = dimensions.width;
      // Tablets típicamente están entre 600px y 900px en ancho
      return width >= breakpoints.sm && width < breakpoints.md;
    },

    // Función para verificar orientación
    isPortrait: () => dimensions.height > dimensions.width,
    isLandscape: () => dimensions.width > dimensions.height,

    // Función que retorna un valor basado en el breakpoint actual
    responsive: <T>(
      values: { [key in Breakpoint]?: T },
      defaultValue?: T
    ): T => {
      if (values[currentBreakpoint] !== undefined) {
        return values[currentBreakpoint] as T;
      }

      // Buscar el breakpoint más cercano disponible
      const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
      const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

      // Buscar hacia abajo
      for (let i = currentIndex - 1; i >= 0; i--) {
        const bp = breakpointOrder[i];
        if (values[bp] !== undefined) {
          return values[bp] as T;
        }
      }

      // Buscar hacia arriba
      for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
        const bp = breakpointOrder[i];
        if (values[bp] !== undefined) {
          return values[bp] as T;
        }
      }

      return defaultValue as T;
    },
  };
};

// Exportamos también constantes útiles
export const BREAKPOINTS = breakpoints;
