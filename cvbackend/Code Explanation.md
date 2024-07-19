# Explicación del Código

    Verificación de Campos Obligatorios: if (!username || !password) asegura que ambos username y password se proporcionen en la solicitud. Si alguno falta, se devuelve un mensaje de error con estado 400.

    Verificación de Existencia de Usuario: const existingUser = users.find(u => u.username === username); verifica si ya hay un usuario con el mismo nombre de usuario. Si existe, se devuelve un mensaje de error con estado 409 (conflicto).

    Hash de Contraseña y Almacenamiento: Si pasa las verificaciones, la contraseña se hashea y se almacena junto con el nombre de usuario en el array users.

    Respuesta Exitosa: Finalmente, se devuelve un estado 201 (creado) indicando que el usuario se registró correctamente.


## USO DE SALT

El "salt" (sal) es un término utilizado en el contexto de la encriptación de contraseñas, específicamente en el hashing de contraseñas utilizando funciones como bcrypt. El propósito del salt es añadir aleatoriedad y unicidad a cada contraseña que se hashea, mejorando significativamente la seguridad del sistema.

### Función del Salt

1. **Unicidad**: Al agregar un salt aleatorio a cada contraseña antes de aplicar el hashing, incluso si dos usuarios tienen la misma contraseña, sus hashes resultantes serán diferentes debido al salt único. Esto evita que un atacante pueda determinar fácilmente mediante tablas de hash (rainbow tables) si dos usuarios comparten la misma contraseña.

2. **Resistencia a Ataques de Fuerza Bruta**: Los ataques de fuerza bruta intentan adivinar contraseñas probando muchas combinaciones posibles. Si no hay salt, un atacante puede precomputar hashes para muchas contraseñas comunes y compararlos directamente con los hashes almacenados en la base de datos. Con salt, este enfoque es mucho menos efectivo porque cada contraseña tendría que ser atacada individualmente, lo que aumenta considerablemente el costo computacional y el tiempo necesario para el ataque.

### Cómo se Usa el Salt:

- **Generación**: Cuando se crea una nueva contraseña (por ejemplo, durante el registro de un usuario), se genera un salt aleatorio. Este salt se concatena con la contraseña antes de aplicar la función de hashing.

- **Almacenamiento**: Tanto el salt como el hash resultante se almacenan en la base de datos. El salt no necesita ser secreto, por lo que generalmente se almacena junto con el hash.

- **Verificación**: Cuando un usuario intenta iniciar sesión, se recupera el salt y se concatena con la contraseña proporcionada por el usuario. Luego, se aplica la función de hashing y se compara el resultado con el hash almacenado en la base de datos. Si coinciden, la contraseña es válida.

### Beneficios del Salt:

- **Mayor Seguridad**: Reduce la probabilidad de que los hashes de contraseñas sean vulnerables a ataques de fuerza bruta y tablas de hash precalculadas.
  
- **Compatibilidad con Contraseñas Comunes**: Incluso si múltiples usuarios tienen contraseñas comunes, sus hashes son diferentes debido a los salts únicos, lo que mejora la seguridad global del sistema.

En resumen, el salt es una práctica estándar en la seguridad de contraseñas que ayuda a proteger contra varios tipos de ataques y aumenta la robustez del sistema de autenticación.

