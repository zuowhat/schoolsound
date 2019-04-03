document.write('<script src="../../../script/echarts.js" type="text/javascript"></script>');
document.write('<script src="../../../script/api.js" type="text/javascript"></script>');
document.write('<script src="../../../script/doT.min.js" type="text/javascript"></script>');
document.write('<script src="../../../script/jq.js" type="text/javascript"></script>');
document.write('<script src="../../../script/echarts.js" type="text/javascript"></script>');
/************************* window页面使用方法****************************************/
// 打开日期选择Frame
function fnOpenDtPickerFrame(dateType, obj) {
    var selectDate = '';
    if (obj) {
        var el = obj.children[0];
        selectDate = $api.html(el);
    }
    api.openFrame({
        name: 'dtpicker_frame',
        url: 'dtpicker_frame.html',
        pageParam: {
            dateType: 'quarter',
            selectDate: selectDate
        },
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        bgColor: 'rgba(0,0,0,0.5)' // 设置Frame的透明度
    });
}

/**
 * @author: wuhao
 * @date: 2018-12-4
 * @desc: 初始化win页面信息
*/
function initWinPage(param) {
    if (param != '' && (param.indexOf('trend') != -1 || param.indexOf('grow') != -1)) {
        initQueryDate('year');// 初始化日期
        $api.addCls($api.byId('buttonMonth'), 'elHide');// 隐藏月标签
        $api.addCls($api.byId('iconMonth'), 'elHide');// 隐藏月日历
        $api.addCls($api.byId('buttonQuarter'), 'elHide');// 隐藏季标签
        $api.addCls($api.byId('iconQuarter'), 'elHide');// 隐藏季度历
        $api.removeCls($api.byId('iconYear'), 'elHide');// 显示年日历
        $api.addCls($api.byId('buttonYear'), 'mui-btn-blue');// 添加年标签选中状态
    } else {
        initQueryDate('month');
        $api.removeCls($api.byId('buttonMonth'), 'elHide');// 显示月标签
        $api.removeCls($api.byId('iconMonth'), 'elHide');// 显示月日历
        $api.addCls($api.byId('iconYear'), 'elHide');// 隐藏年日历
        $api.removeCls($api.byId('buttonYear'), 'mui-btn-blue');// 移除年标签选中状态
    }
}
/**
 * @author: wuhao
 * @date: 2018-11-14 10:36:42
 * @desc: 初始化日期查询值和显示值
*/
function initQueryDate(type) {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    if ('year' == type) {
        startDate = year + "-01-01";
        endDate = year + "-12-31";
    } else if ('quarter' == type) {
        startDate = year + "-01-01";
        endDate = year + "-03-31";
    } else {
        // 月份默认上个月
        if (month == 1) {
            // 当前一月取上一年12月
            year = year-1;
            month = 12;
        } else {
            // 上个月
            month = month - 1;
        }
        if (month < 10) {
            startDate = year + "-0" + month + "-01";
            endDate = year + "-0" + month + "-31";
        } else {
            startDate = year + "-" + month + "-01";
            endDate = year + "-" + month + "-31";
        }
    }
    $api.byId('dataTextYear').innerHTML = year;
    if (month < 10) {
        $api.byId('dataTextMonth').innerHTML = year + "-0" + month;
    } else {
        $api.byId('dataTextMonth').innerHTML = year + "-" + month;
    }
    if ($api.byId('dataTextQuarter')) {
        $api.byId('dataTextQuarter').innerHTML = year + "第一季度";
    }
}
/**
 * @author: wuhao
 * @date: 2018-11-19
 * @desc: 月年标签切换查询
*/
function fnDateTab(date) {
    var monthObj = $api.byId('buttonMonth');
    var yearObj = $api.byId('buttonYear');
    var quarterObj = $api.byId('buttonQuarter');
    var iconQuarterObj = $api.byId('iconQuarter');

    if ('year' == date) {
        if (!$api.hasCls(yearObj, 'mui-btn-blue')) { //若没有选中才进行操作，已经选中不做任何操作
            $api.removeCls(monthObj, 'mui-btn-blue');
            if (quarterObj) {
                $api.removeCls(quarterObj, 'mui-btn-blue');
            }
            if (iconQuarterObj) {
                $api.addCls(iconQuarterObj, 'elHide');
            }
            $api.addCls(yearObj, 'mui-btn-blue');
            $api.removeCls($api.byId('iconYear'), 'elHide');
            $api.addCls($api.byId('iconMonth'), 'elHide');
            // 获取日期控件值
            var html = $api.html($api.byId('dataTextYear'));
            startDate = html + '-01-01';
            endDate = html + '-12-31';
        }
    } else if ('quarter' == date) {
        if (!$api.hasCls(quarterObj, 'mui-btn-blue')) { //若没有选中才进行操作，已经选中不做任何操作
            $api.removeCls(yearObj, 'mui-btn-blue');
            $api.removeCls(monthObj, 'mui-btn-blue');
            $api.addCls(quarterObj, 'mui-btn-blue');
            $api.removeCls($api.byId('iconQuarter'), 'elHide');
            $api.addCls($api.byId('iconYear'), 'elHide');
            $api.addCls($api.byId('iconMonth'), 'elHide');
            // 没有选中默认当年第一季度
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            startDate = currentYear + '-01-01';
            endDate = currentYear + '-03-31';
        }
    } else {
        if (!$api.hasCls(monthObj, 'mui-btn-blue')) { //若没有选中才进行操作，已经选中不做任何操作
            $api.removeCls(yearObj, 'mui-btn-blue');
            if (quarterObj) {
                $api.removeCls(quarterObj, 'mui-btn-blue');
            }
            if (iconQuarterObj) {
                $api.addCls(iconQuarterObj, 'elHide');
            }
            $api.addCls(monthObj, 'mui-btn-blue');
            $api.removeCls($api.byId('iconMonth'), 'elHide');
            $api.addCls($api.byId('iconYear'), 'elHide');
            // 获取日期控件值
            var html = $api.html($api.byId('dataTextMonth'));
            startDate = html + '-01';
            endDate = html + '-31';
        }
    }
    api.execScript({
        frameName: frameName,
        script: 'queryStatisticsData(\'' + startDate + '\', \'' + endDate + '\')'
    });
}
/**
 * @author: wuhao
 * @date: 2018-11-14 10:36:42
 * @desc: 统计图和统计列表切换，调用统计Frame方法
*/
function fnFooterChange(num) {
    if ('0' == num) {
        $api.addCls($api.byId('statsChat'), 'aui-active');
        $api.removeCls($api.byId('statsList'), 'aui-active');
    } else {
        $api.addCls($api.byId('statsList'), 'aui-active');
        $api.removeCls($api.byId('statsChat'), 'aui-active');
    }
    api.execScript({
        frameName: frameName,
        script: 'fnChangeView(' + num + ');'
    });
}
/**
 * @author: wuhao
 * @date: 2018-11-14 10:36:42
 * @desc: 设置统计页面标题，被统计Frame调用
*/
function fnSetTitle(name) {
    var title = $api.byId('titleShow');
    title.innerHTML = name;
}
/**
 * @author: wuhao
 * @date: 2018-11-14
 * @desc: 查询数据
*/
function setQueryDate(year, month , quarter) {
    if (year != "" && month != "") {
        startDate = year + "-" + month + "-01";
        endDate = year + "-" + month + "-31";
        $api.byId('dataTextMonth').innerHTML = year + "-" + month;
    } else if ( year != "" && month == "" && quarter == "" ) {
        startDate = year + "-01-01";
        endDate = year + "-12-31";
        $api.byId('dataTextYear').innerHTML = year;
    } else if ( year != "" && quarter != "") {
        var quarterStr = "";
        switch(parseInt(quarter)) {
        case 1:
            startDate = year + "-01-01";
            endDate = year + "-03-31";
            quarterStr = "第一季度";
            break;
        case 2:
            startDate = year + "-04-01";
            endDate = year + "-06-30";
            quarterStr = "第二季度";
            break;
        case 3:
            startDate = year + "-07-01";
            endDate = year + "-09-30";
            quarterStr = "第三季度";
            break;
        case 4:
            startDate = year + "-10-01";
            endDate = year + "-12-31";
            quarterStr = "第四季度";
            break;
        default:
            startDate = year + "-01-01";
            endDate = year + "-03-31";
            quarterStr = "第一季度";
        }
        $api.byId('dataTextQuarter').innerHTML = year + quarterStr;
    }
    api.execScript({
        frameName: frameName,
        script: 'queryStatisticsData(\'' + startDate + '\', \'' + endDate + '\')'
    });
}
/**
 * @author: wuhao
 * @date: 2018-11-14 10:36:42
 * @desc: 关闭window窗口
*/
function closeWin() {
    api.closeWin({});
}
/**
 * @author: wuhao
 * @date: 2018-11-28
 * @desc: 上一级数据查询
*/
function fnUpQueryDate() {
    var upSpanObj = $api.byId('upSpan');
    $api.addCls(upSpanObj, 'elHide');
    api.execScript({
        frameName: frameName,
        script: 'upQueryDate();'
    });
}
/**
 * @author: wuhao
 * @date: 2018-11-28
 * @desc: 显示上一级按钮
*/
function fnShowUpSpan() {
    var upSpanObj = $api.byId('upSpan');
    $api.removeCls(upSpanObj, 'elHide');
}
/************************* window页面使用方法****************************************/


/************************* frame页面使用方法****************************************/
/**
 * @author: wuhao
 * @date: 2018-12-3 15:16:50
 * @desc: 填充统计列表数据
*/
function fnSetMainListData(data) {
    var template = $api.byId('template');
    var list = $api.byId('mainList');
    var tempFn = doT.template(template.innerHTML);
    var html = tempFn(data);
    $api.html(list, html);
    api.parseTapmode();
}
/**
 * @author: wuhao
 * @date: 2018-12-10
 * @desc: 统计列表下钻功能
*/
function fnLoadDownData(codeParam) {
    if (null != codeParam && '' != codeParam) {
        areaCode = codeParam;
        queryStatisticsData(startDate, endDate);
        // 调用win方法，在左上角显示按钮
        api.execScript({
            name: winName,
            script: 'fnShowUpSpan();'
        });
    }
}
/**
 * @author: wuhao
 * @date: 2018-11-15
 * @desc: 格式化坐标轴显示，每行显示3个字
*/
function fnFormatYAxis(option) {
    option.yAxis.axisLabel = {
        interval: 0,//标签设置为全部显示
        formatter: function(val) {
            var strs = val.split(''); //字符串数组
            var str = ''
            for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                str += s;
                if(!(i % 3)) str += '\n'; //按需要求余
            }
            return str;
        }
    }
}
/**
 * @author: wuhao
 * @date: 2018-11-12
 * @desc: 调整统计图宽高
*/
var setChartWidthAndHeight = function () {
    var mainChart = $api.byId('mainChart');
    var chartWidth = api.frameWidth;
    var chartHeight = api.frameHeight;
    mainChart.style.width = chartWidth * 0.98 + 'px';
    mainChart.style.height = chartHeight * 0.98 + 'px';
};
/**
 * @author: wuhao
 * @date: 2018-11-14 10:36:42
 * @desc: 统计图和统计列表切换，被统计window调用
*/
function fnChangeView (status) {
    if ('0' == status) { // 显示统计图
        $api.addCls($api.byId('mainList'), 'elHide');
        $api.removeCls($api.byId('mainChart'), 'elHide');
    } else { // 显示统计列表
        $api.addCls($api.byId('mainChart'), 'elHide');
        $api.removeCls($api.byId('mainList'), 'elHide');
    }
}
/**
 * @author: wuhao
 * @date: 2018-11-28
 * @desc: 查询上一级的统计数据
 */
function upQueryDate() {
    areaCode = $api.getStorage('userinfo').areaId;
    queryStatisticsData(startDate, endDate);
}
/************************* frame页面使用方法****************************************/
/**
 * @author: wuhao
 * @date: 2018-11-28
 * @desc: 返回数组元素下标
 */
function indexVf (arr, item) {
    if (Array.prototype.indexOf) {//判断浏览器是否支持indexof属性
        return arr.indexOf(item);
    } else {
        for (var i=0;i<=arr.length;i++) {
            if (arr[i]===item) {
                return i;
            }
        }
    }
}

/**
 * @author: laiwl
 * @date: 2018-11-28
 * @desc: 打开日期选择Frame
 */
function lowIncomFnOpenDtPickerFrame(dateType) {
    api.openFrame({
        name: 'dtpicker_frame',
        url: '../../dtpicker_frame.html',
        pageParam: {
            winName: winName,
            dateType: dateType
        },
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        bgColor: 'rgba(0,0,0,0.5)' // 设置Frame的透明度
    });
}
