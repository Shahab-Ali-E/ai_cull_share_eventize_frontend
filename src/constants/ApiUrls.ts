export const BASE_URL:string="https://api.aicullshareeventizebackend.online"

// signup
export const SIGNUP_URL:string = `${BASE_URL}/Auth/sign_up` //for login

export const NEXT_PUBLIC_AUTH_LOGIN_URL:string = `${BASE_URL}/Auth/login` //for login
export const LOGOUT_URL:string = `${BASE_URL}/Auth/logout`
export const USER_INFO_URL:string=`${BASE_URL}/welcome`//for getting user info

// Dashboard
export const GET_USER_STORAGE_USED:string=`${BASE_URL}/User/get_user_storage_used`//for getting user info
export const CONTACT_US:string=`${BASE_URL}/User/contact-us`//for getting user info


//culling APIS
const CULLING_BASE_URL:string = `${BASE_URL}/culling` //base Url for culling
export const GET_ALL_CULLING_WORKSPACES:string = `${CULLING_BASE_URL}/get_all_folder` //get all workspaces from backend
export const GET_CULLING_WORKSPACES_BY_ID:string = `${CULLING_BASE_URL}/get_folder_id` //get workspaces by id
export const GET_BEFORE_CULL_PRESIGNED_URL:string = `${CULLING_BASE_URL}/before_cull_s3_images_url`
export const GET_CULLED_IMAGES:string = `${CULLING_BASE_URL}/culled_images_metadata`

export const CREATE_CULLING_WORKSPACE:string = `${CULLING_BASE_URL}/create_directory` //create a working directory in backend
export const UPLOAD_CULLING_IMAGES:string = `${CULLING_BASE_URL}/upload_images` //for uplaoding images to backend 
export const START_CULLING:string = `${CULLING_BASE_URL}/start_culling/` //for uplaoding images to backend 
export const DELETE_CULLING_WORKSPACE:string = `${CULLING_BASE_URL}/delete-folder` //for uplaoding images to backend 

export const GET_TASK_STATUS:string = `${BASE_URL}/task_status` //for uplaoding images to backend //task AP


// Smart Share API
const SMART_SHARE_BASE_URL:string = `${BASE_URL}/smart_share` //base Url for smart share
export const GET_ALL_SMART_SHARE_EVENTS:string = `${SMART_SHARE_BASE_URL}/get_all_events` //get all events from backend
export const GET_SMART_SHARE_EVENT_BY_ID:string = `${SMART_SHARE_BASE_URL}/get_event_by_id` //get event by id

export const CREATE_EVENT:string = `${SMART_SHARE_BASE_URL}/create_event` // for create event
export const UPDATE_EVENT:string = `${SMART_SHARE_BASE_URL}/update_event` // for updating event
export const DELETE_EVENT:string = `${SMART_SHARE_BASE_URL}/delete_event` // for deleting event
export const UPLOAD_SMART_SHARE_IMAGES:string = `${SMART_SHARE_BASE_URL}/upload_images` //for uploading images
export const ASSOCIATE_USER_WITH_EVENT:string = `${SMART_SHARE_BASE_URL}/associate-user` //for association user with event when accessing event
export const GET_IMAGES_BY_FACE:string = `${SMART_SHARE_BASE_URL}/get_images` //you will pass your face image and then backend will provide matching images 

// Event Arrangment API
const EVENT_ARRANGMENT_BASE_URL:string = `${BASE_URL}/event_arrangment` //base url for event arrangment
export const GET_ALL_EVENTS:string = `${EVENT_ARRANGMENT_BASE_URL}/all_booked_events` //Get all events
export const GET_EVENT_BY_ID:string = `${EVENT_ARRANGMENT_BASE_URL}/booked_event_by_id` //Get event by id

export const BOOK_EVENT:string = `${EVENT_ARRANGMENT_BASE_URL}/book_event` //book event url



