# 跨域
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy

## 源
## 同源策略

## 跨源网络访问
- 跨域写操作
- 跨域资源嵌入
- 跨域读操作

## 跨域
一个web应用向不同于（协议，域名，端口三者之中任意不一样）'该资源'本身所在源的资源发起的请求，称为跨域请求。

通常，上面的'该资源'指一个html页面，如'http://127.0.0.1:3002/4.html',在该页面发起了一个'http://127.0.0.1.3003/two'这个请求，则这个请求称为跨域请求。

出于安全原因，浏览器**限制从js脚本**内发起的跨域请求。 例如，XMLHttpRequest和Fetch API都遵循同源策略，受跨域限制。也就是说标签形式的跨域请求会正常请求，如html的'<img src="" />',类似的，js里面常用的'var img=new Image();img.src=""'也不受跨域限制。
## 简单请求

## 预检请求（prefight）

## 响应设置
### 响应头
  - Access-Control-Allow-Origin
  - Access-Control-Allow-Methods
  - Access-Control-Allow-Headers
  - Access-Control-Allow-Credentials
  如果了解http协议的haul，请求头，响应头里面都是键值对格式的字符串。

## 请求设置

### 请求头

### 其他设置

## 简单请求跨域

## 非简单请求跨域

## 携带cookie跨域

## 资源（图片）跨域
 

