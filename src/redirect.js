/*
CORSエラー回避 https://webird-programming.tech/archives/1495
リダイレクト処理　https://blog.future.ad.jp/%E3%82%B3%E3%83%94%E3%83%9A%E3%81%A7%E4%BD%BF%E3%81%88%E3%82%8Bjavascript%E3%81%A7%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%83%88%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95
*/

// GASのウェブアプリURLを指定（あなたのURLに置き換えます）
const gas_Url = "https://script.google.com/macros/s/AKfycbzZJca4lSb2CtGPmsQXiqSFOsqTUU8jaICCzO6g8jAnsTMHLLxu8pD87CW9m1fNYuO1/exec";  // GASのURLを設定

//一般応募URL
const appliedForm_url = "https://openup-labtakizawa.github.io/kidsForm/pages/applied_form";
//キャンセル待ち応募URL
const waitlistForm_url = "https://openup-labtakizawa.github.io/kidsForm/pages/waitlist_form";
//応募済URL
const appAlready_url = "https://openup-labtakizawa.github.io/kidsForm/pages/app_already";
//応募締切URL
const appClosed_url = "https://openup-labtakizawa.github.io/kidsForm/pages/app_closed";

redirect();


async function redirect() {
    const params = geturlParams();
    const [userId, displayName] = [params[0], params[1]];
    console.log("userID: " + userId + " " + "displayname: " + displayName);

    const userAppStatus = await requestAppStatus(userId);
    console.log("userAppStatus: " + userAppStatus);

    //ステータスに応じたページへリダイレクト
    const redirectUrl = geturl(userAppStatus) + "?id=" + userId + "&displayname=" + displayName;
    window.location.href = redirectUrl;
}


// async/awaitを使って output を返す方法
async function requestAppStatus(userId) {

    const userInput = userId;
    let output = "";
    const data = {
        input: userInput  // 入力されたデータをdataに格納
    };

    try {
        // POSTリクエストを送信
        const response = await fetch(gas_Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data)  // データをJSON形式で送信
        });
        // レスポンスをJSONとして処理
        const responseData = await response.json();

        output = responseData.output;
        // レスポンスが取得できたことを確認（デバッグ用）
        // console.log("GASの返答: " + responseData.output);

    } catch (error) {
        // エラーハンドリング
        console.error("エラー:", error);
    }
    return output;
}

function geturlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const param_Id = urlParams.get('id'); // パラメータの値を取得
    const param_DisplayName = urlParams.get('displayname'); // パラメータの値を取得

    return [param_Id, param_DisplayName];
}

function geturl(status) {
    switch (status) {
        case "一般応募":
            return appliedForm_url;

        case "キャンセル待ち応募":
            return waitlistForm_url;

        case "応募済":
            return appAlready_url;

        case "応募締切":
            return appClosed_url;

        case "無効":
            break;

        default:
            // TODO　管理者にアラート送信
            break;

    }
}