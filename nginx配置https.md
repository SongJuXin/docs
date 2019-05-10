#### nginx配置https

### 准备工作
- 现有nginx配置（主要是listen6661那段):
```
#user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

 server {
        listen       6661;
        server_name  localhost;
        root         /Users/songjuxin/Desktop/WebstormProjects/realai/realai-financial/dist;
        index index.html;
        try_files $uri $uri/ /index.html;

        access_log  logs/test.access.log  main;

        location / {
            root   /Users/songjuxin/Desktop/WebstormProjects/realai/realai-financial/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        error_page  404              /404.html;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

    include servers/*;
}
```

---

#### 下面开始
### 1. `openssl genrsa `生成私钥。

- 介绍genrsa语法

> openssl genrsa [-out filename] [-passout arg] [-des] [-des3] [-idea] [-f4] [-3] [-rand file(s)] [-engine id] [numbits]

> 常用选项：
-out FILENAME：将生成的私钥保存至指定的文件中；
[-des] [-des3] [-idea]：指定加密算法；
numbits：指明生成的私钥大小，默认是512

- 命令行切到任意目录，我这里是在`/usr/local/etc/nginx/ssl`

- 生成私钥`openssl genrsa -des3 -out server.key 1024`，输入自定义的密码，下面会用到。之后会在当前目录下生成一个叫server.key的私钥

### 2. `openssl rsa`去除秘钥的口令（密码）

- 介绍rsa语法
>openssl rsa [-inform PEM|NET|DER] [-outform PEM|NET|DER] [-in filename] [-passin arg] [-out filename] [-passout arg] [-sgckey] [-des] [-des3] [-idea] [-text] [-noout] [-modulus] [-check] [-pubin] [-pubout] [-engine id]

>常用选项为：
-in FILENAME：指明私钥文件的存放路径；
-out FILENAME：指明将公钥的保存路径；
-pubout：根据提供的私钥，从中提取出公钥；

- 根据私钥提取公钥`openssl rsa  -in server.key -out server.key`。输入第一步种的密码。便去掉了文件秘钥server.key。

### 3.根据公钥创建服务器证书的申请文件 server.csr

- 执行命令`openssl req -new -key server.key -out server.csr`会生成证书申请文件server.csr
```
Enter pass phrase for root.key: ← 输入前面创建的密码 
Country Name (2 letter code) [AU]:CN ← 国家代号，中国输入CN 
State or Province Name (full name) [Some-State]:BeiJing ← 省的全名，拼音 
Locality Name (eg, city) []:BeiJing ← 市的全名，拼音 
Organization Name (eg, company) [Internet Widgits Pty Ltd]:MyCompany Corp. ← 公司英文名 
Organizational Unit Name (eg, section) []: ← 可以不输入 
Common Name (eg, YOUR name) []: ← 此时不输入 
Email Address []:admin@mycompany.com ← 电子邮箱，可随意填
Please enter the following ‘extra’ attributes 
to be sent with your certificate request 
A challenge password []: ← 可以不输入 
An optional company name []: ← 可以不输入
```

### 4.生成证书server.crt
- 执行命令`openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`

- 参数如下
```
-new：表示生成一个新的证书签署请求；
-x509：专用于生成CA自签证书；
-key：指定生成证书用到的私钥文件；
-out FILNAME：指定生成的证书的保存路径；
-days：指定证书的有效期限，单位为day，默认是365天；
```

### 5.配置nginx

listen6661这一段改成如下

```
server {
        #增加ssl
        listen       6661 ssl;
        server_name  localhost;
        root         /Users/songjuxin/Desktop/WebstormProjects/realai/realai-financial/dist;
        index index.html;
        try_files $uri $uri/ /index.html;

#证书(公钥.发送到客户端的)
        ssl_certificate ssl/server.crt;
#私钥,
        ssl_certificate_key ssl/server.key;

        access_log  logs/test.access.log  main;

        location / {
            root   /Users/songjuxin/Desktop/WebstormProjects/realai/realai-financial/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
	#当网站只允许https访问时，用http访问时nginx会报出497错误码
	#出现497时，跳转到对应的https页面
	error_page 497 https://$server_name:$server_port$request_uri;
        error_page  404              /404.html;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
```

### 6.重启nginx
- 执行`nginx -t`验证是否有语法错误。有错误则修改错误。
- 执行`nginx -s reload`重启nginx