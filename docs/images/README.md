# Biblioteca de Imágenes de Referencia

Esta carpeta contiene todas las capturas de pantalla y imágenes de referencia utilizadas para generar código con GitHub Copilot.

## 📁 Estructura de Carpetas

### `/components/`
Capturas de componentes individuales organizadas por tipo:

- **`/buttons/`** - Todos los tipos de botones (primarios, secundarios, iconos, etc.)
- **`/forms/`** - Elementos de formularios (inputs, selects, checkboxes, etc.)
- **`/cards/`** - Tarjetas, contenedores, sheets
- **`/navigation/`** - Elementos de navegación (breadcrumbs, tabs, sidebar, etc.)
- **`/feedback/`** - Alerts, modals, tooltips, progress indicators
- **`/data-display/`** - Tablas, listas, badges, chips

### `/layouts/`
Capturas de layouts y páginas completas:

- **`/dashboard/`** - Vistas de dashboard y paneles administrativos
- **`/forms/`** - Páginas completas de formularios
- **`/lists/`** - Vistas de listados y tablas
- **`/mobile/`** - Versiones móviles de layouts

### `/examples/`
Ejemplos de conversión antes/después:

- **`/desktop/`** - Capturas de escritorio
- **`/mobile/`** - Capturas móviles  
- **`/converted/`** - Screenshots del código generado funcionando

## 📝 Convenciones de Nomenclatura

### Formato de Nombres
```
[tipo]-[descripcion]-[variante]-[tamaño].[extension]

Ejemplos:
- button-primary-large.png
- card-product-with-actions.png
- form-login-validation-errors.png
- layout-dashboard-sidebar-collapsed.png
```

### Prefijos por Tipo
- `btn-` - Botones
- `form-` - Formularios
- `card-` - Tarjetas
- `nav-` - Navegación
- `layout-` - Layouts completos
- `modal-` - Modales y overlays
- `table-` - Tablas
- `list-` - Listas

## 🖼️ Especificaciones de Imágenes

### Resolución Recomendada
- **Desktop**: 1920x1080 o superior
- **Mobile**: 375x812 (iPhone) o 360x640 (Android)
- **Tablet**: 768x1024

### Formato
- **PNG** para capturas con transparencias
- **JPG** para capturas simples
- **WebP** para optimización de tamaño

### Calidad
- Capturas limpias sin elementos del navegador
- Sin herramientas de desarrollo abiertas
- Enfoque en la UI específica a convertir

## 🎯 Cómo Usar las Imágenes

### 1. Subir Nueva Imagen
```bash
# Guarda en la carpeta apropiada
docs/images/components/buttons/mi-boton.png
```

### 2. Referenciar en Copilot Instructions
```markdown
![Mi Botón](./images/components/buttons/mi-boton.png)
```

### 3. Generar Código
```
"Basándote en la imagen ./images/components/buttons/mi-boton.png, 
genera el componente React correspondiente usando Material-UI Joy"
```

## 📊 Tracking de Imágenes

### Estados de Conversión
- ✅ **Converted** - Ya convertida a código
- 🔄 **In Progress** - En proceso de conversión  
- 📝 **Pending** - Pendiente de conversión
- ❌ **Issues** - Problemas en la conversión

### Log de Cambios
Mantener un registro de:
- Fecha de agregado
- Autor de la captura
- Estado de conversión
- Componente generado
- Issues encontrados

---

**Nota**: Siempre verificar que las imágenes no contengan información sensible antes de subirlas al repositorio.
