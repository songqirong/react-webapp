set -e
# 删除更改
# git checkout tsconfig.json


# 推到远程
git add .
git commit -m $1
git push

# build
# npm run build 
# 删除更改
# git checkout tsconfig.json
# 压缩文件并删除源文件夹
# zip -rm build.zip build

