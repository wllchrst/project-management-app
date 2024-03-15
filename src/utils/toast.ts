// import { useToast } from "@chakra-ui/react";
// import { IResponse } from "../interfaces/response-interface";

import { UseToastOptions } from "@chakra-ui/react";

function successToast(title: string, message: string): UseToastOptions {
  return {
    position: "top-right",
    title: title,
    description: message,
    status: "success",
  };
}
function loadingToast(title: string, message: string): UseToastOptions {
  return {
    position: "top-right",
    title: title,
    description: message,
    status: "loading",
  };
}

function errorToast(title: string, message: string): UseToastOptions {
  return {
    position: "top-right",
    title: title,
    description: message,
    status: "error",
  };
}
function warningToast(title: string, message: string): UseToastOptions {
  return {
    position: "top-right",
    title: title,
    description: message,
    status: "warning",
  };
}

export { loadingToast, successToast, errorToast, warningToast };
