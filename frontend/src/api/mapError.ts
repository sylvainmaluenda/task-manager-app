export function mapError(err: unknown): string {
  // 1. réseau fetch
  if (err instanceof TypeError) {
    return "Network error";
  }

  // 2. JSON invalide
  if (err instanceof SyntaxError) {
    return "Invalid server response";
  }

  // 3. erreurs applicatives / HTTP
  if (err instanceof Error) {
    return err.message;
  }

  // 4. fallback
  return "Unexpected error";
}
