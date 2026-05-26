# UNIAJC-RIDE

Prototipo web responsive de movilidad compartida para estudiantes verificados de la Institución Universitaria Antonio José Camacho.

## Publicar en GitHub Pages

1. Sube `index.html`, `styles.css`, `app.config.js` y `app.js` al repositorio.
2. En GitHub entra a `Settings > Pages`.
3. Selecciona la rama `main` y la carpeta `/root`.
4. Guarda y abre la URL generada por GitHub Pages.

## Enviar código real al correo

Ahora mismo `app.config.js` está en modo pruebas:

```js
window.UNIAJC_RIDE_AUTH_MODE = "dev";
```

En este modo el botón `Ingresar` entra directo y no consume correos de EmailJS.

Cuando quieras volver a OTP real, cambia:

```js
window.UNIAJC_RIDE_AUTH_MODE = "otp";
```

La app está conectada para usar EmailJS desde GitHub Pages.

1. Crea una cuenta en https://www.emailjs.com/.
2. En `Email Services`, conecta Gmail, Outlook u otro correo.
3. En `Email Templates`, crea una plantilla con:
   - `To Email`: `{{to_email}}`
   - `Subject`: `Código de verificación UNIAJC-RIDE`
   - Mensaje: `Tu código es {{verification_code}}. Expira en {{expires_in}}.`
4. Copia tus datos de EmailJS en `app.config.js`:

```js
window.UNIAJC_RIDE_EMAIL = {
  provider: "emailjs",
  publicKey: "TU_PUBLIC_KEY",
  serviceId: "TU_SERVICE_ID",
  templateId: "TU_TEMPLATE_ID",
};
```

Cuando el usuario presiona `Enviar código`, llega un correo real con el OTP. La app permite entrar solo si el código escrito coincide y no ha expirado.
