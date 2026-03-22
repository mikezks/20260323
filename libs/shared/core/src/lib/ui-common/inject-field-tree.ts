import { Signal, computed, inject } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";


export function injectFieldTree<T>(): Signal<FieldTree<T>> {
  const formField = inject(FormField<T>);
  return computed(() => formField.field() as FieldTree<T>);
}
