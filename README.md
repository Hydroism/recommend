## platform of recommend goods

- 主要为练习vue/lic3.0的移动端商城，为以后的项目做参考使用
- 其功能涉及vue vue-router axious vant主要模块
- 细化分包括rem适配方案，图片懒加载的最佳实践，vant的使用，请求的封装等

### rem适配方案

个人代码中，使用了config目录rem.js 通过获取屏幕水平分辨率，控制html的font-size，css中所有需要
适配的大小均用rem来控制大小，参考基准是iphone6/7的375px，20px为1rem来转换，取得对应rem值。

但是vant默认使用了px，因此需要另外为vant的组件做适配。

参考了文章https://blog.csdn.net/weixin_30242907/article/details/101909189

### 图片懒加载

图片懒加载比较麻烦的一个点就是懒加载的图片问题，由于图片具体大小不确定，因此需要提前为图片指定大
小，另外由于图片比例存在差异，vue-lazyLoad的loading图不完全适配所有的图片。在这里将loading图缩
小，放在了图片正中央，除了个别比例差别特别大的，该方案均能适配

### vant的使用

按需引用，由于编译器会报html标签问题，因此在components重新声明了一下。

### axious请求封装