var xx = parseInt(prompt("輸入繪製高度:"));
while (isNaN(xx)) {
    xx = parseInt(prompt("請輸入數字\n輸入寬:"));
}

var yy = parseInt(prompt("輸入繪製寬度:"));
while (isNaN(yy)) {
    yy = parseInt(prompt("請輸入數字\n輸入高:"));
}

// 地圖建立過程c
var td_all = "<td class='td_all' id='td_1' onclick='ontest(event)';></td>";
// var tr_all;
for (let i = 2; i < (xx * yy) + 1; i++) {
    td_all += `<td class='td_all' id='td_${i}' onclick='ontest(event)';></td>`;
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
    document.getElementById(`td_${i}`).style.width = "10px";
    document.getElementById(`td_${i}`).style.height = "10px";
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

    if (x.style.backgroundColor != "") {
        x.style.backgroundColor = "";
    } else {
        x.style.backgroundColor = key_colour;
    }


    console.log(e.path[0].id);
    // console.log(e);
    // console.log(e.path[0]);
}

var key_colour = document.getElementById("color_main").value;

// 判斷按住ctrl
function movekeydown(event) {
    key_colour = document.getElementById("color_sup").value;
}

// 判斷放開ctrl
function movekeyup(event) {
    key_colour = document.getElementById("color_main").value;
}

// 選擇顏色事件
function change_mycolor(){
    key_colour = document.getElementById("color_main").value;
}


// 換格子尺寸
function change_size(){
    var x = document.getElementById("change_size").value;
    for (let i = 1; i < (xx * yy); i++) {
        document.getElementById(`td_${i}`).style.width = x;
        document.getElementById(`td_${i}`).style.height = x;
    }
}