ssh -o StrictHostKeyChecking=no -i ~/.ssh/travis root@$IP <<EOF
  cd ~/React/websiteV2/
  git checkout .
  git pull -f origin master
  yarn install
  yarn build
  pm2 restart all
  cd build
  git init
  git add .
  git commit -m "deploy"
  git remote add deploy git@github.com:ZaynJarvis/websiteV2.git
  git checkout -b gh-pages
  git push -f deploy gh-pages
EOF
