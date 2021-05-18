import cookie from "js-cookie";
export function qs_parse(url: string = location.search) {
  console.log(url, "url");
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
