/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    /** Provide UI */
    get: {
      responses: {
        /** html */
        200: {
          schema: string;
        };
      };
    };
  };
  "/alive": {
    /** If the server is alive */
    get: operations["misc.alive"];
  };
  "/check": {
    get: operations["user.check"];
  };
  "/docs": {
    get: {
      responses: {
        /** Moved Permanently */
        301: {
          schema: string;
        };
      };
    };
  };
  "/login": {
    get: operations["user.login"];
  };
  "/login/github": {
    get: operations["user.github"];
  };
  "/{user_secret}": {
    /** Send notification to user_id */
    put: operations["send.short"];
    /** Send notification to user_id */
    post: operations["send.short"];
  };
  "/{user_secret}/device/{device_id}": {
    /** Create or update device information */
    put: operations["device.create"];
    /** Delete device with device_id */
    delete: operations["device.delete"];
  };
  "/{user_secret}/devices": {
    /** Delete device with device_id */
    get: operations["user.devices"];
  };
  "/{user_secret}/message/{id}": {
    /** Get message record detail of a message */
    get: operations["record.get"];
    /** Delete message record with id */
    delete: operations["record.delete"];
  };
  "/{user_secret}/messages": {
    /** Get messages of user with pagination */
    get: operations["user.messages"];
  };
  "/{user_secret}/send": {
    /** Send notification to user_id */
    put: operations["send.send"];
    /** Send notification to user_id */
    post: operations["send.send"];
  };
}

export interface definitions {
  "entity.Device": {
    channel?: definitions["enum.Sender"];
    deviceMeta?: string;
    deviceName?: string;
    identifier?: string;
  };
  "entity.Message": {
    content?: string;
    created_at?: string;
    id?: string;
    long?: string;
    priority?: definitions["enum.Priority"];
    title?: string;
  };
  /** @enum {string} */
  "enum.Priority": "low" | "normal" | "high";
  /** @enum {string} */
  "enum.Sender": "FCM" | "WebPush" | "WNS" | "Telegram" | "WebSocket";
  "types.BadRequestResponse": {
    body?: string;
    /** @default 400 */
    code?: number;
  };
  "types.NotFoundResponse": {
    body?: string;
    /** @default 404 */
    code?: number;
  };
  "types.Response-array_entity_Device": {
    body?: definitions["entity.Device"][];
    /** @default 200 */
    code?: number;
  };
  "types.Response-array_entity_Message": {
    body?: definitions["entity.Message"][];
    /** @default 200 */
    code?: number;
  };
  "types.Response-bool": {
    body?: boolean;
    /** @default 200 */
    code?: number;
  };
  "types.Response-entity_Message": {
    body?: definitions["entity.Message"];
    /** @default 200 */
    code?: number;
  };
  "types.UnauthorizedResponse": {
    body?: string;
    /** @default 401 */
    code?: number;
  };
}

export interface operations {
  /** If the server is alive */
  "misc.alive": {
    responses: {
      /** No Content */
      204: {
        schema: string;
      };
    };
  };
  "user.check": {
    parameters: {
      query: {
        /** Secret of user */
        user_secret: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-bool"];
      };
    };
  };
  "user.login": {
    responses: {
      /** Temporary Redirect */
      307: never;
    };
  };
  "user.github": {
    parameters: {
      query: {
        /** should always be 'no_need_to_set_state' */
        state?: string;
        /** access code */
        code: string;
      };
    };
    responses: {
      /** Temporary Redirect */
      307: never;
      /** Bad Request */
      400: {
        schema: definitions["types.BadRequestResponse"];
      };
      /** Unauthorized */
      401: {
        schema: definitions["types.UnauthorizedResponse"];
      };
    };
  };
  /** Send notification to user_id */
  "send.short": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
      };
      body: {
        /** Message Content */
        string: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-entity_Message"];
      };
      /** Bad Request */
      400: {
        schema: definitions["types.BadRequestResponse"];
      };
      /** Unauthorized */
      401: {
        schema: definitions["types.UnauthorizedResponse"];
      };
    };
  };
  /** Create or update device information */
  "device.create": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
        /** device_id should be a valid UUID */
        device_id: string;
      };
      formData: {
        /** channel can be used. */
        channel: "FCM" | "WebPush" | "WNS" | "Telegram" | "WebSocket";
        /** device name */
        device_name?: string;
        /** additional device meta */
        device_meta?: string;
        /** channel token */
        token?: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-bool"];
      };
      /** Bad Request */
      400: {
        schema: definitions["types.BadRequestResponse"];
      };
      /** Unauthorized */
      401: {
        schema: definitions["types.UnauthorizedResponse"];
      };
    };
  };
  /** Delete device with device_id */
  "device.delete": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
        /** The identifier of device, should be a UUID */
        device_id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-bool"];
      };
    };
  };
  /** Delete device with device_id */
  "user.devices": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-array_entity_Device"];
      };
    };
  };
  /** Get message record detail of a message */
  "record.get": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
        /** ID of message */
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-entity_Message"];
      };
      /** Bad Request */
      400: {
        schema: definitions["types.BadRequestResponse"];
      };
      /** Unauthorized */
      401: {
        schema: definitions["types.UnauthorizedResponse"];
      };
      /** Not Found */
      404: {
        schema: definitions["types.NotFoundResponse"];
      };
    };
  };
  /** Delete message record with id */
  "record.delete": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
        /** ID of message */
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-bool"];
      };
      /** Unauthorized */
      401: {
        schema: definitions["types.UnauthorizedResponse"];
      };
    };
  };
  /** Get messages of user with pagination */
  "user.messages": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
      };
      query: {
        /** The number of records to skip */
        skip?: number;
        /** The number of records to return */
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-array_entity_Message"];
      };
      /** Unauthorized */
      401: {
        schema: definitions["types.UnauthorizedResponse"];
      };
    };
  };
  /** Send notification to user_id */
  "send.send": {
    parameters: {
      path: {
        /** Secret of user */
        user_secret: string;
      };
      formData: {
        /** Message Title */
        title?: string;
        /** Message Content */
        content: string;
        /** Long Message Content (optional) */
        long?: string;
        /** The priority of message */
        priority?: "low" | "normal" | "high";
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions["types.Response-entity_Message"];
      };
      /** Bad Request */
      400: {
        schema: definitions["types.BadRequestResponse"];
      };
      /** Unauthorized */
      401: {
        schema: definitions["types.UnauthorizedResponse"];
      };
    };
  };
}

export interface external {}
