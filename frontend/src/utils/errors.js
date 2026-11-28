// Turns an error from the backend into a short message people can read.
export function getErrorMessage(err) {
  if (!err.response) {
    return "Cannot reach the server. Is the backend running?";
  }
  const detail = err.response.data?.detail;

  // Simple errors: {"detail": "Incorrect email or password"}
  if (typeof detail === "string") return detail;

  // Validation errors: a list of problems
  if (Array.isArray(detail) && detail.length > 0) {
    return detail
      .map((d) => String(d.msg || "Invalid input").replace(/^Value error, /, ""))
      .join(". ");
  }
  return "Something went wrong. Please try again.";
}