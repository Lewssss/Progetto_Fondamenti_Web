const listeners = new Set();

export function subscribeToMessages(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(type, message) {
  if (!message) return;
  listeners.forEach((listener) => listener({ type, message }));
}

export function handleApiMessage(body) {
  if (!body || typeof body !== "object") return;
  if (body.success === undefined || body.skipMessage === undefined) return;
  if (body.skipMessage) return;

  if (body.success) {
    notify("success", body.message || "Operazione completata");
  } else {
    notify("error", body.message || "Operazione non riuscita");
  }
}

export function showSuccessMessage(message) {
  notify("success", message);
}

export function showErrorMessage(message) {
  notify("error", message);
}
