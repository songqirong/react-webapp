import cookie from "js-cookie";
export function qs_parse(url: string = location.search) {
  url = url.replace(/#.*/, "");
  url.slice(0, 1);
  console.log(url, "url");
  const obj: Record<string, any> = {};
  url.split("&").forEach((item) => {
    const arr = item.split("=");
    obj[arr[0]] = arr[1];
  });
  return obj;
}
export const check_phone = (phone: string) => {
  return /^1[3456789]\d{9}$/.test(phone);
};
export const fun_to_promise = (data: any, fn: any) => {
  return new Promise((resolve) => {
    fn(data, resolve);
  });
};
export const save_cookie = (key: string, val: string, exp: number) => {
  cookie.set(key, val, {
    expires: exp,
    path: "",
  });
};
