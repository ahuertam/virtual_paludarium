# Virtual Paludarium

Proyecto para simular, en un canvas web, la física y el comportamiento de tres entornos: acuario, terrario y paludario. Según la selección, se cargará el entorno y la fauna correspondiente. La tierra del terrario debe ser excavable por especies capaces de hacerlo.

## Intenciones
- Simular tres tipos de entorno: acuario, terrario y paludario.
- Cada entorno tendrá su propio conjunto de animales y alimentos interactivos.
- El terrario se representa con un suelo curvo e irregular y una banda verde pegada al suelo que se funde con el cielo azul.
- La tierra debe poder excavarse dinámicamente para formar guaridas y túneles.

## Estado actual (MVP Terrario)
- Canvas a pantalla completa con suelo curvo irregular.
- Banda verde superior pegada al suelo y cielo azul por encima.
- Menú lateral izquierdo:
  - Insectos: bicho palo y hormiga roja.
  - Alimento: hoja (cuadrado verde) que cae con gravedad.
- Bicho palo:
  - Se mueve sobre el suelo.
  - Come hojas posadas; al comer 5, crece un poco; puede crecer hasta 4× su tamaño base.
- Hormiga roja:
  - Más pequeña; excava bajo el suelo, entra en los túneles y sigue agrandando su guarida.
- Tierra excavable:
  - Implementada con una máscara de suelo y borrado compositivo.
  - API para excavar: `digCircle(x, y, r)`.

## Cómo ejecutar
1. Requisitos: cualquier navegador moderno. Opcionalmente Python 3 para servidor local.
2. En el directorio del proyecto: `python3 -m http.server 8000`
3. Abre `http://localhost:8000/`.
4. Interacciones:
   - Botón `🦗`: abrir menú y añadir “Bicho palo” u “Hormiga roja”.
   - Botón `🍃`: soltar hojas que caen al suelo.

## Estructura básica
- `index.html`: canvas y UI (menú lateral).
- `styles.css`: estilos del lienzo y del menú.
- `src/main.js`: generación del terreno, render y lógica de entidades.

## Próximos pasos
- Añadir texturas y variación de grosor de la banda verde en función de la pendiente.
- Comportamientos de búsqueda de alimento y navegación por túneles más sofisticados.
- Implementar los entornos de acuario y paludario con su fauna y reglas.
