const validKeys = [
  "3ZQR8W2NDXLP", "9YWB1F6XKZ3Q", "7TL9X8N3WJYD", "B5LJ2Q8W9XCR", "LXYQP49GJ7W3",
  "R8XKF9J73LT2", "Z49F2N7LYWCB", "3VKTJ9XZL7N8", "YQJ74MXP9B2C", "WNCY83ZPLR5X",
  "T3YRWZJ8M6LC", "9X7WY3QLJBTC", "QL3Z9XKFTY2M", "B6X9FMPZWTY3", "8TYPX3RL9KZQ",
  "WJKC7YPZ39LF", "2ZCXQFYWL93T", "F7XBWQ8TMCZ2", "NXZ7WYQTJL43", "LMYQK93FT2ZX",
  "TZW4NLX8QB93", "7FYQZ39XPWCL", "PQWJXZTY396L", "MY3QWLTX7ZC9", "Z4TNXPFQ8YL3",
  "KL8PZYWQ3RNT", "QB9LYWTFXZ73", "F3XYNZ7QWCLT", "2MLXPJ9QTYZ3", "XJYWT9ZC83LQ",
  "RZXPYQW83NLT", "M9LXYZT3WQF2", "YWFXZ93LQPTN", "8QLN3WT9ZXPY", "ZXYQTL93NPWF",
  "LYWXTZP3NQF8", "TQXNYP3WZL94", "WFZPQLXN839T", "9WTPYXZ3LQNF", "LFY3TZPWXNQ9",
  "ZTLWXQPNFY38", "NPZQWXYFT93L", "W3LXNYPQTZ9F", "TQ39LYXZWP8N", "XZWNQYTPFL93",
  "FLP93QWTZNXY", "YZXW3LTP9QFN", "N3YTZPWXLFQ9", "XYTQZPNWFL93", "TPWYXZ3FLNQ9",
  "ZFNQT3XYWPL9", "PQ3WXTNL9YFZ", "8ZXTNWL3PQFY", "YT93QXPWLZNF", "XLYTZQWPFN39",
  "QLWNTXP93FYZ", "Z3FLQWPTXYN9", "TYXNWQZL3P9F", "93WTZPXLFYQN", "XN3YWFLPZQT9",
  "NQTFY93XZPWL", "LQPNXW3TYZF9", "YWZ9F3TPQNLX", "PZLQXTYF39WN", "FZXPQLWT93YN",
  "WYQPTZNXFL39", "TXYPNQZ3WL9F", "YQTLF3PXWNZ9", "FXPWZNQYTL93", "TZLXF93QWNPY",
  "PXWTNQZ3FLY9", "LNYXPZQ3WT9F", "YWPXQZLTFN93", "TZPX93QNLFWY", "QLXN3YPZTFW9",
  "9FXWTL3PQNYZ", "YTZPWX3LQN9F", "FPLQXWZTY93N", "3NYZFXPWQLT9", "QTPNLF3XWZY9",
  "ZXTQPFNWL39Y", "YXW3ZNTL9QPF", "NLPZYWXTFQ39", "93WTPZLQXYFN", "TZYNPQL3WXF9",
  "L3WPNYXTFZQ9", "F9WLPTXYQN3Z", "QLTYXZPWN3F9", "XWPFYZNQTL93", "WXYTZQFLP3N9",
  "Z3YXFPLNWTQ9", "9FZLWPXTYQN3", "TXPZQYLNF39W", "YWTX3PQFLZN9", "LPX3WTFYZNQ9",
  "NXFLZ93WTYPQ", "Z3TFPWXYQLN9", "F9NWPXLQZTY3", "PWZQF3TYLN9X", "YFL39PWQTZXN"
];

const adminKey = "BAKUSTALKER1";

function isKeyUsed(key) {
  const used = JSON.parse(localStorage.getItem("usedKeys") || "[]");
  return used.includes(key);
}

function markKeyAsUsed(key) {
  const used = JSON.parse(localStorage.getItem("usedKeys") || "[]");
  used.push(key);
  localStorage.setItem("usedKeys", JSON.stringify(used));
}

function requestAccess() {
  const key = prompt("Введите 12-значный ключ доступа:");

  if (!key || key.length < 12) {
    alert("Неверный формат ключа.");
    requestAccess();
    return;
  }

  if (key === adminKey) {
    document.getElementById("map").style.display = "block";
    return;
  }

  if (isKeyUsed(key)) {
    alert("Этот ключ уже использован.");
    requestAccess();
    return;
  }

  if (!validKeys.includes(key)) {
    alert("Неверный ключ.");
    requestAccess();
    return;
  }

  markKeyAsUsed(key);
  document.getElementById("map").style.display = "block";
}

window.onload = () => {
  document.getElementById("map").style.display = "none";
  requestAccess();
};
