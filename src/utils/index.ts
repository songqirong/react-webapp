import cookie from 'js-cookie';
const BUBBLE = require('@/assets/bubble.png').default;
export function qs_parse(url: string = location.href) {
  url = url.slice(url.indexOf('?') + 1);
  url = url.replace(/#.*/, '');
  const obj: Record<string, any> = {};
  url.split('&').forEach((item) => {
    const arr = item.split('=');
    obj[arr[0]] = arr[1];
  });
  return obj;
}
export const check_phone = (phone: string) => /^1[3456789]\d{9}$/.test(phone);
export const fun_to_promise = (data: any, fn: any) => new Promise((resolve) => {
  fn(data, resolve);
});
export const save_cookie = (key: string, val: string, exp: number) => {
  cookie.set(key, val, {
    expires: exp,
    path: '',
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
      const bubble = document.createElement('img');
      bubble.src = BUBBLE;
      bubble.setAttribute('class', 'bubble');
      const bubbleSize = Math.random() * 10 + 20;
      bubble.style.left = this.w * dragonScale - bubbleSize / 2 + 'px';
      bubble.style.top = this.h * dragonScale - bubbleSize / 2 + 'px';
      bubble.style.width = bubble.style.height = bubbleSize + 'px';
      bubble.style.animationDuration = Math.random() * 6 + 4 + 's';
      this.ele?.appendChild(bubble);
    }
  }
}
type IConfig = {
  bgWidth: number;
  bgHeight: number;
  canvas: any;
};
type Iimages = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
export class MyCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null | undefined;
  constructor(config: IConfig) {
    this.canvas = config.canvas; // ????????????
    this.canvas.width = config.bgWidth;
    this.canvas.height = config.bgHeight;
    this.ctx = this.canvas.getContext('2d');
  }
  public async run(images: Iimages[]) {
    await Promise.all(images.map((item) => this.getImg(item))); // ???????????????????????????
  }
  private getImg(item: Iimages) {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'Anonymous');
      img.src = item.src;
      img.onload = () => {
        const { x, y, width, height } = item;
        this.ctx?.drawImage(img, x, y, width, height);
        resolve();
      };
    });
  }
  public print(ele: HTMLImageElement) {
    ele.src = this.canvas?.toDataURL() || '';
  }
  public download() {
    // ??????????????????
    this.canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.download = 'image.png';
      a.style.display = 'none';
      a.href = URL.createObjectURL(blob as any);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}

/* canvas  */
type Iimages1 = {
  src: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  isInit?: boolean;
};

type Itext = {
  text: string;
  color: string;
  font: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  x?: number;
  y?: number;
};

type IModel = {
  url: string; // ????????????
  amountFontSize: number; // ???????????????????????????
  rmbFontSize: number; // ?????????????????????
  timeFontSize: number; // ?????????????????????
  rmbY: number; // ????????????????????????
  amountY: number; // ??????????????????????????????
  timeFontColor: string; // ?????????????????????
  timeX: number; //????????????????????????
  timeY: number; //????????????????????????
};
export class MyCanvas1 {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  constructor() {
    this.canvas = document.createElement('canvas'); // ????????????
    this.ctx = this.canvas.getContext('2d');
  }
  public async run(images: Iimages1[]) {
    await Promise.all(images.map((item) => this.getImg(item))); // ???????????????????????????
  }
  private getImg(item: Iimages1) {
    // ????????????????????????????????????????????????
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'Anonymous'); // ????????????????????????????????????
      img.src = item.src;
      img.onload = () => {
        const {
          x = 0,
          y = 0,
          width = img.width,
          height = img.height,
          isInit = false,
        } = item;
        if (isInit) {
          this.canvas.width = width;
          this.canvas.height = height;
        }
        this.ctx?.drawImage(img, x, y, width, height);
        resolve();
      };
    });
  }
  // ????????????
  public text(config: Itext) {
    const {
      text,
      color,
      font,
      textAlign = 'center',
      textBaseline = 'middle',
      x = 0,
      y = 0,
    } = config;
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.font = font;
      this.ctx.textAlign = textAlign;
      this.ctx.fillStyle = color;
      this.ctx.textBaseline = textBaseline;
      this.ctx.fillText(text, x, y);
      this.ctx.closePath();
    }
  }
  // ????????????
  public print(ele: HTMLImageElement) {
    ele.src = this.canvas?.toDataURL();
    return this.canvas;
  }
  // ????????????
  public download() {
    // ??????????????????
    this.canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.download = 'image.png';
      a.style.display = 'none';
      a.href = URL.createObjectURL(blob as any);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // ????????????
  public async copyImg() {
    if (!(navigator.clipboard && typeof ClipboardItem !== 'undefined'))
      return alert('??????????????????????????????,???????????????????????????');
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(async(blob) => {
        await (navigator.clipboard as any).write([
          new ClipboardItem({
            [(blob as any).type]: blob,
          } as any),
        ]);
        resolve(true);
      });
    });
  }

  // ?????????????????????
  public async drawImage(model: IModel, time: string, money: number) {
    if (!this.ctx) return;
    const img = await this.getImage(model.url);
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.ctx.drawImage(img, 0, 0, img.width, img.height);
    this.drawText(this.ctx, money, time, this.canvas.width, model);
  }
  // ????????????
  public getImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'Anonymous'); // ???????????????????????????????????????
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
    });
  public async drawText(
    ctx: CanvasRenderingContext2D,
    amount: number,
    time: string,
    canvasWidth: number,
    model: IModel,
  ) {
    const Iamount = amount.toFixed(2);
    // ????????
    ctx?.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = `bold ${model.amountFontSize}px SimHei`;
    // ??????????????????
    const amountWidth = ctx.measureText(Iamount.toString()).width;
    ctx.font = `bold ${model.rmbFontSize}px SimHei`;
    // ??????????????
    const rmbWidht = ctx.measureText('??').width;
    ctx.fillText('??', (canvasWidth - (amountWidth + rmbWidht)) / 2, model.rmbY);
    ctx.closePath();

    // ????????????
    ctx.beginPath();
    ctx.font = `bold ${model.amountFontSize}px SimHei`;
    ctx.fillStyle = 'black';
    ctx.fillText(
      Iamount.toString(),
      (canvasWidth - (amountWidth + rmbWidht)) / 2 + rmbWidht + 10,
      model.amountY,
    );
    ctx.closePath();

    // ????????????
    ctx.beginPath();
    ctx.font = `bold ${model.timeFontSize}px SimHei`;
    ctx.fillStyle = model.timeFontColor;
    ctx.fillText(time, model.timeX, model.timeY);
    // ????????????
    ctx.closePath();
  }
}
