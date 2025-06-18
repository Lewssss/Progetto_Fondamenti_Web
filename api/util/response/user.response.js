export const loginSuccess = (user) => { 
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Login effettuato con successo';
    response.user_id = user._id;
    return response;
}

export const registerSuccess = (user) => {
    let response = {success:true};
    response.skipMessage = true;
    response.user_id = user._id;
    return response;
}
export const registerSuccessWithAdditionalData = () => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Registrazione effettuata con successo';
    return response;
}

export const registerFail = () => {
    let response = {success:false};
    response.skipMessage = false;
    response.message = 'Registrazione fallita, riprova più tardi';
    return response;
}

export const loginFail = () =>{
    let response = {success:false};
    response.skipMessage = false;
    response.message = 'Dati errati';
    return response;    
}

export const responseWithData = (data) => {
    let response = {success:true};
    response.skipMessage = true;
    response.data = data;
    return response;
}

export const Fail = () => {
    let response = {success:false};
    response.skipMessage = false;
    response.message = 'Errore generico';
    return response;
}

export const addMealSuccess = () => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Pasto aggiunto con successo';
    return response;
}
export const deleteMealSuccess = () => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Pasto eliminato con successo';
    return response;
}
export const editMealSuccess = () => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Pasto modificato con successo';
    return response;
}
export const addActivitySuccess = (activity) => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Attività aggiunta con successo';
    response.data = activity;
    return response;
}
export const editActivitySuccess = () => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Attività modificata con successo';
    return response;
}
export const deleteActivitySuccess = () => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Attività eliminata con successo';
    return response;
}
export const createPostSuccess = (Post) => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Post creato con successo';
    response.data = Post;
    return response;
}
export const addCommentSuccess = (comment) => {
    let response = {success:true};
    response.skipMessage = false;
    response.data = comment;
    response.message = 'Commento aggiunto con successo';
    return response;
}
export const editPostSuccess = () => {
    let response = {success:true};
    response.skipMessage = false;
    response.message = 'Post modificato con successo';
    return response;
}

export default {
    loginSuccess,
    registerSuccess,
    registerSuccessWithAdditionalData,
    responseWithData,
    addMealSuccess,
    deleteMealSuccess,
    editMealSuccess,
    addActivitySuccess,
    editActivitySuccess,
    deleteActivitySuccess,
    Fail,
    loginFail,
    registerFail,
    createPostSuccess,
    addCommentSuccess,
    editPostSuccess
}
