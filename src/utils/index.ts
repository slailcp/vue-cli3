type Pos = {
  top:string;
  right:string;
  bottom:string;
  left:string;
  width:string;
  height:string;
}

export const getPos = (Dom: any):Pos  => {
    const scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
        scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        const pos = Dom.getBoundingClientRect();
    return { 
      top: pos.top + scrollt, 
      right: pos.right + scrollx, 
      bottom: pos.bottom + scrollt, 
      left: pos.left + scrollx,
      width: pos.width, 
      height: pos.height
    }
  }

/* 阻止冒泡 */
export const stopPropagation = (event: any) => {
    event = event || window.event;
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

/* 防抖 */
export const debounce = (fn: Function, delay: number) => {
  let timeout: any = null
  return function(){
    let args = arguments
    if(!timeout){
      timeout = setTimeout(() => {
        timeout = null
        // @ts-ignore: Unreachable code error
        fn.apply(this, args)
      }, delay)
    }
  }
}


