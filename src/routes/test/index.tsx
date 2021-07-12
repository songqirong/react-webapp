import React, { PureComponent } from "react";
import "./index.scss";
import { Button } from "antd-mobile";
import { Bubble } from "@utils/index";
import { qs_parse, MyCanvas } from "src/utils";
// const ROSE = require("@/assets/rose2.jpeg").default;
const LONG = require("@/assets/dragon.jpg").default;
export default class Test extends PureComponent<any, any> {
  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | null | undefined;
  private img: HTMLImageElement = new Image();
  private divEle: HTMLDivElement | undefined;
  private xtx: any;
  private mycanvas: MyCanvas | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      phone: "15727531836",
      imgload: false,
    };
  }
  componentDidMount() {
    // this.get_canvas();
    // this.mycanvas = new MyCanvas({
    //   bgWidth: 500,
    //   bgHeight: 600,
    //   canvas: this.canvas,
    // });
    // this.mycanvas
    //   .run([
    //     {
    //       src: `https://n.sinaimg.cn/ent/transform/460/w630h630/20180824/Zaob-hicsiaw3749625.jpg?timestamp=${Date.now()}`,
    //       x: 0,
    //       y: 0,
    //       width: 250,
    //       height: 600,
    //     },
    //     {
    //       src: `https://n.sinaimg.cn/ent/transform/460/w630h630/20180824/Zaob-hicsiaw3749625.jpg?timestamp=${Date.now()}`,
    //       x: 250,
    //       y: 0,
    //       width: 250,
    //       height: 600,
    //     },
    //   ])
    //   .then(() => {
    //     console.log("111");
    //     this.mycanvas?.print(this.xtx);
    //   });
  }
  // 将图片绘制到canvas
  get_canvas = () => {
    this.img.src = LONG;
    this.img.onload = () => {
      if (!!this.canvas) {
        this.canvas.width = this.img.width;
        this.canvas.height = this.img.height;
        this.ctx = this.canvas?.getContext("2d");
        this.ctx?.drawImage(this.img, 0, 0);
        this.get_canvas_data();
      }
    };
  };
  downImage = () => {
    if (this.mycanvas) {
      this.mycanvas.download();
    }
  };
  // 获取并裁剪画布的点阵信息
  get_canvas_data = () => {
    if (this.ctx) {
      const imageData = this.ctx?.getImageData(
        0,
        0,
        this.img.width,
        this.img.height
      ).data;
      // this.ctx.fillText("canvas生成图片测试", 100, 300);
      this.ctx.fillStyle = "#fff";
      // this.ctx.font = "50px";
      // const imgSrc = this.canvas?.toDataURL("image/png");
      // this.xtx.src = imgSrc;
      this.ctx.fillRect(0, 0, this.img.width, this.img.height);
      const gap = 8;
      for (let h = 0; h < this.img.height; h += gap) {
        for (let w = 0; w < this.img.width; w += gap) {
          const position = (this.img.width * h + w) * 4;
          const r = imageData[position],
            g = imageData[position + 1],
            b = imageData[position + 2];

          if (r + g + b == 0) {
            this.ctx.fillStyle = "pink";
            this.ctx.fillRect(w, h, 4, 4);
          }
        }
      }
      this.generate_contaner(imageData, gap);
    }
  };
  generate_contaner = (imageData: any, gap: any) => {
    const img = this.img;
    const ele = this.divEle;
    for (let h = 0; h < this.img.height; h += gap) {
      for (let w = 0; w < this.img.width; w += gap) {
        new Bubble({ w, h, img, ele, imageData });
      }
    }
  };
  render() {
    const { phone } = this.state;
    return (
      <section className="register-container">
         <div className="canvas">
          <span>{phone}</span>
          <Button onClick={this.downImage}>呵呵</Button>
        </div>
        {/* <canvas ref={(node: any) => (this.canvas = node)}></canvas> */}
         <div
          ref={(node: any) => (this.divEle = node)}
          className="container"
        ></div> 
        <div className="wrap">
          <input type="checkbox" id="input" />
          <div className="text">
            <label className="btn" htmlFor="input"></label>
            浮动元素是如何定位的
            正如我们前面提到的那样，当一个元素浮动之后当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
          </div>
        </div>
       {/* <img ref={(node: any) => (this.xtx = node)} crossOrigin="anonymous" /> */}
      </section>
      
    );
  }
}
