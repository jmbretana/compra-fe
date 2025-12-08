# Instrucciones de Uso de GitHub Copilot

## 📋 Información del Proyecto

### Stack Tecnológico

- **Frontend**: React 18+ con TypeScript
- **UI Framework**: Material-UI Joy + Material-UI Core
- **Build Tool**: Rsbuild
- **Estado**: Redux Toolkit
- **Routing**: React Router
- **Testing**: Vitest
- **Linting**: ESLint

### Estructura del Proyecto

```
src/
├── auth/           # Contexto de autenticación
├── components/     # Componentes reutilizables
├── hooks/          # Custom hooks
├── interfaces/     # Definiciones TypeScript
├── layout/         # Layouts de páginas
├── middleware/     # Redux store, actions, reducers
├── navegation/     # Componentes de navegación
├── pages/          # Páginas principales
├── router/         # Configuración de rutas
├── utils/          # Utilidades y helpers
└── values/         # Constantes y configuraciones
```

## 🎯 Patrones y Convenciones

### Nomenclatura de Archivos

- **Componentes**: PascalCase (`SearchComponent.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useBreakpoints.ts`)
- **Tipos/Interfaces**: PascalCase (`User.tsx`, `Product.tsx`)
- **Utilidades**: camelCase (`utils.tsx`, `environment.tsx`)

### Estructura de Componentes

```typescript
// Importaciones externas primero
import React from 'react';
import { Material-UI imports } from '@mui/joy';

// Importaciones internas
import { CustomComponent } from '@components/...';
import { useCustomHook } from '@hooks/...';
import { Interface } from '@interfaces';

// Definición de interfaces locales
interface ComponentProps {
  // props aquí
}

// Componente principal
const ComponentName = ({ props }: ComponentProps) => {
  // lógica del componente
  return (
    // JSX aquí
  );
}

export ComponentName
```

## 🔧 Instrucciones Específicas para Copilot

### Redux y Estado

- Usar Redux Toolkit para manejo de estado
- Acciones deben estar en `src/middleware/actions/`
- Tipos de acciones en `src/middleware/types/`
- Evitar mutaciones directas del estado
- Usar `useDispatch` y `useSelector` de react-redux

### Material-UI

- **Preferir Material-UI Joy** para nuevos componentes
- **Solo usar Material-UI Core** cuando Joy no tenga el componente necesario
- Envolver aplicación con `CssVarsProvider` de Joy
- Usar `extendTheme()` para personalizaciones

### TypeScript

- **Todas las interfaces** deben estar en `src/interfaces/index.tsx`
- **Ordenar alfabéticamente** tanto interfaces como sus campos
- Usar tipos estrictos, evitar `any`
- Definir props interfaces para componentes

### Routing y Navegación

- Usar React Router v6
- Rutas protegidas con `ProtectedRoute`
- Navegación programática con `useNavigate`

### Estilos y Theming

- Usar `sx` prop para estilos inline
- Aprovechar el sistema de design tokens de Joy
- Crear componentes reutilizables en `src/components/common/`

## 📝 Comandos y Tareas Comunes

### Crear Nuevo Componente

```typescript
// 1. Crear archivo en la carpeta apropiada
// 2. Definir interface si es necesario en interfaces/index.tsx
// 3. Implementar componente con la estructura estándar
// 4. Exportar desde index.tsx si es un componente común
```

### Agregar Nueva Funcionalidad Redux

```typescript
// 1. Crear tipos de acción en middleware/types/
// 2. Crear acciones en middleware/actions/
// 3. Actualizar reducer correspondiente
// 4. Usar en componente con useSelector/useDispatch
```

### 📸 Conversión de Capturas de Pantalla a Código

#### 🖼️ Biblioteca de Imágenes de Referencia

Las imágenes de referencia se organizan en la siguiente estructura:

```
docs/images/
├── components/     # Capturas de componentes individuales
│   ├── buttons/    # Diferentes tipos de botones
│   ├── forms/      # Elementos de formularios
│   ├── cards/      # Tarjetas y contenedores
│   ├── navigation/ # Elementos de navegación
│   └── feedback/   # Alerts, modals, tooltips
├── layouts/        # Capturas de layouts completos
│   ├── dashboard/  # Vistas de dashboard
│   ├── forms/      # Páginas de formularios
│   ├── lists/      # Vistas de listados
│   └── mobile/     # Versiones móviles
└── examples/       # Ejemplos de antes/después
    ├── desktop/    # Capturas desktop
    ├── mobile/     # Capturas mobile
    └── converted/  # Código generado
```

#### 📁 Cómo Agregar Nuevas Imágenes

1. **Guarda la captura** en la carpeta correspondiente:
   ```bash
   # Ejemplo para un componente de botón
   docs/images/components/buttons/primary-button.png
   
   # Ejemplo para un layout de dashboard  
   docs/images/layouts/dashboard/main-dashboard.png
   ```

2. **Nomenclatura de archivos:**
   - Usar kebab-case: `product-card.png`
   - Ser descriptivo: `login-form-with-validation.png`
   - Incluir variante si aplica: `button-primary-large.png`

3. **Referenciar en markdown:**
   ```markdown
   ![Descripción](./images/components/buttons/primary-button.png)
   ```

#### 🎯 Ejemplos con Imágenes

##### Componente de Botón
**Referencia visual:**
```markdown
![Botón Primario](./images/components/buttons/primary-button.png)
```

**Código generado:**
```typescript
<Button 
  color="primary" 
  size="lg" 
  variant="solid"
  startIcon={<Add />}
>
  Agregar Item
</Button>
```

##### Layout de Dashboard
**Referencia visual:**
```markdown
![Dashboard Layout](./images/layouts/dashboard/main-dashboard.png)
```

**Estructura generada:**
```typescript
<Box sx={{ display: 'flex', minHeight: '100vh' }}>
  <Sidebar />
  <Box component="main" sx={{ flexGrow: 1 }}>
    <Header />
    <Container sx={{ py: 3 }}>
      {/* Contenido principal */}
    </Container>
  </Box>
</Box>
```

#### 📊 Template de Análisis con Imagen

Cuando subas una imagen, usa este template:

```markdown
## Análisis de: [nombre-archivo.png]

**Imagen:**
![Descripción](./images/ruta/archivo.png)

**Elementos identificados:**
- Layout principal: [Grid/Flex/Stack]
- Componentes: [Button, Card, Input, etc.]
- Colores: [primary, secondary, neutral]
- Espaciado: [tight: 1, normal: 2, loose: 3]
- Breakpoint: [xs, sm, md, lg, xl]

**Código objetivo:**
```typescript
// Componente React aquí
```

**Consideraciones especiales:**
- Estados: [loading, error, success]
- Interacciones: [click, hover, focus]
- Responsive: [adaptaciones móviles]
```

#### Proceso de Análisis de Imágenes
1. **Descripción detallada**: Primero describe todos los elementos visibles
2. **Identificar componentes**: Mapear elementos UI a componentes de Material-UI Joy
3. **Analizar layout**: Determinar estructura de containers y espaciado
4. **Detectar interacciones**: Identificar botones, forms, navegación
5. **Generar código**: Crear componente React con TypeScript

#### Template para Análisis de Capturas
```markdown
**Análisis de Captura:**
- Layout principal: [Grid/Flex/Stack]
- Componentes identificados: [Button, Card, Input, etc.]
- Colores dominantes: [primary, secondary, neutral]
- Espaciado: [tight/normal/loose]
- Responsive: [mobile-first/desktop-first]
- Estados: [loading, error, success, etc.]
```

#### Mapeo de Elementos Visuales a Componentes

##### Contenedores y Layout
- **Cajas blancas/grises** → `<Card>` o `<Sheet>`
- **Áreas con sombra** → `<Card variant="outlined">`
- **Divisiones horizontales** → `<Divider>`
- **Columnas/grillas** → `<Grid>` o `<Stack direction="row">`
- **Listas verticales** → `<Stack>` o `<List>`

##### Elementos de Entrada
- **Campos de texto** → `<Input>` o `<FormControl>`
- **Dropdowns** → `<Select>` 
- **Checkboxes** → `<Checkbox>`
- **Botones radiales** → `<Radio>`
- **Sliders** → `<Slider>`
- **Botones de archivo** → `<Input type="file">`

##### Navegación y Acciones
- **Botones principales** → `<Button color="primary">`
- **Botones secundarios** → `<Button variant="outlined">`
- **Botones de peligro** → `<Button color="danger">`
- **Iconos clickeables** → `<IconButton>`
- **Tabs** → `<Tabs>` y `<TabList>`
- **Breadcrumbs** → `<Breadcrumbs>`

##### Retroalimentación y Estados
- **Mensajes de éxito** → `<Alert color="success">`
- **Mensajes de error** → `<Alert color="danger">`
- **Indicadores de carga** → `<CircularProgress>`
- **Badges/contadores** → `<Chip>` o `<Badge>`
- **Tooltips** → `<Tooltip>`

##### Datos y Contenido
- **Tablas** → `<Table>` con `<TableHead>`, `<TableBody>`
- **Tarjetas de producto** → `<Card>` con `<CardContent>`
- **Avatares** → `<Avatar>`
- **Imágenes** → `<AspectRatio>` con `<img>`

#### Patrones de Layout Comunes

##### Dashboard Layout
```typescript
<Box sx={{ display: 'flex', minHeight: '100vh' }}>
  <Sidebar />
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Stack spacing={3}>
      <Typography level="h2">Dashboard</Typography>
      <Grid container spacing={2}>
        {/* Cards/Widgets aquí */}
      </Grid>
    </Stack>
  </Box>
</Box>
```

##### Form Layout
```typescript
<Card sx={{ maxWidth: 400, mx: 'auto' }}>
  <CardContent>
    <Stack spacing={2}>
      <Typography level="h4">Título del Form</Typography>
      <FormControl>
        <FormLabel>Campo</FormLabel>
        <Input />
      </FormControl>
      <Button fullWidth>Enviar</Button>
    </Stack>
  </CardContent>
</Card>
```

##### Lista con Acciones
```typescript
<Card>
  <List>
    <ListItem endAction={
      <IconButton><MoreHoriz /></IconButton>
    }>
      <ListItemContent>
        <Typography level="title-sm">Item</Typography>
        <Typography level="body-sm">Descripción</Typography>
      </ListItemContent>
    </ListItem>
  </List>
</Card>
```

#### Instrucciones de Colores y Theming

##### Sistema de Colores
- **Primario**: `color="primary"` - Acciones principales
- **Neutral**: `color="neutral"` - Texto y elementos secundarios  
- **Peligro**: `color="danger"` - Eliminación, errores
- **Éxito**: `color="success"` - Confirmaciones, estados positivos
- **Advertencia**: `color="warning"` - Alertas, precauciones

##### Variantes de Componentes
- **Sólido**: `variant="solid"` - Máximo énfasis
- **Outlined**: `variant="outlined"` - Énfasis medio
- **Soft**: `variant="soft"` - Énfasis suave
- **Plain**: `variant="plain"` - Mínimo énfasis

#### Responsividad desde Capturas
- **Mobile first**: Si la captura es mobile, usar breakpoints `xs`, `sm`
- **Desktop first**: Si es desktop, usar `md`, `lg`, `xl`
- **Elementos que colapsan**: Usar `sx={{ display: { xs: 'none', md: 'block' } }}`
- **Navegación móvil**: Implementar hamburger menu con `<Drawer>`

#### Proceso Step-by-Step
1. **Analizar la imagen**: Describir layout, componentes, colores
2. **Crear estructura base**: Definir containers principales  
3. **Implementar componentes**: De arriba hacia abajo, izquierda a derecha
4. **Agregar estilos**: Spacing, colores, tipografía
5. **Hacer responsive**: Adaptar para diferentes pantallas
6. **Agregar interacciones**: Estados, events, navegación
7. **Optimizar**: Performance, accesibilidad, UX

#### Prompts Útiles para Copilot
```
"Convierte esta captura de pantalla en un componente React usando Material-UI Joy"
"Analiza esta imagen y crea la estructura de layout correspondiente"  
"Identifica todos los componentes UI en esta captura y mapéalos a Material-UI Joy"
"Crea un componente responsive basado en este diseño mobile"
"Basándote en la imagen docs/images/[ruta]/[archivo].png, genera el componente correspondiente"
```

#### 📂 Gestión de Imágenes de Referencia

**Ubicación:** Todas las imágenes se guardan en `docs/images/` con la siguiente estructura:
- `components/` - Componentes individuales
- `layouts/` - Layouts completos  
- `examples/` - Ejemplos de conversión

**Ver documentación completa:** [docs/images/README.md](./images/README.md)
**Ejemplo práctico:** [docs/images/ejemplo-conversion.md](./images/ejemplo-conversion.md)

### Debugging

- Errores de build → Terminal de VS Code
- Errores de runtime → DevTools del navegador (F12 → Console)
- Errores de tipos → VS Code Problems panel

## 🚨 Errores Comunes y Soluciones

### TypeError: Cannot read properties of undefined

- **Causa**: Falta de optional chaining o tema no disponible
- **Solución**: Usar `?.` y fallbacks (`|| "default"`)

### CORS Errors

- **Causa**: Backend no configurado o contraseñas bloqueadas
- **Solución**: Revisar configuración del servidor, probar con datos diferentes

### Errores de Capturas de Pantalla

#### Componentes No Identificados Correctamente
- **Causa**: Elementos personalizados o complejos no mapeados
- **Solución**: Describir funcionalidad específica en lugar de solo apariencia

#### Layout Responsive Roto
- **Causa**: No considerar breakpoints al convertir
- **Solución**: Siempre pensar mobile-first, usar Stack para vertical

#### Colores Inconsistentes  
- **Causa**: No usar el sistema de design tokens
- **Solución**: Mapear colores visuales a tokens: `primary`, `neutral`, `success`, etc.

## 🎨 Mejores Prácticas

### Performance

- Usar `React.memo` para componentes que se re-renderizan frecuentemente
- Memoizar callbacks con `useCallback`
- Evitar crear objetos/arrays en render

### Accesibilidad

- Usar semantic HTML
- Agregar `aria-label` a botones de iconos con su texto descriptivo
- Asegurar contraste de colores adecuado usando la base de colores del componente COLORS

### Testing

- Escribir tests para utilidades y hooks críticos
- Usar `@testing-library/react` para tests de componentes
- Mockear llamadas API en tests

### 📸 Mejores Prácticas para Capturas

#### Preparación de Capturas
- **Capturas limpias**: Sin elementos de browser, solo la UI
- **Resolución alta**: Mínimo 1920x1080 para desktop, 375x812 para mobile
- **Estados claros**: Capturar diferentes estados (normal, hover, error, loading)
- **Contexto completo**: Incluir navegación y breadcrumbs si es relevante

#### Análisis Efectivo
- **Empezar por layout**: Identificar contenedores principales primero
- **Pensar en datos**: Qué información se muestra y de dónde viene
- **Considerar estados**: Loading, empty, error states
- **Planificar interacciones**: Qué sucede al hacer click, submit, etc.

#### Implementación Progresiva
1. **Estructura estática**: Primero crear layout sin funcionalidad
2. **Datos mock**: Usar datos de prueba para poblar componentes
3. **Estilos básicos**: Aplicar colores, spacing, tipografía
4. **Funcionalidad**: Agregar eventos, validaciones, etc.
5. **Estados dinámicos**: Implementar loading, error handling
6. **Responsive**: Adaptar para diferentes pantallas
7. **Refinamiento**: Pulir detalles, animaciones, micro-interacciones

## 📚 Recursos Útiles

- [Material-UI Joy Documentation](https://mui.com/joy-ui/getting-started/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript React Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### 🛠️ Herramientas para Capturas de Pantalla

#### Captura y Análisis
- **macOS**: `Cmd+Shift+4` para capturas de área específica
- **Windows**: `Win+Shift+S` para Snipping Tool
- **Browser DevTools**: `Cmd+Shift+C` para inspeccionar elementos
- **Figma/Adobe XD**: Para revisar specs de diseño

#### Extensiones Útiles
- **ColorZilla**: Para extraer colores exactos
- **Rulers**: Para medir espaciado y dimensiones  
- **WhatFont**: Para identificar tipografías
- **React DevTools**: Para analizar componentes existentes

### 📋 Checklist de Conversión

#### Pre-Conversión
- [ ] Captura en alta resolución
- [ ] Identificar breakpoint (mobile/tablet/desktop)  
- [ ] Analizar colores dominantes
- [ ] Mapear elementos a componentes Joy UI
- [ ] Planificar estructura de datos

#### Durante Conversión
- [ ] Crear estructura de contenedores
- [ ] Implementar componentes de arriba hacia abajo
- [ ] Aplicar sistema de colores consistente
- [ ] Usar spacing tokens (1, 2, 3, etc.)
- [ ] Agregar props interfaces necesarias

#### Post-Conversión  
- [ ] Probar en diferentes tamaños de pantalla
- [ ] Verificar accesibilidad básica
- [ ] Optimizar performance si es necesario
- [ ] Documentar props y uso del componente
- [ ] Agregar a Storybook si corresponde

### 🎯 Ejemplos de Conversión

#### Ejemplo 1: Card de Producto
```typescript
// Captura muestra: Card blanca, imagen arriba, título, precio, botón
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  onAddToCart: (id: string) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 280 }}>
      <AspectRatio ratio="4/3">
        <img src={product.image} alt={product.name} loading="lazy" />
      </AspectRatio>
      <CardContent>
        <Typography level="title-md">{product.name}</Typography>
        <Typography level="title-lg" color="primary">
          ${product.price}
        </Typography>
        <Button 
          fullWidth 
          onClick={() => onAddToCart(product.id)}
          sx={{ mt: 1 }}
        >
          Agregar al Carrito
        </Button>
      </CardContent>
    </Card>
  );
};
```

#### Ejemplo 2: Form de Login
```typescript
// Captura muestra: Form centrado, 2 inputs, botón, link
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography level="h3" textAlign="center">
            Iniciar Sesión
          </Typography>
          
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button size="lg" fullWidth>
            Entrar
          </Button>

          <Typography level="body-sm" textAlign="center">
            ¿No tienes cuenta?{' '}
            <Link href="/register">Regístrate aquí</Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
```

---

**Última actualización**: Julio 31, 2025  
**Versión**: 1.1.0
