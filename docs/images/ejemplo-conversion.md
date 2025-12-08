# Ejemplo: Conversión de Imagen a Código

Este archivo muestra cómo usar las imágenes de referencia para generar código con GitHub Copilot.

## Paso 1: Agregar la Imagen

1. **Guarda tu captura** en la carpeta apropiada:
   ```
   docs/images/components/cards/product-card-example.png
   ```

2. **Referénciala en el documento:**
   ```markdown
   ![Product Card](./images/components/cards/product-card-example.png)
   ```

## Paso 2: Prompt para Copilot

Usa este prompt cuando quieras convertir la imagen:

```
Basándote en las instrucciones del archivo docs/copilot-instructions.md y 
la imagen docs/images/components/cards/product-card-example.png, 
genera un componente React usando Material-UI Joy que replique exactamente 
el diseño mostrado en la captura.
```

## Paso 3: Resultado Esperado

Copilot debería generar algo como:

```typescript
import React from 'react';
import { Card, CardContent, AspectRatio, Typography, Button, Stack } from '@mui/joy';
import { Product } from '@interfaces';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 280, boxShadow: 'sm' }}>
      <AspectRatio ratio="4/3">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
        />
      </AspectRatio>
      <CardContent>
        <Stack spacing={1}>
          <Typography level="title-md" noWrap>
            {product.name}
          </Typography>
          <Typography level="body-sm" color="neutral">
            {product.description}
          </Typography>
          <Typography level="title-lg" color="primary">
            ${product.price}
          </Typography>
          <Button 
            size="sm"
            fullWidth
            onClick={() => onAddToCart(product.id)}
          >
            Agregar al Carrito
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
```

## Paso 4: Refinamiento

Si el resultado no es exacto, puedes hacer ajustes específicos:

```
El componente generado está bien, pero necesito que:
1. La imagen tenga esquinas más redondeadas
2. El botón sea de color "success" en lugar de "primary"  
3. Agregue un badge de descuento si product.discount existe
```

## Tips Adicionales

### Para Mejores Resultados:
- Captura en alta resolución
- Incluye contexto (padding, márgenes)
- Captura diferentes estados si es necesario
- Asegúrate que la UI esté limpia

### Prompts Útiles:
- "Hazlo responsive para mobile"
- "Agrega estados de loading y error"
- "Incluye accesibilidad (aria-labels)"
- "Optimiza para performance"
