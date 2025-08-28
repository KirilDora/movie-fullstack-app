export function getErrorMessage(error: unknown): string | null {
  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }
  if (typeof error === "object" && error !== null && "data" in error) {
    return (error as { data: { error: string } }).data.error;
  }
  return "Unexpected error.";
}
