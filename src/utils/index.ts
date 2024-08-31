export const StorageEmitter =  {
    listeners: {} as any,
    on: function (event: string | number, fn: any) {
      (this.listeners[event] || (this.listeners[event] = [])).push(fn);
    },
    off: function(event: string | number, fn: any) {
      const eventList = this.listeners[event];
      eventList && eventList.length && (this.listeners[event] = [eventList.filter((f: any) => f!==fn)]);
    },
    emit: function(event: string | number, ...arg: any[]) {
      this.listeners[event] && this.listeners[event].forEach((fn: { apply: (arg0: { listeners: any; on(event: string | number, fn: any): void; off(event: string | number, fn: any): void; emit(event: string | number, ...arg: any[]): void; }, arg1: any[]) => any; }) => fn.apply(this, arg));
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