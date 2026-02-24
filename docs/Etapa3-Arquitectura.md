# Etapa 3 - Arquitectura del Backend
## Sistema de Pedidos en Línea - Helados Biodiversos

---

## 1. El Backend dentro de la Arquitectura Global

### 1.1 Visión General del Sistema

El sistema **Helados Biodiversos** está compuesto por cuatro capas que trabajan de forma coordinada:

```
+----------------------------------------------------------+
|                      CAPA CLIENTE                        |
|  - Navegador web (HTML / CSS / JavaScript)               |
|  - Interfaz responsive para moviles y escritorio         |
|  - Renderizado en tiempo real del catalogo y pedidos     |
+---------------------------+------------------------------+
                            |
                            |  HTTP / REST (JSON)
                            v
+----------------------------------------------------------+
|            CAPA DE SERVICIOS WEB (API REST)              |
|  - Endpoints RESTful para cada recurso del negocio       |
|  - Autenticacion y autorizacion basada en roles          |
|  - Validacion de datos de entrada                        |
|  - Gestion de sesiones con JWT                           |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|          CAPA DE LOGICA DE NEGOCIO (Backend)             |
|  - Procesamiento y gestion de pedidos                    |
|  - Asignacion automatica de turnos                       |
|  - Calculo de tiempos de espera en tiempo real           |
|  - Control de inventario con alertas de stock            |
|  - Generacion de facturas con IVA (19%)                  |
|  - Trazabilidad de proveedores comunitarios              |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|                  CAPA DE PERSISTENCIA                    |
|  - Base de datos relacional (PostgreSQL / MySQL)         |
|  - Tablas: pedidos, productos, inventario,               |
|    proveedores, usuarios, ventas                         |
|  - Respaldo automatico cada 24 horas (RNF-12)            |
|  - Cache en memoria para consultas frecuentes (RNF-37)   |
+----------------------------------------------------------+
```

### 1.2 Justificacion de la Arquitectura en Capas

La separacion en capas responde directamente a los requisitos no funcionales definidos en la Etapa 2:

**Separacion de responsabilidades (RNF-18, RNF-20):** cada capa tiene un proposito especifico y bien definido. Un cambio en la base de datos no afecta la logica de negocio, y un cambio en la logica de negocio no requiere modificar el frontend.

**Testabilidad (RNF-18, RNF-19):** la capa de servicio puede probarse de forma completamente independiente, sin necesidad de levantar un servidor HTTP ni conectarse a una base de datos real. Esto habilita pruebas automaticas rapidas.

**Escalabilidad (RNF-22, RNF-24):** la arquitectura permite agregar recursos horizontalmente y replicarse en nuevas sedes sin reescribir el sistema. Cumple directamente con el requisito de expansion futura del negocio.

**Integraciones futuras (RNF-28):** la API REST expone contratos documentados que permiten conectar sistemas externos como pasarelas de pago o plataformas de domicilios en versiones futuras.

### 1.3 Flujo de Datos: Cliente Realiza un Pedido

Este flujo ilustra como interactuan todas las capas ante la operacion mas critica del sistema (RF-05, RF-06, RF-07):

1. El cliente selecciona productos en el portal web y confirma el pedido.
2. El frontend envia una solicitud POST a `/api/orders` con los items seleccionados.
3. El controlador recibe la solicitud, valida el formato de los datos y llama al servicio de pedidos.
4. El servicio de pedidos aplica las reglas de negocio: verifica stock disponible, calcula el total, asigna el numero de turno y calcula el tiempo estimado de espera.
5. El modelo de pedidos guarda el registro en la base de datos.
6. El servicio retorna el pedido creado con su turno y tiempo asignados.
7. El controlador devuelve la respuesta HTTP 201 con el ticket al frontend.
8. El frontend muestra al cliente su numero de turno y tiempo estimado.

Todo el proceso de asignacion de turno se completa en menos de 1 segundo (RNF-07), y el tiempo estimado se actualiza en tiempo real segun la carga de pedidos activos (RNF-08).

---

## 2. Arquitectura del Backend: Modelo por Capas

### 2.1 Patron Modelo-Servicio-Controlador

El backend sigue una arquitectura de tres capas inspirada en el patron MVC, adaptada para una API REST:

```
+----------------------------------------------------------+
|            CONTROLADOR (HTTP Layer)                      |
|                                                          |
|  Responsabilidad:                                        |
|  - Recibir peticiones HTTP del cliente                   |
|  - Validar formato de los datos de entrada               |
|  - Invocar el servicio correspondiente                   |
|  - Devolver respuestas HTTP con codigos apropiados       |
|  - Manejar errores HTTP (400, 401, 403, 404, 500)        |
|                                                          |
|  Archivos del proyecto:                                  |
|  - orderController.js                                    |
|  - productController.js                                  |
|  - inventoryController.js                                |
|  - supplierController.js                                 |
|  - userController.js                                     |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|           SERVICIO (Business Logic Layer)                |
|                                                          |
|  Responsabilidad:                                        |
|  - Implementar la logica de negocio del sistema          |
|  - Validar reglas de negocio complejas                   |
|  - Orquestar operaciones entre multiples modelos         |
|  - Calculos: totales, tiempos de espera, IVA             |
|  - Aplicar reglas de inventario y alertas de stock       |
|                                                          |
|  Archivos del proyecto:                                  |
|  - orderService.js    -> gestion de pedidos y turnos     |
|  - cartService.js     -> logica del carrito              |
|  - inventoryService.js -> control de stock y alertas     |
|  - supplierService.js -> proveedores comunitarios        |
|  - saleService.js     -> historial y reportes            |
|  - invoiceService.js  -> facturacion con IVA             |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|              MODELO (Data Access Layer)                  |
|                                                          |
|  Responsabilidad:                                        |
|  - Interactuar con la base de datos                      |
|  - Ejecutar consultas SQL (SELECT, INSERT, UPDATE)       |
|  - Mapear datos de BD a objetos JavaScript               |
|  - Garantizar integridad referencial                     |
|                                                          |
|  Archivos del proyecto:                                  |
|  - Order.js      -> tabla de pedidos                     |
|  - Product.js    -> catalogo de helados                  |
|  - Inventory.js  -> stock de materias primas             |
|  - Supplier.js   -> proveedores comunitarios             |
|  - User.js       -> usuarios del sistema                 |
+----------------------------------------------------------+
```

### 2.2 Justificacion del Patron

**Pruebas automatizadas:** al separar la logica de negocio en la capa de servicio, las pruebas unitarias pueden ejecutarse sin levantar un servidor HTTP ni conectar una base de datos. Esto hace que sean rapidas (milisegundos) y confiables. Las pruebas de integracion validan los controladores completos.

**Bajo acoplamiento:** si se cambia de PostgreSQL a MySQL, solo se modifican los modelos. Si se migra de Express a otro framework, solo se modifican los controladores. La logica de negocio permanece intacta en ambos casos.

**Trabajo en equipo:** la separacion permite que distintos integrantes trabajen en capas diferentes sin generar conflictos. Alguien puede implementar un servicio mientras otro desarrolla el controlador que lo consume, usando el contrato como acuerdo.

**Cumplimiento de requisitos:** el patron responde directamente a RNF-18 (codigo con buenas practicas), RNF-20 (arquitectura modular) y RNF-21 (facilita el control de versiones con Git).

### 2.3 Responsabilidades Estrictas de Cada Capa

| Capa | NO debe hacer | SI debe hacer |
|------|--------------|---------------|
| Controlador | Logica de negocio, calculos complejos | Validar formato de entrada, devolver codigos HTTP |
| Servicio | Conocer HTTP (req, res), consultar BD directamente | Implementar reglas de negocio, orquestar operaciones |
| Modelo | Logica de negocio, conocer detalles de HTTP | Ejecutar queries, mapear datos, garantizar integridad |

---

## 3. Diseno de la API REST

### 3.1 Principios del Diseno RESTful

El sistema utiliza REST como estilo arquitectonico por las siguientes razones vinculadas al proyecto:

**Estandar universal:** cualquier desarrollador entiende REST. Facilita la documentacion, las pruebas con Postman y las integraciones futuras (RNF-28).

**Sin estado (stateless):** cada peticion es independiente. El servidor no mantiene sesion entre peticiones, lo que facilita la escalabilidad horizontal requerida en RNF-22.

**Cacheable:** las respuestas GET (catalogo de productos, inventario) pueden almacenarse en cache, reduciendo la carga del servidor y mejorando tiempos de respuesta (RNF-05, RNF-37).

**Basado en recursos:** los endpoints representan entidades del negocio con URLs semanticas y predecibles. Un desarrollador nuevo puede entender la API sin leer la documentacion completa.

### 3.2 Recursos del Sistema

#### Recurso: Products (Helados del Menu)

| Metodo | Endpoint | Descripcion | Actor |
|--------|----------|-------------|-------|
| GET | /api/products | Lista todos los helados disponibles | Cliente, Empleado, Admin |
| GET | /api/products/:id | Detalles de un helado especifico | Cliente, Empleado, Admin |
| POST | /api/products | Crea un nuevo sabor en el menu | Administrador |
| PUT | /api/products/:id | Actualiza informacion de un helado | Administrador |
| DELETE | /api/products/:id | Elimina un sabor del menu | Administrador |

Cumple con RF-04 (consulta de menu) y RF-13 (gestion del menu por administrador).

---

#### Recurso: Orders (Pedidos)

| Metodo | Endpoint | Descripcion | Actor |
|--------|----------|-------------|-------|
| POST | /api/orders | Crea un nuevo pedido | Cliente |
| GET | /api/orders | Lista pedidos (filtrable por estado) | Empleado, Admin |
| GET | /api/orders/:id | Detalles de un pedido especifico | Cliente (propio), Empleado, Admin |
| PATCH | /api/orders/:id/status | Actualiza el estado del pedido | Empleado, Admin |
| DELETE | /api/orders/:id | Cancela un pedido | Cliente (propio), Admin |

Cumple con RF-05 (registro de pedido), RF-06 (asignacion de turno), RF-07 (tiempo de espera), RF-08 (consulta de estado), RF-10 (recepcion en POS) y RF-11 (actualizacion de estado por empleado).

---

#### Recurso: Inventory (Inventario de Materias Primas)

| Metodo | Endpoint | Descripcion | Actor |
|--------|----------|-------------|-------|
| GET | /api/inventory | Lista todos los insumos con sus niveles | Administrador |
| POST | /api/inventory | Registra un nuevo insumo | Administrador |
| PATCH | /api/inventory/:id/stock | Actualiza la cantidad de stock | Administrador, Sistema |
| GET | /api/inventory/alerts | Lista insumos con stock bajo del minimo | Administrador, Sistema |

Cumple con RF-14 (gestion de inventario) y RF-15 (alerta de stock bajo).

---

#### Recurso: Suppliers (Proveedores Comunitarios)

| Metodo | Endpoint | Descripcion | Actor |
|--------|----------|-------------|-------|
| GET | /api/suppliers | Lista todos los proveedores registrados | Administrador |
| POST | /api/suppliers | Registra un nuevo proveedor comunitario | Administrador |
| PUT | /api/suppliers/:id | Actualiza datos de un proveedor | Administrador |
| PATCH | /api/suppliers/:id/status | Activa o desactiva un proveedor | Administrador |

Cumple con RF-16 (gestion de proveedores). Este recurso es clave para garantizar la trazabilidad del origen de las materias primas y el modelo de comercio justo con comunidades indigenas y campesinas colombianas.

---

#### Recurso: Users (Usuarios del Sistema)

| Metodo | Endpoint | Descripcion | Actor |
|--------|----------|-------------|-------|
| POST | /api/users/register | Registra una nueva cuenta de cliente | Cliente |
| POST | /api/users/login | Inicia sesion en el sistema | Cliente, Empleado, Admin |
| POST | /api/users/logout | Cierra sesion de forma segura | Cliente, Empleado, Admin |
| GET | /api/users | Lista todos los usuarios del sistema | Administrador |
| POST | /api/users | Crea usuario con rol especifico | Administrador |
| PATCH | /api/users/:id/role | Cambia el rol de un usuario | Administrador |
| DELETE | /api/users/:id | Desactiva un usuario | Administrador |

Cumple con RF-01, RF-02, RF-03 y RF-17. Implementa control de acceso basado en roles (RBAC) segun RNF-14, y garantiza que las contrasenas se almacenen encriptadas con bcrypt (RNF-13, RNF-15).

---

#### Recurso: Reports (Reportes Administrativos)

| Metodo | Endpoint | Descripcion | Actor |
|--------|----------|-------------|-------|
| GET | /api/reports/sales | Reporte de ventas con filtros de fecha | Administrador |
| GET | /api/reports/inventory | Estado del inventario | Administrador |
| GET | /api/reports/suppliers | Proveedores y compras por comunidad | Administrador |
| GET | /api/reports/dashboard | Datos para el dashboard administrativo | Administrador |

Cumple con RF-19 (generacion de reportes) y RF-20 (dashboard administrativo con KPIs).

### 3.3 Convenciones de Diseno

**URLs correctas:** usar sustantivos plurales (`/orders`, `/products`) e IDs en la ruta (`/products/5`). Nunca verbos (`/createOrder`, `/getProduct`).

**Codigos HTTP:**

| Codigo | Significado | Uso en el sistema |
|--------|-------------|------------------|
| 200 | OK | GET, PUT, PATCH exitosos |
| 201 | Created | POST exitoso (pedido creado, usuario registrado) |
| 204 | No Content | DELETE exitoso |
| 400 | Bad Request | Datos de entrada invalidos (carrito vacio, stock negativo) |
| 401 | Unauthorized | Usuario no autenticado |
| 403 | Forbidden | Sin permisos para la operacion (cliente intenta acceder al ERP) |
| 404 | Not Found | Recurso no encontrado (producto, pedido) |
| 409 | Conflict | Stock insuficiente, producto no disponible |
| 500 | Internal Server Error | Error inesperado del servidor |

---

## 4. Modelos de Datos del Sistema

### 4.1 Proposito de los Modelos

Los modelos definen la estructura de los datos que maneja el sistema. Son importantes por tres razones:

**Contratos de datos:** frontend y backend se comunican usando estas estructuras. Definirlos correctamente evita errores de integracion y ambiguedades entre equipos.

**Base para las pruebas:** las pruebas unitarias y de integracion validan que los datos cumplan el contrato definido. Detectan errores de formato antes de llegar a produccion.

**Documentacion:** los modelos sirven como referencia para cualquier desarrollador que se integre al proyecto y pueden generarse automaticamente en Swagger/OpenAPI.

### 4.2 Modelos Principales

#### Modelo: Product (Helado)

```
Product
+-- id          : entero (autogenerado)
+-- name        : texto, requerido, max 100 caracteres
+-- description : texto, requerido, max 500 caracteres
+-- price       : decimal, requerido, positivo
+-- region      : texto (Amazonas, Choco, Caribe, Llanos, Sierra Nevada)
+-- color       : texto (codigo hexadecimal, uso en UI)
+-- prepTime    : entero (tiempo de preparacion en minutos)
+-- available   : booleano (true = disponible para venta)
+-- createdAt   : timestamp (automatico)
```

El campo `prepTime` es necesario para el calculo del tiempo de espera (RF-07). El campo `available` permite desactivar un producto temporalmente sin eliminarlo de la base de datos.

---

#### Modelo: Order (Pedido)

```
Order
+-- id            : entero (autogenerado)
+-- turnNumber    : texto (formato "001", "002", secuencial)
+-- userId        : entero (referencia a User, puede ser null para anonimos)
+-- items         : array de OrderItem
|   +-- productId   : entero (referencia a Product)
|   +-- productName : texto (guardado historico, no cambia si el producto se edita)
|   +-- quantity    : entero (entre 1 y 10)
|   +-- unitPrice   : decimal (precio al momento del pedido)
|   +-- subtotal    : decimal (quantity * unitPrice)
+-- total         : decimal (suma de subtotales)
+-- estimatedTime : entero (minutos)
+-- status        : texto ("pending", "preparing", "ready", "delivered", "cancelled")
+-- createdAt     : timestamp
+-- updatedAt     : timestamp (actualizado con cada cambio de estado)
```

`turnNumber` es unico y secuencial; su asignacion debe completarse en menos de 1 segundo (RNF-07). `productName` y `unitPrice` guardan valores historicos para garantizar que un pedido siempre refleje los datos al momento de su creacion, independientemente de ediciones posteriores al catalogo.

---

#### Modelo: InventoryItem (Insumo de Inventario)

```
InventoryItem
+-- id          : entero (autogenerado)
+-- name        : texto, requerido, max 100 caracteres
+-- origin      : texto (region o comunidad de origen)
+-- stock       : decimal (cantidad actual disponible)
+-- unit        : texto (kg, L, g, ml, unidades)
+-- minStock    : decimal (umbral de alerta de stock bajo)
+-- status      : texto calculado ("ok", "low", "critical")
+-- lastUpdated : timestamp (ultima modificacion de stock)
```

El campo `status` se calcula comparando `stock` con `minStock` y es la base para las alertas automaticas (RF-15). El sistema descuenta stock automaticamente al completar un pedido (RF-14).

---

#### Modelo: Supplier (Proveedor Comunitario)

```
Supplier
+-- id            : entero (autogenerado)
+-- name          : texto, requerido, max 150 caracteres
+-- region        : texto (Amazonas, Choco, Caribe, Llanos, Sierra Nevada, Otra)
+-- products      : array de textos (insumos que suministra)
+-- certification : texto (Comercio Justo, Organico, Agroecologico, Sin certificacion)
+-- active        : booleano (true = proveedor activo)
+-- contactEmail  : texto (opcional)
+-- createdAt     : timestamp
```

Este modelo es central para la propuesta de valor del negocio: garantiza la trazabilidad del origen de cada materia prima y el cumplimiento del modelo de comercio justo con comunidades indigenas y campesinas (RF-16).

---

#### Modelo: User (Usuario del Sistema)

```
User
+-- id        : entero (autogenerado)
+-- name      : texto, requerido, max 100 caracteres
+-- email     : texto, requerido, unico, formato email valido
+-- password  : texto (hasheado con bcrypt, nunca en texto plano)
+-- role      : texto ("client", "employee", "admin")
+-- active    : booleano (true = cuenta activa)
+-- createdAt : timestamp
+-- lastLogin : timestamp (registro del ultimo acceso para auditoria)
```

`password` nunca se almacena en texto plano (RNF-13, RNF-15). El campo `role` habilita el control de acceso basado en roles (RNF-14). `lastLogin` contribuye al log de auditoria de operaciones criticas (RNF-16).

### 4.3 Relaciones Entre Modelos

```
User (1) ──────────> (N) Order
  Un usuario puede tener muchos pedidos

Order (1) ──────────> (N) OrderItem
  Un pedido contiene varios items

OrderItem (N) ──────> (1) Product
  Cada item referencia a un producto del catalogo

Supplier (1) ────────> (N) InventoryItem
  Un proveedor suministra varios insumos

Product (N) ─────────> (N) InventoryItem
  Un producto requiere varios insumos para su preparacion (relacion implicita)
```

Estas relaciones garantizan integridad referencial y permiten consultas como: que proveedores suministran los insumos necesarios para el sabor Lucuma, o cuantos pedidos se han realizado de un producto especifico.

---

## 5. Contratos de la API

### 5.1 Que es un Contrato de API

Un contrato define el acuerdo entre frontend y backend sobre tres cosas: que datos se envian (request), que datos se esperan recibir (response) y que errores pueden ocurrir con sus respectivos codigos.

Definir contratos formalmente tiene tres beneficios directos para el proyecto: permite que frontend y backend se desarrollen en paralelo sin bloquearse mutuamente, habilita pruebas automaticas que validan el cumplimiento del contrato, y detecta rupturas de contrato en el pipeline de CI/CD antes de que lleguen a produccion.

### 5.2 Contrato Completo: POST /api/orders

Este es el contrato mas critico del sistema, ya que corresponde a la operacion principal (RF-05, RF-06, RF-07).

**Request:**

```
POST /api/orders
Content-Type: application/json

{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 5, "quantity": 1 }
  ]
}
```

**Reglas de validacion que aplica el backend:**

- `items` es obligatorio y debe ser un array con al menos un elemento.
- Cada item debe tener `productId` (entero positivo) y `quantity` (entero entre 1 y 10).
- Los `productId` deben existir en la base de datos.
- Los productos deben estar disponibles (`available: true`).
- Debe existir stock suficiente en inventario para los ingredientes requeridos.

**Response exitoso (201 Created):**

```json
{
  "id": 15,
  "turnNumber": "015",
  "items": [
    {
      "productId": 1,
      "productName": "Lucuma",
      "quantity": 2,
      "unitPrice": 4500,
      "subtotal": 9000
    },
    {
      "productId": 5,
      "productName": "Matcha Organico",
      "quantity": 1,
      "unitPrice": 5500,
      "subtotal": 5500
    }
  ],
  "total": 14500,
  "estimatedTime": 6,
  "status": "pending",
  "createdAt": "2026-02-24T14:30:00Z"
}
```

**Errores posibles:**

| Codigo | Situacion | Respuesta |
|--------|-----------|-----------|
| 400 | Array de items vacio | `{ "error": "Items array cannot be empty" }` |
| 400 | Quantity fuera de rango | `{ "error": "Quantity must be between 1 and 10" }` |
| 400 | ProductId no es numero | `{ "error": "Product ID must be a positive integer" }` |
| 404 | Producto no existe | `{ "error": "Product with id 99 not found" }` |
| 409 | Producto no disponible | `{ "error": "Product 'Lucuma' is currently unavailable" }` |
| 409 | Stock insuficiente | `{ "error": "Insufficient stock for product 'Lucuma'" }` |
| 500 | Error del servidor | `{ "error": "Internal server error" }` |

### 5.3 Relacion entre Contratos, Pruebas y CI/CD

Cada error listado en un contrato se convierte en un caso de prueba. La prueba verifica que al enviar datos que violan una regla, el sistema devuelve exactamente el codigo y el mensaje documentados. Si alguien modifica el servicio y cambia ese comportamiento sin actualizar el contrato, la prueba falla y el pipeline bloquea el merge.

Esta cadena (contrato → prueba → pipeline) es lo que garantiza que el sistema no genere regresiones silenciosas con el paso del tiempo.

---

## 6. Estrategia de Pruebas y CI/CD

### 6.1 Piramide de Pruebas

```
                  /\
                 /  \
                / E2E \           Pocas, lentas, alto nivel
               /--------\         Simulan flujo completo de usuario
              /          \
             / Integracion \      Moderadas
            /--------------\      Validan contratos de la API
           /                \
          /  Pruebas Unitarias\   Muchas, rapidas
         /--------------------\   Validan logica de negocio aislada
```

### 6.2 Pruebas Unitarias

Prueban funciones individuales de la capa de servicio sin dependencias externas. No requieren base de datos ni servidor HTTP activo.

Ejemplos para este proyecto:

- Verificar que `orderService.checkout()` lanza error 400 si el carrito esta vacio.
- Verificar que `inventoryService.updateStock()` rechaza valores negativos.
- Verificar que `orderService.checkout()` limpia el carrito al crear el pedido.
- Verificar que `saleService.exportData()` retorna error si no hay ventas.
- Verificar que `supplierService.create()` rechaza nombre vacio.

Estas pruebas son rapidas (milisegundos) y se ejecutan en cada commit sin ralentizar el desarrollo.

### 6.3 Pruebas de Integracion

Prueban endpoints completos de la API, verificando la interaccion entre el controlador, el servicio y el modelo. Validan que los contratos se cumplan tal como estan documentados.

Ejemplos para este proyecto:

- Enviar `POST /api/orders` con items validos y verificar que la respuesta tenga `turnNumber` y `estimatedTime`.
- Enviar `PATCH /api/orders/:id/status` con estado invalido y verificar que retorne 400.
- Enviar `POST /api/inventory` sin nombre y verificar que retorne 400 con el mensaje correcto.

### 6.4 Pruebas End-to-End

Simulan el flujo completo de un usuario desde el frontend hasta la base de datos. Se reservan para los flujos criticos: realizar un pedido completo, cambiar el estado en el panel de cocina, registrar un nuevo insumo desde el ERP.

Son las mas lentas y fragiles, por lo que se ejecutan solo antes de desplegar a produccion, no en cada commit.

### 6.5 Pipeline de CI/CD

El pipeline se ejecuta automaticamente en cada commit al repositorio:

```
Commit -> Push a GitHub
   |
   v
GitHub Actions detecta el cambio
   |
   v
Instalar dependencias (npm install)
   |
   v
Analisis estatico de codigo (ESLint)
   |
   v
Pruebas unitarias
   |
   v
Pruebas de integracion
   |
   v
Verificar cobertura >= 80%
   |
   +-- Fallo -> Notificar al equipo, bloquear merge
   |
   v
Build del proyecto
   |
   v
Deploy automatico (si todo paso)
```

El pipeline es una cadena de pasos automáticos que se disparan cada vez que alguien sube código a GitHub. El objetivo es simple: que ningún código roto llegue a producción sin que nadie se dé cuenta.

Commit → Push es el punto de partida. El desarrollador sube su cambio y eso activa todo lo demás automáticamente.

GitHub Actions es el motor. Hay un archivo de configuración en el repositorio que le dice a GitHub qué hacer cada vez que llega un push. Crea un servidor temporal y ejecuta los pasos en orden.

Instalar dependencias ese servidor parte desde cero, así que primero necesita hacer npm install antes de poder ejecutar cualquier cosa.

ESLint revisa el código sin ejecutarlo, buscando errores de sintaxis, variables sin usar o violaciones a las reglas del equipo. Si encuentra algo, el pipeline para aquí.

Pruebas unitarias ejecuta los tests de services.test.js. Si alguno falla, el pipeline para y notifica al equipo.

Pruebas de integración hace lo mismo pero con los endpoints completos de la API, verificando que controlador, servicio y modelo funcionen juntos.

Cobertura >= 80% mide qué porcentaje del código fue ejecutado durante las pruebas. Si está por debajo del umbral, el pipeline falla aunque todas las pruebas hayan pasado.

Si algo falla en cualquier paso: el pipeline se detiene, marca el commit con error en GitHub y bloquea el merge. Nadie puede fusionar código roto.

Build y Deploy solo ocurren si todo lo anterior pasó. El código se empaqueta y se sube automáticamente al servidor sin intervención manual.

La idea de fondo es que un error detectado en el pipeline tarda minutos en corregirse. El mismo error detectado en producción puede significar tiempo caído y clientes afectados.



### 6.6 Metricas de Calidad

| Metrica | Objetivo | Requisito relacionado |
|---------|----------|-----------------------|
| Cobertura de codigo | >= 80% | RNF-18 |
| Tiempo de pruebas unitarias | < 30 segundos | Feedback rapido al equipo |
| Tiempo de pruebas de integracion | < 3 minutos | Balance entre completitud y velocidad |
| Errores de linting | 0 | RNF-18 (codigo consistente) |
| Vulnerabilidades criticas | 0 | RNF-15, RNF-17 |
| Tiempo de respuesta de la API | < 2 segundos | RNF-05 |
| Uptime en produccion | >= 99% | RNF-09 |

---

## 7. Decisiones Tecnicas

### 7.1 Stack Tecnologico

**Backend Framework (por definir):**

Node.js es la opcion recomendada porque mantiene JavaScript en todo el stack, lo que reduce la curva de aprendizaje del equipo y facilita compartir logica de validaciones entre frontend y backend. Python con Flask o FastAPI es una alternativa valida si el equipo tiene mayor experiencia con ese lenguaje.

**Base de datos (por definir):**

MySQL es la opcion pensada o tambien SQL server, soporte nativo para JSON y compatibilidad con los requisitos de integridad referencial del sistema. 

**Autenticacion:**

JWT (JSON Web Tokens) es la opcion recomendada por ser stateless, lo que facilita la escalabilidad horizontal requerida en RNF-22. Cada token incluira el rol del usuario para implementar RBAC en el middleware.

### 7.2 Opciones de Despliegue

Para la etapa inicial del negocio se recomienda Railway o Render por simplicidad de configuracion y plan gratuito disponible (RNF-39).
---

## 8. Conclusion

La arquitectura documentada en esta etapa establece las bases para un backend que cumple todos los requisitos funcionales y no funcionales definidos en la Etapa 2. Cada decision de diseno responde a necesidades concretas del negocio: la separacion en capas habilita pruebas automaticas, los contratos de API permiten trabajo en paralelo, y el pipeline de CI/CD protege la calidad del sistema en cada iteracion.

---

**Autores:** Isaac Nunez, Nicolas Betancourt, Daniel Rojas
**Proyecto:** Sistema de Pedidos en Linea - Helados Biodiversos
**Fecha:** 24 Febrero 2026
