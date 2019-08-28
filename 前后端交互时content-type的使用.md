##前后端交互时content-type的使用

### 重要程序/包版本
chrome 74.0.3729.169  
node v10.15.3  
express 4.17.0

### MIME type与content-type
`MIME type`（Multipurpose Internet Mail Extensions or MIME type）又叫`媒体类型`或者`MIME`类型，是一种标准，用来表示文档、文件或字节流的性质和格式。

**浏览器中使用MIME类型（不是后缀名）来确定如何处理URL。浏览器以及服务器通过`content-type`来告之对方，传输的数据或文件类型，即MIME type是什么。**

MIME的通用结构:`tyupe/subtype`,由`类型`与`子类型`以及中间的`/`组成，不允许有空格。type表示可以被分多个子类的独立类别，subtype表示细分后的每个类型。

类型分两个大类：独立（discrete）类型和混合（Multipart）类型。

独立类型包括:application、audio、example、font、image、model、text、video。

混合类型包括:message、multipart。


### 前端不同调用方式之间的差异(原生XMLHttpRequest，jq的ajax，fetch)
交互时常用的请求有


### 后端(node)对不同content-type的接收


---
参考:

mime type:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

完


