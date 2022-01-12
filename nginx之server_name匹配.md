## 前言
本来想了解`server_name`匹配机制，经过资料查阅，关键问题在`listen`指令。
## listen
`server`块通常包含一个`listen`指令用来指定一个ip地址和一个端口。
```text
server {
    listen 127.0.0.1:8080;
    # Additional server configuration
}
server {
    listen 8080;
    # Additional server configuration
}
server {
    listen 127.0.0.1;
    # Additional server configuration
}
```

## server_name
服务器名通过`server_name`指令来定义，当多个`listen`指令都可以匹配到，通过`server_name`来和请求的`Host`头进行匹配。

`server_name`通常有三种形式：确切的名字，通配符，正则。`server_name`可以指定多个，以空格分隔。

说明一点，不指定`server_name`，nginx会认为是`""`空字符。
```text
server {
    listen       80;
    server_name  example.org  www.example.org "";
    ...
}

server {
    listen       80;
    server_name  *.example.org;
    ...
}

server {
    listen       80;
    server_name  mail.*;
    ...
}

server {
    listen       80;
    server_name  ~^(?<user>.+)\.example\.net$;
    ...
}
```

## default_server
`listen`指令还有一个`default_server`参数。
```text
server {
    listen 80 default_server;
    #...
}
```
当多个`listen`的ip:port都匹配到了，`server_name`都匹配不到，nginx会匹配进带有`default_server`的server。

如果没有指定`default_server`，nginx会把第一个监听到的server作为default_server。

如何确定第一个server呢？经过试验，我认为分两种情况：1.同一个配置文件 2.不同配置文件。

同一个配置文件，按从上到下的顺序进行查找，找到第一个
```text
server {#匹配这个server
    listen 80;
    server_name a;
    #...
}
server {
    listen 80;
    server_name b;
    #...
}
```

不同配置文件，按配置文件名首字母大小字符编码大小进行查找，找到第一个
```text
#b.conf
server {
    listen 80;
    server_name a;
    #...
}

#a.conf
server {#匹配这个server，文件名是a.conf
    listen 80;
    server_name a;
    #...
}
```
---
## 参考
1.http://nginx.org/en/docs/http/request_processing.html
2.http://nginx.org/en/docs/http/server_names.html
3.https://docs.nginx.com/nginx/admin-guide/web-server/web-server/
