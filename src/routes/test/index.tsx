import React, { PureComponent } from "react";
import "./index.scss";
import { Button } from "antd-mobile";
import { Bubble } from "@utils/index";
// import { qs_parse } from "src/utils";
// const ROSE = require("@/assets/rose2.jpeg").default;
const LONG = require("@/assets/dragon.jpg").default;
export default class Test extends PureComponent<any, any> {
  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | null | undefined;
  private img: HTMLImageElement = new Image();
  private divEle: HTMLDivElement | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      phone: "15727531836",
      imgload: false,
    };
  }
  componentDidMount() {
    this.get_canvas();
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
  // 获取并裁剪画布的点阵信息
  get_canvas_data = () => {
    if (this.ctx) {
      const imageData = this.ctx?.getImageData(
        0,
        0,
        this.img.width,
        this.img.height
      ).data;
      this.ctx.fillStyle = "#fff";
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
          <Button>呵呵</Button>
        </div>
        <canvas ref={(node: any) => (this.canvas = node)}></canvas>
        <div
          ref={(node: any) => (this.divEle = node)}
          className="container"
        ></div>
      </section>
    );
  }
}
