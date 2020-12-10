import { COLOR } from 'oneutil'

export default class Animation{
     constructor() {
         this._animations = [];
         this._buffer = [];
         this.duration = 400;
         this.timingFunction = "linear";
         this.delay = 0;
         this.transformOrigin = "50% 50% 0";
     }

     scale(sx, sy) {
         if(sy==null) {
             sy = sx;
         }
         this._buffer.push({type: "scale", values: [parseFloat(sx), parseFloat(sy)]});
         return this;
     }

     scaleX(s) {

         return this.scale(s, 1);
     }

     scaleY(s) {

         return this.scale(1, s);
     }

//横向拉伸
     width(width) {
         this._buffer.push({type: "width", values: [width]});
         return this;
     }

//纵向拉伸
     height(height) {
         this._buffer.push({type: "height", values: [height]});
         return this;
     }

//旋转度数：rotation、rotationX、rotationY
     rotate(degree) {
         this._buffer.push({type: "rotate", values: [parseFloat(degree)]});
         return this;
     }

     rotateX(degree) {
         this._buffer.push({type: "rotateX", values: [parseFloat(degree)]});
         return this;
     }

     rotateY(degree) {
         this._buffer.push({type: "rotateY", values: [parseFloat(degree)]});
         return this;
     }

     rotateZ(degree) {
         this._buffer.push({type: "rotateZ", values: [parseFloat(degree)]});
         return this;
     }

//透明动画
     opacity(alpha) {
         this._buffer.push({type: "alpha", values: [alpha]});
         return this;
     }

//平移：translationX、translationY
     translate(tx, ty) {
         if(ty==null){
             ty=tx;
         }
         this._buffer.push({type: "translation", values:[parseFloat(tx), parseFloat(ty)]});
         return this;
     }

     translateX(t) {
         return this.translate(t, 0.0);
     }

     translateY(t) {
         return this.translate(0.0, t);
     }

//距离
     top(top) {

         return this.translateY(top);
     }

     left(left) {

         return this.translateX(left);
     }

     bottom(bottom) {

         this._buffer.push({type: "bottom", values: [bottom]});
         return this;
     }

     right(right) {
         this._buffer.push({type: "right", values: [right]});
         return this;
     }

//背景颜色
     backgroundColor(backgroundColor) {
         let color = COLOR.parse(backgroundColor);
         this._buffer.push({type: "backgroundColor", values: [color]});
         return this;
     }

//倾斜
     skew(sx, sy) {
         if(sy==null){
             sy=sx;
         }
         this._buffer.push({type: "skew", values:  [parseFloat(sx), parseFloat(sy)]});
         return this;
     }

//矩阵
     matrix(a, b, c, d, tx, ty) {
         this._buffer.push({type: "matrix", values: [a, b, c, d, tx, ty]});
         return this;
     }

     matrix3d(a, b, c, d, e, f, g, tx, ty) {
         this._buffer.push({type: "matrix3d", values: [a, b, c, d, e, f, g, tx, ty]});
         return this;
     }

    //  step(option) {
    //      let animationInfoSet = {animationInfos: []};
    //      for (let a = 0; a < this._buffer.length; a++) {
    //          let animationInfo = this._buffer[a];
    //          animationInfoSet.animationInfos.push(animationInfo);
    //      }
    //      this._animations.push(animationInfoSet);
    //    //  this._buffer = [];
    //      return this;
    //  }

     export() {
         let actions = [];
         for (let s = 0; s < this._animations.length; s++) {
             let animationInfoSet = this._animations[s];
             let action = {};
             //定义集合
             let animates = [];
             for (let a = 0; a < animationInfoSet.animationInfos.length; a++) {
                 let animationInfo = animationInfoSet.animationInfos[a];
                 let animate = {};
                 animate["type"] = animationInfo.type;
                 animate["args"] = animationInfo.values;
                 animates.push(animate);
             }
             action["animates"] = animates;
             //
             let option = {};
             option["transformOrigin"] = this.transformOrigin;
             option["transition"] = {
                 duration: this.duration,
                 timingFunction: this.timingFunction,
                 delay: this.delay
             };
             action["option"] = option;
             //
             actions.push(action);
         }
         //
         this._buffer = [];
         this._animations = [];
         //
         return  {
             actions: actions
         };
     }
 }
