import { gql } from '@apollo/client'


const signIn = gql`
mutation LoginVendor($loginInput: loginInput) {
    loginVendor(loginInput: $loginInput) {
        vendor {
            token
            phoneNumber
            name
            image
            email
            createdAt
            _id
          }
      message
      code
    }
  }
`

const editProfile = gql`
mutation EditVendor($id: ID!,$vendorInput: editVendorInput) {
  editVendor(ID: $id,vendorInput: $vendorInput)
}
`

export { signIn,editProfile }