# editable_tree
> 一个可以编辑的树形菜单栏,还自带Breadcrumb哦~
## 如何使用
> 引入css
```html
    <link rel="stylesheet" href="css/tree.css">
```
> 引入js
```html
    <script src="js/jquery-2.2.1.min.js"></script>
    <script src="js/tree.js"></script>
```
> 正确使用
```javascript
    $('.tree').makeTree({
        data:data.result.data, // data.result.data 树形菜单的数据
        maxLevel:3, // 最多层级
        //点击节点事件回调函数
        intemClick:function(data){
            console.log(data)
        },
        //新建节点事件回调函数
        newItem:function(data){
            console.log(data)
        },
        //编辑节点事件回调函数
        editMe:function(data){
            console.log(data)
        },
        //删除节点事件回调函数
        delete:function(data){
            console.log(data)
        },
        //展开节点子元素事件回调函数
        openChild:function(data){
            console.log(data)
        }
    })
```
>返回数据的具体格式demo
```javascript
  var data = [
    {
        id:'1',
        count:'5',
        name:'个人信息管理1',
        ProSort: "14557",
        remark: "",
        pid: "",
        isEdit: "",
        children:[
            {
                id: "14579",
                count: "0",
                name: "市值、额度1",
                ProSort: "14579",
                remark: "",
                pid: "1",
                isEdit: "",
                children: []
            },
            {
                id: "14579",
                count: "0",
                name: "市值、额度2",
                ProSort: "14579",
                remark: "",
                pid: "1",
                isEdit: "",
                children: []
            },
            {
                id: "14579",
                count: "0",
                name: "市值、额度3",
                ProSort: "14579",
                remark: "",
                pid: "1",
                isEdit: "",
                children: []
            },
            {
                id: "14579",
                count: "0",
                name: "市值、额度4",
                ProSort: "14579",
                remark: "",
                pid: "1",
                isEdit: "",
                children: []
            },
            {
                id: "14579",
                count: "0",
                name: "市值、额度5",
                ProSort: "14579",
                remark: "",
                pid: "1",
                isEdit: "",
                children: []
            },
        ]
    },
    {
        id:'2',
        count:'0',
        name:'个人信息管理2',
        ProSort: "14557",
        remark: "",
        pid: "",
        isEdit: "",
        children:[]
    },
    {
        id:'3',
        count:'2',
        name:'个人信息管理3',
        ProSort: "14557",
        remark: "",
        pid: "",
        isEdit: "",
        children:[
            {
                id: "14579",
                count: "0",
                name: "市值、额度6",
                ProSort: "14579",
                remark: "",
                pid: "1",
                isEdit: "",
                children: []
            },
            {
                id: "14579",
                count: "0",
                name: "市值、额度7",
                ProSort: "14579",
                remark: "",
                pid: "1",
                isEdit: "",
                children: []
            },
        ]
    }
]
```
