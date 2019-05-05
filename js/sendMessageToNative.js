const ua = navigator.userAgent

let device = ''

if (ua.match(/(Android);?[\s/]+([\d.]+)?/)) {
  device = 'android'
}

if (ua.match(/(iPhone\sOS)\s([\d_]+)/)) {
  device = 'ios'
}

export const sendMessageToIOS = (msg) => {
  if (
    window &&
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.AppModel
  ) {
    window.webkit.messageHandlers.AppModel.postMessage(msg)
  }
}

export const sendMessageToAndroid = (msg) => {
  if (
    window &&
    window.objJS &&
    window.objJS.gotoJump
  ) {
    window.objJS.gotoJump(JSON.stringify(msg))
  }
}

export const sendMessageToNative = (msg) => {
  if (device === 'ios') {
    sendMessageToIOS(msg)
  }

  if (device === 'android') {
    sendMessageToAndroid(msg)
  }

  console.warn('不支持的设备')
}
