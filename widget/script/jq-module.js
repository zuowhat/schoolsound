/**
 * @desc: 图片预览，传图片路径数组
 * @author: LCXU
 * @Date: 2018-11-08
 * @param: files  图片路径数组 如[path1, path2]
 * @param: index 要显示的图片索引，如果不传，默认从第一张显示
 */
var photoBrowser;
var imgSrcFiles = []; //预存图片预览数组
var isFrontImg = false; //判断图片是否显示在顶层，主要为了监听键盘返回事件
function imagePreview(files, index) {
    isFrontImg = true;
    if (index == "" || index == undefined) {
        index = 0; //不传，默认从第一张显示
    }
    photoBrowser = api.require('photoBrowser');
    photoBrowser.open({
        images: files,
        placeholderImg: 'widget://res/img/apicloud.png', //图片占位路径
        bgColor: '#000'
    }, function(ret, err) {
        if (ret) {
            isFrontImg = true;
            if (ret.eventType == 'click') {
                photoBrowser.close();
                isFrontImg = false;
            }
            if (ret.eventType == 'longPress') {
                downLoadImg(files);
            }
        }
    });
    //显示第几章图片位置索引
    photoBrowser.setIndex({
        index: index
    });
}

function downLoadImg(files) {
    photoBrowser.getIndex(function(ret0, err0) {
        var imgIndex = ret0.index;
        api.actionSheet({
            buttons: ['下载'],
            cancelTitle: '取消'
        }, function(ret1, err1) {
            if (ret1.buttonIndex == 1) {
                api.download({
                    url: files[imgIndex],
                    report: true,
                    cache: true,
                    allowResume: true
                }, function(ret2, err2) {
                    if (ret2.state == 1) {
                        api.saveMediaToAlbum({
                            path: ret2.savePath
                        }, function(ret3, err3) {
                            api.toast({
                                msg: '下载成功',
                                duration: 2000,
                                location: 'bottom'
                            });
                        });
                    }
                });
            }
        });
    });
}

/**
 * @desc: 页面的一些图片，譬如新闻页面的图片，添加点击事件，首先遍历所有class=imgPreview下的所有图片放到数组里
 * 然后再给这些图片添加点击事件，点击图片后调用preViewImg()方法
 * @author: LCXU
 * @Date: 2018-12-03
 */
function preImagePreview() {
    // api.parseTapmode();
    var objs = document.getElementsByClassName("imgPreview")
    for (var i = 0; i < objs.length; i++) {
        var imgs = objs[i].getElementsByTagName("img");
        for (var j = 0; j < imgs.length; j++) {
            imgSrcFiles.push(imgs[j].src)
            $api.addEvt(imgs[j], 'click', function(e) {
                //alert(JSON.stringify(e.target.src));
                preViewImg(e.target.src);
            });
        }
    }

}

/**
 * @desc: 点击图片事件，获取对应图片的index，再去调用图片预览
 * @author: LCXU
 * @Date: 2018-12-03
 */
function preViewImg(imgSrc) {
    for (var i = 0; i < imgSrcFiles.length; i++) {
        if (imgSrcFiles[i] == imgSrc) {
            isFrontImg = true;
            imagePreview(imgSrcFiles, i);
        }
    }
}

/**
 * @desc: 视频播放
 * @author: LCXU
 * @Date: 2018-11-08
 * @param: path 视频路径
 * @param: title 视频标题
 */
function videoPlayer(path, title) {
    var videoPlayer = api.require('videoPlayer');
    videoPlayer.play({
        texts: {
            head: {
                title: title
            }
        },
        styles: {
            head: {
                bg: 'rgba(0.5,0.5,0.5,0.7)',
                height: 30,
                titleSize: 15,
                titleColor: '#fff',
                backSize: 20,
                backImg: 'fs://img/back.png',
                setSize: 15,
                setImg: 'fs://img/set.png'
            },
            foot: {
                bg: 'rgba(0.5,0.5,0.5,0.7)',
                height: 30,
                playSize: 20,
                playImg: 'fs://img/back.png',
                pauseImg: 'fs://img/back.png',
                nextSize: 20,
                nextImg: 'fs://img/back.png',
                timeSize: 10,
                timeColor: '#fff',
                sliderImg: 'fs://img/slder.png',
                progressColor: '#696969',
                progressSelected: '#76EE00'
            }
        },
        path: path, //（可选项）字符串类型；文档的路径，支持网络和本地（fs://）路径；默认：未传值时不播放
        //在 android 平台上不支持 widget://
        autoPlay: true //（可选项）布尔类型；打开时是否自动播放；默认：true（自动播放）
    });
}

/**
 * @desc: 图片上传
 * @author: LCXU
 * @Date: 2018-11-08
 * @param: serverUrl 上传地址
 * @param: picName 图片名称
 * @param: fileCode 附件类型码，参照后台数据字典、
 * @param: batchNo 批次号
 * @param: itemId 救助项ID
 * @param: method:后台方法名称
 * @param: callback 回调函数，返回服务器的json字符串
 */
function imageUpload(serverUrl, picName, fileCode, batchNo, itemId, method, callback) {
    api.actionSheet({
        title: '上传图片',
        cancelTitle: '取消',
        buttons: ['拍照', '从手机相册选择']
    }, function(ret, err) {
        if (ret) {
            getPicture(ret.buttonIndex, serverUrl, picName, fileCode, batchNo, itemId, method, function(data) {
                callback(data);
            });
        }
    });
}



/**
 * @desc: 获取图片
 * @author: LCXU
 * @Date: 2018-11-08
 * @param: sourceType： 1拍照 2从资源库选择
 * @param: serverUrl: 上传地址
 * @param: picName: 图片名称
 * @param：fileCode: 附件类型码，参照后台数据字典、
 * @param：batchNo： 批次号
 * @param：itemId： 救助项ID
 * @param：method: 后台方法名称
 * @param：callback: 回调函数，返回服务器的json字符串
 */
function getPicture(sourceType, serverUrl, picName, fileCode, batchNo, itemId, method, callback) {
    if (sourceType == 1) { // 拍照
        api.getPicture({
            sourceType: 'camera',
            encodingType: 'jpg',
            mediaValue: 'pic',
            allowEdit: false,
            destinationType: 'base64', //指定返回数据为base64编码后内容
            quality: 60,
            saveToPhotoAlbum: true,
            targetWidth: 800
        }, function(ret, err) {
            if (ret.data != "") {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    text: '图片上传中...',
                    modal: false
                });
                return imageUploading(ret.base64Data, serverUrl, picName, fileCode, batchNo, itemId, method, function(data) {
                    callback(data);
                });
            } else {
                return;
            }

        });
    } else if (sourceType == 2) { // 从相机中选择
        api.getPicture({
            sourceType: 'library',
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'base64', //指定返回数据为base64编码后内容
            quality: 60,
        }, function(ret, err) {
            // alert(JSON.stringify(err));
            if (ret.data != "") {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    text: '图片上传中...',
                    modal: false
                });
                return imageUploading(ret.base64Data, serverUrl, picName, fileCode, batchNo, itemId, method, function(data) {
                    callback(data);
                });
            } else {
                return;
            }
        });
    } else {
        return;
    }
}

/**
 * @desc: 图片上传中
 * @author: LCXU
 * @Date: 2018-11-08
 * @param：base64Data base64编码
 * @param：serverUrl 上传地址
 * @param：picName 图片名称
 * @param：fileCode 附件类型码，参照后台数据字典、
 * @param：batchNo 批次号
 * @param：itemId 救助项ID
 * @param：method 后台方法名称
 * @param：callback 回调函数，返回服务器的json字符串
 */
function imageUploading(base64Data, serverUrl, picName, fileCode, batchNo, itemId, method, callBack) {
    var data = {
        values: {
            sRequest: {
                fileName: picName,
                fileSize: 0,
                fileCode: fileCode,
                createTime: (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
                batchNo: batchNo,
                itemId: itemId,
                method: method,
                apiKey: 'LCSD',
                token: 'DHJFDUNDBFNDBFKUEWUIFW',
                timeStamp: '1456745679',
                base64: base64Data
            }
        }
    };
    if (fileCode == "" && batchNo == "" && itemId == "") {
        data.values.sRequest.base64 = '';
        data.values.sRequest.fileBase64 = base64Data;
    }
    api.ajax({
        url: serverUrl,
        method: "post",
        data: data
    }, function(ret, err) {
        if (ret) {
            api.hideProgress();
            callBack(JSON.stringify(ret));
        } else {
            api.alert({
                title: "上传失败！",
                msg: JSON.stringify(err)
            });
        }
        api.hideProgress();
    });
}

/**
 * @desc:  对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @author: LCXU
 * @Date: 2018-11-08
 */
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * @desc: 视频上传
 * @author: LCXU
 * @Date: 2018-11-08
 * @param:serverUrl 上传地址
 * @param: videoName 视频名称
 * @param: method 后台方法
 * @param: callback 回调函数
 */
function videoUpload(serverUrl, videoName, method, callback) {
    api.actionSheet({
        title: '上传视频',
        cancelTitle: '取消',
        buttons: ['录像', '从手机相册选择']
    }, function(ret, err) {
        if (ret) {
            getVideo(ret.buttonIndex, serverUrl, videoName, method, function(data) {
                callback(data);
            });
        }
    });
}

/**
 * @desc: 录像或者从相册选取视频
 * @author: LCXU
 * @Date: 2018-11-08
 * @param： sourceType 1录像，2从相册选择
 * @param:serverUrl 上传地址
 * @param: videoName 视频名称
 * @param: method 后台方法
 * @param: callback 回调函数
 */
function getVideo(sourceType, serverUrl, videoName, method, callback) {
    if (sourceType == 1) { // 录像
        api.getPicture({
            sourceType: 'camera',
            mediaValue: 'video',
            allowEdit: false,
            destinationType: 'url',
            saveToPhotoAlbum: true
        }, function(ret, err) {
            if (ret.data != "") {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    text: '视频上传中...',
                    modal: false
                });
                videoUploading(ret.data, serverUrl, videoName, method, function(data) {
                    callback(data);
                });
            } else {
                retrun;
            }
        });
    } else if (sourceType == 2) { // 从相机中选择
        api.getPicture({
            sourceType: 'library',
            mediaValue: 'video',
            destinationType: 'url'
        }, function(ret, err) {
            if (ret.data != "") {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    text: '视频上传中...',
                    modal: false
                });
                videoUploading(ret.data, serverUrl, videoName, method, function(data) {
                    callback(data);
                });
            } else {
                return;
            }
        });
    } else {
        return;
    }
}

/**
 * @desc: 上传视频ing
 * @author: LCXU
 * @Date: 2018-11-08
 * @param： videoUrl 视频路径
 * @param:serverUrl 上传地址
 * @param: videoName 视频名称
 * @param: method 后台方法
 * @param: callback 回调函数
 */
function videoUploading(videoUrl, serverUrl, videoName, method, callback) {
    var type = api.connectionType;
    if (type == "none") {
        api.toast("当前无网络连接");
        return;
    }
    api.ajax({
        url: serverUrl,
        method: 'post',
        cache: false,
        //dataType: 'json',
        report: true,
        //returnAll: false,
        data: {
            values: {
                sRequest: {
                    method: method,
                    apiKey: 'LCSD',
                    token: 'DHJFDUNDBFNDBFKUEWUIFW',
                    timeStamp: '1456745679',
                    videoName: videoName
                }
            },
            files: {
                file: videoUrl
            } //上传视频的本地路径
        }
    }, function(ret, err) {
        if (ret.status == 0) { //上传中
            // if (ret.progress <= 100) {
            //     $("#jindu").html(ret.progress + '%'); //ret.progress这个参数会卡在98，99.以前还甚至超100.很诡异。
            // }
        } else if (ret.status == 1) { //上传完成
            api.hideProgress();
            api.toast({
                msg: "上传成功",
                duration: 3000,
                location: 'bottom'
            });
            callback(JSON.stringify(ret));
        } else if (ret.body.ret == 0) {
            api.toast(ret.body.err);
            callback(JSON.stringify(ret));
        } else { //上传失败
            api.toast({
                msg: '上传失败！可能是上传的资源过大，请到手机的相机设置中调整相机分辨率。或网络环境较差,请切换更好的网络环境',
                duration: 3000,
                location: 'bottom'
            });
        }
        api.hideProgress();
    });
}

/**
 * @desc: 极光推送设置
 * @author: LCXU
 * @Date: 2018-11-08
 * TODO 用户别名的设置，标签的设置，以及接受到消息的跳转，需要正式开发的时候做设置
 */
function jgPushSetting() {
    //设置用户参数，绑定用户
    var param = {
        alias: $api.getStorage('userinfo').userName,
        tags: $api.getStorage('userinfo').jgTag
    };
    //android需要初始化，IOS不需要
    var ajpush = api.require('ajpush');
    ajpush.init(function(ret) {
        if (ret && ret.status) {
            if (ret.status == 1) {
                // api.toast({
                //     msg: '极光推送注册成功'
                // });
            } else {
                api.toast({
                    msg: '极光推送注册失败'
                });
            }
        }
    });

    ajpush.bindAliasAndTags(param, function(ret) {
        var statusCode = ret.statusCode;
    });

    //设置设置消息监听。 注册该监听后，在应用启动的状态下，“消息”类型的推送，将直接交给该监听的回调函数，
    //由开发人员自行处理推送消息，不自动弹出通知到手机状态栏。如果移除监听，则又会自动弹出通知到手机状态栏；
    //在应用退出的状态下，“消息”类型的推送，也会自动弹出通知到手机状态栏；“通知”类型的推送则会一直弹出到手机状态栏，
    //不会交给监听函数的回调。
    // ajpush.setListener(
    //     function(ret) {
    //         var id = ret.id;
    //         var title = ret.title;
    //         var content = ret.content;
    //         var extra = ret.extra;
    //         jgPushContent(ret);
    //     }
    // );
}

function setJgListener() {
    api.addEventListener({
        name: 'appintent' //Android
    }, function(ret, err) {
        if (ret) {
            jgPushContent(ret);
        }
    });

    api.addEventListener({
        name: 'noticeclicked' //IOS
    }, function(ret, err) {
        if (ret) {
            jgPushContent(ret);
        }
    });
}

function jgPushContent(ret) {
    var userName = $api.getStorage('userName');
    if (userName == null || userName == 'null' || userName == "" || userName == undefined) {
        api.openWin({
            name: name,
            url: api.wgtRootDir + '/login.html'
        });
        return;
    }
    var noticeType = ret.appParam.ajpush.extra.pushNotificationIntent;
    var msgId = ret.appParam.ajpush.extra.msgId;
    // 0政策新闻，1是通知公告，2是我的消息,根据不同的值跳转到不同的页面
    if (noticeType == "0" || noticeType == "1") {
        var type = "touch_article_01";
        if (noticeType == "1") {
            type = "Article_5";
        }
        api.openWin({
            name: "newsnotice_list_detail_win",
            url: api.wgtRootDir + '/html/query/newsnotice/newsnotice_detail_win.html',
            pageParam: {
                id: msgId,
                type: type
            }
        });
    } else if (noticeType == "2") {
        api.openWin({
            name: "msg_list_win",
            url: api.wgtRootDir + '/html/mine/mymsg/msg_list_win.html'
        });
    }
}

// 点击电话通用方法
function clickPhone(num) {
    var clipBoard = api.require('clipBoard');
    api.actionSheet({
        //frameBounces: true, //当前页面是否弹动，（主要针对安卓端）
        title: "电话",
        cancelTitle: '取消',
        buttons: ['呼叫', '复制']
    }, function(ret, err) {
        if (ret) {
            if (ret.buttonIndex == 1) {
                api.call({
                    type: 'tel_prompt',
                    number: num
                });
            } else if (ret.buttonIndex == 2) {
                clipBoard.set({
                    value: num
                }, function(ret, err) {
                    if (ret) {
                        $jq.toast("复制到粘贴板成功");
                    }
                });
            } else {
                return false;
            }
        }
    });
}


/**
 * @author: zuoc
 * @date: 2018-12-08
 * @desc: 元素长按事件
 * @param obj-元素对象
 * @param value-元素值（由于元素取值写法目前有多种，input取值val，div取值innerText等等）
 */
function eleLongPress(obj, value) {
    var hammertime = new Hammer(obj);
    hammertime.on("press", function(ev) {
        var clipBoard = api.require('clipBoard');
        api.actionSheet({
            //frameBounces: true, //当前页面是否弹动，（主要针对安卓端）
            title: "",
            cancelTitle: '取消',
            buttons: ['复制']
        }, function(ret, err) {
            if (ret) {
                if (ret.buttonIndex == 1) {
                    clipBoard.set({
                        value: value
                    }, function(ret, err) {
                        if (ret) {
                            $jq.toast("复制到粘贴板成功");
                        }
                    });
                } else {
                    return false;
                }
            }
        });
    });
}

/**
 * @author: zuoc
 * @date: 2018-12-08
 * @desc: 列表元素添加长按事件
 * @param objs-多元素集合
 */
function listLongPress(objs) {
    for (var i = 0; i < objs.length; i++) {
        Hammer.off(objs[i], "press"); //这处代码不知是否有效果，想解决上拉加载时给老数据解绑事件，有时会出现两次弹框复制，有效性有待验证
        eleLongPress(objs[i], objs[i].innerHTML);
    }
}

/**
 * @author: zuoc
 * @date: 2018-12-08
 * @desc: 用于可编辑输入框长按复制,与上面的方法主要区别在于 value:$api.val(obj),获取当前输入框的值
 * @param id-input框的ID
 */
function dynLongPress(obj) {
    var hammertime = new Hammer(obj);
    hammertime.on("press", function(ev) {
        var clipBoard = api.require('clipBoard');
        api.actionSheet({
            //frameBounces: true, //当前页面是否弹动，（主要针对安卓端）
            title: "",
            cancelTitle: '取消',
            buttons: ['复制']
        }, function(ret, err) {
            if (ret) {
                if (ret.buttonIndex == 1) {
                    clipBoard.set({
                        value: $api.val(obj)
                    }, function(ret, err) {
                        if (ret) {
                            $jq.toast("复制到粘贴板成功");
                        }
                    });
                } else {
                    return false;
                }
            }
        });
    });
}


/**
 * @desc: 身份证银行卡识别
 * @author: wuhao
 * @Date: 2019-1-4
 * @param：serverUrl 上传地址
 * @param：cardType idCard-身份证，bankCard-银行卡
 * @param：callback 回调函数，返回服务器的json字符串
 */
function fnReadCard(serverUrl, cardType, callback) {
    api.actionSheet({
        title: '',
        cancelTitle: '取消',
        buttons: ['NFC读取身份证', '拍照识别身份证']
    }, function(ret, err) {
        if (ret) {
            if (ret.buttonIndex == 1) { // NFC读取
                var nfcModule = api.require('moduleNfc');
                nfcModule.nfcReadCard("", function(ret, err){
                    if (ret) {
                        if (ret.resultCode == '90') {
                            callback(JSON.stringify(ret));
                        } else {
                            api.toast({
                                msg: ret.resultMsg,
                                location: 'bottom'
                            });
                        }
                    } else {
                        api.toast({
                            msg: err.msg,
                            location: 'bottom'
                        });
                    }
                });
            } else if (ret.buttonIndex == 2) { // ORC识别
                api.getPicture({
                    sourceType: 'camera',
                    encodingType: 'jpg',
                    mediaValue: 'pic',
                    allowEdit: false,
                    destinationType: 'base64', //指定返回数据为base64编码后内容
                    quality: 60,
                    saveToPhotoAlbum: true,
                    targetWidth: 800
                }, function(ret, err) {
                    if (ret.data != "") {
                        api.showProgress({
                            title:'',
                            text: '图片识别中...',
                            modal: false
                        });
                        return orcReadCard(ret.base64Data, serverUrl, cardType, function(data) {
                            callback(data);
                        });
                    } else {
                        return;
                    }
                });
            } else {
                return;
            }
        }
    });
}
/**
 * @desc: ORC图片识别
 * @author: wuhao
 * @Date: 2019-1-4
 * @param：base64Data base64编码
 * @param：serverUrl 上传地址
 * @param：cardType idCard-身份证，bankCard-银行卡
 * @param：callback 回调函数，返回服务器的json字符串
 */
function orcReadCard(base64Data, serverUrl, cardType, callback) {
    var data = {
        values: {
            sRequest: {
                method: 'appUtil.ocr',
                apiKey: 'LCSD',
                token: 'DHJFDUNDBFNDBFKUEWUIFW',
                timeStamp: '1456745679',
                type: cardType,
                base64: base64Data
            }
        }
    };
    api.ajax({
        url: serverUrl,
        method: "post",
        data: data
    }, function(ret, err) {
        api.hideProgress();
        //console.info(JSON.stringify(ret));
        if (ret) {
            if (ret.data.cardNo != '') {
                callback(JSON.stringify(ret));
            } else {
                api.toast({
                    msg: '识别失败！',
                    location: 'bottom'
                });
            }
        } else {
            api.toast({
                msg: '识别失败！',
                location: 'bottom'
            });
        }
    });
}
