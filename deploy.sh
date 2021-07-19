set -e

# 推到远程
git add .
git commit -m "调整样式"
git push

# build
npm run build 
# 压缩文件并删除源文件夹
zip -rm build.zip build
