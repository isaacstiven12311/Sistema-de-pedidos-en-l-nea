# Etapa 2 - Requisitos del Sistema
## Sistema ERP Web - Helados Biodiversos

---

## 1. Actores del sistema

| Actor | Tipo | Descripción |
|-------|------|-------------|
| **Cliente** | Usuario externo | Persona que accede al sistema web para consultar el menú, registrar un pedido, obtener un turno y hacer seguimiento del estado de su pedido en tiempo real. |
| **Empleado** | Usuario interno | Personal del establecimiento que gestiona los pedidos desde el módulo POS: recibe pedidos en tiempo real, actualiza estados y genera facturas. |
| **Administrador** | Usuario interno | Responsable de la gestión completa del sistema: administra el menú, inventario, proveedores, usuarios, reportes y supervisa las operaciones desde el dashboard. |
| **Sistema** | Actor automatizado | Ejecuta procesos automáticos como la asignación de turnos, el cálculo del tiempo de espera, la actualización del inventario y el envío de alertas de stock bajo. |

---

## 2. Requisitos Funcionales

Los requisitos funcionales describen las funciones y comportamientos específicos que el sistema debe cumplir.

| ID | Nombre | Actor | Descripción |
|----|--------|-------|-------------|
| RF-01 | Registro de usuario | Cliente | El cliente puede crear una cuenta en el sistema proporcionando nombre, correo electrónico y contraseña. |
| RF-02 | Inicio de sesión | Cliente / Empleado / Administrador | El sistema permite iniciar sesión con correo y contraseña. Las funciones disponibles varían según el rol asignado. |
| RF-03 | Cierre de sesión | Cliente / Empleado / Administrador | El usuario puede cerrar sesión de forma segura desde cualquier módulo del sistema. |
| RF-04 | Consulta de menú | Cliente | El cliente puede visualizar el menú completo con nombre del producto, descripción, precio y tiempo estimado de preparación. |
| RF-05 | Registro de pedido | Cliente | El cliente selecciona uno o varios productos del menú y confirma su pedido desde la plataforma web. |
| RF-06 | Asignación automática de turno | Sistema | Al confirmar el pedido, el sistema asigna automáticamente un número de turno al cliente en menos de 1 segundo. |
| RF-07 | Cálculo de tiempo de espera | Sistema | El sistema calcula y muestra el tiempo estimado de espera según la carga de pedidos activos y los tiempos de preparación de cada producto. |
| RF-08 | Consulta de estado del pedido | Cliente | El cliente puede consultar en tiempo real el estado de su pedido: en cola, en preparación, listo o entregado. |
| RF-09 | Pantalla pública de turnos | Cliente / Empleado | El sistema muestra una pantalla pública con el turno actualmente en atención y los turnos próximos en espera. |
| RF-10 | Recepción de pedidos en POS | Empleado | El empleado recibe y visualiza en tiempo real todos los pedidos registrados por los clientes a través del módulo POS. |
| RF-11 | Actualización de estado del pedido | Empleado | El empleado puede cambiar el estado de un pedido (en preparación, listo, entregado) desde el POS. |
| RF-12 | Modo offline del POS | Empleado | El POS puede operar en modo básico sin conexión a internet para no detener la atención al cliente ante fallos de red. |
| RF-13 | Gestión del menú | Administrador | El administrador puede crear, editar y eliminar productos y categorías del menú. |
| RF-14 | Gestión de inventario | Administrador | El administrador puede registrar materias primas, actualizar cantidades y definir niveles mínimos de stock. El sistema descuenta automáticamente el inventario al completar un pedido. |
| RF-15 | Alerta de stock bajo | Sistema | El sistema notifica automáticamente al administrador cuando el stock de una materia prima cae por debajo del nivel mínimo definido. |
| RF-16 | Gestión de proveedores | Administrador | El administrador puede registrar, editar y consultar proveedores (comunidades indígenas y campesinas), incluyendo nombre, región, comunidad y productos suministrados. |
| RF-17 | Gestión de usuarios y roles | Administrador | El administrador puede crear, editar y desactivar usuarios, asignando roles de cliente, empleado o administrador. |
| RF-18 | Generación de facturas | Empleado / Administrador | El sistema genera automáticamente una factura o recibo al completar cada venta. |
| RF-19 | Generación de reportes | Administrador | El administrador puede generar reportes de ventas, inventario y proveedores, con opción de exportación. |
| RF-20 | Dashboard administrativo | Administrador | El sistema presenta un panel de control con indicadores clave: ventas del día, pedidos activos, productos más vendidos y alertas de inventario. |

---

## 3. Requisitos No Funcionales

Los requisitos no funcionales describen los atributos de calidad que el sistema debe cumplir, más allá de sus funciones específicas.

### 3.1 Usabilidad
**Prioridad: Alta**

| ID | Requisito |
|----|-----------|
| RNF-01 | El flujo para realizar un pedido no debe requerir más de 3 clics desde la pantalla principal. |
| RNF-02 | La interfaz debe ser responsive y adaptarse correctamente a móviles, tablets y computadores de escritorio. |
| RNF-03 | Un empleado nuevo debe poder aprender a usar el sistema con una capacitación máxima de 2 horas. |
| RNF-04 | La interfaz debe cumplir con los estándares de accesibilidad WCAG 2.1 nivel AA. |

**Justificación:** La facilidad de uso determina la adopción del sistema tanto por clientes como por empleados, impactando directamente en la experiencia de servicio.

---

### 3.2 Rendimiento
**Prioridad: Alta**

| ID | Requisito |
|----|-----------|
| RNF-05 | El tiempo de respuesta para operaciones comunes (consultar menú, registrar pedido) debe ser menor a 2 segundos. |
| RNF-06 | El sistema debe soportar al menos 50 usuarios concurrentes sin degradación del servicio. |
| RNF-07 | La asignación del turno al confirmar un pedido debe completarse en menos de 1 segundo. |
| RNF-08 | El tiempo estimado de espera debe actualizarse en tiempo real según la carga de pedidos activos. |

**Justificación:** Los tiempos de espera son el problema central que el sistema busca resolver. Un sistema lento generaría el mismo problema que se intenta solucionar.

---

### 3.3 Disponibilidad
**Prioridad: Alta**

| ID | Requisito |
|----|-----------|
| RNF-09 | El sistema debe garantizar un uptime del 99% durante el horario comercial del establecimiento. |
| RNF-10 | En caso de fallo, el tiempo máximo de recuperación del sistema no debe superar los 30 minutos. |
| RNF-11 | El módulo POS debe poder operar en modo offline básico para no detener las ventas ante cortes de conectividad. |
| RNF-12 | El sistema debe realizar copias de seguridad automáticas de los datos al menos cada 24 horas. |

**Justificación:** La indisponibilidad del sistema significaría la imposibilidad de atender clientes, generando pérdidas económicas directas y deterioro de la reputación del negocio.

---

### 3.4 Seguridad
**Prioridad: Media**

| ID | Requisito |
|----|-----------|
| RNF-13 | Las contraseñas deben cumplir políticas de complejidad: mínimo 8 caracteres, combinando mayúsculas, minúsculas y números. |
| RNF-14 | El sistema debe implementar control de acceso basado en roles (RBAC), restringiendo las funciones disponibles según el rol de cada usuario. |
| RNF-15 | La información sensible (datos de clientes, información financiera) debe almacenarse encriptada. |
| RNF-16 | El sistema debe registrar un log de auditoría de todas las operaciones críticas, incluyendo fecha, hora y usuario responsable. |
| RNF-17 | El sistema debe cumplir con la Ley 1581 de 2012 de Protección de Datos Personales de Colombia. |

**Justificación:** El sistema maneja información financiera y personal de clientes que debe protegerse. El cumplimiento de la ley colombiana de protección de datos es obligatorio.

---

### 3.5 Mantenibilidad
**Prioridad: Media**

| ID | Requisito |
|----|-----------|
| RNF-18 | El código debe seguir estándares de codificación y buenas prácticas de desarrollo limpio. |
| RNF-19 | El sistema debe contar con documentación técnica completa, incluyendo guías de instalación y documentación de APIs. |
| RNF-20 | La arquitectura debe ser modular, facilitando la incorporación de nuevas funcionalidades sin reescribir el sistema completo. |
| RNF-21 | El proyecto debe usar control de versiones con Git, con mensajes de commit descriptivos y ramas organizadas. |

**Justificación:** El sistema debe poder evolucionar según las necesidades del negocio sin requerir una reescritura completa.

---

### 3.6 Escalabilidad
**Prioridad: Media**

| ID | Requisito |
|----|-----------|
| RNF-22 | La arquitectura debe permitir agregar recursos de forma horizontal a medida que aumente la demanda. |
| RNF-23 | El diseño debe permitir la incorporación de nuevos módulos o funcionalidades en el futuro. |
| RNF-24 | El sistema debe estar diseñado para poder replicarse en nuevos puntos de venta o sedes adicionales. |
| RNF-25 | La base de datos debe poder crecer en volumen de datos sin pérdida significativa de rendimiento. |

**Justificación:** El modelo de negocio contempla la expansión a nuevas sedes, por lo que el sistema debe soportar este crecimiento desde su diseño inicial.

---

### 3.7 Compatibilidad
**Prioridad: Baja**

| ID | Requisito |
|----|-----------|
| RNF-26 | El sistema debe funcionar correctamente en los navegadores Chrome, Firefox, Safari y Edge en sus versiones actuales. |
| RNF-27 | Debe ser compatible con los sistemas operativos Windows, macOS, Linux, Android e iOS. |
| RNF-28 | El sistema debe exponer APIs documentadas que permitan integraciones futuras con otros servicios. |
| RNF-29 | El desarrollo debe basarse en estándares web: HTML5, CSS3 y JavaScript estándar. |

**Justificación:** Los clientes usan diversos dispositivos y navegadores, por lo que el sistema debe ser universalmente accesible desde el navegador.

---

### 3.8 Identidad Visual
**Prioridad: Alta**

| ID | Requisito |
|----|-----------|
| RNF-30 | El sistema debe usar la paleta de colores corporativa: verde esmeralda (#50C878), naranja mandarina (#FF8C42) y azul turquesa (#40E0D0). |
| RNF-31 | La tipografía del sistema debe ser Poppins para títulos y Open Sans para el cuerpo del texto. |
| RNF-32 | El diseño visual debe reflejar los valores del negocio: biodiversidad, sostenibilidad, naturaleza y comercio justo. |
| RNF-33 | El diseño debe ser limpio y "aireado", con uso generoso de espacios en blanco que transmitan frescura. |

**Justificación:** La identidad visual es fundamental para diferenciar el negocio y comunicar sus valores. Los colores tienen fundamento psicológico y cultural alineado con la propuesta de valor de Helados Biodiversos.

---

### 3.9 Portabilidad y Eficiencia de Recursos
**Prioridad: Baja**

| ID | Requisito |
|----|-----------|
| RNF-34 | El sistema web debe funcionar en cualquier plataforma que disponga de un navegador web moderno. |
| RNF-35 | Los parámetros de configuración del sistema deben ser ajustables sin necesidad de modificar el código fuente. |
| RNF-36 | Las consultas a la base de datos deben estar optimizadas con índices apropiados. |
| RNF-37 | El sistema debe implementar caché para reducir consultas repetitivas y mejorar los tiempos de respuesta. |
| RNF-38 | Las imágenes y recursos estáticos deben estar comprimidos para reducir los tiempos de carga. |
| RNF-39 | El sistema debe poder operar en planes de hosting básicos durante la etapa inicial del negocio. |

**Justificación:** Reduce la dependencia tecnológica y facilita migraciones futuras. Un negocio en crecimiento necesita controlar sus costos operativos de infraestructura.

---

## Resumen de Prioridades

| Prioridad | Atributos |
|-----------|-----------|
| **Alta** | Usabilidad, Rendimiento, Disponibilidad, Identidad Visual |
| **Media** | Seguridad, Escalabilidad, Mantenibilidad |
| **Baja** | Compatibilidad, Portabilidad, Eficiencia de Recursos |
