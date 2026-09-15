# Cómo actualizar las fotos del sitio (Ventanas y Aluminios)

Todo se hace sin servidor: el panel administrador vive en tu propio equipo y
"sublica" generando un ZIP que luego se envía al repositorio de GitHub que
alimenta el sitio en vivo.

---

## 1. Abrir el panel

1. Copia toda la carpeta del sitio a tu computador (o usa la que ya tienes
   dentro del repositorio).
2. Sirve la carpeta con un servidor local sencillo. Desde una terminal
   dentro de la carpeta del sitio:

   ```
   python -m http.server 8123
   ```

3. Abre en el navegador:
   `http://localhost:8123/admin.html`

   (Para detener el servidor: presiona Control + C en esa terminal.)

4. Escribe la contraseña: **`adminSAS`**.

> Para tu respaldo, el panel funciona del mismo modo cuando está publicado:
> `https://tu-usuario.github.io/ventanas-y-aluminios/admin.html`.

---

## 2. Cambiar la contraseña (recomendado al empezar)

1. En el panel pulsa **Cambiar contraseña**.
2. Escribe la nueva clave y confírmala.
3. Se descarga el archivo **`admin/seguridad.js`** actualizado.
4. Reemplaza con él el archivo `admin/seguridad.js` que está en la carpeta
   `admin` del sitio y súbelo con el siguiente "cómo publicar".

---

## 3. Editar imágenes

- El panel se organiza por secciones del sitio: **Inicio, Catálogo,
  ¿Quiénes somos?, Contacto**.
- **Para cambiar una foto**: pulsa el botón **Elegir archivo…** de esa imagen
  o arrastra un archivo (JPG, PNG o WEBP, máximo 3 MB).
- La imagen se ajusta sola: recorte centrado a la proporción correcta de cada
  espacio y optimización automática (WebP o JPG).
- **Galerías del catálogo**: puedes subir **todas las imágenes que quieras**
  por subcategoría. Añádelas con el botón **Elegir archivos…** (elige varias a
  la vez) o arrastrándolas, y **arrastra las miniaturas para reordenarlas**.
  El sitio las muestra en una cuadrícula (4 por fila en computador) y los
  visitantes pueden ampliar cada foto con un clic. Pulsa la X roja en una
  miniatura para quitarla.
- **Deshacer / Rehacer**: tienes botones y atajos (Ctrl+Z / Ctrl+Y).
- Los cambios no se pierden si cierras el navegador: pulsa
  **Guardar borrador** y el panel te ofrecerá recuperarlo al volver.

---

## 4. Publicar (paso clave)

1. En el panel pulsa **Publicar**. Se descarga **`publicar-ventanas-aluminios.zip`**.
2. Descomprímelo **dentro de la carpeta del sitio**, aceptando reemplazar
   `contenido.json` y los archivos de `img/`.
3. Sube los cambios a GitHub. Desde una terminal en la carpeta del sitio:

   ```
   git add .            →  (o en GitHub Desktop: pulsa "Commit to main" y "Push origin")
   git commit -m "Actualización de imágenes"
   git push
   ```

4. En pocos minutos el sitio en vivo mostrará las fotos nuevas.

> El ZIP trae un **PUBLICAR-LEEME.txt** con estas mismas instrucciones.
> Los archivos antiguos de `img/` que ya no se usen los puedes borrar con calma.

---

## 5. Volver a sincronizar el panel con lo publicado

Si alguna vez compras el sitio a otro equipo o lo bajas de nuevo desde
GitHub, el panel puede quedarse "atrasado". Para sincronizarlo:

1. Descarga/descomprime el repositorio en una carpeta.
2. Sírvela con el servidor local (paso 1) y abre `admin.html`.
3. Con la sesión iniciada, pulsa **Importar carpeta**.
4. Elige la carpeta completa del sitio y pulsa importar.
5. El panel quedará igual a lo publicado y podrás seguir editando desde ahí.

---

## Notas

- Todo el trabajo es **local**: tus fotos en edición no se suben a ninguna
  parte hasta que tú las publicas con el ZIP.
- Cambia solo imágenes; los textos y datos del sitio no se editan desde el
  panel (se ajustan directamente en `contenido.json`).