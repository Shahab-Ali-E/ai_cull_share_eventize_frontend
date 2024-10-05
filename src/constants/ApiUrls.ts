export const BASE_URL:string="http://127.0.0.1:8000"
export const NEXT_PUBLIC_AUTH_LOGIN_URL:string = `${BASE_URL}/Auth/login` //for login
export const LOGOUT_URL:string = `${BASE_URL}/Auth/logout`
export const USER_INFO_URL:string=`${BASE_URL}/welcome`//for getting user info

//culling APIS
export const CULLING_BASE_URL:string = `${BASE_URL}/culling`
export const CREATE_CULLING_WORKSPACE:string = `${CULLING_BASE_URL}/create_directory`
