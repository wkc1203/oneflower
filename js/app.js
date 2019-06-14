;$(function () {
  getDetail()
  statistic()
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
  function statistic() {
    var data = getUrlParam();
    var goodsId = data.goodsId ? data.goodsId : '';
    if (getOs() === 'ios') {
        window.location.href ='YZYHAPP://?goodsId=' + goodsId;
    } else {
        window.location.href = 'ypf://yzyh?goodsId=' + goodsId;
    }
  }

  $('.link-button').on('click', function (e) {
    e.preventDefault()
    var data = getUrlParam()
    var inviteCode = data.inviteCode ? data.inviteCode : ''
    var goodsId = data.goodsId ? data.goodsId : ''
    window.location.href = './down-two.html?inviteCode=' + inviteCode + '&goodsId=' + goodsId
  })
})
