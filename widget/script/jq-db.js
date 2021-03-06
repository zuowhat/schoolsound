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
     console.log(1111)
     db = api.require('db');
      console.log(22222)
     db.openDatabase({
         name: DATABASE
     }, function(ret, err) {
         console.log(333)
         callback();
     });
 }

 /**
  * @author: zuoc
  * @date: 2019-05-11
  * @desc: 在线选课表初始化
  */
 function fnInitXkymTable(callback) {
     db = api.require('db');
     db.executeSqlSync({
         name: DATABASE,
         sql: 'CREATE TABLE XKYM(ID VARCHAR(100), KCMC VARCHAR(100), KCDM VARCHAR(100), JSXM VARCHAR(100), SKSJ VARCHAR(100), SKDD VARCHAR(100),' +
             'XF VARCHAR(100), ZXS VARCHAR(100), QSJSZ VARCHAR(100), RL VARCHAR(100), YL VARCHAR(100), KCGS VARCHAR(100), KCXZ VARCHAR(100),' +
             ' XQDM VARCHAR(100), KKXY VARCHAR(100), KSSJ VARCHAR(100), TYPE VARCHAR(100)'
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2019-05-11
  * @desc: 根据类型查询课程
  */
 function fnSelectXkymByType(type, callback) {
     db = api.require('db');
     db.selectSql({
         name: DATABASE,
         sql: 'SELECT ID,KCMC,JSXM,KSSJ FROM XKYM WHERE TYPE = "' + type + '"'
     }, callback);
 }

 /**
  * @author: zuoc
  * @date: 2019-05-11
  * @desc: 根据主键查询课程
  */
 function fnSelectXkymById(id, callback) {
     db.selectSql({
         name: DATABASE,
         sql: 'SELECT * FROM XKYM WHERE ID = "' + id + '"'
     }, callback);
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

     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE SWZL(id VARCHAR(50), dsdd VARCHAR(50), dsrq VARCHAR(20), xxms VARCHAR(300),' +
             'lxr VARCHAR(20), lxfs VARCHAR(20))'
     });

     // 动态分享
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE DTFX(id VARCHAR(50), fbnr VARCHAR(500), fxrq VARCHAR(20))'
     });

     // 附件
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE FILE(id VARCHAR(50), imgId VARCHAR(50), url VARCHAR(20))'
     });

     // 表白
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE BBQ(id VARCHAR(50), bbnr VARCHAR(500), bbrq VARCHAR(20), ax INTEGER, dz INTEGER)'
     });

     // 表白评论
     db.executeSql({
         name: DATABASE,
         sql: 'CREATE TABLE BBPL(bbId VARCHAR(50), plnr VARCHAR(500), plr VARCHAR(20), plrq VARCHAR(20), sort INTEGER)'
     });

     setTimeout(callback, 4000);
 }

 function clearTable() {
     db = api.require('db');
     db.executeSql({
         name: DATABASE,
         sql: 'DELETE FROM USERS'
     });
     db.executeSql({
         name: DATABASE,
         sql: 'DELETE FROM SWZL'
     });
     db.executeSql({
         name: DATABASE,
         sql: 'DELETE FROM DTFX'
     });
     db.executeSql({
         name: DATABASE,
         sql: 'DELETE FROM FILE'
     });
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
