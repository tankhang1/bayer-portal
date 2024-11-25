interface RolePermission {
  id: number;
  staff_code: string;
  username: string;
  feature_group_code: string;
  feature_group_name: string;
  feature_code: string;
  feature_name: string;
  permit_create: number;
  permit_edit: number;
  permit_remove: number;
  permit_view_detail: number;
  permit_view_list: number;
  permit_export: number;
}

export type TAuthRES = {
  username: string;
  token: string;
  roles: string;
  roles_permission: RolePermission[];
};
export type TIqrConfirmRES = {
  message: string;
  status: number;
  data: any;
};
