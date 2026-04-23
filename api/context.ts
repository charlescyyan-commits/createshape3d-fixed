export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: { id: number; name: string; email: string; role: string };
};

export const createContext = async (opts: { req: Request; resHeaders: Headers }): Promise<TrpcContext> => {
  return { req: opts.req, resHeaders: opts.resHeaders };
};
