# npm&yarn

## node

> 1、在使用 **npm/yarn** 之前，首先需要安装 nodejs。[nodejs 官网](https://nodejs.org/zh-cn/)  
> 2、使用 **node -v** 查看是否安装成功以及安装版本

```js
node - v;
```

### nvm

> nvm：是 node 包管理工具  
> [nvm windows 版本](https://github.com/coreybutler/nvm-windows)、[nvm linux 版本](https://github.com/nvm-sh/nvm)

```js
 nvm version              // 当前nvm版本
 nvm ls available         // 列出当前可用的node版本
 nvm install [version]    // 安装[version]版本的node
 nvm ls                   // 列出当前环境安装的所有node版本
 nvm use [version]        // 使用[version]版本的node
 nvm uninstall [version]  // 卸载[version]版本的node
 nvm node_mirror [url]    // 安装node文件的镜像
 nvm npm_mirror [url]     // 安装npm文件的镜像
```

nvm 使用淘宝镜像。

> 1、使用 nvm 命令行  
> 2、在 nvm 安装路径中可以编辑 setting.txt 文件

```js
nvm node_mirror  https://npm.taobao.org/mirrors/node/
nvm npm_mirror  https://npm.taobao.org/mirrors/npm/
```

## npm

### 安装

> 安装 node 时会自动安装 npm 包

```js
npm - v; // 查看版本
```

> 使用淘宝镜像

```js
// 使用cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

// 直接修改 registry
npm config get registry  // 查看npm当前镜像源
npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

```

### 常用命令

- 初始化

```js
npm init  // 引导你创建一个package.json文件，包括名称、版本、作者这些信息等
npm init -y  //使用默认信息
```

- 添加依赖包
  > `npm install` => `npm i`

```js
npm install [package] // 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
npm install [package]@[version] // 安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
npm install [package]@[tag] // 安装某个tag（比如beta,next或者latest）

//安装到指定的类型中
npm install [package] --save/-S // 加到 dependencies
npm install [package] --save-dev/-D // 加到 devDependencies

```

- 升级依赖包

```js
npm update [package]
npm update [package]@[version]
npm update [package]@[tag]
```

- 移除依赖包

```js
npm uninstall [package]
```

- 安装项目的全部依赖

```js
npm install
```

- 全局文件

```js
// 全局安装
npm install [package] -g

// 查看全局安装包
npm list -g --depth=0
```

- 运行脚本

```js
npm run [script] //用来执行在 package.json 中 scripts 属性下定义的脚本
```

## yarn

### 安装

> 在[官网](https://classic.yarnpkg.com/en/docs/install#windows-stable)中下载 **.msi**文件并安装,windows 最新版本[下载地址](https://classic.yarnpkg.com/latest.msi)

```js
yarn - v; // 查看版本
```

> 使用淘宝镜像

```js
// 直接修改 registry
yarn config get registry  // 查看yarn当前镜像源
yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像

yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g  // 针对node-sass安装失败，设置全局安装
```

### 常用命令

- 初始化

```js
yarn init  // 引导你创建一个package.json文件，包括名称、版本、作者这些信息等
yarn init -y  //使用默认信息
```

- 添加依赖包
  > `yarn add [package]` 将默认安装到 **dependencies**中

```js
yarn add [package] // 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
yarn add [package]@[version] // 安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
yarn add [package]@[tag] // 安装某个tag（比如beta,next或者latest）

//不指定依赖类型默认安装到dependencies里，你也可以指定依赖类型：
yarn add --dev/-D // 加到 devDependencies
yarn add --peer/-P // 加到 peerDependencies
yarn add --optional/-O // 加到 optionalDependencies
```

- 升级依赖包

```js
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

- 移除依赖包

```js
yarn remove [package]
```

- 安装项目的全部依赖

```js
yarn;
// 或者
yarn install
```

- 全局文件

```js
// 全局安装
yarn global add [package]

// 查看全局安装包
yarn global list --depth=0
```

- 运行脚本

```js
yarn run [script] //用来执行在 package.json 中 scripts 属性下定义的脚本
```

## npm 与 yarn 比较

![npm](@/npm.png "npm 与 yarn 比较")
