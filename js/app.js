;$(function () {
  getDetail()

  function getDetail () {
    var data = getUrlParam()
    var goodsId = data.goodsId ? data.goodsId : ''

    $.ajax({
      url: server + 'app/goodsStandard/getDetail.json',
      type: 'POST',
      data: {
        goodsId: goodsId
      }
    })
      .done(function (res) {
        if (res.code !== 0) {
          return
        }

        var data        = res.object
        var carouseList = data.goodsFlowList
        var reduceList  = data.activityConfigurationList
        var goodsInfo   = data.goodsStandardRelationList

        carouseHtml(carouseList)
        reduceHtml(reduceList)
        $('#goodsName').html(data.goodsName)
        $('#goodsDescription').html(data.goodsDescription)
        $('#nowPrice').html('¥' + goodsInfo[0].nowPrice)
        $('#oldPrice').html('¥' + goodsInfo[0].oldPrice)
        $('#logisticsAddress').html(goodsInfo[0].logisticsAddress)
        $('#distributionScope').html(goodsInfo[0].distributionScope)
        $('#preferentialInfo').html(goodsInfo[0].preferentialInfo)
      })
      .fail(function (res) {
        console.log('获取详情失败')
      })
      .always(function (res) {
      })
  }

  function carouseHtml (list) {
    if (!list instanceof Array || list.length === 0) {
      return
    }

    var html = ''

    list.forEach(function (v) {
      html += `<div class="swiper-slide"><img src=${v.url} /></div>`
    })

    $('#carouse').html(html)

    var mySwiper = new Swiper('#focus', {
      loop: true,
      autoplay: {
        disableOnInteraction: false,
      },
      // 如果需要分页器
      pagination: {
        el: '#focus .swiper-pagination',
        type: 'fraction'
      },
    })
  }

  function reduceHtml (list) {
    if (!list instanceof Array || list.length === 0) {
      return
    }

    var html = ''

    list.forEach(function (v) {
      html += `<div class = "list-item list-item-only-value" >
                <div class = "list-item-value" >
                  <div class = "tag" >满减</div >
                  <span >${v.fullSubtractionName}</span >
                </div >
              </div >`
    })

    $('#reduce').html(html)
  }

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

  $('.link-button').on('click', function (e) {
    e.preventDefault()
    var data = getUrlParam()
    var inviteCode = data.inviteCode ? data.inviteCode : ''
    window.location.href = './down-two.html?inviteCode=' + inviteCode
  })
})
