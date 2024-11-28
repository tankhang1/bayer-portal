export type TIqrTodayREQ = {};
export type TIqrRangeTimeREQ = {
  nu: number;
  sz: number;
  st: number;
  ed: number;
};

export type TIqrExportREQ = {
  st: number;
  ed: number;
};

export type TIqrUpdateREQ = {
  name: string;
  code: string;
  image_confirm: string;
  address:string;
};
