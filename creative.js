// 构造器模式
function User(name, age, career) {
  this.name = name;
  this.age = age;
  this.career = career;
}

// 工厂模式 1.0
function Factory(name, age, career) {
  let work;
  switch (career) {
    case "coder":
      work = ["写代码", "写系分", "修Bug"];
      break;
    case "product manager":
      work = ["订会议室", "写PRD", "催更"];
      break;
    case "boss":
      work = ["喝茶", "看报", "见客户"];
    case "xxx":
      // 其它工种的职责分配
      // ...

      return new User(name, age, career, work);
  }
}

// 工厂模式 2.0
// 需求：造出一台智能手机
// 1. 一台手机通常由软件和硬件两部分构成
class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
  // 提供硬件的接口
  createHardWare() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}
// 2. 每一台手机都可以拥有自己的软件系统，并且硬件配置也是不同的
// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}
// 3.1 软件系统内部也有不同的调用硬件的方法
// 定义操作系统这类产品的抽象产品类
class OS {
    controlHardWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件')
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用🍎的方式去操作硬件')
    }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}
// 3.2 硬件系统也有不同的芯片，不同的运行方式
// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}
// 4. 最后，我们只需要把软件和硬件都运行起来，保证软件和硬件各司其职就可以了
// 这是我的手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder()
// 5. 假如有一天我们生成的手机过气了，我们想要开发一台新的手机，我们只需要新建一个手机种类，并添加它的软件和硬件即可
class newStarFactory extends MobilePhoneFactory {
  createOS() {
    // 操作系统实现代码
  }
  createHardWare() {
    // 硬件实现代码
  }
}

// 单例模式
// 使用 class 实现
class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

// true
s1 === s2;


// 使用闭包实现
SingleDog.getInstance = (function () {
  // 定义自由变量instance，模拟私有变量
  let instance = null;
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new SingleDog();
    }
    return instance;
  };
})();

// 实现一个 Storage
// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
// class方式实现Storage
class Storage {
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!Storage.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            Storage.instance = new Storage()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return Storage.instance
    }
    getItem (key) {
        return localStorage.getItem(key)
    }
    setItem (key, value) {
        return localStorage.setItem(key, value)
    }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '李雷')
// 李雷
storage1.getItem('name')
// 也是李雷
storage2.getItem('name')

// 返回true
storage1 === storage2

// 使用闭包实现 Storage
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase () {}
StorageBase.prototype.getItem = function (key){
    return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value)
}

// 以闭包的形式创建一个引用自由变量的构造函数
const Storage = (function(){
    let instance = null
    return function(){
        // 判断自由变量是否为null
        if(!instance) {
            // 如果为null则new出唯一实例
            instance = new StorageBase()
        }
        return instance
    }
})()

// // 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果 
// const storage1 = new Storage()
// const storage2 = new Storage()

// storage1.setItem('name', '李雷')
// // 李雷
// storage1.getItem('name')
// // 也是李雷
// storage2.getItem('name')

// // 返回true
// storage1 === storage2

// 单例模式第二个实战练习
// 实现一个全局唯一的Modal弹框;

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>单例模式弹框</title>
// </head>
// <style>
//     #modal {
//         height: 200px;
//         width: 200px;
//         line-height: 200px;
//         position: fixed;
//         left: 50%;
//         top: 50%;
//         transform: translate(-50%, -50%);
//         border: 1px solid black;
//         text-align: center;
//     }
// </style>
// <body>
// 	<button id='open'>打开弹框</button>
// 	<button id='close'>关闭弹框</button>
// </body>
// <script>
//     // 核心逻辑，这里采用了闭包思路来实现单例模式
//     const Modal = (function() {
//     	let modal = null
//     	return function() {
//             if(!modal) {
//             	modal = document.createElement('div')
//             	modal.innerHTML = '我是一个全局唯一的Modal'
//             	modal.id = 'modal'
//             	modal.style.display = 'none'
//             	document.body.appendChild(modal)
//             }
//             return modal
//     	}
//     })()
    
//     // 点击打开按钮展示模态框
//     document.getElementById('open').addEventListener('click', function() {
//         // 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理
//     	const modal = new Modal()
//     	modal.style.display = 'block'
//     })
    
//     // 点击关闭按钮隐藏模态框
//     document.getElementById('close').addEventListener('click', function() {
//     	const modal = new Modal()
//     	if(modal) {
//     	    modal.style.display = 'none'
//     	}
//     })
// </script>
// </html>