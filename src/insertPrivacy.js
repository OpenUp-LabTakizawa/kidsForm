// fetchを使って外部HTMLファイルを取得
fetch('../pages/privacy-policy.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('ネットワークの問題が発生しました');
    }
    return response.text();  // レスポンスをテキストとして取得
  })
  .then(data => {
    // 取得したHTMLを指定した要素に挿入
    document.getElementById('ppolicy').innerHTML = data;
  })
  .catch(error => {
    console.error('HTMLの読み込み中にエラーが発生しました:', error);
  });