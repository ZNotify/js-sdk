# notify-js-sdk

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
