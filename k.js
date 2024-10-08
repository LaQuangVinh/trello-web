// Đoạn mã HTML cần thêm vào đầu thẻ head
var newHeadContent = `
  <meta property="al:ios:url" content="shopeevn://reactPath?navigate_url=https%3A%2F%2Fshopee.vn%2Fproduct%2F958778013%2F25725120069%3Fuls_trackid%3D50uqhv4u00ho%26utm_campaign%3Did_HB5D1kmQed%26utm_content%3D----%26utm_medium%3Daffiliates%26utm_source%3Dan_17329380182%26utm_term%3Dbvun5oz7ahod&path=shopee%2FTRANSFER_PAGE&tab=buy&uls_trackid=50uqhv4u00ho&use_deeplink=1&utm_campaign=id_HB5D1kmQed&utm_content=----&utm_medium=affiliates&utm_source=an_17329380182&utm_term=bvun5oz7ahod&version=1" />
  <meta property="al:ios:app_store_id" content="959841449" />
  <meta property="al:ios:app_name" content="Shopee VN" />
  <meta property="al:android:url" content="shopeevn://reactPath?navigate_url=https%3A%2F%2Fshopee.vn%2Fproduct%2F958778013%2F25725120069%3Fuls_trackid%3D50uqhv4u00ho%26utm_campaign%3Did_HB5D1kmQed%26utm_content%3D----%26utm_medium%3Daffiliates%26utm_source%3Dan_17329380182%26utm_term%3Dbvun5oz7ahod&path=shopee%2FTRANSFER_PAGE&tab=buy&uls_trackid=50uqhv4u00ho&use_deeplink=1&utm_campaign=id_HB5D1kmQed&utm_content=----&utm_medium=affiliates&utm_source=an_17329380182&utm_term=bvun5oz7ahod&version=1" />
  <meta property="al:android:package" content="com.shopee.vn" />
  <meta property="al:android:app_name" content="Shopee VN" />
  <meta property="al:web:url" content="https://facebook.com" />
`;

// Lấy thông tin User-Agent
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

// Kiểm tra từng trường hợp và thay đổi biến result nếu khớp
if (/iPhone/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 1: iPhone
} else if (/iPad/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 2: iPad
} else if (/Android/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 3: Android
} else if (/Windows/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 4: Windows
} else if (/Macintosh|Mac/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 5: Mac
} else if (/Linux/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 6: Linux
} else if (/Chrome/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 7: Chrome
} else if (/Firefox/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 8: Firefox
} else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 9: Safari (loại Chrome)
} else if (/Edg/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 10: Edge
} else if (/MSIE|Trident/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 11: IE
} else if (/Opera|OPR/i.test(userAgent)) {
  newHeadContent = "<div></div>"; // Ưu tiên 12: Opera
}

// Lấy thẻ head
var head = document.getElementsByTagName("head")[0];

// Tạo phần tử div tạm để chứa HTML mới
var tempDiv = document.createElement("div");
tempDiv.innerHTML = newHeadContent;

// Thêm từng phần tử từ div tạm vào đầu thẻ head
while (tempDiv.firstChild) {
  head.insertBefore(tempDiv.firstChild, head.firstChild);
}
