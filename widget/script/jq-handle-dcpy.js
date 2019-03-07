/***********************************上传、添加、浏览图片、计算图片名称*******************************************/
// 上传图片
function uploadImg(type, moudle) {
    var method;
    if (moudle != null && moudle == 'dcpysri') {
        method = 'dcpyData.qtUploadPictureFile';
    } else {
        method = 'dcpyData.uploadPicture';
    }
    var imgName = getCalImgName(type);
    imageUpload($api.getStorage('serverIp'), imgName, '', '', '', method,
        function(data) {
            var dateJson = $api.strToJson(data);
            //console.info(data)
            if (dateJson.result != 200) {
                api.toast({
                    msg: '上传失败',
                    duration: 3000,
                    location: 'middle'
                });
            } else {
                addShowImg(dateJson.data[0]);
            }
        }
    );
}
// 添加图片信息到页面
function addShowImg(data) {
    var template = $api.byId('template');
    var list = $api.byId('imgList');
    var tempFn = doT.template(template.innerHTML);
    var html = tempFn(data);
    //console.info('img-->'+html);
    $api.prepend(list, html);
    //api.parseTapmode();
}
//浏览图片
function viewImg(obj, moudle) {
    var allImgObj = $api.domAll($api.byId('imgList'), 'img');
    // 浏览图片集合
    var imgViewArr = new Array();
    // 当前图片位置
    var index = 0;
    for (var i=0; i<allImgObj.length; i++) {
        if (allImgObj[i] == obj){
            index = i;
        }
        var imgSrc = $api.attr(allImgObj[i],'src');
        if (moudle != 'dcpysri') {
            if (imgSrc.indexOf(picKey) == -1) {
                imgSrc = imgSrc + '?key=' + picKey;
            }
        }
        imgViewArr.push(imgSrc);
    }
    api.execScript({
        name: winName,
        script: 'viewImg(\'' + imgViewArr + '\', \'' + index + '\');'
    });
}
//按规则计算图片文件名
function getCalImgName(type) {
    var nameList = $api.domAll('.imgNameCls');
    var nameArr = new Array();

    var name, number, newName;
    for (var i=0; i<nameList.length; i++) {
        name = $api.html(nameList[i]);
        //调查文件_1.jpg
        //number = name.substring(name.lastIndexOf("_") + 1, name.lastIndexOf("."));
        number = name.split('.')[0].split('_')[1];
        if (number != null && number != '' && /^[0-9]+$/.test(number)) {
            nameArr.push(number);
        }
    }
    if (nameArr.length > 0) {
        var maxnum = Math.max.apply(null, nameArr) + 1;
        if (type == 'rhdc') {
            newName = "调查文件_" + maxnum + ".jpg";
        } else {
            newName = "评议文件_" + maxnum + ".jpg";
        }
    } else {
        if (type == 'rhdc') {
            newName = "调查文件_1.jpg";
        } else {
            newName = "评议文件_1.jpg";
        }
    }
    return newName;
}
/***********************************上传、添加、浏览图片、计算图片名称*******************************************/

/***********************************上传、添加、播放视频、计算视频名称*******************************************/
// 上传视频
function uploadVideo(type) {
    var videoName = getCalVideoName(type);
    videoUpload($api.getStorage('serverIp'), videoName, 'dcpyData.uploadVideoForFile',
        function(data) {
            var dateJson = $api.strToJson(data);
            //console.info(data)
            addShowVideo(dateJson.msg.data[0]);
        }
    );
}
// 添加视频信息到页面
function addShowVideo(data) {
    var template = $api.byId('template1');
    var list = $api.byId('videoList');
    var tempFn = doT.template(template.innerHTML);
    var html = tempFn(data);
    //console.info('video-->'+html);
    $api.prepend(list, html);
    //api.parseTapmode();
}
//浏览视频
function viewVideo(obj) {
    // 获取视频播放路径
    var vPath = $api.attr(obj,'videoPath');
    var el = $api.closest(obj, '.material-image');
    // 获取视频名称
    var vName = $api.html($api.next(el));
    api.execScript({
        name: winName,
        script: 'viewVideo(\'' + vPath + '\', \'' + vName + '\');'
    });
}
//按规则计算视频文件名
function getCalVideoName(type) {
    var nameList = $api.domAll('.videoNameCls');
    var nameArr = new Array();

    var name, number, newName;
    for (var i=0; i<nameList.length; i++) {
        name = $api.html(nameList[i]);
        //调查视频_1.mp4
        //number = name.substring(name.lastIndexOf("_") + 1, name.lastIndexOf("."));
        number = name.split('.')[0].split('_')[1];
        if (number != null && number != '' && /^[0-9]+$/.test(number)) {
            nameArr.push(number);
        }
    }
    if (nameArr.length > 0) {
        var maxnum = Math.max.apply(null, nameArr) + 1;
        if (type == 'rhdc') {
            newName = "调查视频_" + maxnum + ".mp4";
        } else {
            newName = "评议视频_" + maxnum + ".mp4";
        }
    } else {
        if (type == 'rhdc') {
            newName = "调查视频_1.mp4";
        } else {
            newName = "评议视频_1.mp4";
        }
    }
    return newName;
}
/***********************************上传、添加、播放视频、计算视频名称******************************************/
// 删除文件（图片、视频）
function delImgOrVideo(obj){
    //console.info(JSON.stringify(obj))
    var dialog = new auiDialog({});//弹框
    dialog.alert({
        title: '',
        msg: '确认删除文件？',
        buttons:['取消','确认']
    }, function (ret) {
        if (ret.buttonIndex == 2) {
            var el = $api.closest(obj, '.material1');
            $api.remove(el);
        }
    })
}
//调查日期选择
function selectDate() {
    api.openPicker({
        type: 'date',
        title: '日期选择'
    }, function(ret, err) {
        if (ret) {
            var year = ret.year;
            var month = ret.month + '';
            month = month.length > 1 ? month : '0' + month;
            var day = ret.day + '';
            day = day.length > 1 ? day : '0' + day
            $api.val($api.dom('input[name="dcpyDate"]'), year + '-' + month + '-' + day);
        }
    });
}

/***********************************获取定位信息*******************************************/
// 获取当前经纬度信息
function getLocation() {
    $jq.loading('定位中...');
    dmap.getLocation({
        accuracy: '100m',
        autoStop: true,
        filter: 1
    }, function(ret, err) {
        setTimeout(function(){
            api.hideProgress();
        }, 2000);
        if (ret.status) {
            locationLat = ret.lat;
            locationLon = ret.lon;
            //console.info(JSON.stringify(ret));
            getNameFromCoords(locationLon, locationLat);
        } else {
            api.toast({
                msg: "定位失败！",
                duration: 3000,
                location: 'middle'
            });
        }
    });
}
// 根据经纬度获取地址
function getNameFromCoords(lon, lat) {
    dmap.getNameFromCoords({
        lon: lon,
        lat: lat
    }, function(ret, err) {
        if (ret.status) {
            //alert(JSON.stringify(ret));
            $api.val($api.byId("longitude"), lon);
            $api.val($api.byId("latitude"), lat);
            $api.val($api.byId("diaochaaddress"), ret.address);
        } else {
            api.toast({
                msg: "获取位置信息失败",
                duration: 3000,
                location: 'middle'
            });
        }
    });
}

/**
 * @author: xizc
 * @date: 2018-12-29
 * @desc: 地图定位
 */
function openBDLocation(){
    var longitude = $api.val($api.byId("longitude"));//经度
    var latitude = $api.val($api.byId("latitude"));//纬度
    api.openWin({
        name: 'baidu_location_win',
        url: '../../baidu/location/baidu_location_win.html',
        pageParam: {
            destLat: latitude,
            destLon: longitude,
            comeFrom: 'dcpy'
        }
    });
}
