import { gql } from '@apollo/client'


const vendorList = gql`
query Vendor($perPage: Int, $page: Int) {
    vendor(perPage: $perPage, page: $page) {
      vendorList {
        updatedAt
        phoneNumber
        name
        image
        createdAt
        _id
      }
      message
      code
    }
  }
`

export { vendorList }