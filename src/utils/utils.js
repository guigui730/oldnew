
export function share (opt, callback) {
  window.yl.call("setTitleBarRightButton", {
      rightButtonShow: true,
      rightButtonTextOpen: true,
      rightButtonText: "分享",
      rightButtonIcon: "",
      loadingList: false,
    },
    {
      onSuccess: function(a) {
        window.yl.call("share", {
            businessId:'201905289907',
            title: opt.title,
            content: opt.content,
            shareUrl: opt.shareUrl,
            imageUrl: opt.imageUrl
          },
          {
            onSuccess: function(a) {
              
            //   Toast({
            //     message:'分享成功',
            //     duration: 2000
            //   });
            this.$message({
                text:'分享成功'
            })
            },
            onFail: function(a) {console.log(a)}
          })
      },
      onFail:function (a) {
        console.log('fail')
      }
    });

    if(wx_conf)
      wx.config(wx_conf);
    //主要解决分享中小图片不能显示的问题。
    let shareDataForMessage = {
      title: opt.title,
      desc: opt.content,
      imgUrl: opt.imageUrl,
      link: opt.shareUrl,
      success: function () {
        
      },
      cancel: function () {
      }
    };
    let shareDataForTimeLine = {
      title: opt.title,
      desc: opt.content,
      imgUrl: opt.imageUrl,
      link: opt.shareUrl,
      success: function () {
        
      },
      cancel: function () {
      }
    };

    if (typeof wx != 'undefined') {
      wx.ready(function () {
        // 分享到朋友圈
        wx.onMenuShareTimeline(
          shareDataForTimeLine
        );
        // 分享给朋友
        wx.onMenuShareAppMessage(
          shareDataForMessage
        );
        // 分享到QQ
        wx.onMenuShareQQ(
          shareDataForMessage
        );
        // 分享到QQ空间
        wx.onMenuShareQZone(
          shareDataForMessage
        );
        wx.hideMenuItems({
          menuList: [
            'menuItem:exposeArticle', //举报
            'menuItem:setFont',
            'menuItem:refresh',
            'menuItem:originPage',
            'menuItem:readMode',
            'menuItem:global:email'
          ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
      });
    }
}
export function shareBtn(opt,callback) {
  window.yl.call("share", {
      businessId:'201905289907',
      title: opt.title,
      content: opt.content,
      shareUrl: opt.shareUrl,
      imageUrl: opt.imageUrl
    },
    {
      onSuccess: function(a) {
        // Toast({
        //   message:'分享成功',
        //   duration: 2000
        // });
        this.$message({
            text:'分享成功'
        })
      },
      onFail: function(a) {console.log(a)}
    })
}

