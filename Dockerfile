# Etapa 1: build de la app
FROM node:22-alpine AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y lockfile (si existe) para aprovechar la cache
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la app para producción
RUN npm run build

# Etapa 2: imagen ligera para servir archivos estáticos con Nginx
FROM nginx:alpine AS production

# Eliminar configuración default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar el build generado en la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# (Opcional) Copiar config custom de Nginx si la creas
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto donde corre Nginx
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]