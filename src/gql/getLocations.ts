import { gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query getLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          status
          species
          gender
          image
          origin {
            id
          }
          location {
            id
          }
        }
      }
    }
  }
`;

export default GET_LOCATIONS;
