/*
URLパラメータ値渡し
https://qiita.com/hiroyukiwk/items/5162a8861f716bcd5fd7
*/

const urlParams = new URLSearchParams(window.location.search);
const param_Id = urlParams.get('id'); // パラメータの値を取得
const param_DisplayName = urlParams.get('displayname'); // パラメータの値を取得

// 初期入力
document.getElementById("line_userid").value = param_Id;
document.getElementById("line_displayName").value = param_DisplayName;

