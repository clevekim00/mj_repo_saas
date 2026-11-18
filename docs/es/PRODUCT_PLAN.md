# Plan de producto de mj_repo_saas

[한국어](../PRODUCT_PLAN.md) · [English](../en/PRODUCT_PLAN.md) · [日本語](../ja/PRODUCT_PLAN.md) · [Español](PRODUCT_PLAN.md) · [简体中文](../zh-CN/PRODUCT_PLAN.md)

Borrador · 2026-11-14

## Hipótesis del producto

Desarrolladores independientes y equipos pequeños pueden separar frontend, API, aplicaciones y documentación en distintos repositorios. Antes de revisar incidencias o commits quieren entender **qué hace el proyecto, qué repositorio abrir y qué se puede usar hoy**.

La diferencia inicial consiste en agrupar repositorios en **proyectos definidos por el usuario** y mostrar las pruebas de despliegue de cada componente juntas. Un proyecto también puede tener un único repositorio. GitHub Projects se ocupa del seguimiento de tareas y DeepWiki de explicar repositorios individuales.

## Usuarios y pantalla inicial

- Desarrolladores con varios proyectos personales y equipos pequeños con múltiples repositorios.
- Resumen de tarjeta con icono, nombre, objetivo en una línea, descripción breve, estado y prueba de lanzamiento representativa o estado de verificación.
- Detalles con roles, alojamiento, lenguajes, Star/Watch/Fork, commits semanales del último año, última versión estable, fuentes, hora de comprobación y flujo de usuarios o componentes. Mostrar campos opcionales cuando haya datos verificados. Permitir desplegar detalles y consultar semanas con teclado.
- Buscar por nombre, descripción o repositorio, filtrar por estado y abrir repositorios, versiones y despliegues.

## Flujo del MVP

1. Pegar URL públicas de GitHub o GitLab.com sin iniciar sesión y eliminar duplicados. Explicar repositorios privados, eliminados o fallos temporales hasta donde permitan las pruebas.
2. Crear borradores con metadatos públicos y README. Si falta README, usar nombre y descripción verificados y permitir editar campos vacíos.
3. Unir o dividir tarjetas, asignar roles web/API/documentación y editar objetivo, descripción, icono y flujo. Ejemplo de flujo inicial, usuario → web → API.
4. Guardar y reabrir en el navegador. El alcance garantizado del MVP se limita al mismo navegador.
5. Actualizar datos a petición del usuario conservando sus ediciones. Ante errores mostrar el último valor verificado y la hora del fallo.

## Reglas de datos y presentación

| Información | Regla |
|---|---|
| Objetivo, descripción y flujo | Prioridad a la entrada del usuario, seguida del README o descripción. Cualquier resumen futuro de IA será un borrador editable. |
| Estado de desarrollo | El usuario elige planificación, desarrollo, pruebas, producción o pausa. La frecuencia de commits no determina el estado. |
| Plataforma y lenguajes | Mostrar alojamiento por repositorio. Calcular porcentajes de GitHub con bytes por lenguaje. Si solo se conoce el principal, mostrar su nombre. [API de lenguajes](https://docs.github.com/en/rest/repos/repos#list-repository-languages) |
| Star, Watch y Fork | Usar `stargazers_count`, `subscribers_count` y `forks_count`. Mostrar los ceros y omitir campos ausentes. El antiguo `watchers_count` representa estrellas. [API de Watch](https://docs.github.com/en/rest/activity/watching) |
| Actividad de commits | Barras semanales del último año en la rama predeterminada de GitHub, excluyendo merges. Mostrar inicio de semana, cantidad y fuente. Reintentar tras `202`. Omitir el gráfico nuevo ante `204` o datos sin consultar. Conservar valores previos y hora si falla la actualización. [API de estadísticas](https://docs.github.com/en/rest/metrics/statistics#get-the-last-year-of-commit-activity) |
| Última versión estable | Usar versiones estables públicas de GitHub Releases. Identificar prelanzamientos por separado. Una etiqueta aislada es prueba insuficiente de lanzamiento. |
| Pruebas de despliegue | Enlaces de despliegue, tienda, descarga o documentación aportados por el usuario y clasificados por tipo. Registrar una URL no verifica funcionamiento ni despliegue. |
| Publicación y versión | Por componente. La documentación pública por sí sola no demuestra que la aplicación esté publicada. Consulta correcta sin pruebas indica publicación sin verificar. Un fallo indica error de consulta. |

Modelo mínimo con proyectos, repositorios y alojamiento/URL, relaciones proyecto–repositorio con rol/orden, pasos del flujo y pruebas de versión/despliegue con fuente y hora. Lenguajes, métricas y actividad son datos opcionales por repositorio con procedencia. Separar las ediciones de los datos recopilados.

## Otros servicios

| Servicio | Datos y condiciones |
|---|---|
| GitLab.com | La API de proyectos ofrece Star/Fork y porcentajes de lenguajes. Agregar commits de la rama predeterminada dentro del período. Omitir Watch público porque falta en la respuesta. [Proyectos](https://docs.gitlab.com/api/projects/) · [Commits](https://docs.gitlab.com/api/commits/) |
| Bitbucket Cloud | Dispone de `language` y commits. Consultar Watch/Fork en listas paginadas independientes según el acceso disponible. Considerar omitir porcentajes y Star. [Repositorios](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-repositories/) · [Commits](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-commits/) |
| Codeberg | Basado en Forgejo, con Watch/Star/Fork y actividad. Verificar acceso anónimo y respuestas de lenguajes/commits de la instancia antes de integrarlo. [Guía](https://docs.codeberg.org/getting-started/first-repository/) · [API de Forgejo](https://forgejo.org/docs/latest/user/api/usage/) |

Admitir repositorios públicos de GitHub y GitLab.com. GitLab agrega fechas de commits en 52 semanas, incluida la actual, comenzando en domingo UTC y excluyendo merges. Omitir el gráfico si no se puede recuperar todo el período.

## Implementación y seguridad

- Reutilizar tarjetas, búsqueda y detalles estáticos. Separar consultas públicas y valores actualizados. Usar la [API REST de GitHub](https://docs.github.com/en/rest) para Releases, README y metadatos.
- Aceptar URL de GitHub/GitLab.com, analizar rutas y consultar los endpoints fijos correspondientes. Tratar README como entrada no confiable y eliminar HTML ejecutable al mostrarlo.
- Aplicar caché y límites a solicitudes externas, indicando cuándo se alcanzan. Evitar exponer tokens del servidor al navegador.
- Empezar con funciones utilizables sin IA. Si se incorpora, tratar README como datos para resumir e ignorar instrucciones incrustadas. Enviar contenido privado a IA externa requiere consentimiento adicional.
- En la futura integración privada, solicitar permisos mínimos de lectura sobre repositorios elegidos mediante una [GitHub App](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party). Bloquear por defecto la publicación de tarjetas privadas y definir suspensión de sincronización y borrado al desconectar.

## Criterios iniciales

- Añadir tres URL públicas, agrupar dos y consultar objetivo, roles, última versión y fuentes **en tres minutos**.
- Evitar afirmaciones incorrectas con versiones estables, prelanzamientos, etiquetas aisladas, README ausente o límites alcanzados.
- Distinguir Watch cero de Watch no disponible. Las estadísticas pendientes o fallidas no deben aparecer como cero commits. Cada repositorio agrupado conserva sus lenguajes y métricas verificados.
- Conservar ediciones después de recargar y actualizar datos.
- Pedir a cinco usuarios iniciales que creen proyectos. Tres completando una tarjeta sin ayuda y dos volviendo o actualizando en siete días sirven para orientar el producto. Evitar generalizar este experimento pequeño.

## Secuencia e hipótesis de negocio

1. Importación pública, edición, agrupación y pruebas de lanzamiento.
2. Observar a los primeros usuarios. Priorizar generación de portafolios si predomina compartir, o gestión si predominan visitas repetidas y actualización.
3. Validar repositorios privados y actualización automática como opciones de pago tras comprobar uso recurrente. Precio pendiente.

Quedan fuera de la primera versión Bitbucket/Codeberg, análisis de todo el código mediante IA, permisos de equipo, despliegue automático, pagos y alojamiento de portafolios públicos.
