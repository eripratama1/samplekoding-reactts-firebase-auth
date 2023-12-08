## pattern 1
<IfModule mod_headers.c>
 Options +Indexes
 RewriteEngine On
 RewriteBase /
 RewriteRule ^index\.html$ - [L]
 RewriteCond %{REQUEST_URI} !^/dist/
 RewriteRule . /index.html [L]
</IfModule>