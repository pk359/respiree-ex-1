export const corsOptions = {
  origin: (_origin: any, callback: (arg0: any, arg1: boolean) => void) => {
    callback(null, true);
  },
};
