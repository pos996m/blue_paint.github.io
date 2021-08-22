var xx = 20;
var yy = 20;

// 初始建立
var change_sizepx = "10px";
build_td();

function build_td() {
    // 地圖建立過程c
    var td_all = "<td class='td_all' id='td_1' ondragstart='return false;'></td>";
    // var tr_all;
    for (let i = 2; i < (xx * yy) + 1; i++) {
        td_all += `<td class='td_all' id='td_${i}' ondragstart='return false;'></td>`;
        if (i == (xx * yy)) {
            td_all += "</tr>"
        } else if ((i % yy) == 0) {
            td_all += "</tr><tr>"
        }
    }
    td_all = "<tr>" + td_all

    // 建立標籤
    var table_all = document.getElementById("table_all");
    table_all.innerHTML = td_all;

    // 建立td_px
    for (let i = 1; i < (xx * yy); i++) {
        document.getElementById(`td_${i}`).style.width = change_sizepx;
        document.getElementById(`td_${i}`).style.height = change_sizepx;
    }
}

function change_td() {
    xx = document.getElementById("change_H").value;
    yy = document.getElementById("change_W").value;
    build_td();
}

// 換格子尺寸
function change_size() {
    change_sizepx = `${document.getElementById("change_size").value}px`;
    for (let i = 1; i < (xx * yy); i++) {
        document.getElementById(`td_${i}`).style.width = change_sizepx;
        document.getElementById(`td_${i}`).style.height = change_sizepx;
    }
}

var del_C = true;

// 判定點下的布林
var chack_down = false;

// 判定點下轉換
function chack_down_T() {
    chack_down = true;
}
// 判定放開
function chack_down_F() {
    chack_down = false;
}

// 拖曳繪圖事件
function ontest(e) {
    var x = document.getElementById(e.path[0].id);

    if (chack_down && e.path[0].id.search("td") != -1) {
        if (del_color) {
            x.style.backgroundColor = "";
        } else {
            x.style.backgroundColor = key_colour;
        }
        console.log(e.path[0].id);
    }
    // console.log(e);
    // console.log(e.path[0]);
}

// 點擊繪圖事件
function ontest2(e) {

    // 解決修改顏色後點第一下顏色不會變問題
    key_colour = document.getElementById("color_main").value;

    // 取得 ID
    var x = document.getElementById(e.path[0].id);

    // 取得某ID的顏色
    var get_color16 = document.getElementById(e.path[0].id).style.backgroundColor;

    if (e.path[0].id.search("td") != -1) {
        if (alt_color && get_color16 == "") {

        } else if (alt_color) {

            // 設定吸色
            document.getElementById("color_main").value = F_get_color16(get_color16);

        } else if (del_color) {
            x.style.backgroundColor = "";
        } else {
            x.style.backgroundColor = key_colour;
        }
        console.log(e.path[0].id);
    }

}

// 16進位顏色轉換
function F_get_color16(get_color16) {
    // 取得RGB個別的值
    var find_RR = get_color16.substr(get_color16.indexOf("(") + 1, get_color16.indexOf(",") - get_color16.indexOf("(") - 1);
    var find_GG = get_color16.substr(get_color16.indexOf(",") + 1, get_color16.lastIndexOf(",") - get_color16.indexOf(",") - 1)
    var find_BB = get_color16.substr(get_color16.lastIndexOf(",") + 1, get_color16.indexOf(")") - get_color16.lastIndexOf(",") - 1)
    // 轉為16進位
    var set_RR = parseInt(find_RR).toString(16).padStart(2, "0")
    var set_GG = parseInt(find_GG).toString(16).padStart(2, "0")
    var set_BB = parseInt(find_BB).toString(16).padStart(2, "0")
    // 組為 #FFFFFF 字串
    var color_change_RGB = `#${set_RR}${set_GG}${set_BB}`
    return color_change_RGB;
}

// 顏色值
var key_colour = document.getElementById("color_main").value;

//輔助色開關
var ctrl_color = false;
// 刪除開關
var del_color = false;
// 吸色開關
var alt_color = false;

// 判斷按住鍵盤
function movekeydown(event) {
    // console.log(event);
    // 使用輔助色
    if (event.key == "Control") {
        key_colour = document.getElementById("color_sup").value;
        ctrl_color = true;
    }
    // 刪除色
    if (event.key == "Shift") {
        del_color = true;
    }
    // 吸色點擊加吸色
    if (event.key == "Alt") {
        alt_color = true;
    }
    if (event.key == "x" || event.key == "X") {
        var x = document.getElementById("color_main").value;
        var y = document.getElementById("color_sup").value;
        document.getElementById("color_main").value = y;
        document.getElementById("color_sup").value = x;
    }

    // ctrl + z，回到上一步
    if (event.ctrlKey && event.key == "z" || event.key == "Z") {
        // console.log(recording);
        if (recording.length != 1) {
            re_map(recording[recording.length - 2]);
            recording.pop();
        }
    }
}

// 判斷放開ctrl
function movekeyup() {
    // 輔助色回歸主色
    key_colour = document.getElementById("color_main").value;
    // 刪除鍵與吸色改回關閉
    ctrl_color = false;
    del_color = false;
    alt_color = false;
}

// 選擇顏色後會跟著改顏色
function change_mycolor() {
    key_colour = document.getElementById("color_main").value;
    // ontest2(e);
}

// 清除畫面功能
function clearPicture() {
    // document.getElementById('outNB').value = "";
    for (let index = 1; index <= (xx * yy); index++) {
        document.getElementById(`td_${index}`).style.backgroundColor = "";
    }
}


// 表格編號
// 作為記錄檔使用
function outputNumber(event) {

    if (event.path[0].id.indexOf("td") != -1 || event.path[0].id.indexOf("table") != -1) {


        let temp_id = [];
        let temp_color_arr = [];

        // 使用迴圈逐一比對
        for (let index = 1; index <= (xx * yy); index++) {
            // 如果該 td 顏色 非空 則是有顏色 應當被記錄
            if (document.getElementById(`td_${index}`).style.backgroundColor != "") {
                // 加入陣列中
                let x_color = document.getElementById(`td_${index}`).style.backgroundColor;
                // let temp_color = F_get_color16(x_color);
                temp_id.push(`${index}@${x_color}`);
                if (temp_color_arr.indexOf(x_color) == -1) {
                    temp_color_arr.push(x_color);
                }
            }
        }

        // console.log(temp_id)
        // console.log(temp_color_arr)
        var over_color = [];

        // 選取相應的顏色配對編號
        for (let i = 0; i < temp_color_arr.length; i++) {
            var idc = `=${F_get_color16(temp_color_arr[i])},`;
            for (let k = 0; k < temp_id.length; k++) {
                // console.log(temp_id[k].substr(temp_id[k].indexOf("@")+1, temp_id[k].length - temp_id[k].indexOf("@") - 1));
                if (temp_id[k].substr(temp_id[k].indexOf("@") + 1, temp_id[k].length - temp_id[k].indexOf("@") - 1) == temp_color_arr[i]) {

                    idc += `${temp_id[k].substr(0, temp_id[k].indexOf("@"))},`;

                }
            }
            idc = idc.substr(0, idc.length - 1);
            over_color.push(idc);
        }


        // 刪除過多紀錄
        if (recording.length > 10) {
            recording.shift();
        }

        // 加入進變數(用來記錄上一步驟)
        recording.push(`=${xx}=${yy}=${change_sizepx}`);
        for (let p = 0; p < over_color.length; p++) {
            recording[recording.length - 1] += `${over_color[p]}`;
        }

    }
    // // 加入大小編號與px編號
    // document.getElementById('outNB').value += `=${xx}=${yy}=${change_sizepx}`

    // // 輸出顏色與編號
    // for (let p = 0; p < over_color.length; p++) {
    //     document.getElementById('outNB').value += `${over_color[p]}`;
    // }
}

var recording = [];
recording.push(`=${xx}=${yy}=${change_sizepx}`)

// 點按輸出記錄檔
function clickNumber() {
    // 將顯示區域 初始化
    document.getElementById('outNB').value = "";

    document.getElementById('outNB').value = recording[recording.length - 1];
}



// 讀取記錄檔
function print_map() {
    // 取得 value
    let textArea_V = document.getElementById('outNB').value;
    // 去除換行
    textArea_V = textArea_V.replace(/[\r\n]/g, "");

    // 轉換記錄檔
    re_map(textArea_V);


    document.getElementById('outNB').value = "讀取成功";
}

// 記錄檔轉換
function re_map(textArea_V) {

    // 第一次陣列轉換
    let inptdNumber = textArea_V.split('=');
    inptdNumber.shift();
    // console.log(inptdNumber);

    // 新建陣列用來存放二維陣列
    let arrin = [];

    // 將第一次陣列存放到陣列
    for (let i = 0; i < inptdNumber.length; i++) {
        arrin.push(inptdNumber[i].split(','));
    }
    // console.log(arrin)
    // console.log(arrin[0][0])

    // 讀取地圖的值
    document.getElementById("change_size").value = arrin[2][0].substr(0, arrin[2][0].indexOf("p"));
    xx = arrin[0][0];
    yy = arrin[1][0];

    // 建立地圖
    build_td();
    change_size();

    // 讀取編號與顏色
    for (let p = 3; p < arrin.length; p++) {
        for (let k = 1; k < arrin[p].length; k++) {
            document.getElementById(`td_${arrin[p][k]}`).style.backgroundColor = arrin[p][0];
        }
    }

}


// 一鍵複製
function CopyTextToClipboard(id) {
    var TextRange = document.createRange();
    TextRange.selectNode(document.getElementById(id));
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(TextRange);
    document.execCommand("copy");
    // document.getElementById('outNB').value = "複製成功";
    // alert("複製完成！")
}


// 修改修改顏色後點第一下顏色沒有改的問題
// 按住alt 要吸色