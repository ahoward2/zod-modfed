export class EventsClient<
  IncomingEvents extends Record<string, CustomEvent<any>>,
  OutgoingEvents extends Record<string, any>
> {
  private events = new Map<keyof IncomingEvents, any>();

  on<EventType extends keyof IncomingEvents>(
    type: EventType,
    listener: (ev: IncomingEvents[EventType]) => any,
    schema: any,
    options?: boolean | AddEventListenerOptions
  ): void {
    const customListener = (event: IncomingEvents[EventType]) => {
      schema.parse(event.detail);
      listener(event);
    };

    this.events.set(type, customListener);

    window.addEventListener(
      type as keyof WindowEventMap,
      customListener as EventListener,
      options
    );
  }

  remove(type: keyof IncomingEvents): void {
    const listener = this.events.get(type);
    this.events.delete(type);
    window.removeEventListener(type as keyof WindowEventMap, listener);
  }

  emit<EventType extends keyof OutgoingEvents>(
    type: EventType,
    ctx: OutgoingEvents[EventType]
  ) {
    const event = new CustomEvent(type as keyof WindowEventMap, {
      detail: ctx,
    });
    window.dispatchEvent(event);
  }

  invoke<EventType extends keyof IncomingEvents>(
    type: EventType,
    ctx: IncomingEvents[EventType]["detail"]
  ) {
    const event = new CustomEvent(type as keyof WindowEventMap, {
      detail: ctx,
    });
    window.dispatchEvent(event);
  }
}
