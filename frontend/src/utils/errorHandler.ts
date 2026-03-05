import axios from "axios";

export const handleAxiosError = (
  error: unknown,
  showAlert: any,
  defaultMessage = "An error occurred",
) => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    const errorMsg =
      error.response.data.error ||
      error.response.data.message ||
      defaultMessage;

    if (status === 409) showAlert("error", `Already exists: ${errorMsg}`);
    else if (status === 404) showAlert("error", `Not found: ${errorMsg}`);
    else if (status === 401) showAlert("error", `Unauthorized: ${errorMsg}`);
    else showAlert("error", errorMsg);
  } else {
    showAlert("error", "Network error");
  }
};
