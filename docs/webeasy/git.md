# Git 教程

Git 掘金小册：[https://juejin.im/book/5a124b29f265da431d3c472e](https://juejin.im/book/5a124b29f265da431d3c472e)

## 一、Git 常用操作

### 全局设置

```git
git config --global user.name "username" //全局用户名
git config --global user.email "email" //全局邮箱

// 查看全局
git config user.name
git config user.email
```

### 常用命令

```git
git init  //git初始化

git remote add origin https://github.com/xxxx/xxx.git  //设置远程仓库

git add .  //将所有更改添加到暂存区

git commit -m “新提交消息”  //提交信息

git push  //推送

git pull  //拉取

git branch  //查看本地分支

git branch -a  //查看远程分支

git branch new_dev  //创建一个名为new_dev的分支

git checkout new_dev  //切换到new_dev的分支

git checkout -b new_dev  //创建名为new_dev分支并切换到此分支

git merge new_dev  //将new_dev分支合并到当前分支

```

### 远程设置

#### 1、设置多远程

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

#### 2、一条命令同时更新多个远程仓库

> 之前添加的远程可以删除，也可以不管它

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

#### 3、免输入密码操作远程仓库

> 1、配置文件的 url 里配上用户名和密码即可**免掉输入密码**  
> 2、当然可以使用**SSH 密钥**

```git
url = https://${user}:${password}@github.com/JonesXie/xxx.git
```

### 生成 SSH 密钥

> 1、本地 SSH 密钥存在于**C:\Users\Jonesxie\.ssh**文件夹中  
> 2、**id_rsa**为私钥，**id_rsa.pub**为公钥

```git
ssh-keygen -t rsa -C "anhuixieqijun@163.com"
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

## 二、Git 本地同步到线上

### 1、远程建立一个仓库获取到远程仓库地址

> 远程地址请勿初始化(即不能有任何文件，否则第九步出错)

### 2、本地新建一个文件夹

```git
mkdir  remoteData
```

### 3、进入新建的文件夹中

```git
cd remoteData
```

### 4、将需要传入远程的文件放入文件夹中

### 5、初始化本地 git

```git
 git init
```

### 6、设置远程地址

```git
git remote add origin https://gitee.com/xxxx/xxx.git
```

### 7、将需要传入远程的文件放入暂存区

```git
git add .
```

### 8、将需要传入远程的文件填写 commit 信息

```git
git commit -m "代码提交"
```

### 9、将需要传入远程的文件进行 push

```git
git push -u origin master
```

### 10、后期进行操作

```git
git add .     //将代码放到缓存区
git commit -m""   //提交到本地仓库
git push          //推送到远程
```

## 三、Git 将线上的同步到本地

### 1、本地新建一个文件夹

```git
mkdir  remoteData
```

### 2、进入新建的文件夹中

```git
cd remoteData
```

### 3、初始化本地 git

```git
git init
```

### 4、设置远程地址

```git
git remote add origin https://gitee.com/xxx/xxx.git
```

### 5、拉取远程 master 文件

```git
git pull origin master
```
