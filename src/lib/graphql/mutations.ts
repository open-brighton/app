import { gql } from '@apollo/client';

export const SUBMIT_CONTACT = gql`
  mutation SubmitContact($input: SubmitContactInput!) {
    submitContact(input: $input)
  }
`;

export const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($input: SubmitFeedbackInput!) {
    submitFeedback(input: $input)
  }
`;

export const CREATE_DONATE_PAYMENT_INTENT = gql`
  mutation CreateDonatePaymentIntent($input: CreateDonatePaymentIntentInput!) {
    createDonatePaymentIntent(input: $input) {
      clientSecret
    }
  }
`;

export const CREATE_DONATE_SUBSCRIPTION = gql`
  mutation CreateDonateSubscription($input: CreateDonateSubscriptionInput!) {
    createDonateSubscription(input: $input) {
      clientSecret
    }
  }
`; 