/**
 * aui-dialog.js
 * @author 流浪男
 * @todo more things to abstract, e.g. Loading css etc.
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(window, undefined) {
    "use strict";
    var auiDialog = function() {};
    var isShow = false;
    auiDialog.prototype = {
        params: {
            title: '',
            msg: '',
            buttons: ['取消', '确定'],
            input: false
        },
        create: function(params, callback) {
            var self = this;
            var dialogHtml = '';
            var buttonsHtml = '';
            //var headerHtml = params.title ? '<div class="aui-dialog-header">' + params.title + '</div>' : '<div class="aui-dialog-header">' + self.params.title + '</div>';
            var headerHtml = '<div class="jq-header"><span style="padding:10px">' + params.title + '</span><i style="padding:10px" class="aui-iconfont aui-icon-trash" id="deleteKC"></i></div>';
            if (params.input) {
                var msgHtml = '<div class="demo-line"></div>' + '<div class="jq-header"><div style="padding:10px;width:110px;text-align:left;">课程名称：</div><select style="padding:10px;direction:rtl;width:130px;" id="kcinfo" placeholder="--请选择--" onchange="changeKC(this)">';
                if (params.text.indexOf('kc1') != -1) {
                    msgHtml = msgHtml + '<option value ="1" selected>软件编译技术</option><option value ="2">数学建模</option><option value ="3">信息与网络安全</option>';
                    msgHtml = msgHtml + '<option value ="4">云计算与大数据</option><option value ="5">毛泽东思想和中国特色社会主义理论体系概论</option><option value ="6">Java Web技术</option>';
                    msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>' +
                        '<div style="text-align:left;padding:10px" id="jiaoshi">教室：35-203</div><div style="text-align:left;padding:10px" id="laoshi">老师：吴晓琴</div>';
                } else if (params.text.indexOf('kc2') != -1) {
                    msgHtml = msgHtml + '<option value ="1" >软件编译技术</option><option value ="2" selected>数学建模</option><option value ="3">信息与网络安全</option>';
                    msgHtml = msgHtml + '<option value ="4">云计算与大数据</option><option value ="5">毛泽东思想和中国特色社会主义理论体系概论</option><option value ="6">Java Web技术</option>';
                    msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>' +
                        '<div style="text-align:left;padding:10px" id="jiaoshi">教室：35-212</div><div style="text-align:left;padding:10px" id="laoshi">老师：林传文</div>';
                } else if (params.text.indexOf('kc3') != -1) {
                    msgHtml = msgHtml + '<option value ="1" >软件编译技术</option><option value ="2">数学建模</option><option value ="3" selected>信息与网络安全</option>';
                    msgHtml = msgHtml + '<option value ="4">云计算与大数据</option><option value ="5">毛泽东思想和中国特色社会主义理论体系概论</option><option value ="6">Java Web技术</option>';
                    msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>' +
                        '<div style="text-align:left;padding:10px" id="jiaoshi">教室：36-201</div><div style="text-align:left;padding:10px" id="laoshi">老师：汪彩梅</div>';
                } else if (params.text.indexOf('kc4') != -1) {
                    msgHtml = msgHtml + '<option value ="1" >软件编译技术</option><option value ="2">数学建模</option><option value ="3">信息与网络安全</option>';
                    msgHtml = msgHtml + '<option value ="4" selected>云计算与大数据</option><option value ="5">毛泽东思想和中国特色社会主义理论体系概论</option><option value ="6">Java Web技术</option>';
                    msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>' +
                        '<div style="text-align:left;padding:10px" id="jiaoshi">教室：36-610</div><div style="text-align:left;padding:10px" id="laoshi">老师：许强</div>';
                } else if (params.text.indexOf('kc5') != -1) {
                    msgHtml = msgHtml + '<option value ="1" >软件编译技术</option><option value ="2">数学建模</option><option value ="3" >信息与网络安全</option>';
                    msgHtml = msgHtml + '<option value ="4" >云计算与大数据</option><option value ="5" selected>毛泽东思想和中国特色社会主义理论体系概论</option><option value ="6">Java Web技术</option>';
                    msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>' +
                        '<div style="text-align:left;padding:10px" id="jiaoshi">教室：36-3JT</div><div style="text-align:left;padding:10px" id="laoshi">老师：金小方</div>';
                } else if (params.text.indexOf('kc6') != -1) {
                    msgHtml = msgHtml + '<option value ="1" >软件编译技术</option><option value ="2">数学建模</option><option value ="3" >信息与网络安全</option>';
                    msgHtml = msgHtml + '<option value ="4" >云计算与大数据</option><option value ="5">毛泽东思想和中国特色社会主义理论体系概论</option><option value ="6" selected>Java Web技术</option>';
                    msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>' +
                        '<div style="text-align:left;padding:10px" id="jiaoshi">教室：36-201</div><div style="text-align:left;padding:10px" id="laoshi">老师：周艳玲</div>';
                } else {
                    msgHtml = msgHtml + '<option value ="1" selected>软件编译技术</option><option value ="2">数学建模</option><option value ="3" >信息与网络安全</option>';
                    msgHtml = msgHtml + '<option value ="4" >云计算与大数据</option><option value ="5">毛泽东思想和中国特色社会主义理论体系概论</option><option value ="6">Java Web技术</option>';
                    msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>' +
                        '<div style="text-align:left;padding:10px" id="jiaoshi">教室：35-203</div><div style="text-align:left;padding:10px" id="laoshi">老师：吴晓琴</div>';
                }
                //msgHtml = msgHtml + '</select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>'
                //+ '<div style="text-align:left;padding:10px" id="jiaoshi">教室：35-203</div><div style="text-align:left;padding:10px" id="laoshi">老师：吴晓琴</div>';
                //  params.text = params.text ? params.text: '';

                //var msgHtml = '<div class="aui-dialog-body"><input type="text" placeholder="'+params.text+'"></div>';

                //+ '<option value ="1">软件编译技术</option><option value ="2">数学建模</option><option value ="3">信息与网络安全</option></select><i onclick="changeKCicon()" style="padding:10px" class="aui-iconfont aui-icon-down"></i></div>'
                //+ '<div style="text-align:left;padding:10px" id="jiaoshi">教室：35-203</div><div style="text-align:left;padding:10px" id="laoshi">老师：吴晓琴</div>';


            } else {
                var msgHtml = params.msg ? '<div class="aui-dialog-body">' + params.msg + '</div>' : '<div class="aui-dialog-body">' + self.params.msg + '</div>';
            }
            var buttons = params.buttons ? params.buttons : self.params.buttons;
            if (buttons && buttons.length > 0) {
                for (var i = 0; i < buttons.length; i++) {

                    //buttonsHtml += '<div class="aui-dialog-btn" tapmode button-index="'+i+'">'+buttons[i]+'</div>';
                    buttonsHtml += '<div class="aui-dialog-btn" tapmode button-index="' + i + '">' + buttons[i] + '</div>';

                }
            }
            var footerHtml = '<div class="aui-dialog-footer">' + buttonsHtml + '</div>';

            //dialogHtml = '<div class="aui-dialog">'+headerHtml+msgHtml+footerHtml+'</div>';
            dialogHtml = '<div class="aui-dialog"><div class="jq-all">' + headerHtml + msgHtml + footerHtml + '</div></div>';

            document.body.insertAdjacentHTML('beforeend', dialogHtml);
            //删除按钮点击事件
            document.getElementById("deleteKC").onclick = function() {
                //console.log(params.num)
                //console.log(params.week)
                $("#" + params.week + "_" + params.num).html('');
                $("#" + params.week + "_" + params.num).addClass('demo1');
                self.close();
            }

            // listen buttons click
            var dialogButtons = document.querySelectorAll(".aui-dialog-btn");
            if (dialogButtons && dialogButtons.length > 0) {
                for (var ii = 0; ii < dialogButtons.length; ii++) {
                    dialogButtons[ii].onclick = function() {
                        if (callback) {
                            if (params.input) {
                                callback({
                                    buttonIndex: parseInt(this.getAttribute("button-index")) + 1
                                        //text: document.querySelector("input").value
                                });
                            } else {
                                callback({
                                    buttonIndex: parseInt(this.getAttribute("button-index")) + 1
                                });
                            }
                        };
                        self.close();
                        return;
                    }
                }
            }
            self.open();
        },
        open: function() {
            if (!document.querySelector(".aui-dialog")) return;
            var self = this;
            document.querySelector(".aui-dialog").style.marginTop = "-" + Math.round(document.querySelector(".aui-dialog").offsetHeight / 2) + "px";
            if (!document.querySelector(".aui-mask")) {
                var maskHtml = '<div class="aui-mask"></div>';
                document.body.insertAdjacentHTML('beforeend', maskHtml);
            }
            // document.querySelector(".aui-dialog").style.display = "block";
            setTimeout(function() {
                document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
                document.querySelector(".aui-mask").classList.add("aui-mask-in");
                document.querySelector(".aui-dialog").classList.add("aui-dialog-in");
            }, 10)
            document.querySelector(".aui-mask").addEventListener("touchmove", function(e) {
                e.preventDefault();
            })
            document.querySelector(".aui-dialog").addEventListener("touchmove", function(e) {
                e.preventDefault();
            })
            return;
        },
        close: function() {
            var self = this;
            document.querySelector(".aui-mask").classList.remove("aui-mask-in");
            document.querySelector(".aui-dialog").classList.remove("aui-dialog-in");
            document.querySelector(".aui-dialog").classList.add("aui-dialog-out");
            if (document.querySelector(".aui-dialog:not(.aui-dialog-out)")) {
                setTimeout(function() {
                    if (document.querySelector(".aui-dialog")) document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
                    self.open();
                    return true;
                }, 200)
            } else {
                document.querySelector(".aui-mask").classList.add("aui-mask-out");
                document.querySelector(".aui-dialog").addEventListener("webkitTransitionEnd", function() {
                    self.remove();
                })
                document.querySelector(".aui-dialog").addEventListener("transitionend", function() {
                    self.remove();
                })
            }
        },
        remove: function() {
            if (document.querySelector(".aui-dialog")) document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
            if (document.querySelector(".aui-mask")) {
                document.querySelector(".aui-mask").classList.remove("aui-mask-out");
            }
            return true;
        },
        alert: function(params, callback) {
            var self = this;
            return self.create(params, callback);
        },
        prompt: function(params, callback) {
            var self = this;
            params.input = true;
            return self.create(params, callback);
        }
    };
    window.auiDialog = auiDialog;
})(window);
