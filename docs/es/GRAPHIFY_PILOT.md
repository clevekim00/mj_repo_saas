# Piloto de estructura de código con Graphify

[한국어](../GRAPHIFY_PILOT.md) · [English](../en/GRAPHIFY_PILOT.md) · [日本語](../ja/GRAPHIFY_PILOT.md) · [Español](GRAPHIFY_PILOT.md) · [简体中文](../zh-CN/GRAPHIFY_PILOT.md)

El piloto analiza `public/app.js` y `server.mjs` del commit público [`365ab5b`](https://github.com/clevekim00/mj_repo_saas/commit/365ab5bef0fbe41c57785892b44ab5f9601bf52c). La entrada es esta instantánea pública de dos archivos. Consulta la instalación en la [documentación de Graphify](https://github.com/Graphify-Labs/graphify). Se verificó con la versión instalada `0.8.43` de la CLI.

Ejecuta desde la raíz del repositorio.

```sh
sh scripts/graphify-pilot.sh
```

El script crea `graph.json`, `graph.html` y `GRAPH_REPORT.md` en un directorio temporal e imprime su ruta. Utiliza el análisis local de `graphify update`. La configuración de la aplicación/Codex, los hooks de Git y el gráfico global quedan fuera de los cambios de este piloto. Su `graph.html` es una visualización independiente. Las vistas Graphify integradas en el panel se implementan por separado.

## Resultados de verificación

Los dos archivos produjeron 21 nodos y 25 conexiones, todas marcadas como `EXTRACTED`. Las llamadas `upsertCard()` → `createCard()` y `createCard()` → `projectFields()`/`commitChart()` coincidieron con el código. La extracción incluyó `server.mjs`, pero omitió las rutas API y ramas de caché dentro de `createApp()`, así como la conexión HTTP entre navegador y servidor.

La inspección del código establece este flujo de consulta.

1. [`public/app.js`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/public/app.js) lleva la entrada del usuario a `fetchRepository()` → `GET /api/repository`.
2. [`server.mjs`](https://github.com/clevekim00/mj_repo_saas/blob/365ab5bef0fbe41c57785892b44ab5f9601bf52c/server.mjs) valida la URL y reutiliza caché/solicitudes en curso o consulta GitHub/GitLab para repositorios públicos individuales. Perfiles y solicitudes autenticadas usan rutas distintas.
3. `public/app.js` transforma la respuesta mediante `upsertCard()` → `createCard()` para mostrar la tarjeta.

El gráfico sirve para explorar el código. Modelar el flujo completo requiere añadir límites HTTP y flujos internos del servidor con respaldo en las fuentes. El comportamiento en ejecución, el despliegue real y las versiones publicadas necesitan pruebas adicionales.
