export type Alert = {
  msg: string;
  type: string;
};

export type AlertContextType = {
  alert: Alert | null;
  setAlert: (msg: string, type: string) => void;
};
