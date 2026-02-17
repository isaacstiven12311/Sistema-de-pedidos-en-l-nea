# Sistema ERP Web - Helados Biodiversos

Sistema web de gestión de pedidos con ERP tipo POS integrado para una heladería enfocada en la biodiversidad y el comercio justo colombiano.

---

## Descripción del proyecto

**Helados Biodiversos** es una heladería que trabaja con materias primas provenientes de comunidades indígenas, campesinas y regiones biodiversas de Colombia (Amazonas, Chocó, Caribe, Llanos y Sierra Nevada), promoviendo la sostenibilidad y el comercio justo.

El sistema busca eliminar las largas filas físicas que enfrentan los clientes, permitiéndoles realizar sus pedidos desde cualquier dispositivo, obtener un turno automático y consultar el tiempo estimado de espera en tiempo real. Simultáneamente, el sistema integra un módulo ERP tipo POS que centraliza la gestión interna del negocio: ventas, inventario, proveedores, facturación y reportes.

---

## Problema que resuelve

Los clientes deben hacer largas filas para pedir, lo que genera tiempos de espera prolongados e insatisfacción. Internamente, la gestión manual de ventas e inventario provoca errores y pérdida de eficiencia. Este sistema automatiza y centraliza ambos procesos.

---

## Usuarios del sistema

| Rol | Descripción |
|-----|-------------|
| Cliente | Realiza pedidos en línea, obtiene turno y consulta el estado de su pedido. |
| Empleado | Gestiona pedidos desde el POS en tiempo real y actualiza estados. |
| Administrador | Gestiona menú, inventario, proveedores, usuarios y reportes desde el dashboard. |

---

## Etapas del proyecto

### Etapa 1 - Análisis del Sistema
**Archivo:** `docs/etapa1-analisis.md`

Documentación del análisis inicial del sistema, que incluye:
- El problema que se quiere resolver
- Los usuarios del sistema
- La entrada, el proceso y la salida del sistema
- El alcance del sistema (qué incluye y qué queda fuera)

### Etapa 2 - Requisitos del Sistema
**Archivo:** `docs/etapa2-requisitos.md`

Documentación completa de los requisitos del sistema, que incluye:
- Actores del sistema (Cliente, Empleado, Administrador, Sistema)
- 20 Requisitos Funcionales organizados por actor
- 39 Requisitos No Funcionales organizados por atributo de calidad (Usabilidad, Rendimiento, Disponibilidad, Seguridad, Mantenibilidad, Escalabilidad, Compatibilidad, Identidad Visual, Portabilidad y Eficiencia)

---

## Estructura del repositorio

```
/
├── README.md
└── docs/
    ├── etapa1-analisis.md
    └── etapa2-requisitos.md
```

---

## Identidad visual

| Elemento | Valor |
|----------|-------|
| Color principal | Verde esmeralda `#50C878` |
| Color secundario | Naranja mandarina `#FF8C42` |
| Color de acento | Azul turquesa `#40E0D0` |
| Tipografía títulos | Poppins |
| Tipografía cuerpo | Open Sans |

---

## Tecnologías sugeridas

| Componente | Tecnología |
|-----------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js / Python |
| Base de datos | PostgreSQL / MySQL |
| Control de versiones | Git / GitHub |



*Proyecto desarrollado con fines académicos — Ingeniería de Software*
