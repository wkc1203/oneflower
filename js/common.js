  function getUrlParam () {
    var url        = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") !== -1) {
      var str = url.substr(1);
      strs    = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }

  function getParam (param) {
    let query = window.location.search
    let iLen = param.length
    let iStart = query.indexOf(param)
    if(iStart == -1) {
      return ""
    }
    iStart += iLen + 1
    let iEnd = query.indexOf("&", iStart); //获取第二个参数的其实索引
    if(iEnd == -1) {
      return query.substring(iStart); //获取单个参数的参数值
    }
    return query.substring(iStart, iEnd); //获取第二个参数的值
  }

  function getOs () {
    var os = ''
    const ua      = navigator.userAgent
    const windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/)
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
    const ipad    = ua.match(/(iPad).*OS\s([\d_]+)/)
    const ipod    = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
    const iphone  = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/)

    if (windows) {
        os = 'windows'
    }

    if (android && !windows) {
        os = 'android'
    }

    if (ipad || iphone || ipod) {
        os = 'ios'
    }

    return os
}
function isTencent () {
    var ua    = navigator.userAgent.toLowerCase();
    var isWx  = ua.indexOf('micromessenger') !== -1;
    var QQRex = new RegExp(/\s+QQ/ig)
    var isQQ  = QQRex.test(ua)

    return isWx || isQQ
}