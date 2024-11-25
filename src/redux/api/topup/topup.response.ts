export type TTopupRES = {
  id: number; // Unique identifier
  programName: string; // Name of the program
  customerUuid: string; // Unique UUID for the customer
  zaloDeviceId: string; // Zalo device ID associated with the customer
  customerCode: string; // Code for the customer
  customerName: string; // Name of the customer
  province: string; // Province code
  provinceName: string; // Province name
  area: string; // Area information
  phone: string; // Phone number
  price: number | null; // Price (nullable)
  code: string; // Transaction code
  codeHash: string; // Hashed version of the code
  productCode: string; // Product code
  productName: string; // Product name
  time: string; // Timestamp as a string
  timeNumber: number; // Timestamp as a number
  requestId: string; // Request ID
  responseId: string; // Response ID
  responseBody: string; // Response body content
  status: number; // Status of the transaction
};
