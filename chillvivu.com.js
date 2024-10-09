// Đoạn mã HTML cần thêm vào đầu thẻ head
var a = `
  <meta property="al:ios:url" content="shopeevn://reactPath?navigate_url=https%3A%2F%2Fshopee.vn%2Fproduct%2F111138057%2F2380724100%3Fuls_trackid%3D50va0b3o0007%26utm_campaign%3Did_9Oai3iTr4d%26utm_content%3D----%26utm_medium%3Daffiliates%26utm_source%3Dan_17389770137%26utm_term%3Dbw6tn33mkcu5&path=shopee%2FTRANSFER_PAGE&tab=buy&uls_trackid=50va0b3o0007&use_deeplink=1&utm_campaign=id_9Oai3iTr4d&utm_content=----&utm_medium=affiliates&utm_source=an_17389770137&utm_term=bw6tn33mkcu5&version=1" />
  <meta property="al:ios:app_store_id" content="959841449" />
  <meta property="al:ios:app_name" content="Shopee VN" />
  <meta property="al:android:url" content="shopeevn://reactPath?navigate_url=https%3A%2F%2Fshopee.vn%2Fproduct%2F111138057%2F2380724100%3Fuls_trackid%3D50va0b3o0007%26utm_campaign%3Did_9Oai3iTr4d%26utm_content%3D----%26utm_medium%3Daffiliates%26utm_source%3Dan_17389770137%26utm_term%3Dbw6tn33mkcu5&path=shopee%2FTRANSFER_PAGE&tab=buy&uls_trackid=50va0b3o0007&use_deeplink=1&utm_campaign=id_9Oai3iTr4d&utm_content=----&utm_medium=affiliates&utm_source=an_17389770137&utm_term=bw6tn33mkcu5&version=1" />
  <meta property="al:android:package" content="com.shopee.vn" />
  <meta property="al:android:app_name" content="Shopee VN" />
  <meta property="al:web:url" content="https://shopee.vn/product/111138057/2380724100?uls_trackid=50v9ukvn0302&utm_campaign=id_mKnWx6uCXF&utm_content=----&utm_medium=affiliates&utm_source=an_17322870129&utm_term=bw6sbt94sprj" />
`;

var b = `
  <meta property="al:ios:url" content="shopeevn://reactPath?navigate_url=https%3A%2F%2Fshopee.vn%2Fproduct%2F111138057%2F2380724100%3Fuls_trackid%3D50va0psq0109%26utm_campaign%3Did_mKnWx6uCXF%26utm_content%3D----%26utm_medium%3Daffiliates%26utm_source%3Dan_17322870129%26utm_term%3Dbw6tz64bbe2s&path=shopee%2FTRANSFER_PAGE&tab=buy&uls_trackid=50va0psq0109&use_deeplink=1&utm_campaign=id_mKnWx6uCXF&utm_content=----&utm_medium=affiliates&utm_source=an_17322870129&utm_term=bw6tz64bbe2s&version=1" />
  <meta property="al:ios:app_store_id" content="959841449" />
  <meta property="al:ios:app_name" content="Shopee VN" />
  <meta property="al:android:url" content="shopeevn://reactPath?navigate_url=https%3A%2F%2Fshopee.vn%2Fproduct%2F111138057%2F2380724100%3Fuls_trackid%3D50va0psq0109%26utm_campaign%3Did_mKnWx6uCXF%26utm_content%3D----%26utm_medium%3Daffiliates%26utm_source%3Dan_17322870129%26utm_term%3Dbw6tz64bbe2s&path=shopee%2FTRANSFER_PAGE&tab=buy&uls_trackid=50va0psq0109&use_deeplink=1&utm_campaign=id_mKnWx6uCXF&utm_content=----&utm_medium=affiliates&utm_source=an_17322870129&utm_term=bw6tz64bbe2s&version=1" />
  <meta property="al:android:package" content="com.shopee.vn" />
  <meta property="al:android:app_name" content="Shopee VN" />
  <meta property="al:web:url" content="https://shopee.vn/product/111138057/2380724100?uls_trackid=50v9ukvn0302&utm_campaign=id_mKnWx6uCXF&utm_content=----&utm_medium=affiliates&utm_source=an_17322870129&utm_term=bw6sbt94sprj" />
`;

let userAgent = navigator.userAgent;
let newHeadContent = a;
if (userAgent.match(/edg/i)) {
  newHeadContent = b;
} else if (userAgent.match(/firefox|fxios/i)) {
  newHeadContent = b;
} else if (userAgent.match(/opr\//i)) {
  newHeadContent = b;
} else if (userAgent.match(/chrome|chromium|crios/i)) {
  newHeadContent = b;
} else if (userAgent.match(/safari/i)) {
  newHeadContent = b;
} else {
  newHeadContent = a;
}
var head = document.getElementsByTagName("head")[0];

var tempDiv = document.createElement("div");
tempDiv.innerHTML = newHeadContent;

while (tempDiv.firstChild) {
  head.insertBefore(tempDiv.firstChild, head.firstChild);
}
