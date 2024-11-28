export type TExcelRES = {
  id: number; // Unique identifier
  username: string | null; // Username, can be null
  feature_code: string; // Code for the feature
  description: string; // Description of the campaign
  file_path: string; // Local file path
  status: number; // Status code (e.g., 1 for success or active)
  time_request: string; // Request timestamp (format: "YYYY/MM/DD HH:mm:ss")
  time_done: string; // Completion timestamp (format: "YYYY/MM/DD HH:mm:ss")
  file_url: string; // URL for accessing the file
  transaction_id: string; // Unique transaction identifier
  newEntry: boolean; // Flag for new entries
  new: boolean; // Another flag for newness (redundant with `newEntry`)
};
