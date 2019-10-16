const fs = require('fs');

fs.readFile('./data_json/goods.json','utf-8', (err, data) => {
    if(err) console.log(err);
    let dataObj = JSON.parse(data);
    let pushData = [];
    let num = 0;
    dataObj.RECORDS.forEach( (e, i) => {
        if (e.IMAGE1) {
            num++;
            pushData.push(e);
        }
    });

    fs.writeFile('./filter_data/filter_goods.json', JSON.stringify(pushData), (err, data) => {
        if(err) console.log('写入失败!');
        else console.log('写入成功!');
    })
});