/*
 * JQ ApiCloud JavaScript Library
 * Copyright (c) 2018 JQ
 */
(function(window) {
    var jq = {};

    /**
     * @author: zuoc
     * @date: 2018-11-12
     * @desc: 根据form的id来获取form表单中所有input值,并封装成json格式
     * @param id-表单id
     * @param methodName-接口方法名称（可选项）
     * @return
     */
    jq.serializeForm = function(id, methodName){
        var inputs = document.getElementById(id).getElementsByTagName("input");
        var values = '{';
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute("class") != ""  && inputs[i].getAttribute("class") != null
                && inputs[i].getAttribute("class").indexOf("pk-input") >= 0) {

            } else {
                var key = inputs[i].getAttribute("id"), value = $api.val($api.byId(key));
                values += '' + key + '' + ':' + '\'' + value + '\',';
            }
        }
        var selects = document.getElementById(id).getElementsByTagName("select");
        for (var i = 0; i < selects.length; i++) {
            var key = selects[i].getAttribute("id"), value = $api.val($api.byId(key));
            values += '' + key + '' + ':' + '\'' + value + '\',';
        }
        var textareas = document.getElementById(id).getElementsByTagName("textarea");
        for (var i = 0; i < textareas.length; i++) {
            var key = textareas[i].getAttribute("id"), value = $api.val($api.byId(key));
            values += '' + key + '' + ':' + '\'' + value + '\',';
        }
        if (arguments.length == 2) {
            values += 'method' + ':' + '\'' + methodName + '\',';
            values += 'apiKey' + ':' + '\'apiKey\',';
            values += 'timeStamp' + ':' + '\'timeStamp\',';
            values += 'token' + ':' + '\'token\',';
        }
        values = values.substr(0, values.length - 1) + '}'
        return values;
    };

    /**
     * @author: zuoc
     * @date: 2018-11-12
     * @desc: 长度限制
     * @param id-元素id
     * @param length-长度最大值
     * @param type-页面初始化时传ready,提交表单时传submit
     * @return
     */
    jq.limLe = function(id, length, name, type) {
        var a = $('#' + id);
        if (type == 'ready') {
            a.blur(function() {
                if (!fnLimLe(a, length)) {
                    return false;
                };
            });
        } else if (type == 'submit') {
            if (!fnLimLe(a, length)) {
                return false;
            };
        }
        return true;
    };

    function fnLimLe(obj, length, name) {
        if (obj.val().length > length) {
            api.toast({
                msg: name + '不能超过' + length + '个长度',
                duration: 3000,
                location: 'middle'
            });
            obj.focus();
            return false;
        }
        return true;
    }

    /**
     * @author: zuoc
     * @date: 2018-11-12
     * @desc: 是否为中文
     * @param id-元素id
     * @param type-页面初始化时传ready,提交表单时传submit
     * @return
     */
    jq.isChinese = function(id, name, type) {
        var a = $('#' + id);
        if (type == 'ready') {
            a.blur(function() {
                if (!fnIsChinese(a, name)) {
                    return false;
                };
            });
        } else if (type == 'submit') {
            if (!fnIsChinese(a, name)) {
                return false;
            };
        }
        return true;
    };

    function fnIsChinese(obj, name) {
        var reg = /^[\u0391-\uFFE5]+$/;
        if (obj.val() != "" && !reg.test(obj.val())) {
            api.toast({
                msg: name + '必须输入中文！',
                duration: 3000,
                location: 'middle'
            });
            obj.focus();
            return false;
        }
        return true;
    }

    /**
     * @author: zuoc
     * @date: 2018-11-12
     * @desc: 是否必填
     * @param id-元素id
     * @param type-页面初始化时传ready,提交表单时传submit
     * @return
     */
     jq.isRequired = function(id, name, type) {
         var a = $('#' + id);
         if (type == 'ready') {
             a.blur(function() {
                 if (!fnIsRequired(a, name)) {
                     return false;
                 };
             });
         } else if (type == 'submit') {
             if (!fnIsRequired(a, name)) {
                 return false;
             };
         }
         return true;
     };

     function fnIsRequired(obj, name) {
         if (obj.val().length == 0) {
             api.toast({
                 msg: name + '不能为空值',
                 duration: 3000,
                 location: 'middle'
             });
             obj.focus();
             return false;
         }
         return true;
     }

     /**
      * @author: zuoc
      * @date: 2018-11-12
      * @desc: 是否为数字
      * @param id-元素id
      * @param type-页面初始化时传ready,提交表单时传submit
      * @return
      */
     jq.isNumber = function(id, name, type) {
         var a = $('#' + id);
         if (type == 'ready') {
             a.blur(function() {
                 if (!fnIsNumber(a, name)) {
                     return false;
                 };
             });
         } else if (type == 'submit') {
             if (!fnIsNumber(a, name)) {
                 return false;
             };
         }
         return true;
     };

     function fnIsNumber(obj, name) {
         var reg = /^[0-9]+$/;
         if (obj.val() != "" && !reg.test(obj.val())) {
             api.toast({
                 msg: name + '必须输入数字！',
                 duration: 3000,
                 location: 'middle'
             });
             obj.focus();
             return false;
         }
         return true;
     }

     /**
      * @author: zuoc
      * @date: 2018-11-26
      * @desc: 提示框
      * @param msg-提示语
      * @return
      */
     jq.toast = function(msg) {
         api.toast({
             msg: msg,
             duration: 3000,
             location: 'middle'
         });
     };

     /**
      * @author: zuoc
      * @date: 2018-11-27
      * @desc: 提示框
      * @param msg-提示语
      * @return
      */
     jq.noData = function() {
         return '<div class="no-data"><span class="nodata-img"></span><p>暂无数据~</p></div>';
     };

     /**
      * @author: zuoc
      * @date: 2018-11-29
      * @desc: 加载框
      * @param msg-提示语
      * @return
      */
     jq.loading = function(msg) {
         api.showProgress({
             title: msg,
             text:'',
             modal: true
         });
     };


    window.$jq = jq;

})(window);
