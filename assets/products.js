/*
 * Catálogo de By Natalie Store.
 * IMPORTANTE: estos productos, fotos (Unsplash) y precios son DE EJEMPLO para el diseño.
 * Reemplázalos por los productos reales de la tienda antes de vender.
 * Campos: id, nombre, categoría, precio (COP), precioAntes (opcional), etiquetas, tallas, colores, imagen, descripción.
 */
window.NS_DEMO = true;
window.NS_CATEGORIES = [
  { id: 'ropa', name: 'Ropa', desc: 'Vestidos, blusas y conjuntos' },
  { id: 'deportivo', name: 'Sets deportivos', desc: 'Para entrenar con estilo' },
  { id: 'lenceria', name: 'Lencería y pijamas', desc: 'Encaje, satén y comodidad' },
  { id: 'belleza', name: 'Belleza', desc: 'Maquillaje y cuidado de la piel' },
  { id: 'perfumes', name: 'Perfumes', desc: 'Fragancias que se recuerdan' },
  { id: 'accesorios', name: 'Accesorios', desc: 'Joyería y bolsos' }
];
window.NS_PRODUCTS = [
  { id: 'vestido-satin-negro', name: 'Vestido satinado largo', cat: 'ropa', price: 239000, tags: ['nuevo', 'top'], sizes: ['XS', 'S', 'M', 'L'], colors: ['Negro'], img: 'vestido-satin-negro', desc: 'Vestido largo en satín con abertura lateral y caída fluida. Ideal para eventos y noches especiales.' },
  { id: 'vestido-satin-azul', name: 'Vestido satinado corto', cat: 'ropa', price: 179000, oldPrice: 219000, tags: ['oferta'], sizes: ['XS', 'S', 'M', 'L'], colors: ['Azul noche'], img: 'vestido-satin-azul', desc: 'Vestido corto en satín con escote en V y tiras ajustables.' },
  { id: 'vestido-cruzado-chocolate', name: 'Vestido cruzado', cat: 'ropa', price: 169000, tags: ['nuevo'], sizes: ['S', 'M', 'L', 'XL'], colors: ['Chocolate'], img: 'vestido-cruzado-chocolate', desc: 'Vestido cruzado de manga larga que estiliza la cintura. Para la oficina o una cena.' },
  { id: 'blusa-blanca', name: 'Blusa sin mangas', cat: 'ropa', price: 89000, tags: ['top'], sizes: ['S', 'M', 'L'], colors: ['Marfil'], img: 'blusa-blanca', desc: 'Blusa de botones sin mangas en tela suave. Un básico que combina con todo.' },
  { id: 'blusa-roja', name: 'Blusa escote en V', cat: 'ropa', price: 95000, tags: [], sizes: ['S', 'M', 'L'], colors: ['Rojo'], img: 'blusa-roja', desc: 'Blusa de caída suave con escote en V.' },
  { id: 'conjunto-rosa', name: 'Conjunto estampado', cat: 'ropa', price: 199000, oldPrice: 239000, tags: ['oferta'], sizes: ['S', 'M', 'L'], colors: ['Rosa'], img: 'conjunto-rosa', desc: 'Conjunto de blusa y pantalón con estampado floral, fresco y cómodo.' },
  { id: 'conjunto-azul', name: 'Conjunto floral', cat: 'ropa', price: 209000, tags: ['nuevo'], sizes: ['S', 'M', 'L'], colors: ['Azul'], img: 'conjunto-azul', desc: 'Conjunto de dos piezas con estampado floral en azul.' },
  { id: 'set-deportivo-vino', name: 'Set deportivo top y leggings', cat: 'deportivo', price: 149000, tags: ['top'], sizes: ['S', 'M', 'L'], colors: ['Vino'], img: 'set-deportivo-vino', desc: 'Top y leggings de tiro alto con compresión suave. Se ajusta y se mueve contigo.' },
  { id: 'set-deportivo-petroleo', name: 'Set deportivo manga larga', cat: 'deportivo', price: 159000, tags: ['nuevo'], sizes: ['S', 'M', 'L'], colors: ['Petróleo'], img: 'set-deportivo-petroleo', desc: 'Set de top manga larga y leggings sin costuras.' },
  { id: 'bralette-blanco', name: 'Bralette de encaje', cat: 'lenceria', price: 69000, tags: ['top'], sizes: ['S', 'M', 'L'], colors: ['Blanco'], img: 'bralette-blanco', desc: 'Bralette en encaje suave, sin varilla, cómodo para todo el día.' },
  { id: 'bralette-nude', name: 'Bralette básico', cat: 'lenceria', price: 59000, oldPrice: 75000, tags: ['oferta'], sizes: ['S', 'M', 'L'], colors: ['Nude'], img: 'bralette-nude', desc: 'Bralette de tela suave en tono piel, invisible bajo la ropa.' },
  { id: 'bata-rosa', name: 'Bata de satén', cat: 'lenceria', price: 129000, tags: ['nuevo', 'top'], sizes: ['S/M', 'L/XL'], colors: ['Rosa palo'], img: 'bata-rosa', desc: 'Bata larga de satén con cinturón. Para empezar y terminar el día con calma.' },
  { id: 'pijama-rayas', name: 'Pijama de satén a rayas', cat: 'lenceria', price: 139000, tags: [], sizes: ['S', 'M', 'L'], colors: ['Rayas'], img: 'pijama-rayas', desc: 'Pijama de camisa y pantalón en satén a rayas.' },
  { id: 'bata-cebra', name: 'Bata estampada', cat: 'lenceria', price: 119000, tags: ['nuevo'], sizes: ['S/M', 'L/XL'], colors: ['Cebra'], img: 'bata-cebra', desc: 'Bata de satén con estampado animal print.' },
  { id: 'labial-rojo', name: 'Labial mate rojo', cat: 'belleza', price: 45000, tags: ['top'], sizes: [], colors: ['Rojo clásico'], img: 'labial-rojo', desc: 'Labial de acabado mate y larga duración.' },
  { id: 'labial-nude', name: 'Labial cremoso nude', cat: 'belleza', price: 42000, tags: [], sizes: [], colors: ['Nude rosado'], img: 'labial-nude', desc: 'Labial cremoso que hidrata y da color natural.' },
  { id: 'paleta-rubores', name: 'Paleta de rubores', cat: 'belleza', price: 79000, oldPrice: 95000, tags: ['oferta'], sizes: [], colors: ['4 tonos'], img: 'paleta-rubores', desc: 'Paleta con cuatro tonos de rubor, de natural a intenso.' },
  { id: 'serum', name: 'Sérum facial iluminador', cat: 'belleza', price: 89000, tags: ['nuevo'], sizes: ['30 ml'], colors: [], img: 'serum', desc: 'Sérum ligero para una piel luminosa e hidratada.' },
  { id: 'crema-corporal', name: 'Crema corporal hidratante', cat: 'belleza', price: 55000, tags: [], sizes: ['200 ml'], colors: [], img: 'crema-corporal', desc: 'Crema de rápida absorción para una piel suave.' },
  { id: 'perfume-ambar', name: 'Perfume Ámbar', cat: 'perfumes', price: 189000, tags: ['top'], sizes: ['50 ml', '100 ml'], colors: [], img: 'perfume-ambar', desc: 'Fragancia cálida con notas de ámbar y vainilla.' },
  { id: 'perfume-floral', name: 'Perfume Floral', cat: 'perfumes', price: 179000, tags: ['nuevo'], sizes: ['50 ml', '100 ml'], colors: [], img: 'perfume-floral', desc: 'Fragancia fresca con notas florales y un toque cítrico.' },
  { id: 'argollas-doradas', name: 'Argollas doradas', cat: 'accesorios', price: 49000, tags: ['top'], sizes: [], colors: ['Dorado'], img: 'argollas-doradas', desc: 'Argollas gruesas con acabado dorado brillante.' },
  { id: 'argollas-texturizadas', name: 'Argollas texturizadas', cat: 'accesorios', price: 45000, tags: [], sizes: [], colors: ['Dorado'], img: 'argollas-texturizadas', desc: 'Argollas medianas con textura delicada.' },
  { id: 'collar-dorado', name: 'Collar con dije', cat: 'accesorios', price: 59000, oldPrice: 72000, tags: ['oferta'], sizes: [], colors: ['Dorado'], img: 'collar-dorado', desc: 'Collar fino con dije, perfecto para el día a día.' },
  { id: 'bolso-rosa', name: 'Bolso acolchado', cat: 'accesorios', price: 159000, tags: ['nuevo'], sizes: [], colors: ['Rosa'], img: 'bolso-rosa', desc: 'Bolso de mano acolchado con correa ajustable.' },
  { id: 'bolso-azul', name: 'Bolso estructurado', cat: 'accesorios', price: 169000, tags: [], sizes: [], colors: ['Azul'], img: 'bolso-azul', desc: 'Bolso de mano estructurado con asa corta.' }
];
