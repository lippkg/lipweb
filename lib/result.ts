export type Result<T, E> =
  | { ok: true; err: false; val: T }
  | { ok: false; err: true; val: E };

export const Result = {
  Ok: <T>(val: T) => ({ ok: true as const, err: false as const, val: val }),
  Err: <E>(val: E) => ({ ok: false as const, err: true as const, val: val }),
};
