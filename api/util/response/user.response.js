export const responseWithData = (data) => {
  //Verificare se utile
  let response = { success: true };
  response.skipMessage = true;
  response.data = data;
  return response;
};

export const Fail = () => {
  //Verificare se utile
  let response = { success: false };
  response.skipMessage = false;
  response.message = "Errore generico";
  return response;
};

export const newChat = () => {
  //Modificato (addMealSuccess)
  let response = { success: true };
  response.skipMessage = false;
  response.message = "Chat creata con successo";
  return response;
};

export const newMessage = () => {
  //Modificato (addMealSuccess)
  let response = { success: true };
  response.skipMessage = false;
  response.message = "Messaggio inviato con successo";
  return response;
};

export const deleteChat = () => {
  //Modificato (deleteMealSuccess)
  let response = { success: true };
  response.skipMessage = false;
  response.message = "Chat eliminata con successo";
  return response;
};

export const deleteMessage = () => {
  //Modificato (deleteMealSuccess)
  let response = { success: true };
  response.skipMessage = false;
  response.message = "Messaggio eliminato con successo";
  return response;
};

export const clearChat = () => {
  //Modificato (clearMealsSuccess)
  let response = { success: true };
  response.skipMessage = false;
  response.message = "Chat cancellata con successo";
  return response;
};

export const userAlreadyExists = () => {
  let response = { success: false };
  response.skipMessage = false;
  response.message = "L'utente esiste già";
  return response;
};

export const userRegistered = () => {
  let response = { success: true };
  response.skipMessage = false;
  response.message = "Utente registrato con successo";
  return response;
};

export const invalidCredentials = () => {
  let response = { success: false };
  response.skipMessage = false;
  response.message = "Credenziali non valide";
  return response;
};

export default {
  responseWithData,
  newChat,
  deleteChat,
  clearChat,
  Fail,
  newMessage,
  deleteMessage,
  userAlreadyExists,
  userRegistered,
  invalidCredentials,
};
