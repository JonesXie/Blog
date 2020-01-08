# Git 常用命令

::: tip
**Git 原理详解及实用指南：[https://juejin.im/book/5a124b29f265da431d3c472e](https://juejin.im/book/5a124b29f265da431d3c472e)**  
**Git 问题和操作清单汇总：[https://juejin.im/post/5d5d61e96fb9a06ace5254bd#heading-22](https://juejin.im/post/5d5d61e96fb9a06ace5254bd#heading-22)**
:::

![git](@/git.png "git命令总结")

## 下载&安装

> git 官网: [https://git-scm.com/](https://git-scm.com/)

从官网中下载对应版本，并安装。安装时可以完全使用默认设置即可！  
随便某个文件下右键如果有 `Git Bash Here` 就安装成功！

## 全局设置

随便某个文件下右键选择 `Git Bash Here` 唤起 git 命令行工具

```git
git config --list // 全局信息
git config --global user.name "username" // 全局用户名
git config --global user.email "email" // 全局邮箱

// 查看全局
git config user.name
git config user.email
```

## Git 工作流程

### 初始化

> 在文件夹中初始化 git，将会生成`.git`隐藏文件夹，内放置 git 相关信息 **勿删**

```git
git init
```

### 暂存区

> 写完代码后，将修改的代码放入暂存区

```git
// 将所有的修改都添加到暂存区 . 是 all 的简写
git add .

// 或者单独文件
git add a.html
```

### 版本库

> 暂存区的文件，通过 commit 提交到版本库中

```git
git commit -m "本次提交的信息"
```

### 远端

> 如果多人协作/备份代码，可以设置远程仓库

```git
// 添加远程
git remote add origin https://github.com/xxxx/xxx.git  //设置远程仓库(origin)

// 推送代码
git push -u origin master
// -u 是设置后期使用 push将默认推送到 origin 远端,可以不设置

// 拉取代码
git pull origin master  // 或者 git pull 将默认从 origin/master中拉取
```

## 分支操作

### 查看分支

```git
git branch  // 查看所有分支
```

### 创建分支&切换分支

> 创建分支和切换分支可以通过一行命令，所以分在一起

```git
// 创建分支
git branch new_branch

// 切换分支
git checkout new_branch

// 创建分支并切换到此放分支
git checkout -b new_branch
```

### 同步远端分支

> 1、远程先开好分支然后拉到本地  
> 2、本地先开好分支然后推送到远程

```git
// 1、远程先开好分支然后拉到本地
git checkout -b new_branch origin/new_branch  // origin远端中的new_branch分支

// 2、本地先开好分支然后推送到远程
git checkout -b new_branch  // 本地创建分支并切换到此分支
git push origin new_branch:new_branch
// 推送本地的new_branch(冒号前面的)分支到远程origin的new_branch(冒号后面的)分支(没有会自动创建)
```

### 合并分支

> 通常是将分支合并到 master 主分支中，当然也可以一个分支合并另一个分支

```git
// 此案例以master为主分支

// 1、切换到需要合并到的分支上
git checkout master

// 2、合并分支
git merge new_branch  // new_branch是你所要合并的分支名字

// 3、解决冲突
git将会自动处理不同的代码，但是出现冲突需要自己手动解决
```

### 删除分支

```git
// 已经合并的分支
git branch -d new_branch

// 如果没有合并的分支，上述命令行将会产生提示
// 但是分支没用了，可以强制删除 -D
git branch -D new_branch

// 删除远程分支
git push origin -d new_branch
```

## 标签管理

标签（tag）和 branch 很像，但是标签是不会移动的，而 branch 会根据修改进行移动的

### 查看 tag

```git
git tag
```

### 新建 tag

```git
// 本地创建
git tag v1.0 // v1.0为tag名

// 推送到远程
git push origin v1.0 // 推送到origin远程v1.0的tag

// 一次推送所有的tags
git push origin --tags
```

### 删除 tag

```git
// 先删除本地tag
git tag -d <tag名>

// 删除远程tag
git push origin --d tag <tag名>
```

## 常用错误处理

### 修正 commit

#### 修正上一个 commit

> `amend`:'修正'，当 commit 添加上`--amend`,用这个新的 commit 把当前 commit 替换掉

```git
git commit --amend
```

#### 修正不是上一个 commit

> rebase -i 是 rebase --interactive 的缩写形式，意为「交互式 rebase」  
> [详细介绍](https://juejin.im/book/5a124b29f265da431d3c472e/section/5a1451dd5188253293142cd7)

```git
// 回退到倒数第二个
git rebase -i HEAD^^
```

### 丢弃 commit

#### 丢弃上一个 commit

> 1、reset --hard :丢弃上一个 commit  
> 2、reset 参数解析
>
> > a、reset --hard：重置工作目录，工作目录里的内容会被完全重置为和 `HEAD` 的新位置相同的内容  
> > b、reset --soft：保留工作目录，保留工作目录和暂存区中的内容，并把重置 `HEAD` 所带来的新的差异放进暂存区  
> > c、reset 不加参数：保留工作目录，并清空暂存区

```git
// 丢弃上一个commit
git reset --hard HEAD^
```

#### 丢弃不是上一个 commit

> 同样是使用 rebase: **git rebase -i HEAD^^**

```git
// 回退到倒数第二个
git rebase -i HEAD^^
```

### 修改 push 后的代码

#### 自己的分支

> 对于自己能完全掌控的仓库，可以使用上面的方法,再强制推送

```git
// -f 表示强制推送
git push origin branch1 -f
```

#### 协作的分支

> 下面代码就会增加一条新的 commit，它的内容和倒数第二个 commit 是相反的，从而和倒数第二个 commit 相互抵消，达到撤销的效

```git
git revert HEAD^
```

## 常用 Git 命令总结

- `git config --global user.name "name"`  设置全局名字
- `git config --global user.email "you@email.com"` 设置全局邮箱
- `git init` 初始化仓库
- `git add .` 把工作区的文件全部提交到暂存区
- `git commit -m "xxx"` 把暂存区的所有文件提交到仓库区
- `git remote add origin https://github.com/xxx/xxx.git` 把本地仓库与远程仓库连接起来
- `git push -u origin master` 把仓库区的主分支 master 提交到远程仓库里
- `git push -u origin <分支>` 把其他分支提交到远程仓库
- `git status` 查看当前仓库的状态
- `git diff`  查看文件修改的具体内容
- `git log`  显示从最近到最远的提交历史
- `git clone https://github.com/xxx/xxx.git dirName` 克隆仓库到本地 dirName 文件中
- `git commit --amend` 将此次修改提交到上次 commit 中
- `git reset --hard 版本号` 回溯版本，版本号在 commit 的时候与 master 跟随在一起
- `git reflog` 显示命令历史
- `git checkout --`   撤销命令，用版本库里的文件替换掉工作区的文件。
- `git branch` 查看当前所有分支
- `git branch <分支名字>` 创建分支
- `git checkout <分支名字>` 切换到分支
- `git merge <分支名字>` 合并分支
- `git branch -d <分支名字>` 删除分支,有可能会删除失败，因为 Git 会保护没有被合并的分支
- `git branch -D <分支名字>` 强行删除，丢弃没被合并的分支
- `git log --graph` 查看分支合并图
- `git merge --no-ff <分支名字>` 合并分支的时候禁用 Fast forward (会丢失分支历史信息)
- `git stash` 当有其他任务插进来时，把当前工作现场“存储”起来,以后恢复后继续工作
- `git stash list` 查看你刚刚“存放”起来的工作去哪里了
- `git stash apply` 恢复却不删除 stash 内容
- `git stash drop` 删除 stash 内容
- `git stash pop` 恢复的同时把 stash 内容也删了
- `git remote` 查看远程库的信息，会显示 origin，远程仓库默认名称为 origin
- `git remote -v` 显示更详细的信息
- `git pull` 把最新的提交从远程仓库中抓取下来，在本地合并,和 git push 相反
- `git rebase` 把分叉的提交历史“整理”成一条直线，看上去更直观
- `git tag` 查看所有标签，可以知道历史版本的 tag
- `git tag`   打标签，默认为 HEAD。比如 git tag v1.0
- `git tag`  <版本号> 把版本号打上标签，版本号就是 commit 时，跟在旁边的一串字母数字
- `git show`   查看标签信息
- `git tag -a -m "<说明>"` 创建带说明的标签。 -a 指定标签名，-m 指定说明文字
- `git tag -d`   删除标签
- `git push origin`   推送某个标签到远程
- `git push origin --tags` 一次性推送全部尚未推送到远程的本地标签
- `git push origin :refs/tags/` 删除远程标签
- `git add -f`   强制提交已忽略的的文件

## Git 特殊操作

### 偏移符号

> 1、`^`：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量  
> 2、`~`：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数

```git
master^ 表示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit

HEAD~5 表示 HEAD 指向的 commit 往前数 5 个 commit。
```

### 生成 SSH 密钥

> 1、本地 SSH 密钥存在于**C:\Users\Jonesxie\.ssh**文件夹中  
> 2、**id_rsa**为私钥，**id_rsa.pub**为公钥

```git
// 需要先看看本地是否有ssh密钥，没有再创建
ssh-keygen

// 或者
ssh-keygen -t rsa -C "anhuixieqijun@163.com"
```

### 远程同步

#### 设置多远程

```git
// 添加远程
git remote add origin https://github.com/xxxx/xxx.git  //设置远程仓库(origin)
git remote add mirror https://gitee.com/xxxx/xxx.git  //设置远程仓库(mirror)

// 拉取推送
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
> 2、也可以使用**SSH 密钥**

```git
url = https://${user}:${password}@github.com/JonesXie/xxx.git
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
