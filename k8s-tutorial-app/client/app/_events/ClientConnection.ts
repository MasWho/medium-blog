type ClientConnectionArgs = {
  url: string;
  withCredentials?: boolean;
  onError?: (error: Event) => void;
  onOpen?: (open: Event) => void;
  onMessage?: (message: MessageEvent) => void;
};

export default class ClientConnection {
  private _source: EventSource;

  constructor(private args: ClientConnectionArgs) {
    this._source = this._connect();
    this._init();
  }

  private _connect() {
    const { url, withCredentials } = this.args;
    const eventSource = new EventSource(url, { withCredentials });
    return eventSource;
  }

  private _init() {
    const { onError, onOpen, onMessage } = this.args;
    if(onError) {
      this._source.onerror = onError;
    }

    if(onOpen) {
      this._source.onopen = onOpen;
    }

    if(onMessage) {
      this._source.onmessage = onMessage;
    }
  }

  public get source() {
    return this._source;
  }
}