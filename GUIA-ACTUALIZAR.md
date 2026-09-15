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

4. Escribe la contraseña del panel (la que configuró el dueño). Si la
   olvidaste, cámbiala con el proceso del punto 2 desde este mismo navegador.

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

## 4. Publicar (en línea, sin archivos en tu equipo)

1. **Una sola vez**: en el panel pulsa **Conectar para publicar en línea**.
   Sigue los pasos que se muestran para crear un *token* de GitHub
   (permiso **Contents: Read and write** sobre este repositorio) y pégalo.
2. Desde entonces, pulsa **Publicar** y las fotos suben **directo al sitio**:
   no se guarda ningún archivo en tu equipo ni se descarga ningún ZIP.
3. En 1–2 minutos el sitio en vivo muestra las fotos nuevas.

> El token queda guardado solo en el navegador que uses para el panel. Como
> cualquiera con la consola del navegador podría leerlo, úsalo solo en tu equipo.
> Si lo revocas o lo borras, el panel te avisará al publicar y ya no bajará ZIP.

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
  parte hasta que tú las publicas. Con la conexión activada, **Publicar**
  sube directo a GitHub sin guardar archivos en tu equipo.
- Cambia solo imágenes; los textos y datos del sitio no se editan desde el
  panel (se ajustan directamente en `contenido.json`).