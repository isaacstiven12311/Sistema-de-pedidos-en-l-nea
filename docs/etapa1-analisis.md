etapa1-analisis.md

# Etapa 1 - Análisis del Sistema
## Sistema ERP Web - Helados Biodiversos

---

## 1. El problema que se quiere resolver

La heladería **Helados Biodiversos** enfrenta un problema operativo crítico: los clientes deben hacer largas filas físicas para realizar sus pedidos, lo que genera tiempos de espera prolongados, insatisfacción en la experiencia de compra y pérdida de clientes potenciales.

Adicionalmente, el negocio no cuenta con un sistema centralizado para gestionar sus operaciones internas. La administración del inventario, el registro de ventas, el control de proveedores y la generación de reportes se realizan de forma manual, lo que provoca errores, pérdida de información y baja eficiencia operativa.

El sistema busca resolver estos dos problemas principales:

- **Para el cliente:** Eliminar la necesidad de hacer fila física mediante un sistema de pedidos en línea con asignación automática de turnos y notificación del tiempo estimado de espera.
- **Para el negocio:** Centralizar la gestión de ventas, inventario, proveedores y reportes en un ERP tipo POS integrado al sistema web de pedidos.

---

## 2. Usuarios del sistema

El sistema tiene tres tipos de usuarios, cada uno con un rol y responsabilidades diferenciadas:

### Cliente
Persona que visita la página web del establecimiento para consultar el menú, registrar su pedido y hacer seguimiento del estado del mismo sin necesidad de asistir físicamente al local. Puede ser un usuario registrado o un visitante.

### Empleado
Personal del establecimiento que atiende los pedidos a través del módulo POS (Point of Sale). Recibe los pedidos en tiempo real, actualiza su estado (en preparación, listo, entregado) y gestiona la atención al cliente desde el sistema.

### Administrador
Responsable de la gestión completa del negocio. Administra el menú, controla el inventario de materias primas, registra y gestiona los proveedores (comunidades indígenas y campesinas), crea usuarios con sus respectivos roles, genera reportes financieros y supervisa el funcionamiento general del sistema desde un dashboard administrativo.

---

## 3. Entrada, proceso y salida del sistema

### Entradas

| Origen | Dato de entrada |
|--------|----------------|
| Cliente | Registro de cuenta (nombre, correo, contraseña) |
| Cliente | Selección de productos del menú |
| Cliente | Confirmación del pedido |
| Empleado | Actualización del estado del pedido |
| Administrador | Productos del menú (nombre, descripción, precio, tiempo de preparación) |
| Administrador | Datos de inventario (materia prima, cantidad, unidad, mínimo) |
| Administrador | Datos de proveedores (nombre, región, comunidad, productos suministrados) |
| Administrador | Creación y asignación de usuarios y roles |

### Procesos

| Proceso | Descripción |
|---------|-------------|
| Autenticación | Verificación de credenciales y asignación de permisos según el rol del usuario |
| Registro de pedido | El sistema recibe los productos seleccionados, los registra y confirma el pedido |
| Asignación de turno | El sistema asigna automáticamente un número de turno al cliente en menos de 1 segundo |
| Cálculo de tiempo de espera | El sistema calcula el tiempo estimado según la carga de pedidos activos y los tiempos de preparación |
| Gestión de estado | El empleado actualiza el estado del pedido (en cola, en preparación, listo, entregado) |
| Control de inventario | El sistema descuenta automáticamente del inventario los ingredientes usados por pedido |
| Generación de factura | El sistema genera un recibo o factura al completar cada venta |
| Generación de reportes | El administrador solicita reportes de ventas, inventario y desempeño del negocio |

### Salidas

| Destino | Dato de salida |
|---------|---------------|
| Cliente | Número de turno asignado y tiempo estimado de espera |
| Cliente | Estado actualizado del pedido en tiempo real |
| Cliente | Pantalla pública con turno actual en atención |
| Empleado | Lista de pedidos pendientes en tiempo real |
| Administrador | Dashboard con ventas diarias, pedidos activos y alertas de inventario |
| Administrador | Reportes de ventas, inventario y proveedores |
| Sistema | Factura o recibo por cada venta completada |
| Sistema | Alertas automáticas cuando el stock de una materia prima esté por debajo del mínimo |

---

## 4. Alcance del sistema

### Lo que el sistema SÍ incluye

- Registro e inicio de sesión de usuarios con roles diferenciados (cliente, empleado, administrador).
- Portal web de pedidos para clientes con visualización del menú, selección de productos y confirmación de pedido.
- Asignación automática de turno y cálculo de tiempo estimado de espera en tiempo real.
- Pantalla pública de turnos visible para clientes y empleados.
- Módulo POS para empleados: recepción de pedidos en tiempo real y gestión de estados.
- Módulo de administración del menú: crear, editar y eliminar productos y categorías.
- Módulo de inventario: registro y control de materias primas con alertas de stock mínimo.
- Módulo de proveedores: registro de comunidades proveedoras con nombre, región y productos suministrados, garantizando trazabilidad de origen.
- Generación de facturas o recibos por venta.
- Generación de reportes financieros y operativos.
- Dashboard administrativo con indicadores clave del negocio.
- Operación básica del POS en modo offline para no detener las ventas ante fallos de conexión.
- Diseño responsive adaptable a móviles, tablets y computadores.
- Identidad visual acorde a los valores del negocio: biodiversidad, sostenibilidad y comercio justo.

### Lo que el sistema NO incluye (fuera del alcance en esta versión)

- Pagos en línea o integración con pasarelas de pago (se contempla para una versión futura).
- Aplicación móvil nativa (el sistema es web responsive, no una app descargable).
- Integración con plataformas de domicilios o delivery externo.
- Sistema de fidelización de puntos o recompensas para clientes.
- Integración automática con sistemas contables externos.
- Soporte para múltiples sedes en esta primera versión (se contempla como escalabilidad futura).
