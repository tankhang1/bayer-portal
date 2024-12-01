export type TIqrTodayREQ = {};
export type TIqrRangeTimeREQ = {
  nu: number;
  sz: number;
  st: number;
  ed: number;
  k: string;
  s: number;
  gateway: number;
};

export type TIqrExportREQ = {
  st: number;
  ed: number;
};

export type TIqrUpdateREQ = {
  name: string;
  code: string;
  image_confirm: string;
  address: string;
  note: string;
  province_name_agent: string;
};
