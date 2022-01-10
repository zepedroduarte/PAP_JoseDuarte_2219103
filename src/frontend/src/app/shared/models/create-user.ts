export interface CreateUser {
  firebaseUid: string | void | undefined,
  userName: string,
  email: string,
  phoneNumber: string,
  districtId: number
}

