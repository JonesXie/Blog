# Git教程

Git掘金小册：[https://juejin.im/book/5a124b29f265da431d3c472e](https://juejin.im/book/5a124b29f265da431d3c472e)

## 一、Git常用操作

### 1、全局设置

```git
git config --global user.name "username" //全局用户名
git config --global user.email "email" //全局邮箱

// 查看全局
git config user.name
git config user.email
```

### 2、常用命令

```git
git init  //git初始化
git remote add origin https://github.com/xxxx/xxx.git  //设置远程仓库
git add .  //将所有更改添加到暂存区
git commit -m “新提交消息”  //提交信息
git push  //推送
git pull  //拉取
```

### 3、.gitignore

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

## 二、Git本地同步到线上

### 1、远程建立一个仓库获取到远程仓库地址

>远程地址请勿初始化(即不能有任何文件，否则第九步出错)

### 2、本地新建一个文件夹

```git
mkdir  remoteData
```

### 3、进入新建的文件夹中

```git
cd remoteData
```

### 4、将需要传入远程的文件放入文件夹中

### 5、初始化本地git

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

### 8、将需要传入远程的文件填写commit信息

```git
git commit -m "代码提交"
```

### 9、将需要传入远程的文件进行push

```git
git push -u origin master
```

### 10、后期进行操作

```git
git add .     //将代码放到缓存区
git commit -m""   //提交到本地仓库
git push          //推送到远程
```

## 三、Git将线上的同步到本地

### 1、本地新建一个文件夹

```git
mkdir  remoteData
```

### 2、进入新建的文件夹中

```git
cd remoteData
```

### 3、初始化本地git

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
