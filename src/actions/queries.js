import gql from 'graphql-tag';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  createHttpLink,
} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from '@env';

// console.log('authLink')

let base_url = API_URL + '/graphql';
console.log(base_url);
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  console.log(token, ' tokennnn')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink(
  {
    uri: base_url,
  },
  (link) => console.log(link),
);
console.log(base_url);
export const client = new ApolloClient({
  uri: base_url,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export const LOGIN = gql`
  query ($mobileNumber: String!, $password: String!) {
    login(mobileNumber: $mobileNumber, password: $password) {
      token
      user {
        _id
        email
        name
        mobileNumber
        chat
        chatID
        role
        startedChat
      }
    }
  }
`;

export const REGISTER = gql`
  mutation (
    $name: String!
    $email: String!
    $mobileNumber: String!
    $birthdate: String!
    $password: String!
  ) {
    register(
      userInput: {
        name: $name
        email: $email
        mobileNumber: $mobileNumber
        birthdate: $birthdate
        password: $password
      }
    ) {
      token
      user {
        _id
        email
        name
        mobileNumber
        chat
        chatID
        role
        startedChat
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation ($message_id: String!, $chat: String!) {
    deleteMessage(message_id: $message_id, chat: $chat) {
      message
    }
  }
`;

export const START_CHAT = gql`
  mutation ($mobileNumber: String!) {
    startChat(mobileNumber: $mobileNumber) {
      user {
        _id
        email
        name
        mobileNumber
        chat
        chatID
        role
        startedChat
      }
    }
  }
`;
export const START_CHAT_SOCIAL = gql`
  mutation ($socialID: String!) {
    startChatSocial(socialID: $socialID) {
      user {
        _id
        email
        name
        chat
        chatID
        role
        startedChat
        socialID
        socialType
      }
    }
  }
`;

export const LOGIN_WITH_FACEBOOK = gql`
  mutation ($token: String!) {
    loginWithFacebook(token: $token) {
      token
      user {
        _id
        email
        name
        chat
        chatID
        role
        startedChat
        socialID
        socialType
      }
    }
  }
`;

export const LOGIN_WITH_APPLE = gql`
  mutation ($UserInputApple: UserInputApple!) {
    loginWithApple(UserInputApple: $UserInputApple) {
      token
      user {
        _id
        email
        name
        chat
        chatID
        role
        startedChat
        socialID
        socialType
      }
    }
  }
`;

export const LIST_COUNTRY_RESTRICTIONS = gql`
  query {
    listCountryRestrictions {
      _id
      country
      openForEgyptians
      pcr {
        value
        label
      }
      vaccination {
        value
        label
      }
      doses
      quarantine
      travelForm
      travelBetweenRegions
      shops
      restaurants
      touristicPlaces
      publicTransport
      visaApplying
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation ($mobileNumber: String!) {
    forgetPassword(mobileNumber: $mobileNumber) {
      message
    }
  }
`;

export const VERIFY_FORGET = gql`
  mutation ($mobileNumber: String!, $code: String!) {
    verifyForget(mobileNumber: $mobileNumber, code: $code) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ($mobileNumber: String!, $code: String!, $password: String!) {
    resetPassword(
      mobileNumber: $mobileNumber
      code: $code
      password: $password
    ) {
      message
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation ($_id: String!, $userInput: editUserInput) {
    editProfile(_id: $_id, userInput: $userInput) {
      _id
      name
      email
      socialID
      socialType
      chat
      chatID
      role
      startedChat
      mobileNumber
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation ($_id: String!) {
    deleteAccount(_id: $_id) {
      message
    }
  }
`;

export const LIST_HOTEL_OFFERS = gql`
  query {
    listHotelOffers {
      _id
      name
      description
      images
      offer
    }
  }
`;

export const MAKE_ORDER = gql`
  mutation ($data: String!) {
    makeOrder(data: $data) {
      message
    }
  }
`;

export const LIST_ADRENALINE_EVENTS = gql`
  query {
    listEvents {
      _id
      title
      description
      images
      price
      duration
      city {
        name
        _id
      }
    }
  }
`;

export const LIST_ADRENALINE_CITIES = gql`
  query {
    listCities {
      _id
      name
      images
    }
  }
`;
