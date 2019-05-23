## npm私服搭建,采用verdaccio
### Verdaccio可以用来干什么

- 可以放私有的包
- 可以缓存官方npm包
- 连接多个npm源
- 覆盖公共包

---
### verdaccio的安装和使用


#### 1. 安装node环境
node的安装不多说，我当前node版本是v10.15.3

#### 2. 安装verdaccio
全局安装verdaccio：
```
npm install -g verdaccio --unsafe-perm
```
加unsafe-perm是防止报grywarn权限的错，如`gyp ERR!`形式的。

如果在安装verdaccio时，报了`errno -13`字样的错误，是因为没有权限，macos系统在前面加sudo，再执行命令，之后输入密码就可以了。


#### 3. 配置运行verdaccio
先运行verdaccio，即执行命令`verdaccio`，此时可以通过http://localhost:4873访问了。

如要通过局域网访问，需要找到配置文件`~/.config/verdaccio/config.yaml`，只有运行过verdaccio，才会生成此文件。编辑`config.yaml`,在最后一行加上
```
listen: 0.0.0.0:4873
```
重启verdaccio.便可以通过局域网ip：http://192.168.0.132:4873访问了（这里192.168.0.132:4873是我本机所在局域网地址）

#### 4. 切换npm源为私服地址
```
npm config set registry http://192.168.0.132:4873
```
验证是否配置切换成功`npm config get registry`

重置npm源`npm config delete registry`

理论上，切换源之后，执行`npm i xx`,会先从切换之后的源上安装xx这个包，如果找不到，会自动从npm官方源上安装。但是之前公司搭的npm私服，有些包会安装失败，可能是因为网络限制的原因吧。

#### 5. 关于npm的使用

<big>如果没有切为私服源：</big>

1.创建并登陆用户
```
npm adduser --registry http://192.168.0.132:4873
```
之后输入Username,Password,Email，创建并登陆成功

注意:`npm adduser --registry http://192.168.0.132:4873`与`npm publish --registry http://localhost:4873`不同。

2.发布包
```
npm publish --registry http://192.168.0.132:4873
```
这样就可以发布了一个包至私服npm了。

3.安装一个包
```
 npm i npm-package-test-songsong --registry http://192.168.0.132:4873
```
npm-package-test-songsong是我上一步在私服上发布的包

<big>如果切了私服地址为npm源：</big> 

1.创建并登陆用户
```
npm adduser
```
2.发布包
```
npm publish
```
3.安装一个包
```
npm i npm-package-test-songsong
```
#### 6. 保持verdaccio后台运行
采用pm2的方案

1.全局安装pm2
```
npm i -g pm2
``` 
2.用pm2启动

切到verdaccio的安装目录，并启动
```
cd /usr/local/lib/node_modules/verdaccio/bin
pm2 start ./verdaccio
```
看verdaccio是否启动成功

```
pm2 list verdaccio
```
如果列表中status是绿色的online，则代表启动成功。

另外，不清楚启全局的verdaccio`pm2 start verdaccio`会启动失败


以上
---
