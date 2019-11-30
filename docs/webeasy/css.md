# CSS常用技巧

## reset.css

```css
@charset "utf-8";html a{color:#333;}body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0;}h1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%;}h1,h2,h3,h4,h5,h6{font-family:"Microsoft Yahei";}h1,h2,h3,h4,h5,h6,b,strong{font-weight:normal;}address,cite,dfn,em,i,optgroup,var{font-style:normal;}table{border-collapse:collapse;border-spacing:0;}caption,th{text-align:inherit;}ul,ol,li,menu{list-style:none;}fieldset,img{border:0;}img,object,textarea,button,select{vertical-align:middle;}article,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block;}audio,canvas,video{display:inline-block;*display:inline;*zoom:1;}blockquote:before,blockquote:after,q:before,q:after{content:"\0020";}textarea{overflow:auto;resize:vertical;}input,textarea,button,select,a{outline:0 none;border:none;}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0;}input::-webkit-input-placeholder{color:#dcdfe6;}input::-ms-input-placeholder{color:#dcdfe6;}input::-moz-input-placeholder{color:#dcdfe6;}mark{background-color:transparent;}a,ins,s,u,del{text-decoration:none;}sup,sub{vertical-align:baseline;}html,body{width:100%;height:100%;-webkit-tap-highlight-color:transparent;color:#333;font-family:"Microsoft Yahei";line-height:1;-webkit-text-size-adjust:none;font-size:14px;}
```

## public.scss

```css
$color: #e3f2ff;

//单行文本溢出
.ellipsis-one {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

//两行文本溢出
.ellipsis-two {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

//三行文本溢出
.ellipsis-three {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.tc {
  text-align: center;
}

.tr {
  text-align: right;
}

//按钮
@mixin btn($w, $h, $type: normal, $radius: true) {
  display: inline-block;
  width: $w;
  height: $h;
  line-height: $h;
  text-align: center;
  color: #fff;

  &:active {
    opacity: 0.8;
  }

  @if $radius {
    //是否需要边框 默认需要
    border-radius: if($radius==true, $h/2, $radius);
  }

  @if $type==normal {
    //默认按钮
    background: $Color;
  }

  @if $type==danger {
    //警告按钮
  }

  @if $type==disabled {
    //禁用按钮
  }
}

// 生成三角形
@mixin triangle($direction, $size, $borderColor) {
  content: "";
  height: 0;
  width: 0;

  @if $direction==top {
    border-bottom: $size solid $borderColor;
    border-left: $size dashed transparent;
    border-right: $size dashed transparent;
  } @else if $direction==right {
    border-left: $size solid $borderColor;
    border-top: $size dashed transparent;
    border-bottom: $size dashed transparent;
  } @else if $direction==bottom {
    border-top: $size solid $borderColor;
    border-left: $size dashed transparent;
    border-right: $size dashed transparent;
  } @else if $direction==left {
    border-right: $size solid $borderColor;
    border-top: $size dashed transparent;
    border-bottom: $size dashed transparent;
  }
}

//生成圆点
@mixin DOT($width, $color: #ddd) {
  width: $width;
  height: $width;
  border-radius: $width;
  background-color: $color;
}

//计算百分比  percentage(56 / 750)
@function math-percent($px, $base: 750) {
  @return ($px / $base) * 100%;
}

//计算百分比  percentage(56 / 750)
@function my-percent($px, $base) {
  @return ($px / $base) * 100%;
}

//背景图片
@mixin BG() {
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
```
