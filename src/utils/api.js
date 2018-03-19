import axios from 'axios'

let fetch = {}

export const post = function (url,body,options) {
  return new Promise((resolve, reject) => {
    axios.post(url,body,options).then((data) => {
      resolve(data)
    }).catch(data => {
      reject(data)
    })
  })
}

export const get = function (url,options) {
	return new Promise((resolve,reject) => {
      axios.get(url,options).then((data) =>{
        resolve(data)
      }).catch((data)=> {
      	reject(data)
      })
	})
}




