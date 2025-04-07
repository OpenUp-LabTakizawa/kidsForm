// DOMが読み込まれた後に実行される処理
document.addEventListener('DOMContentLoaded', function() {
    // フォームを取得
    var form = document.querySelector('form');
    
    // 送信ボタンを無効にする関数
    function disableSubmitButton(event) {
        // フォーム送信を一時的に停止
        event.preventDefault();
        
        // 送信ボタンを無効化
        var button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = "送信中...";

        // 実際の送信処理（非同期で送信する場合はここで行う）
        // ここではフォームを再送信しています
        form.submit();
    }

    // フォームのonsubmitイベントに関数を設定
    form.addEventListener('submit', disableSubmitButton);
});
