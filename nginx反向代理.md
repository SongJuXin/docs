1.反向代理

```
     server {
                    listen       3001 ;
                    access_log  /usr/local/etc/nginx/logs/3000.access.log  main;

                    location /proxy {
                       rewrite ^/proxy/(.*)$ /$1 break;
                       proxy_pass http://127.0.0.1:8899;
                    }

                    error_page  404              /404.html;
                    error_page   500 502 503 504  /50x.html;
                    location = /50x.html {
                        root   html;
                    }

                }
```

```
     server {
                    listen       3001 ;
                    access_log  /usr/local/etc/nginx/logs/3000.access.log  main;

                    location /proxy/ {
                       proxy_pass http://127.0.0.1:8899/;
                    }

                    error_page  404              /404.html;
                    error_page   500 502 503 504  /50x.html;
                    location = /50x.html {
                        root   html;
                    }

                }
```
