document.addEventListener("DOMContentLoaded", function () {
  const validKeys = [
    "QXHZIM5HG07D", "28XCCC8RR5R5", "ZMZJHF4RZYLP", "5VZEC94AMM20", "79JGPBDEKT3G",
    "NC8DFVYOJ8YR", "9DR3GUYYG2GC", "CB3J8ZRG95FA", "WWYBIR29HTNE", "DKABRZP5T45B",
    "BTK8MKQMHNEU", "UD7K2GEAKM43", "QSTL6HVV1EQ3", "O2QWT9S1X3P4", "QFEZNR9YBE3W",
    "1V1QKTT0OBJD", "HCSNYH1XDTE9", "7VCXHND1UX88", "6NL2YJ3I4V5I", "S5O1E74CXD2L",
    "P1YJZP0Z4D7B", "FLQ9F6KHLXAX", "Z0ZQGIMK4M2M", "3E42ESW7P2AJ", "HZJ3ERPTF2XY",
    "C8BWZPQGKDKF", "C5WOV8A4UOL3", "OBLG4RIZCJX9", "NODZ1XK6OT91", "XAXSB7IV1E0P",
    "CB5E8ED5CLCB", "WEFF9KJJJDAA", "92R3YNRWIKGO", "7ZKR1ZV6HHUP", "NB2OGLGAGMWJ",
    "L1P10V0FOV2Y", "NDM10Y2X0KTP", "IC6BZNF0M6NB", "E1QX5CRNXZ8R", "GJD86AT2XUYM",
    "FD7F03Z5TNTZ", "1XRIJFL8QPX6", "OWYH5FGXKM9Q", "Z1FJ91N31UJD", "LOEEI4O4ONRT",
    "M3C9XAI8J5ZO", "KRO6KG9K2XFG", "LB69T12ZMFQ9", "D0FUKI6UEX7T", "OQ9S3UARJL6P",
    "J67JY8QHZL45", "D3A16XYKZ9B2", "U1CTF60U35XY", "AV5R4AK9IE6K", "PGY6Z7G5N68U",
    "WQNSPQFT1J3X", "MEJ5WS3MPJZB", "D2G9QEM0D8E0", "HPAY4RQD6W7I", "TZU77VD4UQU8",
    "ZPKF7WN1XR65", "F24KZBOWQK0D", "B7UJ4WQULHK8", "JPZY1JZ46P35", "R9Z1XHZU2INX",
    "NU5CGXJ2LKO9", "I0DTSB6XWRMP", "IR8R3DBSBDA3", "MLYQJFWZMXC1", "DO6U0YV6B83Y",
    "P6E6UZ5KNKMG", "UBO8BGXILBCL", "LSTB1R0A6LKP", "JUML6J3EDLZ2", "2N9WEPTM8LDK",
    "6VO8E7YIY6PK", "UOMYNH4XGAY9", "8T9CKO55VZ48", "DW32A9WSPP68", "RUPLUB8ZDRA2",
    "DOESVXDF9NK5", "BNLOLS1NLNG8", "WQZ6IQ3P5SH2", "MZ9VBL7K0BQ1", "3KFF1U2AAQ8D",
    "9BPQJND9V6AB", "RNO85FY6GLN5", "JW10LTURUMVP", "DXYR9V9PYU2Z", "1PRXBM1ZOH8X",
    "YJTWZJKLZP6W", "O4F1X92QXRW5", "Y5DJ0DEDUV8D", "ZB7JXSN2H39J", "HJHZK2SBRVDI",
    "CB1MHNYHMLT8", "W5AJ6S41QK7C", "FHPX45DSV7RN", "9E7P4KPZ5TZS", "RDHJZLLI3XWE",
    "JW9UB4I7E0AU", "92Q9ZW1YK92K", "7W8CJ23W3T0G", "J55OJCPZFWQ1", "WUSZKF3A9E1H"
  ];

  const adminKeys = ["BAKUSTALKER1", "KOLYUCHIY535"];
  const usedKeys = JSON.parse(localStorage.getItem("usedKeys")) || [];

  function requestAccess() {
    const key = prompt("Введите ключ доступа:");

    if (!key) {
      alert("Ключ не введён.");
      requestAccess();
      return;
    }

    if (usedKeys.includes(key) && !adminKeys.includes(key)) {
      alert("Этот ключ уже использовался.");
      requestAccess();
      return;
    }

    if (validKeys.includes(key) || adminKeys.includes(key)) {
      if (!adminKeys.includes(key) && !usedKeys.includes(key)) {
        usedKeys.push(key);
        localStorage.setItem("usedKeys", JSON.stringify(usedKeys));
      }

      document.getElementById("map").style.display = "block";

      // 💥 Принудительно скрываем loader
      const loader = document.getElementById("loader");
      if (loader) loader.style.display = "none";

    } else {
      alert("Неверный ключ.");
      requestAccess();
    }
  }

  requestAccess();
});
