# notify-js-sdk

Send notifications to [Notify](https://github.com/znotify/Notify)

## Installation

```bash
yarn add -D znotify
```

## Usage

```typescript
import {Client} from 'znotify';

const client = await Client.create("user_id");

await client.send("Notification")
```
