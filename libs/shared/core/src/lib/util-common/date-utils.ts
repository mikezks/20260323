
export function addMinutes(date: Date, minutes: number, returnTypeDateObject: true): Date;
export function addMinutes(date: string, minutes: number, returnTypeDateObject: true): Date;
export function addMinutes(date: Date, minutes: number, returnTypeDateObject?: false): string;
export function addMinutes(date: string, minutes: number, returnTypeDateObject?: false): string;
export function addMinutes(
  date: Date | string,
  minutes: number,
  returnTypeDateObject: boolean |  undefined = false
): Date | string {
  const inputDate = date instanceof Date ? date : new Date(date);
  const updatedDate = new Date(inputDate.getTime() + minutes * 60 * 1_000);

  return returnTypeDateObject ? updatedDate : updatedDate.toISOString();
}
