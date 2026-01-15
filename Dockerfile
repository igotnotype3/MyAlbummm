#FROM ubuntu:latest
#LABEL authors="Dimitrije"
#
#ENTRYPOINT ["top", "-b"]
#FROM node:20
#WORKDIR /app
#COPY . .
#CMD ["node", "/indexx.js"]
#
#
FROM ubuntu:22.04

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install Apache
RUN apt-get update && \
    apt-get install -y apache2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy website files to Apache web root
COPY src/ /var/www/html/

# Expose Apache port
EXPOSE 80

# Run Apache in foreground (required for Docker)
CMD ["apachectl", "-D", "FOREGROUND"]