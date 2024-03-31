const address = '192.168.0.104'; 

export const apiLogin = `http://${address}:3001/apiUser/login`;
export const apiGetCongViec = `http://${address}:3001/apijob/get-list-jos`;
export const apiPostCongViec = `http://${address}:3001/apijob/post-job`;
export const apiDeleteCongViec = `http://${address}:3001/apijob/delete-job-by-id/`;
export const apiPutCongViec = `http://${address}:3001/apijob/update-job-by-id/`;
export const apiGetNhanVien = `http://${address}:3001/apiUser/listUser2`;
export const apiGetDichVu = `http://${address}:3001/apiService/`;
export const apiGetListNhanVien = `http://${address}:3001/apiUser/listUser`;
export const apiPostDichVu = `http://${address}:3001/apiService/`;
export const apiUploadFile = `http://${address}:3001/apiUser/update-picture`;
export const apiAddUser = `http://${address}:3001/apiUser/addUser`;
