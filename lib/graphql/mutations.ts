import { gql } from '@apollo/client';

export const SUBMIT_CONTACT = gql`
  mutation SubmitContact($input: SubmitContactInput!) {
    submitContact(input: $input)
  }
`; 