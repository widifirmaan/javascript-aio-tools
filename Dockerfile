FROM php:8.2-apache

# Install dependencies ringan
# - abiword: Alternatif ringan untuk konversi dokumen
# - libmagickwand-dev & imagick: Untuk manipulasi gambar dasar di PHP
RUN apt-get update && apt-get install -y \
    libmagickwand-dev \
    abiword \
    --no-install-recommends \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy files
COPY . /var/www/html/

# Permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
