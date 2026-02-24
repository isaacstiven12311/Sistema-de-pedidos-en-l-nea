# Sistema de Pedidos en Linea - Helados Biodiversos
Heladeria Artesanal · Biodiversidad Colombiana

---

## Acerca del Proyecto

**Helados Biodiversos** es un sistema web integrado de pedidos en linea con ERP tipo POS para la gestion completa de una heladeria artesanal que trabaja con materias primas de comunidades indigenas y campesinas colombianas.

El sistema consta de tres modulos principales:

**Portal de Pedidos (Cliente):** interfaz web donde los clientes consultan el catalogo de sabores, realizan su pedido y reciben un numero de turno con tiempo estimado de espera, sin necesidad de hacer fila fisica.

**Panel de Cocina (Empleado):** sistema Kanban en tiempo real para que el personal gestione los pedidos activos, avanzando entre tres estados: pendiente, en preparacion, listo para entrega.

**ERP / POS (Administrador):** sistema de gestion completo con dashboard de KPIs, control de ventas e inventario, registro de proveedores comunitarios, generacion de facturas con IVA y reportes financieros.

### Contexto del Negocio

La heladeria trabaja con materias primas provenientes de comunidades indigenas, campesinas y regiones biodiversas de Colombia: Amazonas, Choco biogeografico, region Caribe, Llanos Orientales y Sierra Nevada de Santa Marta.

El sistema apoya tres principios del modelo de negocio: biodiversidad (sabores unicos de frutas y plantas colombianas), comercio justo (trazabilidad completa de los proveedores comunitarios) y sostenibilidad (control de inventario para reducir desperdicios).

---

## Problema que Resuelve

**Para el cliente:** los clientes deben hacer largas filas fisicas para pedir, lo que genera tiempos de espera impredecibles e insatisfaccion. El sistema permite realizar el pedido desde cualquier dispositivo, obtener un turno asignado automaticamente y consultar el tiempo estimado de espera en tiempo real.

**Para el negocio:** la gestion manual de ventas e inventario provoca errores, perdida de informacion y baja eficiencia operativa. El sistema centraliza todas las operaciones en un unico panel, automatiza el control de stock y genera reportes en tiempo real para la toma de decisiones.

---

## Usuarios del Sistema

| Rol | Descripcion |
|-----|-------------|
| Cliente | Consulta el catalogo, realiza pedidos, obtiene turno y hace seguimiento del estado. |
| Empleado | Gestiona pedidos desde el panel de cocina en tiempo real y actualiza estados. |
| Administrador | Gestiona menu, inventario, proveedores, usuarios y reportes desde el ERP. |

---

## Caracteristicas Principales

### Portal de Clientes
- Catalogo con 8 sabores artesanales, precio, region de origen e informacion de la comunidad proveedora.
- Carrito de compras con calculo automatico de totales y tiempo estimado.
- Asignacion automatica de turno al confirmar el pedido (en menos de 1 segundo).
- Ticket con numero de turno y tiempo de espera estimado.
- Diseno responsive para moviles, tablets y escritorio.

### Panel de Cocina
- Vista Kanban con tres columnas: Pendientes, En Preparacion, Listos.
- Contador de tiempo transcurrido por cada pedido activo.
- Estadisticas en tiempo real del estado de la operacion.
- Actualizacion de estado con botones de accion directos.

### ERP Administrativo
- Dashboard con KPIs: ventas del dia, producto mas vendido, tiempo promedio de atencion y pedidos activos.
- Historial de ventas con exportacion a CSV.
- Inventario con indicadores de stock (OK, Revisar, Stock Bajo) y alertas automaticas.
- Registro de proveedores comunitarios con region, productos certificados y estado activo/inactivo.
- Facturacion automatica con calculo de IVA (19%) por cada venta completada.
- Reportes de ventas por producto con grafico de barras comparativo.

---

## Tecnologias Utilizadas

### Frontend (Version Actual)

| Tecnologia | Uso |
|-----------|-----|
| HTML5 | Estructura semantica del sitio |
| CSS3 | Estilos, animaciones, responsive design |
| JavaScript ES6+ | Logica de la aplicacion organizada en capas (Model / Service / Controller) |

### Backend (En Desarrollo)

| Tecnologia | Uso |
|-----------|-----|
| Node.js (o Python + Flask) | API REST |
| (SQL server o MySQL) | Base de datos relacional |
| JWT | Autenticacion y autorizacion por roles |
| bcrypt | Encriptacion de contrasenas |

### DevOps y CI/CD

| Herramienta | Uso |
|------------|-----|
| Git + GitHub | Control de versiones |
| GitHub Actions | Pipeline de CI/CD |
| Jest (o Pytest) | Pruebas unitarias y de integracion |
| ESLint | Analisis estatico de codigo |
| Railway / Render | Hosting y despliegue |

---

## Arquitectura del Sistema

El sistema sigue una arquitectura en capas. El frontend (HTML/CSS/JS) se comunica con una API REST a traves de HTTP usando JSON. La API delega la logica de negocio a la capa de servicios, que a su vez interactua con la base de datos a traves de los modelos.

El backend sigue el patron Modelo-Servicio-Controlador:

- **Controlador:** recibe peticiones HTTP, valida el formato de entrada y devuelve respuestas con codigos apropiados.
- **Servicio:** contiene toda la logica de negocio (calculo de tiempos, asignacion de turnos, reglas de inventario, facturacion).
- **Modelo:** ejecuta consultas a la base de datos y mapea los datos a objetos del sistema.

Esta separacion permite probar la logica de negocio de forma independiente, sin necesidad de levantar un servidor HTTP ni conectar una base de datos, lo que hace las pruebas rapidas y confiables.

La documentacion completa de la arquitectura, los modelos de datos, los contratos de la API y la estrategia de pruebas esta en `docs/etapa3-arquitectura-backend.md`.

---

## Instalacion y Uso

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge).
- Visual Studio Code con la extension Live Server instalada.

### Ejecucion Local

Clonar el repositorio:
```
git clone https://github.com/tu-usuario/sistema-de-pedidos-en-linea.git
cd sistema-de-pedidos-en-linea
```

Abrir en VS Code:
```
code .
```

Iniciar con Live Server: clic derecho sobre `index.html` y seleccionar "Open with Live Server". El sistema se abre en `http://127.0.0.1:5500`.

### Guia de Uso por Modulo

**Como Cliente:**
1. Explorar el catalogo de helados en la pagina principal.
2. Hacer clic en "Agregar" para anadir productos al carrito.
3. Revisar el resumen del pedido en el panel lateral.
4. Hacer clic en "Confirmar Pedido" y recibir el ticket con numero de turno.

**Como Empleado (Cocina):**
1. Cambiar a la pestana "Cocina" en la barra de navegacion.
2. Visualizar los pedidos en el tablero Kanban.
3. Usar "Iniciar" para mover un pedido a preparacion.
4. Usar "Listo" cuando el pedido este terminado.

**Como Administrador (ERP):**
1. Cambiar a la pestana "ERP / POS".
2. Revisar el Dashboard con metricas en tiempo real.
3. Gestionar el Inventario y registrar nuevos insumos.
4. Registrar y consultar Proveedores comunitarios.
5. Revisar el historial de Ventas y exportar a CSV.
6. Consultar Facturas generadas con detalle de IVA.

---

## Estructura del Repositorio

```
/
+-- index.html
+-- styles.css
+-- app.js                          <- Punto de entrada (bootstrap)
+-- models/
|   +-- index.js                    <- Almacenes de datos (CRUD)
+-- services/
|   +-- index.js                    <- Logica de negocio
+-- controllers/
|   +-- index.js                    <- Manejo de eventos y UI
+-- tests/
|   +-- services.test.js            <- Pruebas unitarias (33 casos)
+-- docs/
|   +-- etapa1-analisis.md
|   +-- etapa2-requisitos.md
|   +-- etapa3-arquitectura-backend.md
|   +-- api-contracts.md            <- Contratos de todos los endpoints
+-- README.md
```

---

## Documentacion

| Documento | Contenido |
|-----------|-----------|
| docs/etapa1-analisis.md | Definicion del problema, usuarios del sistema, alcance |
| docs/etapa2-requisitos.md | 20 requisitos funcionales y 39 no funcionales |
| docs/etapa3-arquitectura-backend.md | Diseno de la API REST, modelos de datos, pruebas y CI/CD |
| docs/api-contracts.md | Contratos completos de los 20 endpoints del sistema |

---

## Identidad Visual

| Elemento | Valor |
|----------|-------|
| Color principal | Verde esmeralda #50C878 |
| Color secundario | Naranja mandarina #FF8C42 |
| Color de acento | Azul turquesa #40E0D0 |
| Tipografia titulos | Poppins |
| Tipografia cuerpo | Open Sans |

---

## Estado del Proyecto y Roadmap

### Fase 1: Frontend - Completado

- Diseno visual con identidad corporativa del negocio.
- Portal de pedidos interactivo con carrito y ticket de turno.
- Panel de cocina con tablero Kanban.
- ERP con 6 modulos: Dashboard, Ventas, Inventario, Proveedores, Facturas, Reportes.
- Arquitectura frontend refactorizada en capas (Model / Service / Controller).
- 33 pruebas unitarias pasando para la capa de servicios.

### Fase 2: Backend - En Desarrollo

- Definir stack tecnologico (Node.js vs Python).
- Crear API REST con los 20 endpoints documentados.
- Implementar autenticacion con JWT y control de acceso por roles.
- Conectar base de datos PostgreSQL o MySQL.
- Integrar frontend con backend.
- Pruebas unitarias con cobertura >= 80%.
- Pruebas de integracion para todos los contratos de la API.

### Fase 3: CI/CD y Despliegue

- Configurar GitHub Actions con pipeline automatizado.
- Deploy a Railway o Render.
- Configurar dominio personalizado con certificado SSL.
- Monitoreo y logs de produccion.

### Fase 4: Funcionalidades Futuras

- Pagos en linea (Wompi, PSE, tarjetas de credito).
- Notificaciones push en tiempo real para actualizaciones de estado.
- Soporte para multiples sedes.
- Integracion con plataformas de domicilios.

---

## Equipo

| Nombre | Responsabilidades |
|--------|-------------------|
| Isaac Nunez | Frontend, diseno UI/UX|
| Nicolas Betancourt | Backend, API REST, base de datos |
| Daniel Rojas | Integracion, pruebas, CI/CD, documentacion|

Proyecto academico - Ingenieria de Software, 2026.

---


