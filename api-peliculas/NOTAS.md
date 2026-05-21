# NOTAS — Lab API de Películas Completa

## Pregunta 1: ¿Qué parte del proyecto te resultó más difícil y por qué?

Lo más difícil fue la migración de pg a Prisma y conseguir que los tests pasaran todos a la vez. El problema principal fue que los tests compartían la misma base de datos y se pisaban entre sí, lo que hacía que fallaran dependiendo del orden de ejecución. Resolverlo con --runInBand y un beforeEach que limpia todas las tablas fue clave.

## Pregunta 2: ¿Qué cambiarías si tuvieras que hacer este proyecto de nuevo desde cero?

Empezaría directamente con Prisma en lugar de pg, ya que facilita mucho el trabajo con las relaciones y las migraciones. También configuraría los tests desde el principio con una base de datos limpia entre cada test, en lugar de tener que refactorizarlo todo al final.

## Pregunta 3: ¿Cómo escalarías esta API si necesitase soportar 10.000 usuarios concurrentes?

Añadiría índices en PostgreSQL en los campos más consultados (ya tenemos algunos en el schema). Usaría connection pooling con PgBouncer para no saturar la base de datos. Para las consultas más repetidas como el listado de películas, añadiría una capa de caché con Redis. Y para el servidor Node, lo escalaría horizontalmente con varios procesos detrás de un load balancer como Nginx.

## Pregunta 4: ¿Qué ventaja real te ha dado TDD en este proyecto?

Los tests detectaron que el controlador de auth devolvía 500 en lugar de 409 cuando se intentaba registrar un email duplicado. Sin el test, ese bug habría pasado desapercibido hasta que alguien lo probara manualmente en producción. TDD obliga a pensar en los casos de error desde el principio, no solo en el happy path.
