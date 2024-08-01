### HTML Template (`login.component.html`)

- **Formulario y Validación de Campos:**
  - Se define un formulario `loginForm` con dos campos: `username` y `password`.
  - Cada campo tiene validaciones como `required`, `minlength` y `maxlength`.
  - Se utilizan clases condicionales (`ngClass`) para aplicar estilos basados en el estado de validación de cada campo (`is-valid` y `is-invalid`).
  - Se muestran mensajes de error personalizados según las validaciones (`required`, `minlength`, `maxlength`) cuando el campo respectivo está tocado (`touched`).

- **Control de Intentos y Estado de Carga:**
  - Se muestra un componente de `app-submit-timeout` si el inicio de sesión está deshabilitado (`disabledLogin` es verdadero).
  - Se muestra un componente de `app-loading` mientras se está cargando (`loading` es verdadero).

- **Botones:**
  - Un botón para enviar el formulario de inicio de sesión (`LOGIN`), que está deshabilitado si el formulario es inválido o el inicio de sesión está deshabilitado.
  - Un botón para redirigir al usuario a la página de registro (`REGISTER`).

### TypeScript Component (`login.component.ts`)

- **Inicialización y Destrucción:**
  - En `ngOnInit`, se inicializa el formulario y se carga el número de intentos almacenado en el almacenamiento local.
  - En `ngOnDestroy`, se asegura de desuscribirse de cualquier suscripción activa para evitar fugas de memoria.

- **Manejo del Formulario:**
  - `initLoginForm()` inicializa `loginForm` con campos `username` y `password`, aplicando validadores de longitud y requeridos.
  - Métodos para cargar, guardar y limpiar el número de intentos desde/hacia el almacenamiento local.

- **Funcionalidad de Inicio de Sesión (`login()`):**
  - Verifica si el inicio de sesión está deshabilitado o si ya se está cargando.
  - Si el número de intentos supera el límite (`maxAttempts`), deshabilita el inicio de sesión durante un minuto.
  - Llama al servicio de autenticación (`AuthService.login`) con las credenciales del formulario.
  - Maneja la respuesta exitosa redirigiendo al usuario a otra página (`/cv`).
  - Maneja errores incrementando el contador de intentos, guardando el contador en el almacenamiento local y mostrando un mensaje de error si la contraseña es incorrecta (`401 Unauthorized`).

### Análisis General

- **Seguridad:** El código maneja la lógica de intentos de inicio de sesión y evita ataques de fuerza bruta al bloquear el inicio de sesión después de varios intentos fallidos.
- **Usabilidad:** Proporciona retroalimentación visual instantánea con estilos CSS dinámicos basados en la validación de formularios.
- **Escalabilidad:** Utiliza servicios (`AuthService`) para la lógica de negocio, lo que permite la modularidad y reutilización del código.
- **Mantenimiento:** Utiliza técnicas como limpiar el almacenamiento local y desuscribirse de observables para evitar problemas de rendimiento y memoria.
