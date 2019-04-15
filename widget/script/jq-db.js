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
  * @author: xqq
  * @date: 2019-04-14
  * @desc: 校声APP数据表初始化
  */
 function fnInitTable(callback) {
     db = api.require('db');
     //  用户表
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE USERS(ID VARCHAR(50), PASSWORD VARCHAR(30), NAME VARCHAR(20), PHONENUM VARCHAR(20),' +
             'SEX VARCHAR(5), YX VARCHAR(20), BJ VARCHAR(20), ZY VARCHAR(20), JG VARCHAR(20),PRIMARY KEY(ID))'
     }, function(ret, err) {
         if (ret.status == true) {
             db.executeSql({
                 name: DATABASE,
                 sql: 'INSERT INTO USERS VALUES("test","1","测试","12324511523","男","计算机学院","090334","软件设计","安徽")'
             });
         }
     });

     //  失物招领表
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE SWZL(dsdd VARCHAR(50), dsrq VARCHAR(20), xxms VARCHAR(300),' +
             'lxr VARCHAR(20), lxfs VARCHAR(20))'
     });

     callback();
 }

 /**
  * @author: zuoc
  * @date: 2018-11-07
  * @desc: 根据表名查询表中所有数据
  */
 function fnSelectAll(tableName, callback) {
     db = api.require('db');
     db.selectSql({
         name: DATABASE,
         sql: 'SELECT * FROM ' + tableName
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 根据表名和主键查询数据
  */
 function fnSelectDataById(tableName, id, callback) {
     db = api.require('db');
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
     db = api.require('db');
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
 function fnDropTable(tableName, callback) {
     db = api.require('db');
     db.executeSql({
         name: DATABASE,
         sql: 'DROP TABLE ' + tableName
     }, callback);
 }
 /**
  * @author: zuoc
  * @date: 2018-11-08
  * @desc: 根据表名和ID来删除数据
  */
 function fnDelteDataByTaleId(tableName, id, callback) {
     db = api.require('db');
     db.executeSql({
         name: DATABASE,
         sql: 'DELETE FROM ' + tableName + ' WHERE ID="' + id + '"'
     }, callback);
 }
