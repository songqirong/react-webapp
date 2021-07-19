set -e

# 推到远程
git add .
git commit -m "调整样式"
git push

# build
npm run build 
# 压缩文件
zip build.zip build
# 删除文件
rm -rf build