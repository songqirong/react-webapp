import cookie from "js-cookie";
const BUBBLE = require("@/assets/bubble.png").default;
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
export class Bubble {
  private h: any;
  private w: any;
  private imageData: any;
  private img: any;
  private ele: any;
  constructor(obj: any) {
    this.h = obj.h;
    this.w = obj.w;
    this.imageData = obj.imageData;
    this.img = obj.img;
    this.ele = obj.ele;
    this.render();
  }
  render() {
    const dragonScale = 2;
    const position = (this.img.width * this.h + this.w) * 4;
    const r = this.imageData[position],
      g = this.imageData[position + 1],
      b = this.imageData[position + 2];
    if (r + g + b === 0) {
      const bubble = document.createElement("img");
      bubble.src = BUBBLE;
      bubble.setAttribute("class", "bubble");
      const bubbleSize = Math.random() * 10 + 20;
      bubble.style.left = this.w * dragonScale - bubbleSize / 2 + "px";
      bubble.style.top = this.h * dragonScale - bubbleSize / 2 + "px";
      bubble.style.width = bubble.style.height = bubbleSize + "px";
      bubble.style.animationDuration = Math.random() * 6 + 4 + "s";
      this.ele?.appendChild(bubble);
    }
  }
}
