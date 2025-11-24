import { inject, Injector, Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";


export function signalOperators<Input, Output>(
  signal: Signal<Input>,
  generator: (source$: Observable<Input>) => Observable<Output>,
  initialValue: Output,
  config?: { injector?: Injector }
): Signal<Output> {
  return toSignal(
    toObservable(signal).pipe(generator), {
      initialValue: initialValue,
      injector: config?.injector || inject(Injector) 
    }
  );
}
