/* 观察者模式的简易实现，通过订阅data值的改变，执行callback */
let bindData = function (params) {
  onChange(this, params)
}

function onChange (vm, params) {
  // 定义不可被赋值运算符修改的属性eventHandle，防止对其类型进行破坏
  Object.defineProperty(vm, 'eventHandle', {
    value: {},
    writable: false
  })
  Object.keys(params).forEach((key) => {
    define.call(vm, key, params[key])
  })
}

function define (prototype, value) {
  Object.defineProperty(this, prototype, {
    // 通过set方法监听data的改变
    set: function (newValue) {
      // 从事件列表中获取到当前data的事件组
      let callbacks = this.eventHandle[prototype]
      // 循环调用当前事件组的callback
      for (let eventName in callbacks) {
        let callback = callbacks[eventName]
        if (typeof callback == 'function') {
          callback(newValue)
        }
      }
      value = newValue
    },
    get () {
      return value
    }
  })
}

bindData.prototype = {
  // 监听data的改变，
  // dataName: string / data的变量名
  // eventName: string / 事件的别名
  // callback：function / 需要在data发生改变时执行的callback
  onDataChange: function (dataName, eventName, callback) {
    let dataCallbacks = this.eventHandle[dataName] || {}
    if (typeof callback == 'function') {
      dataCallbacks[eventName] = callback
      this.eventHandle[dataName] = dataCallbacks
    }
  },

  // 取消监听，若只传dataName，将取消该变量的所有监听
  removeDataChange: function (dataName, eventName) {
    if (dataName, eventName) {
      let dataCallbacks = this.eventHandle[dataName] || {}
      delete dataCallbacks[eventName]
      this.eventHandle[dataName] = dataCallbacks
    } else if (dataName) {
      delete this.eventHandle[dataName]
    }
  }
}

export default new bindData({
  /* 在此处定义需要监听的data */
  test: {}
})

/* 
  示例：

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
*/
