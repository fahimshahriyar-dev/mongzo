// Redis removed temporarily as requested.
// Safe mock object so no active connection attempts or crashes occur.
export const redis = {
  get: async (_key: string) => null,
  set: async (_key: string, _value: string, ..._args: any[]) => "OK",
  del: async (_key: string) => 1,
} as any;
