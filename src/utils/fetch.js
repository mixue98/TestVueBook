/**
 * [defaultParams description]
 * @type {Object}
 */
import axios from 'axios'

let submit = (options = {
  params: {},
  method: 'POST',
  action: '',
  target: '_blank'
}) => {
  var form = document.createElement('form')
  form.method = options.method
  form.action = options.action
  form.target = options.target
  form.style.display = 'none'
  for (let param in options.params) {
    var element = document.createElement('input')
    element.name = param
    element.value = options.params[param]
    form.appendChild(element)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}


let $fetch = (Vue) => {
  let fetch = {};
  ['get', 'delete', 'head', 'jsonp'].forEach((method) => {
    fetch[method] = function (url, options) {
      return new Promise((resolve, reject) => {
        axios[method](url, options).then((data) => {
          resolve(data)
        }).catch(data => {
          reject(data)
        })
      })
    }
  });

  ['post', 'put', 'patch'].forEach((method) => {
    fetch[method] = function (url, body, options) {
      return new Promise((resolve, reject) => {
        axios[method](url, body, options).then((data) => {
          resolve(data)
        }).catch(data => {
          reject(data)
        })
      })
    }
  })
  fetch.submit = submit
  return fetch
}
let plugin = (Vue) => {
  if (plugin.installed) {
    return
  }
  Vue.fetch = $fetch(Vue)
  Vue.prototype.$fetch = Vue.fetch
}
export default plugin
