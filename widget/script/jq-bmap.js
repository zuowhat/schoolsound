function iosBmapInit() {
    map.initMapSDK(function(ret) {
        if (ret.status) {
            alert('地图初始化成功，可以从百度地图服务器检索信息了！');
        }
    });

}

function openBmap(map, lon, lat, w, h, callback) {
    map.open({
        rect: {
            x: 0,
            y: 0,
            w: w,
            h: h
        },
        center: {
            lon: lon,
            lat: lat
        },
        zoomLevel: 10,
        showUserLocation: true,
        fixedOn: api.frameName,
        fixed: true
    }, function(ret) {
        if (ret.status) {}
    });
    map.setTraffic({
        traffic: true
    });
    // addBmapAnnotations();
    // setBmapBubble();


    map.setScaleBar({
        show: true,
        position: {
            x: 100,
            y: 100
        }
    });

    map.searchRoute({
    id: 1,
    type: 'drive',
    policy: 'ecar_fee_first',
    start: {
        lon: 116.403838,
        lat: 39.914437
    },
    end: {
        lon: 117.384852,
        lat: 41.989576
    }
}, function(ret, err) {
    if (ret.status) {
        map.drawRoute({
            id: 1,
            autoresizing: false,
            index: 0,
            styles: {
                start: {
                    icon: 'widget://image/bmap_start.png'
                },
                end: {
                    icon: 'widget://image/bmap_end.png'
                }
            }
        }, function(ret) {
            api.alert({ msg: JSON.stringify(ret) });
        });
    } else {
        api.alert({ msg: JSON.stringify(err) });
    }
});
    callback();
}

function addBmapAnnotations() {
    map.addAnnotations({
        annotations: [{
            id: 1,
            lon: 116.4,
            lat: 39.9
        }],
        icon: 'widget://',
        draggable: true
    }, function(ret) {
        if (ret) {
            alert(ret.id);
        }
    });
}

function setBmapBubble() {
    map.addBillboard({
        id: 1,
        coords: {
            lon: 116.4,
            lat: 39.9
        },
        bgImg: 'widget://image/bMapTest.png',
        content: {
            title: '大标题大标题大标题大标题',
            subTitle: '概述内容概述内容概述内容',
            illus: 'http://ico.ooopic.com/ajax/iconpng/?id=145044.png'
        },
        styles: {
            titleColor: '#000',
            titleSize: 16,
            subTitleColor: '#999',
            subTitleSize: 12,
            illusAlign: 'left'
        }
    }, function(ret) {
        if (ret) {
            alert(JSON.stringify(ret));
        }
    });
}
