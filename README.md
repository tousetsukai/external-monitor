external-monitor
================

Firebase Functions を利用して行灯職人への道の外形監視をし、落ちていたら Slack へ通知するスクリプト

設定すべき変数
--------------

```
firebase functions:config:set slack.url="https://hooks.slack.com/services/xxxxxxx/xxxxxxx/xxxxxxxxxxxxxxx"
```

デプロイ
-------

```
firebase deploy
```

あとは定期的にリクエストを送れるサービス (IFTTT など) で Firebase functions の URL にアクセスさせる。
