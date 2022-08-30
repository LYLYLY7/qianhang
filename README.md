# qianhang
前端导航面试
# 上传仓库
### step1
首先清空dist文件夹
```
rm -rf dist
```
### step2
```
parcel build src/index.html --no-minify --public-url ./
```
### step3
查看dist文件中的index.html文件里的script标签的路径
要求：路径前面不能有./
### step4
git 操作 .gitgnore中不能含有dist操作
### step5
发布网址 https://xxxxxx.github.io/qianhang/dist/index.html
！！！ 一定是dist文件下的index.html
最后打开网页进行如下设置
![image](https://user-images.githubusercontent.com/100218788/187475026-5feba5b4-f8cc-49de-a2c4-f2468b9ec080.png)
![image](https://user-images.githubusercontent.com/100218788/187475301-2edd9030-fece-4609-be18-49ac4cf8effd.png)
