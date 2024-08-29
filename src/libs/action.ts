import { z, ZodIssue } from "zod";

export interface ActionResponse<T>{
  success: boolean,
  data: T,
  total?: number
  errors?: Record<keyof T, ZodIssue>,
  message?: string
}

export const ActionError = (error: any) => {
  if (error instanceof z.ZodError) {
    // Handle Zod validation errors
    return {
      success: false,
      errors: error.errors, // Passes validation errors to the client
    };
  } else {
    // Handle other errors (e.g., network, database)
    return {
      success: false,
      message: "An unexpected error occurred.",
      error: error
    };
  }
};