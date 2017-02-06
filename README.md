# vero-api-delegator
takes a csv formatted for vero import and delegates it to the api via localhost

## installation
1. clone this repo
1. `npm install -g`
3. copy or rename `secret-config-example.json` to `secret-config.json`
4. add your api keys

## usage
3. run `$vero -e env -m method -c path/to.csv`

## methods
| UserEdit  | UserTag  | UserUnsubscribe  | HeartBeat  |
|:--|:--|:--|:--|
| edit or add user properties  | add tags to users  | unsubscribe users  | check if the api is up  |