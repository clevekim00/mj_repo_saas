# mj_repo_saas

[한국어](../../README.md) · [English](../en/README.md) · [日本語](../ja/README.md) · [Español](README.md) · [简体中文](../zh-CN/README.md)

**Un panel que organiza varios repositorios de GitHub en tarjetas de proyecto.**

Agrupa los repositorios de frontend, API y documentación para entender el propósito del proyecto y su avance de despliegue.

> La implementación actual permite consultar localmente repositorios de una cuenta de GitHub y estadísticas de GitHub y GitLab.com.

## Ejecución local

Con Node.js 20 o posterior, ejecuta desde la raíz del repositorio.

```sh
node server.mjs
```

Selecciona 한국어, English, 日本語, Español o 简体中文 en la parte superior. El panel principal y Atlas comparten el idioma guardado en el navegador. Las descripciones y los textos introducidos por el usuario conservan su idioma original.

- Abre [Project Atlas](http://127.0.0.1:9090/atlas/) y selecciona **Flujo del proyecto · Detalles → Ampliar gráfico** en la tarjeta `mj_repo_saas`.
- Importa otro repositorio de GitHub y despliega sus detalles para recuperar un gráfico guardado o generarlo con Graphify CLI local. `graphify` debe estar en el PATH del servidor. Se analizan hasta 24 archivos de código compatibles de la rama predeterminada. En repositorios mayores se muestra un gráfico parcial.
- Las tarjetas importadas en Atlas y los gráficos, incluidos los datos privados, se guardan en el almacenamiento local del navegador. Los tokens permanecen solo en la página abierta. Para regenerar un gráfico privado tras volver a abrir la página, importa de nuevo el repositorio con un token que tenga **Contents: Read-only**.
- Las tarjetas de GitHub del [panel principal](http://127.0.0.1:9090/) se restauran al recargar. Sus detalles reutilizan los gráficos del mismo navegador y origen.
- Introduce un perfil como `https://github.com/owner` para consultar sus repositorios públicos. **Cargar estadísticas detalladas** obtiene commits semanales, Watch y proporciones de lenguajes.
- Para repositorios privados, introduce un [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) en **Token de GitHub (opcional)**. Concede **Metadata: Read-only** a los repositorios seleccionados y **Contents: Read-only** para commits y Graphify.
- Una URL individual de GitHub o GitLab.com público carga directamente una tarjeta detallada. Las tarjetas de GitLab.com duran mientras la página permanezca abierta.

## Funciones previstas para la primera versión

1. Crear tarjetas desde URL públicas de GitHub o GitLab.com.
2. Agrupar repositorios relacionados y editar sus roles y descripciones.
3. Desplegar los flujos de usuarios o componentes y abrir enlaces a repositorios, versiones y despliegues.
4. Distinguir GitHub Releases, etiquetas y pruebas de despliegue. Mostrar un estado sin verificar cuando falten pruebas.

Por ejemplo, una tarjeta puede reunir frontend, API y documentación, con un enlace de despliegue, GitHub release v0.3.0 y un sitio de documentación. La versión es ilustrativa.

## Documentos

- [Plan de producto](PRODUCT_PLAN.md) con usuarios, MVP, pruebas, privacidad, criterios y hoja de ruta.
- [Piloto de código Graphify](GRAPHIFY_PILOT.md) con reproducción, conexiones extraídas y limitaciones.

La actualización automática se considerará después de la validación inicial.
