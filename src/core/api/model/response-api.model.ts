export interface ResponseApiModel<T>{
  data: T | null;
  status: "success" | "error"
  message: string
}