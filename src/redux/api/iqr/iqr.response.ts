export type TIqrRES = {
  id: number; // Corresponds to `long id`
  seri: string | null; // Corresponds to `String seri`
  award1: string | null; // Corresponds to `String award1`
  award2: string | null; // Corresponds to `String award2`
  code: string | null; // Corresponds to `String code`
  phone: string | null; // Corresponds to `String phone`
  fullname: string | null; // Corresponds to `String fullname`
  province: string | null; // Corresponds to `String province`
  province_name: string | null; // Corresponds to `String province_name`
  time_turn: string | null; // Corresponds to `String time_turn`
  time_confirm: string | null; // Corresponds to `String time_confirm`
  time_number: number; // Corresponds to `long time_number`
  zalo_device_id: string | null; // Corresponds to `String zalo_device_id`
  gateway: number; // Corresponds to `int gateway`
  product_code: string | null; // Corresponds to `String product_code`
  product_name: string | null; // Corresponds to `String product_name`
  batch_number: string | null; // Corresponds to `String batch_number`
  notify_content: string | null; // Corresponds to `String notify_content`
  notify_channel: string | null; // Corresponds to `String notify_channel`
  time_active: string | null; // Corresponds to `String time_active`
  time_finish: string | null; // Corresponds to `String time_finish`
  status: number; // Corresponds to `int status`
  image_confirm: string | null; // Corresponds to `String image_confirm`
};

export type TIqrExportRES = {
  data: string;
  status: number;
  message: string;
};
