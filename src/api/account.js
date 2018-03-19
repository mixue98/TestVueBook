import {post, get} from '../../src/utils/api.js'
export const login = (pram) => {
	return new Promise((resolve, reject)=>{
	    post('/login',pram).then((data)=>{
		   resolve(data.data)
		}).catch((data)=>{
	      reject(data.data)
		})
	})
}
export const register = (pram) => {
	return new Promise((resolve, reject)=>{
	    post('/register',pram).then((data)=>{
		   resolve(data.data)
		}).catch((data)=>{
	      reject(data.data)
		})
	})
}
//加购物车
export const addToCart = (pram) => {
	debugger
	return new Promise((resolve, reject)=>{
	    post('/addToCart',pram).then((data)=>{
		   resolve(data.data)
		}).catch((data)=>{
	      reject(data.data)
		})
	})
}
//显示书籍
export const findBooksByPage = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/findBooksByPage',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//分类显示书籍
export const findBooksByClassify= (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/findBooksByClassify',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}


//显示购物车
export const findAllCartByPage = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/findAllCartByPage',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//计算价格
export const calculateTatolById = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/calculateTatolById',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//删除商品
export const removeToCart = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/removeToCart',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//批量删除商品
export const removeByQuery = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/removeByQuery',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}


//获取地址
export const findAllAddress = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/findAllAddress',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//删除地址
export const deleteAddress = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/deleteAddress',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//新增地址
export const addAddress = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/addAddress',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//修改地址
export const updateAddress = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/updateAddress',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}


//获取用户名
export const getusername = (pram) => {
	return new Promise((resolve,reject) => {
		get('/findLogin',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//显示用户信息
export const findUser = (pram) => {
	return new Promise((resolve,reject) => {
		post('/findUser',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//提交用户信息
export const GetInformation = (pram) => {
	return new Promise((resolve,reject) => {
		post('/updateUser',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//修改登陆密码
export const updatePwd = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/updatePwd',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//匹配支付密码
export const payment = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/payment',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//设置支付密码
export const addPayPwd = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/addPayPwd',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//判断支付是否设置
export const checkPayPwd = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/checkPayPwd',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//填写订单
export const showPaid = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/showPaid',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//全部订单分页
export const findAllOrdersByPage = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/findAllOrdersByPage',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//获取订单的不同状态
export const findAllOrdersByState  = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/findAllOrdersByState',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//新增订单
export const addToOrders = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/addToOrders',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//删除待付款订单
export const deleteOrders = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/deleteOrders',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//更新订单状态
export const updateOrder = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/updateOrder',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}


//获取订单商品信息
export const findOrderItem = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/findOrderItem',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})

}

//添加评论
export const addComment = (pram) => {
	debugger
	return new Promise((resolve,reject) => {
		post('/addComment',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//生成验证码
export const createcode = (pram) => {
	return new Promise((resolve,reject) => {
		post('/createcode',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//验证验证码
export const validate = (pram) => {
	return new Promise((resolve,reject) => {
		post('/validate',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//忘记密码设置的新密码
export const forgetPwd = (pram) => {
	return new Promise((resolve,reject) => {
		post('/forgetPwd',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//店家管理员添加商品
export const addBooks = (pram) => {
	return new Promise((resolve,reject) => {
		post('/addBooks',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//店家管理员更新商品
export const updateBook = (pram) => {
	return new Promise((resolve,reject) => {
		post('/updateBook',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//店家管理员移除商品
export const removeBook = (pram) => {
	return new Promise((resolve,reject) => {
		post('/removeBook',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}

//店家管理员获取所有书籍
export const findAllBooks = (pram) => {
	return new Promise((resolve,reject) => {
		post('/findAllBooks',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}
//查询
export const searchBook = (pram) => {
	return new Promise((resolve,reject) => {
		post('/searchBook',pram).then((data) => {
			resolve(data.data)
		}).catch((data)=> {
			reject(data.data)
		})
	})
}


//所有评论
export const findComment = (pram) => {
  return new Promise((resolve,reject) => {
    post('/findComment',pram).then((data) => {
      resolve(data.data)
    }).catch((data)=> {
      reject(data.data)
    })
  })
}

//商品详情
export const booksItem = (pram) => {
  return new Promise((resolve,reject) => {
    post('/booksItem',pram).then((data) => {
      resolve(data.data)
    }).catch((data)=> {
      reject(data.data)
    })
  })
}

//管理员查找所有订单
export const findAllOrder = (pram) => {
  return new Promise((resolve,reject) => {
    post('/findAllOrder',pram).then((data) => {
      resolve(data.data)
    }).catch((data)=> {
      reject(data.data)
    })
  })
}

//管理员查找所有订单按状态分类显示
export const findAllOrderByState = (pram) => {
  return new Promise((resolve,reject) => {
    post('/findAllOrderByState',pram).then((data) => {
      resolve(data.data)
    }).catch((data)=> {
      reject(data.data)
    })
  })
}

//管理员更新订单状态为已发货
export const updateState = (pram) => {
  return new Promise((resolve,reject) => {
    post('/updateState',pram).then((data) => {
      resolve(data.data)
    }).catch((data)=> {
      reject(data.data)
    })
  })
}

//管理员注册
export const managerRegister = (pram) => {
  return new Promise((resolve,reject) => {
    post('/managerRegister',pram).then((data) => {
      resolve(data.data)
    }).catch((data)=> {
      reject(data.data)
    })
  })
}


//管理员登陆
export const managerLogin = (pram) => {
  return new Promise((resolve,reject) => {
    post('/managerLogin',pram).then((data) => {
      resolve(data.data)
    }).catch((data)=> {
      reject(data.data)
    })
  })
}

















