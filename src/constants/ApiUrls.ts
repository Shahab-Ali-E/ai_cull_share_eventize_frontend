export const BASE_URL:string="http://127.0.0.1:8000"

export const NEXT_PUBLIC_AUTH_LOGIN_URL:string = `${BASE_URL}/Auth/login` //for login
export const LOGOUT_URL:string = `${BASE_URL}/Auth/logout`
export const USER_INFO_URL:string=`${BASE_URL}/welcome`//for getting user info

//culling APIS
export const CULLING_BASE_URL:string = `${BASE_URL}/culling` //base Url for culling
export const GET_ALL_CULLING_WORKSPACES:string = `${CULLING_BASE_URL}/get_all_folder` //get all workspaces from backend
export const GET_CULLING_WORKSPACES_BY_ID:string = `${CULLING_BASE_URL}/get_folder_id` //get workspaces by id
export const GET_BEFORE_CULL_PRESIGNED_URL:string = `${CULLING_BASE_URL}/before_cull_s3_images_url`
export const CREATE_CULLING_WORKSPACE:string = `${CULLING_BASE_URL}/create_directory` //create a working directory in backend
export const UPLOAD_CULLING_IMAGES:string = `${CULLING_BASE_URL}/upload-images` //for uplaoding images to backend 
export const DELETE_CULLING_WORKSPACE:string = `${CULLING_BASE_URL}/delete-folder` //for uplaoding images to backend 

export const GET_TASK_STATUS:string = `${BASE_URL}/task_status` //for uplaoding images to backend //task API

