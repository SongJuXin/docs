### 前面
阅读前提，需要对base64编码，ASCII码有一定的了解
### atob
对base64编码的字符串进行解码，即
```
atob('aGVsbG8=')//hello
```
### btoa
将字符串转为base64编码的ASCII字符串，*需要注意，传入的字符串必须是ASCII表内的128个字符串，如`$`(美元符),可以用八进制`'\044''`或十六进制`'\0x24''`*，例
```
btoa('hello')//aGVsbG8=
btoa('\150\145\154\154\157')//aGVsbG8=
btoa('\x68\x65\x6c\x6c\x6f')//aGVsbG8=
```
### atob与btoa为什么这么命名
这个问题困扰了我很久，为什么不命名成更加直观的名字，比如base64Decode和base64Encode这种的呢,atob,btoa真的很让人难以理解。经过多方查证，有了如下的信息

1.追溯到最早的unix系统，有btoa(https://www.unix.com/man-page/minix/1/btoa/)命令：
```
BTOA(1) 						      General Commands Manual							   BTOA(1)

NAME

       btoa - binary to ascii conversion

SYNOPSIS

       btoa [-adhor] [infile] [outfile]

OPTIONS

       -a     Decode, rather than encode, the file

       -d     Extracts repair file from diagnosis file

       -h     Help menu is displayed giving the options

       -o     The obsolete algorithm is used for backward compatibility

       -r     Repair a damaged file

EXAMPLES

       btoa <a.out >a.btoa # Convert a.out to ASCII

       btoa -a <a.btoa >a.out
			   # Reverse the above

DESCRIPTION

       Btoa is a filter that converts a binary file to ascii for transmission over a telephone line.  If two file names are provided, the first in
       used for input and the second for output.  If only one is provided, it is used as the input file.  The program is  a  functionally  similar
       alternative to uue/uud, but the encoding is completely different.  Since both of these are widely used, both have been provided with MINIX.
       The file is expanded about 25 percent in the process.

SEE ALSO

       uue(1), uud(1).
```
我没用过unix的这个btoa，我猜想它仅能将二进制转为ASCII码（存疑）。

2.因为已经有了unix的btoa，JavaScript的作者Brendan Eich便沿用了unix的btoa命令(https://twitter.com/BrendanEich/status/998618208725684224)，虽然名称相同，但功能不太相同:
js的btoa输入支持多种形式的字符串，转换成base64的编码.atob

以上原因，导致我对btoa，atob的命名产生了一些疑惑。

完


