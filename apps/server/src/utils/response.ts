type Response<T = null> = {
  status: "error" | "success";
  data: T;
  error: {
    message: string;
  } | null;
};

/**
 * Success response creater function
 * @param {T}data
 * @return {Response<T>}
 */
export function success<T>(data: T): Response<T> {
  return {
    status: "success",
    data,
    error: null,
  };
}

/**
 * Success response creater function
 * @param {string}message
 * @return {Response<null>}
 */
export function error(message: string): Response<null> {
  return {
    status: "error",
    data: null,
    error: { message },
  };
}
