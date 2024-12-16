export const CustomEvent =  {
    listeners: {} as any,
    on: function (event: string | number, fn: any) {
        (this.listeners[event] || (this.listeners[event] = [])).push(fn);
    },
    off: function(event: string | number, fn: any) {
      const eventList = this.listeners[event];
      eventList && eventList.length && (this.listeners[event] = [eventList.filter((f: any) => f!==fn)]);
    },
    emit: function(event: string | number, ...arg: any[]) {
      this.listeners[event] && this.listeners[event].forEach((fn: any) => fn?.apply(this, arg));
    }
}
export const JSONfn = () => {
    let JSONfn:any;
    if (!JSONfn) {
        JSONfn = {};
    }
    JSONfn.stringify = function(obj: any) {
      return JSON.stringify(obj,function(key: any, value: { toString: () => any; }){
              return (typeof value === 'function' ) ? value.toString() : value;
          });
    }
    JSONfn.parse = function(str: string) {
      return JSON.parse(str,function(key: any, value: string){
          if(typeof value != 'string') return value;
          return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
      });
    }
    return { ...JSONfn }
}
export const JSONFn = JSONfn();

/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
export const debounce = (func:any, wait:number, immediate?:boolean) => {
  let timer:any;
  return function () {
      let args = arguments;
      if (timer) clearTimeout(timer);
      if (immediate) {
          let callNow = !timer;
          timer = setTimeout(() => {
              timer = null;
          }, wait)
          if (callNow) func.apply(this, args)
      } else {
          timer = setTimeout(function() {
              func.apply(this, args)
          }, wait);
      }
  }
}