var xx = 20;
var yy = 20;

// 初始建立
var change_sizepx = "10px";
build_td();


function build_td() {
    // 地圖建立過程c
    var td_all = "<td class='td_all' id='td_1' onclick='ontest(event)' touchstart='ontest(event)';></td>";
    // var tr_all;
    for (let i = 2; i < (xx * yy) + 1; i++) {
        td_all += `<td class='td_all' id='td_${i}' onclick='ontest(event)' touchstart='ontest(event)';></td>`;
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

function change_td(){
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


function ontest(e) {
    var x = document.getElementById(e.path[0].id);

    // if (!key_du) {
    //     console.log(e.path[0].id);
    //     document.getElementById(e.path[0].id).style.backgroundColor = "red";
    // } else {
    //     document.getElementById(e.path[0].id).style.backgroundColor = "";
    // }

    if (del_color) {
        x.style.backgroundColor = "";
    } else {
        x.style.backgroundColor = key_colour;
    }


    console.log(e.path[0].id);
    // console.log(e);
    // console.log(e.path[0]);
}

var key_colour = document.getElementById("color_main").value;
var del_color = false;

// 判斷按住ctrl
function movekeydown(event) {
    // console.log(event);
    if (event.key == "Control") {
        key_colour = document.getElementById("color_sup").value;
    }
    if (event.key == "Shift") {
        del_color = true;
    }
}

// 判斷放開ctrl
function movekeyup(event) {
    key_colour = document.getElementById("color_main").value;
    del_color = false;
}

// 選擇顏色事件
function change_mycolor() {
    key_colour = document.getElementById("color_main").value;
}






// 寬高功能拉出來獨立
// 建立重畫功能