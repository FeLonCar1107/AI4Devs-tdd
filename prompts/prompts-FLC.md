### Felipe:

Eres un desarrollador experto en pruebas unitarias y buenas prácticas de desarrollo en **Node.js**. Necesito que generes una suite de tests unitarios utilizando **Jest** con **Typescript** para una funcionalidad que se encarga de insertar candidatos en una base de datos, quiero que analices.

### Especificaciones:

1. La funcionalidad está implementada en una función llamada `addCandidate(data: Candidate): Promise<Candidate>`.
2. Revisa y analiza cada paso de la función `addCandidate` y dame una suite de opciones para tests que pueda cubra todos los casos posibles.
3. Los tests deben cubrir:
   - Validación de datos (campos faltantes, valores incorrectos).
   - Inserción exitosa.
   - Error al insertar un duplicado.
   - Error de base de datos inesperado.

Teniendo esto en cuenta, quiero que me entregues el listado de tests que consideres necesarios para cubrir todos los casos posibles.
No escribas código aún, solo necesito que me des una lista de los tests que consideres necesarios según el contexto del proyecto, empezaremos
a crear código de test cuando yo te lo indique. Si necesitas alguna información adicional, dímelo antes de darme una respuesta.

### Github Copilot:

Claro, aquí tienes una lista de tests que considero necesarios para cubrir todos los casos posibles de la función `addCandidate`:

### Lista de Tests:

1. **Validación de Datos:**
    - Debería lanzar un error si falta el campo `firstName`.
    - Debería lanzar un error si falta el campo `lastName`.
    - Debería lanzar un error si falta el campo `email`.
    - Debería lanzar un error si el campo `email` tiene un formato incorrecto.
    - Debería lanzar un error si el campo `phone` tiene un formato incorrecto.
    - Debería lanzar un error si el campo `address` excede la longitud permitida.
    - Debería lanzar un error si el campo `education` tiene una institución con longitud incorrecta.
    - Debería lanzar un error si el campo `education` tiene un título con longitud incorrecta.
    - Debería lanzar un error si el campo `education` tiene una fecha de inicio con formato incorrecto.
    - Debería lanzar un error si el campo `education` tiene una fecha de fin con formato incorrecto.
    - Debería lanzar un error si el campo `workExperience` tiene una compañía con longitud incorrecta.
    - Debería lanzar un error si el campo `workExperience` tiene una posición con longitud incorrecta.
    - Debería lanzar un error si el campo `workExperience` tiene una descripción con longitud incorrecta.
    - Debería lanzar un error si el campo `workExperience` tiene una fecha de inicio con formato incorrecto.
    - Debería lanzar un error si el campo `workExperience` tiene una fecha de fin con formato incorrecto.
    - Debería lanzar un error si el campo `cv` tiene datos incorrectos.

2. **Inserción Exitosa:**
    - Debería insertar un candidato exitosamente con todos los campos válidos.
    - Debería insertar un candidato exitosamente sin campos opcionales (`phone`, `address`, `education`, `workExperience`, `cv`).

3. **Error al Insertar un Duplicado:**
    - Debería lanzar un error si el email ya existe en la base de datos.

4. **Error de Base de Datos Inesperado:**
    - Debería lanzar un error si ocurre un error inesperado en la base de datos durante la inserción.

Si necesitas más detalles o alguna información adicional, házmelo saber.

---

Vamos a empezar a crear el código para los tests de **Validación de datos**, recuerda que estamos utilizando **Jest** con **Typescript**. Empezaremos con cada test uno por uno.

## Requisitos para el código:
1. Los tests deben ser claros y bien estructurados.
2. Usa mocks para simular la base de datos y evitar dependencias externas.
3. Añade comentarios explicativos en el código para facilitar la comprensión.
4. Utiliza data mocks para los tests que tienen interacción con la base de datos.

## Salida esperada:
1. Test implementado para el caso mencionado.
2. Buenas prácticas en el uso de describe, it y beforeEach.
3. Por favor, incluye todo el código necesario en el formato estándar de Jest.

