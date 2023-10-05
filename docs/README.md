## 写在前面

完备的文档可以让开发者快速了解一个项目进行开发，很遗憾， tiddlywiki虽然有文档，但不多。如果想要深入了解，只能通过源代码，好在tw的源代码的注释还是比较友好的（我并没有看完tw的源代码，只是大致过了一遍，然后需要的时候就直接搜索关键词再仔细看具体的代码，难道这就是面向api开发？） ... 未完待续

这无疑增加了每个开发者的复旦，并且严重影响效率，tw的用户很少很少，一直坚持使用的大概是真爱了吧，使用tw并且进行开发tw插件的就少上加少了，tw没有进行商业化开发，所以很多功能虽然有了，但是使用体验过上并不好，但tw真的是一款令人瞬间眼前一亮的软件.

# Tutorials

## Introduce

## How to use tiddlywiki starter kit with locally ?

## How to use tiddlywiki starter kit with docker ?

## How to write tiddlywiki plugin for yourself ？ 

## 插件配置

...

## 插件加载顺序

很抱歉，tw并不支持指定插件的加载顺序，但是你可以决定条目的优先级 ...未完待续

## 插件的开发方式

> 下面顺序还没有经过整理，想到哪写到哪，如有错误遗漏之处欢迎pr。


* tw5里面的插件开发由于其独特的风格，开发方式有很多种，tw 官方的dev文档也没有明确说明，仅仅展示了一些具体的插件代码示例，并没有具体说明（tw的文档是多个tiddler组成的，全靠链接进行联系， 如果没有按照官方的顺序来看，很容易犹豫不知道tiddler的上下文环境感到迷惑
* 如果你对tw的插件代码编写熟悉后，建议在tw源代码仓库里面搜索相关的关键词，查看对应的源码，或者直接看tw官方的插件是如何编写的（js 插件官方使用es5编写，建议直接使用es6 的class编写代码

* 由于wikitext编写体验没有js/ts代码体验好（wikitext没有lsp，提示全靠snippet， 我个人写的更多是js插件，下面如果没有特殊说明，默认就是js插件开发细节

* 你可以直接在tw里面新建一个文件，文件类型选择javascript，额外添加一个key-value 字段 module-type: widget

## UI

在tw经常需要操作一些dom， 一般js的写法就是使用`document.createElement('xxx')`的做法， 但是如果有多个节点需要插入，就需要不断进行append， 看起来比较混乱， tw基于createElement 封装了了一个函数 `$tw.utils.domMaker` 

```js
const createElement = $tw.utils.domMaker

const div = createElement('div', {
    class: 'm-2',
    text: 'this is a div node', 
    attributes:{
        title: 'tooptip',
            },
    children: [divNode1, divNode2, xxx]
})
```

## Data

* tw里面的数据有两种格式json和tw自带的x-dictionary-tiddler类型的文件， 但是获取后都是一个json对象，没有区别， x-dictionary-tiddler的形式都是key- value的类型，形式比较固定， 直接使用require（'xxx.json')即可加载，就像加载普通的json文件一样， 唯一需要注意的是文件名字需要使用tw里面的文件名字

## meta

* tw识别每个tiddler的title全靠meta数据， 如果一个tiddler没有title字段，就会默认使用文件系统的真实路径作为title， 比如 `/home/username/workspace/wiki/tiddlers/GettingStarted.tid`，

## 相对路径

* require 在tw里面同样支持相对路径， 只不过是基于tw的虚拟文件路由

## 插件文档

- 除了写出好的插件代码，详尽的插件文档或者是教程也是很重要的，因为你的插件面向的是用户，用户只有通过文档才能了解作者的插件应当如何使用，进而完全发挥插件的最大作用，尽可能简洁扼要的说明插件的功能，用法，注意事项，使用示例等必要的说明


## Concepts

* 数据原子：tiddlywiki(以下简称tw）的每一个tiddler都可以看作是一条数据，所有的tiddler可以类比为一个数据库，我们可以重新拿到这些数据以适当的形式重新展示这些数据， 比如写一个卡片组件，时间线组件，轮播图组件，文件树组件等各种ui组件， UI本身没有任何意义， 有了数据后才有了灵魂。

* 灵活性： 可以任意操作dom

## Recipes 

* 如果你的插件经常需要添加样式，请考虑使用css library， 手写样式真的很影响插件的编写体验，如果你熟悉一个css library， 就不需要为此烦恼（css library 不要过大， 在tw里面如果一个插件的大小超过500开， 就可以算得上一个大插件了，一定程度上会影响加载速度）
* tw源代码使用es5， 但是你也可以使用es6，这主要取决于你的浏览器的支持程度（2023年了， 只要你的浏览器不是很旧，几乎都支持）， 但是注意import机制在这里肯定是不支持的，tw使用require； 使用es6可以极大程度上简化代码，比如最常使用的箭头函数，解构赋值，展开运算符，模版字符串， Promise等

## Plugins template

[template](https://github.com/oeyoews/tiddlywiki-starter-kit/tree/main/templates/new-plugin)


> Coming