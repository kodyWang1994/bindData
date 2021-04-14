# bindData
js观察者模式的简易实现，通过订阅data值的改变，执行callback
# 示例：
```
import BindData from ./bindData

BindData.onDataChange('test', 'testName', (res) => {
  console.log('test：', res)
})

BindData.onDataChange('test', 'testName2', (res) => {
  console.log('test2：', res)
})

BindData.test = {a: 1}

输出: 
test： {a: 1}
test2： {a: 1}
 ```
 # 更多
 ```
 如果想要增加监听的data, 可以修改bindData.js中的以下代码

export default new bindData({
  /* 在此处定义需要监听的data */
  test: {}
})

 ```
 
 ## 欢迎大家下载使用，有任何问题欢迎提issue
