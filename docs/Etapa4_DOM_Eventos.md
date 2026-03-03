# Etapa 4 — DOM, Eventos y Despliegue
## Helados Biodiversos

---

## 1. DOM en nuestro proyecto

El DOM es la interfaz que usa JavaScript para leer y modificar el HTML en tiempo real. En Helados Biodiversos todo el contenido (tarjetas de productos, carrito, Kanban, inventario) se genera desde JavaScript sin recargar la página, por eso el manejo del DOM es la base de todo el sistema.


---

## 2. Propagación de eventos (Bubbling)

Cuando el usuario hace clic en un elemento, el evento no se queda ahí: sube por el árbol del DOM desde el elemento clicado hasta `document`. Esto se llama **bubbling**.

**Cómo lo usamos:** en el carrito y en el Kanban, en lugar de poner un listener en cada botón individual, ponemos un solo listener en el contenedor padre. Cuando el usuario hace clic en cualquier botón hijo, el evento sube hasta el padre y desde ahí identificamos qué botón fue. Esto se llama **event delegation**.

**Por qué lo necesitamos:** nuestras listas se re-renderizan constantemente. Con listeners individuales, cada re-renderizado destruye los nodos y hay que reasignarlos. Con un listener en el padre que no se destruye, el problema desaparece.

**Estado actual:** aún usamos listeners individuales en cada elemento. La migración a event delegation está pendiente.

---

## 3. Renderizado dinámico

Tenemos cuatro funciones que generan HTML desde JavaScript usando template strings y lo inyectan con `innerHTML`:

- **`renderProducts()`** — genera las tarjetas del catálogo al iniciar la app y al cambiar el filtro activo.
- **`updateCart()`** — genera los ítems del carrito y recalcula el total cada vez que el usuario agrega o elimina un producto.
- **`renderKitchen()`** — genera las tarjetas del Kanban distribuidas en las tres columnas según el estado de cada pedido.
- **`renderInventory()`** — genera las filas de la tabla con el indicador de estado (OK, Revisar, Stock Bajo) calculado desde los datos.

---

## 4. Métodos del DOM: append vs innerHTML

**innerHTML** reemplaza todo el contenido de un elemento de una vez. Lo usamos en las cuatro funciones de renderizado porque necesitamos reconstruir listas completas. Su desventaja es que destruye los nodos existentes junto con sus listeners.

**append()** agrega nodos al final sin destruir lo que ya existe. Lo usaremos cuando necesitemos agregar un solo elemento a una lista existente, como al añadir una nueva tarjeta al Kanban sin reconstruir toda la columna.

---

## 5. Atributos data-*

Permiten guardar información directamente en un elemento HTML. Se declaran con el prefijo `data-` y se leen desde JavaScript con `element.dataset`.

**Problema actual:** algunos botones tienen `onclick="addToOrder(5)"` directamente en el HTML generado. Esto mezcla lógica con estructura, rompe la separación de responsabilidades, e impide usar event delegation.

**Lo que vamos a hacer:** reemplazar todos los `onclick` inline por atributos `data-product-id`, `data-order-id`, etc., y manejar todo desde listeners en los contenedores padre.

---

## 6. localStorage

**Problema actual:** todo el estado (carrito, pedidos, inventario) vive en memoria JavaScript. Si el usuario recarga la página pierde su pedido. Si el empleado cierra la pestaña pierde los pedidos activos.

**Lo que vamos a implementar:**

| Clave | Qué guarda |
|---|---|
| `hb_cart` | Ítems del carrito del cliente |
| `hb_orders` | Pedidos activos del panel de cocina |
| `hb_settings` | Preferencias del ERP |

Cada operación que modifique el estado escribirá en localStorage automáticamente. Al iniciar la app se leerá localStorage antes de renderizar.

Cuando conectemos el backend en la Fase 2, localStorage actuará como caché: escribe local primero (respuesta inmediata al usuario) y sincroniza con la API después.

---

## 7. Puntos críticos a resolver

**onclick inline bloqueados en producción:** Vercel sirve el sitio con HTTPS y cabeceras de seguridad HTTP. Bajo una política CSP, los `onclick` inline quedan bloqueados silenciosamente: los botones dejan de responder sin lanzar ningún error. Esto es un bloqueo directo para producción y es la tarea más urgente antes del despliegue.

**Listeners perdidos en cada re-renderizado:** `innerHTML` destruye los nodos y sus listeners. Hoy los reasignamos en cada renderizado, lo que funciona pero escala mal. La solución es event delegation.

**Estado sin persistencia:** una recarga borra todo. Lo resolvemos con localStorage antes del primer despliegue.

**Sin manejo de errores en servicios:** las funciones que modifican el carrito, los pedidos y el inventario no validan sus entradas. Hay que agregar validaciones antes de integrar el backend.

**IDs hardcodeados:** usamos enteros secuenciales que asumimos desde 1. El backend generará IDs desde la base de datos (posiblemente UUIDs). Hay que tratar los IDs como valores opacos y no asumir nada sobre su formato.

---

## 8. Despliegue en Vercel

### Por qué Vercel

Vercel detecta automáticamente proyectos de frontend estático, genera una URL pública con HTTPS desde el primer despliegue, y se integra directamente con GitHub para desplegar en cada `git push` a `main`.

### Configuración necesaria

El repositorio tiene un `package.json` con Jest. Para que Vercel no lo trate como una app Node.js, se agrega un archivo `vercel.json` en la raíz del proyecto.

Esto le dice a Vercel que el proyecto es estático y que sirva los archivos directamente sin ejecutar ningún proceso de Node.js.


### localStorage en Vercel

`localStorage` vive en el navegador del cliente, no en el servidor. Vercel solo sirve los archivos. Los datos del localStorage de un cliente en su teléfono no llegan al panel de cocina en otro dispositivo hasta que pasen por el backend.

### Lista de verificación antes del primer despliegue

| Tarea | Responsable |
|---|---|
| Crear vercel.json con configuración estática | Daniel |
| Reemplazar onclick inline por data attributes con event delegation | Isaac |
| Implementar localStorage para carrito y pedidos | Isaac |
| Agregar manejo de errores en servicios críticos | Nicolás |
| Verificar que los  tests pasan con npm test | Daniel |
| Confirmar que el sitio abre con Live Server antes de subir | Nicolás |


*Etapa 4 — Helados Biodiversos · Isaac Núñez, Nicolás Betancourt, Daniel Rojas*
