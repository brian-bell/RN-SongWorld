export default interface IAuthParams {
    client_id: string,
    response_type: string,
    redirect_uri: string,
    code_challenge_method: string,
    code_challenge: string,
    state: string,
    scope: string,
};