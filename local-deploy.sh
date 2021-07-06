echo "Starting.."
mkdir dist
cp -Rf define dist/cerebro-mar-define

cp -Rf dist/* ~/Library/Application\ Support/Cerebro/plugins/node_modules/
rm -rf dist
echo "Done"
