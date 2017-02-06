# vero-api-delegator
takes a csv formatted for vero import and delegates it to the api via localhost

1. copy or rename `secret-config-example.json` to `secret-config.json`
2. add your api keys  
3. run `$node vero.js -e env -m method -c path/to.csv`

## methods
| VeroUserEdit  | VeroUserTag  | VeroUserUnsubscribe  |
|:--|:--|:--|
| edit or add user properties  | add tags to users  | unsubscribe users  |