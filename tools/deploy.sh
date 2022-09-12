npm run build
ssh ssh://ncyujthp@node104-eu.n0c.com:5022 'rm -rf ./demo/build/*'
ssh ssh://ncyujthp@node104-eu.n0c.com:5022 '(() => import("./build/index.js"))(); > index.cjs'
scp -r -P 5022 build ncyujthp@node104-eu.n0c.com:./demo/
scp -r -P 5022 package.json ncyujthp@node104-eu.n0c.com:./demo/