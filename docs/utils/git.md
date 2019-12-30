# Git 教程

[[toc]]

**Git 掘金小册：[https://juejin.im/book/5a124b29f265da431d3c472e](https://juejin.im/book/5a124b29f265da431d3c472e)**

![git](https://cdn.nlark.com/yuque/0/2019/png/358257/1577687909292-assets/web-upload/daadbfac-165c-4f50-857d-d305c0670216.png "git")
::: tip
[点击查看大图](https://cdn.nlark.com/yuque/0/2019/png/358257/1577687909292-assets/web-upload/daadbfac-165c-4f50-857d-d305c0670216.png)
:::

## Git 常用操作

### 全局设置

```git
git config --global user.name "username" //全局用户名
git config --global user.email "email" //全局邮箱

// 查看全局
git config user.name
git config user.email
```

### 生成 SSH 密钥

> 1、本地 SSH 密钥存在于**C:\Users\Jonesxie\.ssh**文件夹中  
> 2、**id_rsa**为私钥，**id_rsa.pub**为公钥

```git
ssh-keygen -t rsa -C "anhuixieqijun@163.com"
```

### 远程同步

#### 设置多远程

```git
//添加远程
git remote add origin https://github.com/xxxx/xxx.git  //设置远程仓库(origin)
git remote add mirror https://gitee.com/xxxx/xxx.git  //设置远程仓库(mirror)

//拉取推送
git pull origin master
git pull mirror master
git push origin master
git push mirror master
```

#### 一条命令同时更新多个远程仓库

> pull 时，只 pull 第一个设置的远端仓库  
> push 时，将先后 push 到多个远端

```git
git remote set-url --add origin https://gitee.com/xxxx/xxx.git

//拉取推送
git push origin master
```

> **.git/config 中的 origin 部分的内容**

```git
[remote "origin"]
url = https://github.com/JonesXie/xxx.git
url = https://gitee.com/Jonesxie/xxx.git
fetch = +refs/heads/*:refs/remotes/origin/*
```

#### 免输入密码操作远程仓库

> 1、配置文件的 url 里配上用户名和密码即可**免掉输入密码**  
> 2、当然可以使用**SSH 密钥**

```git
url = https://${user}:${password}@github.com/JonesXie/xxx.git
```

#### 推送本地分支到远程分支

> 1、远程先开好分支然后拉到本地
> 2、本地先开好分支然后推送到远程

```git
// 案例一:检出远程的new_dev分支到本地
git checkout -b new_dev origin/new_dev

// 案例二:本地推送到远端分支
git checkout -b new_dev    //创建并切换到分支new_dev
git push origin new_dev:new_dev    //推送本地的new_dev(冒号前面的)分支到远程origin的new_dev(冒号后面的)分支(没有会自动创建)
```

### .gitignore

```git
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```
