export class EventsClient<
  IncomingEvents extends Record<string, CustomEvent<any>>,
  OutgoingEvents extends Record<string, any>
> {
  private events = new Map<keyof IncomingEvents, any>();

  on(
    type: keyof IncomingEvents,
    listener: <Ctx extends keyof IncomingEvents>(
      ev: IncomingEvents[Ctx]
    ) => any,
    schema: any,
    options?: boolean | AddEventListenerOptions
  ): void {
    const customListener = (event: IncomingEvents[keyof IncomingEvents]) => {
      schema.parse(event.detail);
      listener(event);
    };

    this.events.set(type, customListener);

    window.addEventListener(
      type as keyof WindowEventMap,
      customListener,
      options
    );
  }

  remove(type: keyof IncomingEvents): void {
    const listener = this.events.get(type);
    this.events.delete(type);
    window.removeEventListener(type as keyof WindowEventMap, listener);
  }

  emit(type: keyof OutgoingEvents, ctx: OutgoingEvents[keyof OutgoingEvents]) {
    const event = new CustomEvent(type as keyof WindowEventMap, {
      detail: ctx,
    });
    window.dispatchEvent(event);
  }
}
