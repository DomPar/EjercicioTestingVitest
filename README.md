# Documentación de Tests - Ejercicios Vitest

## Proyecto de Testing con Vitest

## Índice

1. [Counter.test.jsx - Tests del Componente Contador](#counter-tests)
2. [DataValidator.test.jsx - Tests de Validación de Descuentos](#datavalidator-tests)
3. [UserPosts.test.js - Tests con Mocking de API](#userposts-tests)

---

## Counter Tests

En este archivo probé un componente React que funciona como un contador con límites. El componente puede incrementar y decrementar valores, pero tiene restricciones: no puede bajar de 0 ni superar un máximo (por defecto 10).

### Tests realizados

#### Test 1: Estado inicial

Lo primero que comprobé fue que cuando el componente se carga, empiece en 0. Esto es básico pero importante porque muchos componentes fallan desde el principio si no se inicializan bien. Simplemente renderizas el componente y verificas que el número mostrado sea 0.

#### Test 2: Incrementar básicamente

Aquí probé que el botón de incrementar funcione correctamente. Empecé en 0, hice clic una vez en el botón y verifiqué que cambiara a 1. Es el comportamiento más básico del contador pero hay que asegurarse de que funciona.

#### Test 3: Límite mínimo

Este test fue interesante porque tuve que comprobar varias cosas a la vez. Cuando el contador está en 0 (el mínimo), debería mostrar un mensaje de advertencia en azul, tener el botón de decrementar deshabilitado y no dejar que el número baje de 0 aunque hagas clic. Intenté hacer clic en decrementar y verifiqué que el contador siguiera en 0, que apareciera la advertencia y que el botón estuviera deshabilitado.

#### Test 4: Decrementar básicamente

Para poder probar el decremento, tuve que empezar el contador en un valor mayor que 0. Usé el valor inicial de 5 para poder decrementar sin problema. Luego hice clic en decrementar y verifiqué que bajara a 4. Si hubiera empezado en 0 no podría probar esta funcionalidad porque ya estaría en el límite.

#### Test 5: Límite máximo

Aquí hice lo contrario al test 3. Empecé el contador directamente en el valor máximo que es 10 y comprobé que apareciera un mensaje de advertencia en rojo, que el botón de incrementar estuviera deshabilitado y que no dejara subir más allá del máximo. Intenté incrementar y verifiqué que siguiera en 10.

#### Test 6: Llegar al máximo incrementando

Este test simula el comportamiento real de un usuario que va incrementando hasta llegar al límite. Para hacerlo más rápido configuré el máximo en 2 en vez de 10. Empecé en 0 y fui haciendo clic en incrementar dos veces hasta llegar al límite. Luego verifiqué que el contador mostrara 2, que se deshabilitara el botón y que apareciera la advertencia de máximo.

#### Test 7: Llegar al mínimo decrementando

Similar al test anterior pero al revés. Empecé en 2 y fui decrementando dos veces hasta llegar a 0. Después verifiqué que el contador mostrara 0, que se deshabilitara el botón de decrementar y que apareciera la advertencia de mínimo.

#### Test 8: Botón de reset

El último test comprueba que el botón de reset funcione correctamente. Empecé en 5, incrementé un par de veces llegando a 7 y luego presioné reset. El contador debería volver al valor inicial que era 5, no a 0. Esto es importante porque el reset debe restaurar el valor inicial que se le pasó al componente, no un valor hardcodeado.

### Patrón AAA aplicado

En todos los tests seguí el patrón AAA que nos enseñaron:

**Arrange:** Preparé todo lo necesario como renderizar el componente y buscar los botones que necesitaba usando getByTestId.

**Act:** Hice la acción que quería probar, normalmente hacer clic en algún botón usando fireEvent.click.

**Assert:** Verifiqué que el resultado fuera el esperado usando expect, comprobando textos, estados de botones o si aparecían advertencias.

---

## DataValidator Tests

Este archivo prueba una función que calcula descuentos en precios. La función se llama calculateDiscount y recibe dos parámetros: el precio original y el porcentaje de descuento. Tiene validaciones para evitar que se pasen valores incorrectos y devuelve el precio final con el descuento aplicado, redondeado a dos decimales.

### Tests realizados

#### Test 1: Descuento nominal del 20%

Este era el test de ejemplo que ya estaba hecho. Comprueba el caso más básico: un precio de 100 con un 20% de descuento debería dar 80. Es un cálculo simple para verificar que la función hace correctamente la operación matemática.

#### Test 2: Descuento del 0%

Aquí probé un caso borde. Si aplicas un 0% de descuento el precio debería quedarse igual. Usé un precio de 50 con descuento 0 y verifiqué que el resultado siguiera siendo 50. Es importante probar esto porque hay que asegurarse de que la función no rompa con valores extremos.

#### Test 3: Descuento del 100%

Otro caso borde pero en el otro extremo. Si aplicas un 100% de descuento el producto debería ser gratis, o sea 0. Usé un precio de 200 con descuento 100 y verifiqué que devolviera 0. Este tipo de tests son importantes porque los usuarios a veces meten valores límite.

#### Test 4: Precio inválido

Aquí empecé a probar las validaciones de la función. Hice dos tests para este caso: uno con precio 0 y otro con precio negativo. En ambos casos la función debe lanzar un error con el mensaje "Parámetros de entrada inválidos". 

Para testear errores tuve que usar una sintaxis especial. No puedes poner directamente la función en el expect porque se ejecutaría antes de poder capturar el error. Tienes que envolverla en una función arrow así: `expect(() => calculateDiscount(0, 10)).toThrow()`. Esto fue algo que me costó entender al principio.

#### Test 5: Precisión decimal

Este test verifica que la función redondee correctamente a dos decimales. Usé un precio de 99.99 con un 15% de descuento. El cálculo real da 84.9915 pero la función debe redondearlo a 84.99. Es importante porque en aplicaciones reales de comercio no puedes tener más de dos decimales en precios.

#### Test 6: Todos los casos de error

Aquí probé todas las validaciones que puede lanzar la función. Ya había probado precio 0 y negativo, así que me faltaban dos casos más: descuento negativo y descuento mayor a 100. Para ambos casos la función debe lanzar el mismo error de parámetros inválidos.

Hice un test para descuento negativo (como -10) y otro para descuento mayor a 100 (como 150). Ambos deben lanzar error porque no tiene sentido aplicar esos descuentos. Usé la misma técnica del expect con función arrow y toThrow.

### Casos que cubrí

Con estos tests cubrí todos los casos posibles: funcionamiento normal, casos borde (0% y 100%), precisión de cálculos y todas las validaciones de error. Es importante probar tanto que la función funcione bien como que falle correctamente cuando le pasas datos incorrectos.

---

## UserPosts Tests

Este fue el archivo más complicado porque tuve que aprender sobre mocking. La función fetchUserPosts hace una llamada a una API real de internet para obtener posts de usuarios, pero en los tests no queremos hacer llamadas reales porque serían lentas, podrían fallar si no hay internet y gastaríamos datos innecesariamente.

### Concepto de Mocking

El mocking consiste en simular funciones para que devuelvan lo que tú quieras sin ejecutar su código real. En este caso usé vi.spyOn para espiar la función fetch que es la que hace las llamadas HTTP. Le dije que en vez de ir a internet devolviera datos falsos que yo preparé.

La estructura básica que usé en todos los tests fue similar: crear datos falsos (mockPosts), crear una respuesta falsa (mockResponse) que imita lo que devolvería la API real con propiedades como ok, status y el método json(), y luego usar vi.spyOn para que fetch devuelva esa respuesta falsa.

### Tests realizados

#### Test inicial: Respuesta con 2 posts

Este era el test de ejemplo. Simula que la API devuelve 2 posts para el usuario 4. Preparé un array con dos objetos de posts falsos, creé la respuesta simulada y usé el spy para que fetch devolviera eso. Luego llamé a la función y verifiqué dos cosas: que fetch fuera llamado con la URL correcta (esto es importante para saber que la función construye bien la URL) y que el resultado tuviera count 2 con el mensaje esperado.

#### Test 1: Llamada exitosa con 3 posts

Aquí probé un caso similar al inicial pero con 3 posts. La idea es verificar que la función maneja correctamente cualquier cantidad de datos que devuelva la API. Preparé 3 posts falsos, simulé una respuesta exitosa (ok: true, status: 200) y verifiqué que la función devolviera count 3 con el mensaje correcto de "Se encontraron 3 posts".

#### Test 2: Verificación de URL

Este test no se enfoca tanto en el resultado sino en verificar que fetch sea llamado con los argumentos correctos. Usé el usuario con id 5 y después de llamar a la función comprobé que fetch fuera llamado exactamente con la URL "https://jsonplaceholder.typicode.com/posts?userId=5". Esto es importante porque si la función construye mal la URL la API no va a devolver los datos correctos.

#### Test 3: Simular error de red

Aquí probé qué pasa cuando el servidor tiene problemas. Simulé una respuesta con ok: false y status: 500 que es un error típico del servidor. La función debe lanzar un error con el mensaje "Fallo en la conexión: 500".

Para testear esto usé una sintaxis diferente a los errores del DataValidator. Como fetchUserPosts es una función async que devuelve una promesa, tuve que usar `await expect(...).rejects.toThrow()` en vez del `expect(() => ...).toThrow()` normal. Al principio me confundí con esto pero es porque las funciones async manejan los errores de forma diferente.

#### Test 4: Lista vacía

El último test simula que la API devuelve un array vacío. Esto puede pasar si buscas un usuario que no tiene posts. La función debe manejar este caso correctamente devolviendo count 0 y un mensaje específico que dice "Usuario X no tiene posts".

Simulé una respuesta exitosa (ok: true, status: 200) pero con un array vacío como datos. Usé el usuario 99 para hacer más realista el escenario de un usuario sin posts y verifiqué que devolviera el mensaje correcto con el id del usuario incluido.

### Limpieza de mocks

Algo importante que aprendí es que después de cada test hay que limpiar los mocks con vi.restoreAllMocks(). Lo puse en un it.afterEach() para que se ejecute automáticamente después de cada test. Esto es crucial porque si no lo haces un test puede afectar al siguiente y los tests no serían independientes entre sí.

### Dificultades que tuve

Lo más difícil de este archivo fue entender bien la estructura de la respuesta simulada. Tenía que imitar exactamente lo que devuelve fetch real: un objeto con ok, status y un método json() que debe ser async y devolver los datos. Al principio me olvidaba de poner async en el método json() y los tests fallaban.

También me costó entender la diferencia entre toThrow() normal y .rejects.toThrow() para funciones async. Una vez que lo entendí todo fue más fácil.

---

## Conclusiones generales

Hacer estos tests me ayudó a entender mejor cómo funciona el testing unitario. Lo más importante que aprendí fue el patrón AAA que hace que los tests sean más organizados y fáciles de leer. También aprendí que es fundamental probar no solo que las cosas funcionen bien sino también que fallen correctamente cuando les pasas datos incorrectos.

El mocking fue el concepto más difícil pero también el más útil porque te permite probar código que depende de cosas externas como APIs sin tener que hacer llamadas reales. En un proyecto real esto ahorra mucho tiempo y hace que los tests sean más confiables.