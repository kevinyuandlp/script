// Quantumult X geo_location_checker for https://api.ip.sb/geoip
if ($response.statusCode != 200) {
  $done(null);
}

const emojis = [
  "🆘","🈲","⚠️","🔞","📵","🚦","🏖","🖥","📺","🐧","🐬","🦉","🍄",
  "⛳️","🚴","🤑","👽","🤖","🎃","👺","👁","🐶","🐼","🐌","👥",
];
var city0 = "高谭市";
var isp0 = "Cross-GFW.org";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function City_ValidCheck(para) {
  return para ? para : city0; //emojis[getRandomInt(emojis.length)]
}
function ISP_ValidCheck(para) {
  return para ? para : isp0; //emojis[getRandomInt(emojis.length)]
}
function Area_check(para) {
  return para === "中华民国" ? "台湾" : para;
}

var flags = new Map([
  ["CN","🇨🇳"],["HK","🇭🇰"],["MO","🇲🇴"],["TW","🇨🇳"],["JP","🇯🇵"],
  ["KR","🇰🇷"],["US","🇺🇸"],["SG","🇸🇬"],["DE","🇩🇪"],["GB","🇬🇧"],
  ["FR","🇫🇷"],["AU","🇦🇺"],["CA","🇨🇦"],["RU","🇷🇺"],["IN","🇮🇳"],
  ["BR","🇧🇷"],["TH","🇹🇭"],["VN","🇻🇳"],["MY","🇲🇾"],["PH","🇵🇭"],
  ["ID","🇮🇩"],["TR","🇹🇷"],["IT","🇮🇹"],["ES","🇪🇸"],["NL","🇳🇱"],
  ["PL","🇵🇱"],["SE","🇸🇪"],["CH","🇨🇭"],["AE","🇦🇪"],["AR","🇦🇷"]
]);

var body = $response.body;
var obj = JSON.parse(body);

// ip.sb 字段适配
var countryCode = obj["country_code"];
var country = obj["country"];
var region = obj["region"];
var city = obj["city"];
var ip = obj["ip"];
var timezone = obj["timezone"];
var isp = obj["organization"];
var asorg = obj["asn_organization"] || obj["organization"] || isp;

var title = (flags.get(countryCode) || "🏳️") + " " + City_ValidCheck(city);
var subtitle = ISP_ValidCheck(asorg);
var description =
  "服务商: " + ISP_ValidCheck(isp) + "\n" +
  "地区: " + Area_check(country) + " • " + City_ValidCheck(region) + "\n" +
  "IP: " + ip + "\n" +
  "时区: " + timezone;

$done({ title, subtitle, ip, description });
