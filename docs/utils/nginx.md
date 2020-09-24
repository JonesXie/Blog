# Nginx 基础配置

> Nginx 下载：[http://nginx.org/en/download.html](http://nginx.org/en/download.html)

## 常用配置

> 启动

```nginx
方法一：
//进入nginx目录
cd /usr/local/nginx/sbin
//执行启动命令
./nginx

方法二:
/usr/local/nginx/sbin/nginx
```

> 配置 SPA+SSL+Gzip

```nginx
user  root;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  mall.1qishun.com;
        rewrite ^/(.*)$ "https://mall.1qishun.com/$1" permanent;
    }

    # HTTPS server
    server {
        listen       443 ssl;
        server_name  mall.1qishun.com;

       	ssl_certificate      ssl/mallpc/3182454_mall.1qishun.com.pem;
	    ssl_certificate_key  ssl/mallpc/3182454_mall.1qishun.com.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        gzip on;
        gzip_static on;
        gzip_comp_level 6;
        gzip_buffers 4 16k;
        gzip_min_length 1k;
        gzip_types text/plain application/x-javascript text/css application/xml text/javascript;
        gzip_disable "MSIE [1-6]\.";

        location / {
            root   /www/mallpc/;
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
    }
}
```

> 配置请求代理

- `include`添加`proxy.conf`文件

```nginx
// nginx.conf
http {
    include       mime.types;
    include       proxy.conf;
    default_type  application/octet-stream;
    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  mall.1qishun.com;
        location / {
            root   /www/mallpc/;
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
    }
}

// proxy.conf
server {
    listen       80;
    server_name  open.1qishun.com;
    location / {
        return 301 https://$server_name$request_uri;
    }
}
server {
    listen       443 ssl;
    server_name  open.1qishun.com;
    ssl_certificate      ssl/open/3176740_open.1qishun.com.pem;
    ssl_certificate_key  ssl/open/3176740_open.1qishun.com.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;
    location / {
        proxy_pass http://47.93.99.888:8848;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-NginX-Proxy true;
        proxy_redirect off;
    }
}

server {
    listen       80;
    listen       443 ssl;
    server_name  appapi.1qishun.com;
    ssl_certificate      ssl/appapi/2998339_appapi.1qishun.com.pem;
    ssl_certificate_key  ssl/appapi/2998339_appapi.1qishun.com.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;
    location / {
        proxy_pass http://47.93.99.888:8805;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-NginX-Proxy true;
        proxy_redirect off;
    }
}
```

## 安装 nginx

### 在 Linux 中安装

#### 1、安装环境

> 在安装 nginx 前首先要确认系统中安装：`gcc`、`pcre-devel`、`zlib-devel`、`openssl-devel`  
> 1、`gcc` 可以通过光盘直接选择安装  
> 2、`pcre-devel` 为了使 nginx 支持 HTTP Rewrite 模块  
> 3、`zlib-devel`、`openssl-devel` 可以通过光盘直接选择安装，https 时使用

```nginx
//一键安装上面四个依赖
yum -y install gcc pcre-devel zlib zlib-devel openssl openssl-devel
```

#### 2、下载并解压压缩包

> 可以通过图形工具将下载的包放入安装目录中

```nginx
//进入安装目录
cd /usr/local
//下载tar包，并解压
wget http://nginx.org/download/nginx-1.18.0.tar.gz
tar -xvf nginx-1.18.0.tar.gz
```

#### 3、安装 nginx

1、进入解压后的 nginx 目录

```nginx
cd /usr/local/nginx-1.18.0
```

2、执行 config 命令

> 1、`--with-http_ssl_module` 添加 `https` 支持  
> 2、`--with-http_gzip_static_module` 添加 `gzip_static` 支持  
> 3、`--prefix=/usr/local/nginx` 安装目录（可以不用）

```nginx
./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_gzip_static_module
```

3、安装

> 1、`./configure` 是用来检测你的安装平台的目标特征的。一般用来生成**Makefile**  
> 2、`make` 是用来编译的，它从 Makefile 中读取指令，然后编译。  
> 3、`make install`是用来安装的，它也从 Makefile 中读取指令，安装到指定的位置。**会覆盖安装**

```nginx
make && sudo make install
```

#### 4、启动 nginx

> 在安装目录下启动

```nginx
方法一：
/usr/local/nginx/sbin/nginx

方法二:
//进入nginx目录
cd /usr/local/nginx/sbin
//执行启动命令
./nginx
```

### 在 Windows 中安装

#### 1、下载

> 在官网中下载`nginx windows`版本后并解压  
> [Nginx 下载地址](http://nginx.org/en/download.html)

#### 2、运行

> 使用`命令行`工具进行启动，千万不要双击`nginx.exe`文件启动

#### 3、启动 nginx 服务

> 启动时会一闪而过是正常的

```nginx
start nginx
```

## 基础命令

### 启动命令

```nginx
// linux
/usr/local/nginx/sbin/nginx
//windows
start nginx
```

### 停止服务

#### 1、立即停止服务

```nginx
nginx  -s stop
```

#### 2、从容停止服务

```nginx
nginx  -s quit
```

#### 3、结束进程

```nginx
//linux
killall nginx
```

### 重启服务

```nginx
nginx -s reload
```

## `nginx.conf` 文件解读

> nginx 主要模块配置

```nginx
#运行用户，可以不进行设置
#user  nobody;
#工作进程数，一般设置为cpu核心数
worker_processes  1;

#错误日志存放目录
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#进程pid存放位置
#pid        logs/nginx.pid;

events {
    #单个后台进程的最大并发数
    worker_connections  1024;
}


http {
    include       mime.types; #文件扩展名与类型映射表
    default_type  application/octet-stream; #默认文件类型

    #设置日志模式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main; #nginx访问日志存放位置

    sendfile        on; #开启高效传输模式
    #tcp_nopush     on; #nginx访问日志存放位置

    keepalive_timeout  65; #保持连接的时间，也叫超时时间

    #gzip  on; #开启gzip压缩

    #client_max_body_size       20m; #请求体最大内容

    #当配置多个server节点，默认server names的缓存区大小就不够了，需要手动设置大一点server_names_hash_bucket_size 512;

    #配置多个server节点来搭建多个站点
    #每一个请求进来确定使用哪个server由server_name确定
    server {
        listen       80; #站点监听端口
        server_name  localhost; #站点访问域名

        #charset koi8-r; #编码格式，避免url参数乱码

        #access_log  logs/host.access.log  main;

        #client_max_body_size       20m; #请求体最大内容

        #location用来匹配同一域名下多个URI的访问规则
        #比如动态资源如何跳转，静态资源如何跳转等
        #location后面跟着的/代表匹配规则
        location / {
            root   html; #站点根目录，相对路径或者绝对路径
            index  index.html index.htm; #默认主页

            #拒绝请求，返回403，一般用于某些目录禁止访问
            #deny all;

            #允许请求
            #allow all;

            #转发后端站点地址，一般用于做软负载，轮询后端服务器
            #proxy_pass http://10.11.12.237:8080;

            #重新定义或者添加发往后端服务器的请求头
            add_header 'Access-Control-Allow-Origin' '*';

            #给请求头中添加客户请求主机名
            proxy_set_header Host $host;

            #给请求头中添加客户端IP
            proxy_set_header X-Real-IP $remote_addr;

            #将$remote_addr变量值添加在客户端“X-Forwarded-For”请求头的后面，并以逗号分隔。
            #如果客户端请求未携带“X-Forwarded-For”请求头，$proxy_add_x_forwarded_for变量值将与$remote_addr变量相同
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            #给请求头中添加客户端的Cookie
            proxy_set_header Cookie $http_cookie;

            #将使用代理服务器的主域名和端口号来替换。如果端口是80，可以不加。
            proxy_redirect off;

            #与后端服务器建立连接的超时时间。一般不可能大于75秒；
            proxy_connect_timeout 30;
        }

        #error_page  404              /404.html; # 配置404页面

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html; #错误状态码页
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

## 配置多服务

### 根据二级域名

> 根据二级域名，配置不同服务;重开一个**http server**服务即可.

```nginx
// nginx.conf
http {
    # some configure
    server {
        listen       80;
        server_name  xie.jonesxie.com;
        location / {
            root   /www/xie/;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    server {
        listen       80;
        server_name  jun.jonesxie.com;
        location / {
            root   /www/jun/;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```

### 根据不同目录

> 相同域名下，不同目录指向不同服务;  
> 1、**需注意 root 和 alias**之前的区别  
> 2、单页面应用的路径名必须与 url 路径名相同

```nginx
// nginx.conf
http {
    # some configure
    server {
        listen       80;
        server_name  xie.jonesxie.com;

        root /web ;
        # single-page-application
        location ^~ /store {
            try_files $uri $uri/ /store/index.html;
        }
        location ^~ /mall {
            try_files $uri $uri/ /mall/index.html;
        }
        # mutli-page
        location ^~ /openstore {
            alias  /web/openstore/;
            index  index.html index.htm;
        }
    }
}

```

## 访问权限设置

### 1、基础权限设置

```nginx
location / {
    allow  45.76.202.231; //允许访问
    deny   45.76.202.232; //禁止访问
}
```

### 2、指令优先级

> 在同一个块下的两个权限指令，先出现的设置会覆盖后出现的设置（也就是谁先触发，谁起作用）

```nginx
location / {
    deny   all;
    allow  45.76.202.231; // 将会不起作用
}
```

### 3、复杂访问控制权限匹配

> `=`号代表精确匹配，使用了`=`后是根据其后的模式进行精确匹配

```nginx
// imgs目录下文件允许访问
location =/imgs{
    allow all;
}
// admin目录下文件禁止访问
location =/admin{
    deny all;
}
```

### 4、使用正则表达式设置访问权限

```nginx
//禁止访问php结尾的文件
location ~\.php$ {
    deny all;
}
```

## 反向代理

> 客户端请求发到代理服务器，代理服务器再把请求发送到自己设置好的内部服务器上

```nginx
server{
    listen 80;
    server_name nginx.org;
    location / {
        #代理到此服务器中
        proxy_pass http://baidu.com;
        #重新定义或者添加发往后端服务器的请求头
        add_header 'Access-Control-Allow-Origin' '*';

        #给请求头中添加客户请求主机名
        proxy_set_header Host $host;

        #给请求头中添加客户端IP
        proxy_set_header X-Real-IP $remote_addr;

        #将$remote_addr变量值添加在客户端“X-Forwarded-For”请求头的后面，并以逗号分隔。
        #如果客户端请求未携带“X-Forwarded-For”请求头，$proxy_add_x_forwarded_for变量值将与$remote_addr变量相同
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        #给请求头中添加客户端的Cookie
        proxy_set_header Cookie $http_cookie;

        #将使用代理服务器的主域名和端口号来替换。如果端口是80，可以不加。
        proxy_redirect off;

        #与后端服务器建立连接的超时时间。一般不可能大于75秒；
        proxy_connect_timeout 30;

        proxy_read_timeout 600;
        proxy_send_timeout 600;
    }
}
```

## 解决跨域

> 主域名: mysite.com  
> 请求连接: `http://mysite.com/apis/getPCBannerList.html`

```nginx
server{
    listen 80;
    server_name mysite.com;

    #请求跨域，这里约定代理请求url path是以/apis/开头
    location ^~/apis/ {
        # 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配
        rewrite ^/apis/(.*)$ /$1 break;
        proxy_pass https://www.kaola.com/;
    }
}
```

## 适配 PC 和移动端

```nginx
location / {
    # 移动、pc设备适配
    if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
        rewrite ^.+ http://mysite-H5.com;
    }
}
```

## 开启 gzip

> 通过 **ngx_http_gzip_module** 模块拦截请求，并对需要做 gzip 的类型做 gzip 压缩，该模块是默认基础的，**不需要重新编译**，直接开启即可。

```nginx
server{
    #开启和关闭gzip模式
    gzip on|off;

    #nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
    gzip_static on|off;

    #gizp压缩起点，文件大于1k才进行压缩
    gzip_min_length 1k;

    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
    gzip_comp_level 1;

    # 进行压缩的文件类型,对特定的MIME类型生效,其中'text/html’被系统强制启用
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript ;

    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;

    # 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区
    gzip_buffers 2 4k;

    # 设置gzip压缩针对的HTTP协议版本
    gzip_http_version 1.1;

    # IE6对Gzip不友好，对Gzip（可以通过该指令对一些特定的User-Agent不使用压缩功能）
    gzip_disable "MSIE [1-6]\.";
}

```

### 案例

```nginx
server {
    listen       443 ssl;
    server_name  mall.1qishun.com;

    ssl_certificate      ssl/mallpc/3182454_mall.1qishun.com.pem;
    ssl_certificate_key  ssl/mallpc/3182454_mall.1qishun.com.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    gzip on;
    #需要安装 --with-http_gzip_static_module参数
    gzip_static on;
    gzip_comp_level 6;
    gzip_buffers 4 16k;
    gzip_min_length 1k;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript;
    gzip_disable "MSIE [1-6]\.";

    location / {
        root   /www/mallpc/;
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }
}
```

## 负载均衡

### 轮询（默认）

```nginx
// nginx.config
upstream backserver {
    server 192.168.0.1;
    server 192.168.0.2;
}
```

### 权重 weight

> 指定不同 ip 的权重，权重与访问比成正相关，权重越高，访问越大，适用于不同性能的机器

```nginx
// nginx.config
upstream backserver {
    server 192.168.0.1 weight=2;
    server 192.168.0.2 weight=8;
}
```

### 响应时间来分配

> 公平竞争，谁相应快，谁处理，不过这种方式需要依赖到第三方插件 nginx-upstream-fair，需要先安装

```nginx
// nginx.config
upstream backserver {
    server 192.168.0.1;
    server 192.168.0.2;
    fair;
}
server {
    listen 80;
    server_name localhost;
    location / {
      proxy_pass  http://backserver;
    }
}
```

### 健康检查

> Nginx 自带 ngx_http_upstream_module（健康检测模块）本质上服务器心跳的检查，通过定期轮询向集群里的服务器发送健康检查请求,来检查集群中是否有服务器处于异常状态

如果检测出其中某台服务器异常,那么在通过客户端请求 nginx 反向代理进来的都不会被发送到该服务器上（直至下次轮训健康检查正常）

```nginx
upstream backserver{
    server 192.168.0.1  max_fails=1 fail_timeout=40s;
    server 192.168.0.2  max_fails=1 fail_timeout=40s;
}
server {
    listen 80;
    server_name localhost;
    location / {
      proxy_pass http://backend;
    }
}
```

> 1、fail_timeout : 设定服务器被认为不可用的时间段以及统计失败尝试次数的时间段，默认为 10s  
> 2、max_fails : 设定 Nginx 与服务器通信的尝试失败的次数，默认为：1 次

## root 和 alias 的区别

> 两者都是确定文件路径的作用

### root

> 语法：**root path**  
> 配置段：**http、server、location、if**

```nginx
location ^~ /t/ {
    root /www/root/html/;
}
```

### alias

> 语法：**root path**  
> 配置段：**location**

```nginx
location ^~ /t/ {
    alias /www/root/html/new_t/;
}
```

### 区别

root 与 alias 主要区别在于 nginx 如何解释 location 后面的 uri，这会使两者分别以不同的方式将请求映射到服务器文件上

- root 的处理结果是：root 路径＋ location 路径
- alias 的处理结果是：使用 alias 路径`替换`location 路径

```nginx
// 如果一个请求的URI是/t/a.html时
location ^~ /t/ {
    root /www/root/html/;
}
// 返回服务器上的/www/root/html/t/a.html的文件

location ^~ /t/ {
    alias /www/root/html/new_t/;
}
// 返回服务器上的/www/root/html/new_t/a.html的文件
```

:::tip

- 使用 alias 时，目录名后面一定要加"/"。
- alias 在使用正则匹配时，必须捕捉要匹配的内容并在指定的内容处使用。
- alias 只能位于 location 块中。（root 可以不放在 location 中）
  :::

## location 匹配规则

### 基础

:::tip
1、"="前缀指令匹配，如果匹配成功，则停止其他匹配。  
2、普通字符串指令匹配，顺序是从长到短，匹配成功的 location 如果使用^~，则停止其他匹配（正则匹配）。  
3、正则表达式指令匹配，按照配置文件里的顺序，成功就停止其他匹配。
4、如果第三步中有匹配成功，则使用该结果，否则使用第二步结果。
:::
注意点:

1.匹配的顺序是**先匹配普通字符串**，然后**再匹配正则表达式**。

> 1、普通字符串匹配顺序是根据配置中字符长度从长到短，与配置的 location `顺序是无关紧要`的；
> 2、正则表达式按照配置文件里的`顺序测试`，找到第一个匹配的正则表达式将停止搜索。

2.一般情况下，匹配成功了普通字符串 location 后还会进行正则表达式 location 匹配。有两种方法改变这种行为:

> 1、使用 `=` 前缀，这时执行的是严格匹配，并且匹配**成功后立即停止其他匹配**，同时处理这个请求；
> 2、使用`^~`前缀，如果把这个前缀用于一个常规字符串那么告诉 nginx 如果**路径匹配那么不测试正则表达式**。

### 匹配示例

- **精确匹配**，只有完全匹配上才能生效。

```nginx
location = /uri 　
```

- 对 URL 路径进行**前缀匹配**，并且在正则之前。

```nginx
location ^~ /uri 　
```

- **区分大小写的正则匹配**。

```nginx
location ~ pattern　
```

- **不区分大小写的正则匹配**。

```nginx
location ~* pattern
```

- 不带**任何修饰符**，也表示前缀匹配，但是在正则匹配之后。

```nginx
location /uri
```

- **通用匹配**，任何未匹配到其它 location 的请求都会匹配到。

```nginx
location /
```

案例：

```nginx
server {
    listen       80;
    server_name  nginxcom;
    index  index.html index.htm index.php;
    charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;

    # 域名+项目1名称
    location ^~ /a1/ {
            alias /usr/share/nginx/html/a1/public/;
    }

    # 域名+项目2名称
    location ^~ /a2/ {
            alias /usr/share/nginx/html/a2/public/;
    }

    error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html/500.html;
    }

    #pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000

    location ~ \.php$ {
        root           html;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        include        fastcgi_params;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```

## 参考资料

### [Nginx Windows 详细安装部署教程](https://www.cnblogs.com/taiyonghai/p/9402734.html)

### [Nginx 与前端开发](https://juejin.im/post/5bacbd395188255c8d0fd4b2)
