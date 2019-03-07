 var db;
 //数据库名称
 var DATABASE = 'JQDATABASE';
 //服务器设置表名
 var SERVERTABLE = 'SERVERTABLE';
 //VPN表名
 var VPNTABLE = 'VPNTABLE';
 /**
  * @author: zuoc
  * @date: 2018-11-07
  * @desc: 初始化数据库
  * @param: callback 回调
  */
 function fnInitDB(callback) {
     db = api.require('db');
     db.openDatabase({
         name: DATABASE
     }, function(ret, err) {
         callback();
     });
 }

 /**
  * @author: zuoc
  * @date: 2018-12-20
  * @desc: 创建VPN表
  */
 function fnCreateVPN(callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE ' + VPNTABLE + '(ID VARCHAR(100) PRIMARY KEY, IPADDRESS VARCHAR(100), USERNAME VARCHAR(50), USERPWD VARCHAR(50), REMARK VARCHAR(100))'
     }, function(ret, err) {
         db.executeSql({
             name: DATABASE,
             sql: 'CREATE UNIQUE INDEX ' + VPNTABLE + '_unique_index on ' + VPNTABLE + '(id)'
         }, function(ret, err) {
             callback();
         });
     });
 }
 /**
  * @author: zuoc
  * @date: 2018-11-07
  * @desc: 创建服务器设置表
  */
 function fnCreateServer(callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE ' + SERVERTABLE + '(ID VARCHAR(500) PRIMARY KEY, IPADDRESS VARCHAR(32), PORTNUM VARCHAR(10), REMARK VARCHAR(100))'
     }, function(ret, err) {
         db.executeSql({
             name: DATABASE,
             sql: 'CREATE UNIQUE INDEX ' + SERVERTABLE + '_unique_index on ' + SERVERTABLE + '(id)'
         }, function(ret, err) {
             callback();
         });
     });
 }
 /**
  * @author: zuoc
  * @date: 2018-11-07
  * @desc: 根据表名查询表中所有数据
  */
 function fnSelectAllDataByTableName(tableName, callback) {
     db.selectSql({
         name: DATABASE,
         sql: 'SELECT * FROM ' + tableName
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 新增数据
  */
 function fnAddServer(id, ipaddress, portnum, remark, callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'INSERT INTO ' + SERVERTABLE + '(ID,IPADDRESS,PORTNUM,REMARK) VALUES("' + id + '","' + ipaddress + '","' + portnum + '","' + remark + '")'
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-12-20
  * @desc: 新增VPN数据
  */
 function fnAddVPN(id, ipaddress, userName, userPwd, remark, callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'INSERT INTO ' + VPNTABLE + '(ID,IPADDRESS,USERNAME,USERPWD,REMARK) VALUES("' + id + '","' + ipaddress + '","' + userName + '","' + userPwd + '","' + remark + '")'
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-12-20
  * @desc: 更新VPN数据
  */
 function fnUpdateVPN(id, ipaddress, userName, userPwd, remark, callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'UPDATE ' + VPNTABLE + ' SET IPADDRESS="' + ipaddress + '",USERNAME="' + userName + '",REMARK="' + remark + '",USERPWD="' + userPwd +
             '" WHERE ID="' + id + '"'
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 更新数据
  */
 function fnUpdateServer(id, ipaddress, portnum, remark, callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'UPDATE ' + SERVERTABLE + ' SET IPADDRESS="' + ipaddress + '",PORTNUM="' + portnum + '",remark="' + remark +
             '" WHERE ID="' + id + '"'
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 根据表名和主键查询数据
  */
 function fnSelectDataById(tableName, id, callback) {
     db.selectSql({
         name: DATABASE,
         sql: 'SELECT * FROM ' + tableName + ' WHERE id="' + id + '"'
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 查询主键最大值
  */
 function fnSelectMaxId(tableName, callback) {
     db.selectSql({
         name: DATABASE,
         sql: 'SELECT MAX(ID) AS ID FROM ' + tableName
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 删除一张表
  */
 function fnDeleteTable(tableName, callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'DROP TABLE ' + tableName,
     }, callback);
 }
 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 根据表名和ID来删除数据
  */
 function fnDelteDataByTaleId(tableName, id, callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'DELETE FROM ' + tableName + ' WHERE ID="' + id + '"'
     }, callback);
 }

 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 创建区划，救助项，数据字典，机构表
  */
 function fnCreateInitTable(callback) {
     //区划
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE IF NOT EXISTS SYS_AREA(ALIAS VARCHAR(100), AREACODE VARCHAR(30), ' +
             'AREALEVEL VARCHAR(10), AREANAME VARCHAR(150), AREAPID VARCHAR(20), LASTTIME DATE, STATE INT, PRIMARY KEY(AREACODE))'
     }, function(ret, err) {
         if (ret.status == true) {
             db.executeSql({
                 name: DATABASE,
                 sql: 'CREATE UNIQUE INDEX SYS_AREA_unique_index on SYS_AREA(AREACODE)'
             });
         }
     });
     //数据字典
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE IF NOT EXISTS SYS_DICT(CODE VARCHAR(50), NAME VARCHAR(100), ' +
             'PCODE VARCHAR(50), STATE INT,  LASTTIME DATE, SORT INT, PRIMARY KEY(CODE))'
     }, function(ret, err) {
         db.executeSql({
             name: DATABASE,
             sql: 'CREATE UNIQUE INDEX SYS_DICT_unique_index on SYS_DICT(CODE)'
         });
     });
     //救助项
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE IF NOT EXISTS SRI_ITEM(ITEMID VARCHAR(50), ITEMCODE VARCHAR(30), ' +
             'IMGURL VARCHAR(100), NAME VARCHAR(50), PID VARCHAR(50), LASTTIME DATE, PROCESSID VARCHAR(50),' +
             'SORT INT, STATE INT, TYPE VARCHAR(20), UNUSED INT,  PRIMARY KEY(ITEMID))'
     }, function(ret, err) {
         db.executeSql({
             name: DATABASE,
             sql: 'CREATE UNIQUE INDEX SRI_ITEM_unique_index on SRI_ITEM(ITEMID)'
         });
     });
     //救助项与区划关系
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE IF NOT EXISTS SRI_AREA_ITEM(ITEMID VARCHAR(50), AREAID VARCHAR(30), ' +
             'LASTTIME DATE, PRIMARY KEY(ITEMID, AREAID))'
     }, function(ret, err) {
         db.executeSql({
             name: DATABASE,
             sql: 'CREATE UNIQUE INDEX SRI_AREA_ITEM_unique_index on SRI_AREA_ITEM(ITEMID, AREAID)'
         });
     });
     //机构
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE IF NOT EXISTS SYS_UNIT(ALIASNAME VARCHAR(100), AREAID VARCHAR(30), UNITTYPE VARCHAR(30), XBUNITTYPE VARCHAR(30), ' +
             'CODE VARCHAR(30), NAME VARCHAR(100), PARENTCODE VARCHAR(30), LASTTIME DATE, STATE INT, PRIMARY KEY(CODE))'
     }, function(ret, err) {
         db.executeSql({
             name: DATABASE,
             sql: 'CREATE UNIQUE INDEX SYS_UNIT_unique_index on SYS_UNIT(CODE)'
         });
     });

     callback();
 }


 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 区划数据插入
  * @param：callback 回调函数
  */
 function fnInsertAreaData(jsonData, callback) {
     //var jsonData = '{"data":[{"alias":"高桥33","areaCode":"3401030140012","areaLevel":"area_5","areaName":"高桥社区","areaPid":"340103014","lastTime":"2019-11-17T15:57:29","state":0},{"alias":"吴郢","areaCode":"340103014005","areaLevel":"area_5","areaName":"吴郢社区","areaPid":"340103014","lastTime":"2018-09-17T15:57:29","state":0},{"alias":"五里拐","areaCode":"340103014006","areaLevel":"area_5","areaName":"五里拐社区","areaPid":"340103014","lastTime":"2018-09-17T15:57:29","state":0}],"msg":"调用正常","result":200,"type":null}';
     if (jsonData != "") {
         //jsonData =  JSON.parse(jsonData);
         for (var i = 0; i < jsonData.data.length; i++) {
             db.executeSql({
                 name: DATABASE,
                 sql: "REPLACE INTO SYS_AREA(ALIAS, AREACODE, AREALEVEL, AREANAME, AREAPID, LASTTIME, STATE)" +
                     "VALUES('" + jsonData.data[i].alias + "','" + jsonData.data[i].areaCode + "','" + jsonData.data[i].areaLevel + "','" +
                     jsonData.data[i].areaName + "','" + jsonData.data[i].areaPid + "','" + jsonData.data[i].lastTime + "','" + jsonData.data[i].state + "')"
             });
         }
     }
     callback();
 }

 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 区划与救助项关系数据插入
  * @param：callback 回调函数
  */
 function fnInsertAreaItemData(jsonData, callback) {
     //var jsonData = '{"data":[{"alias":"高桥33","areaCode":"3401030140012","areaLevel":"area_5","areaName":"高桥社区","areaPid":"340103014","lastTime":"2019-11-17T15:57:29","state":0},{"alias":"吴郢","areaCode":"340103014005","areaLevel":"area_5","areaName":"吴郢社区","areaPid":"340103014","lastTime":"2018-09-17T15:57:29","state":0},{"alias":"五里拐","areaCode":"340103014006","areaLevel":"area_5","areaName":"五里拐社区","areaPid":"340103014","lastTime":"2018-09-17T15:57:29","state":0}],"msg":"调用正常","result":200,"type":null}';
     if (jsonData != "") {
         //jsonData =  JSON.parse(jsonData);
         for (var i = 0; i < jsonData.data.length; i++) {
             db.executeSql({
                 name: DATABASE,
                 sql: "REPLACE INTO SRI_AREA_ITEM(ITEMID, AREAID, LASTTIME)" +
                     "VALUES('" + jsonData.data[i].itemId + "','" + jsonData.data[i].areaId + "','" + jsonData.data[i].lastTime + "')"
             });
         }
     }
     callback();
 }

 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 数据字典插入
  * @param: jsonData json数据
  * @param：callback 回调函数
  */
 function fnInsertDictData(jsonData, callback) {
     if (jsonData != "") {
         //var jsonObj =  JSON.parse(jsonData);
         for (var i = 0; i < jsonData.data.length; i++) {
             db.executeSql({
                 name: DATABASE,
                 sql: "REPLACE INTO SYS_DICT(CODE, NAME, PCODE, STATE,  LASTTIME, SORT)" +
                     "VALUES('" + jsonData.data[i].code + "','" + jsonData.data[i].name + "','" + jsonData.data[i].pCode + "','" +
                     jsonData.data[i].state + "','" + jsonData.data[i].lastTime + "','" + jsonData.data[i].sort + "')"
             });
         }
     }
     callback();
 }


 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 机构数据插入
  * @param: jsonData json数据
  * @param：callback 回调函数
  */
 function fnInsertUnitData(jsonData, callback) {
     if (jsonData != "") {
         //var jsonObj =  JSON.parse(jsonData);
         for (var i = 0; i < jsonData.data.length; i++) {
             //区划
             db.executeSql({
                 name: DATABASE,
                 sql: "REPLACE INTO SYS_UNIT(ALIASNAME, AREAID, UNITTYPE, XBUNITTYPE, CODE, NAME, PARENTCODE, LASTTIME, STATE)" +
                     "VALUES('" + jsonData.data[i].aliasName + "','" + jsonData.data[i].areaId + "','" + jsonData.data[i].unitType + "','" +
                     jsonData.data[i].xbUnitType + "','" + jsonData.data[i].code + "','" + jsonData.data[i].name + "','" +
                     jsonData.data[i].parentCode + "','" + jsonData.data[i].lastTime + "','" + jsonData.data[i].state + "')"
             });
         }
     }
     callback();
 }


 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 救助项数据插入
  * @param: jsonData json数据
  * @param：callback 回调函数
  */
 function fnInsertItemData(jsonData, callback) {
     if (jsonData != "") {
         //var jsonObj =  JSON.parse(jsonData);
         for (var i = 0; i < jsonData.data.length; i++) {
             db.executeSql({
                 name: DATABASE,
                 sql: "REPLACE INTO SRI_ITEM(ITEMID, ITEMCODE, IMGURL, NAME, PID, LASTTIME, PROCESSID, SORT, STATE, TYPE, UNUSED)" +
                     "VALUES('" + jsonData.data[i].itemId + "','" + jsonData.data[i].itemCode + "','" + jsonData.data[i].imgUrl + "','" +
                     jsonData.data[i].name + "','" + jsonData.data[i].pId + "','" + jsonData.data[i].lastTime + "','" +
                     jsonData.data[i].processId + "','" + jsonData.data[i].sort + "','" + jsonData.data[i].state + "','" +
                     jsonData.data[i].type + "','" + jsonData.data[i].unused + "')"
             });
         }
     }
     callback();
 }


 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 救助项数据获取
  * @param: pId 父级救助项ID
  * @param：itemCode 救助项code
  * @param: isClassify, 是否查询大类，true或者false
  * @param: unusedState 过滤救助项，0-正常，1-单独受理，2-停用， 不传查所有
  * @param: callback 回调方法返回查询结果
  */
function fnSelectItemData(pId, itemCode, isClassify, unusedState, callback) {
    var areaLevel = $api.getStorage('userinfo').areaLevel;
    var areaId = $api.getStorage('userinfo').areaId;
    var productUser = $api.getStorage('userinfo').productUser;
    var areaIdArr = $api.getStorage('userinfo').jgTag;
    var provinceCode = '', cityCode = '', countyCode = '';
    var index = 0; //控制选择到了哪一级的区划
    if (areaId != productUser) {
        if (areaIdArr.length > 0) {
            for(var i=0; i<areaIdArr.length; i++) {
                var areaId = areaIdArr[i];
                //过滤掉乡镇 社区的区划
                if (areaId.length <= 6) {
                    if (index == 0) {
                        countyCode = areaId;  //首先获取到县级区划，因为区划是按社区、乡镇、县、市、省排序的
                        index ++; // ++表示县级遍历过了
                    } else if (index == 1) {
                        cityCode = areaId; // 市级区划
                        index ++; // ++表示县级遍历过了
                    } else if (index == 3) {
                        provinceCode = areaId; //省级区划
                    }
                    if (areaId == productUser) {
                        break; //相等说明遍历到最高一级区划了
                    }
                }
            }
            fnSelectItemDataByAreaCode(pId, itemCode, isClassify, unusedState, countyCode, function(ret, err) {
                if (ret.data.length == 0) { //如果县级没获取到就救助，则从上一级获取
                    fnSelectItemDataByAreaCode(pId, itemCode, isClassify, unusedState, cityCode, function(ret, err) {
                        if (ret.data.length == 0) { //如果县级没获取到就救助，则从上一级获取
                            fnSelectItemDataByAreaCode(pId, itemCode, isClassify, unusedState, provinceCode, function(ret, err) {
                                callback(ret, err);
                            });
                        } else {
                            callback(ret, err);
                        }
                    });
                } else {
                    callback(ret, err);
                }
            });
        }
    } else {
        fnSelectItemDataByAreaCode(pId, itemCode, isClassify, unusedState, areaId, function(ret, err) {
            callback(ret, err);
        });
    }
 }

 /**
  * @author: LCXU
  * @date: 2018-12-28
  * @desc: 救助项数据获取
  * @param: pId 父级救助项ID
  * @param：itemCode 救助项code
  * @param: isClassify, 是否查询大类，true或者false
  * @param: areaCode 区划编码
  * @param: unusedState 过滤救助项，0-正常，1-单独受理，2-停用， 不传查所有
  * @param: callback 回调方法返回查询结果
  */
 function fnSelectItemDataByAreaCode(pId, itemCode, isClassify, unusedState, areaCode, callback) {
     var sql = "SELECT SI.ITEMID, SI.ITEMCODE, SI.IMGURL, SI.NAME, SI.PID, SI.LASTTIME, SI.PROCESSID, SI.SORT, SI.STATE, SI.TYPE, SI.UNUSED " +
         "FROM SRI_ITEM SI, SRI_AREA_ITEM SAI WHERE SI.ITEMID = SAI.ITEMID and STATE <> 9 "
     if (areaCode != "" && areaCode != null) {
         sql += "AND SAI.AREAID = '" + areaCode + "' "
     }
     if (itemCode != "" && itemCode != null) {
         sql += "AND ITEMCODE = '" + itemCode + "' "
     }
     if (pId != "" && pId != null) {
         sql += "AND PID = '" + pId + "' "
     }
     if (isClassify != "" && isClassify != null) {
         if (isClassify == true) {
             sql += "AND PROCESSID = 'null' "
         }
     }
     if (unusedState != "" && unusedState != null) {
         sql += "AND UNUSED = '" + unusedState + "' "
     }
     fnInitDB(function() {
         db.selectSql({
             name: DATABASE,
             sql: sql
         }, function(ret, err) {
             callback(ret, err);
         });
     });
 }

 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 区划数据获取
  * @param: areaCode 区划编码
  * @param：areaLevel 区划等级
  * @param: areaPid 区划父ID
  * @param: callback 回调方法返回查询结果
  */
 function fnSelectAreaData(areaCode, areaLevel, areaPid, callback) {
     var sql = "SELECT ALIAS, AREACODE, AREALEVEL, AREANAME, AREAPID " +
         "FROM SYS_AREA WHERE STATE <> 9 "
     if (areaCode != "" && areaCode != null) {
         sql += "AND AREACODE = '" + areaCode + "' "
     }
     if (areaPid != "" && areaPid != null) {
         sql += "AND AREAPID = '" + areaPid + "' "
     }
     if (areaLevel != "" && areaLevel != null) {
         sql += "AND areaLevel = '" + areaLevel + "' "
     }
     fnInitDB(function() {
         db.selectSql({
             name: DATABASE,
             sql: sql
         }, function(ret, err) {
             callback(ret, err);
         });
     });
 }

 /**
  * @author: laiwl
  * @date: 2018-11-07
  * @desc: 区划数据获取
  * @param: areaName 区划名称
  * @param: callback 回调方法返回查询结果
  */
 function fnSelectAreaDataByAreaName(areaName, callback) {
     var sql = "SELECT ALIAS, AREACODE, AREALEVEL, AREANAME, AREAPID " +
         "FROM SYS_AREA WHERE STATE <> 9 "
     if (areaName != "" && areaName != null) {
         sql += "AND AREANAME = '" + areaName + "' "
     }
     fnInitDB(function() {
         db.selectSql({
             name: DATABASE,
             sql: sql
         }, function(ret, err) {
             callback(ret, err);
         });
     });
 }

 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 数据字典数据获取
  * @param: code 数据字典编码
  * @param：pCode 数据字典父级编码
  * @param: callback 回调方法返回查询结果
  */
 function fnSelectDictData(code, pCode, callback) {
     var sql = "SELECT CODE, NAME, PCODE, SORT " +
         "FROM SYS_DICT WHERE STATE <> 9 "
     if (code != "" && code != null) {
         sql += "AND CODE = '" + code + "' "
     }
     if (pCode != "" && pCode != null) {
         sql += "AND PCODE = '" + pCode + "' "
     }
     fnInitDB(function() {
         db.selectSql({
             name: DATABASE,
             sql: sql
         }, function(ret, err) {
             callback(ret, err);
         });
     });
 }

 /**
  * @author: LCXU
  * @date: 2018-11-07
  * @desc: 机构数据获取
  * @param: code 机构编码
  * @param：pCode 父级机构编码
  * @param: areaId 区划ID
  * @param：unitType 机构类型
  * @param：xbUnitType 协办单位类型
  * @param: onlyXBDW 是否只查协调办理单位
  * @param: callback 回调方法返回查询结果
  */
 function fnSelectUnitData(code, pCode, areaId, unitType, xbUnitType, onlyXBDW, callback) {
     var sql = "SELECT ALIASNAME, AREAID, UNITTYPE, XBUNITTYPE, CODE, NAME, PARENTCODE FROM SYS_UNIT WHERE STATE <> 9 "
     if (code != "" && code != null) {
         sql += "AND CODE = '" + code + "' "
     }
     if (pCode != "" && pCode != null) {
         sql += "AND PARENTCODE = '" + pCode + "' "
     }
     if (areaId != "" && areaId != null) {
         sql += "AND AREAID = '" + areaId + "' "
     }
     if (unitType != "" && unitType != null) {
         sql += "AND UNITTYPE = '" + unitType + "' "
     }
     if (xbUnitType != "" && xbUnitType != null) {
         sql += "AND XBUNITTYPE = '" + xbUnitType + "' "
     }
     if (onlyXBDW == true) {
         sql += "AND XBUNITTYPE != 'null' "
     }
     fnInitDB(function() {
         db.selectSql({
             name: DATABASE,
             sql: sql
         }, function(ret, err) {
             callback(ret, err);
         });
     });
 }


 function clearTable(callback) {
     db.executeSql({
         name: DATABASE,
         sql: 'delete from SYS_AREA'
     }, function(ret, err) {
         db.executeSql({
             name: DATABASE,
             sql: 'delete from SYS_UNIT'
         }, function(ret, err) {
             db.executeSql({
                 name: DATABASE,
                 sql: 'delete from SYS_DICT'
             }, function(ret, err) {
                 db.executeSql({
                     name: DATABASE,
                     sql: 'delete from SRI_ITEM'
                 }, function(ret, err) {
                    db.executeSql({
                        name: DATABASE,
                        sql: 'delete from SRI_AREA_ITEM'
                    }, callback);
                 });
             });
         });
     });
 }
