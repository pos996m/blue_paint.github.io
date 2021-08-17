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
var table_all = document.getElementById("table_all");
table_all.innerHTML = td_all;

var del_C = true;


function ontest(e) {
    if (!key_du) {
        console.log(e.path[0].id);
        document.getElementById(e.path[0].id).style.backgroundColor = "red";
    } else {
        document.getElementById(e.path[0].id).style.backgroundColor = "";
    }
    // console.log(e);
    // console.log(e.path[0]);
}

function Get_Td_Px() {
    x = document.getElementById("Get_Td_Px").value;
    console.log(x);
    document.getElementsByClassName("td_all").style.width = x;
    document.getElementsByClassName("td_all").style.height = x;
}

var key_du = false;

// 判斷按住ctrl
function movekeydown(event) {
    key_du = event.ctrlKey;
}

// 判斷放開ctrl
function movekeyup(event) {
    key_du = event.ctrlKey;
}