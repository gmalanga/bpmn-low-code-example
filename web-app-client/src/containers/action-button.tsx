import React, {useState} from 'react';
import {
  gql,
  useMutation,
  useReactiveVar,
  useQuery,
  Reference
} from '@apollo/client';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';
import { cartItemsVar } from '../cache';
import * as LaunchDetailTypes from '../pages/__generated__/LaunchDetails';
import * as BoardingPassTypes from '../pages/__generated__/GetBoardingPass';

export { GET_LAUNCH_DETAILS };

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export const GET_BOARDING_PASS = gql`
  query getBoardingPass {
    getBoardingPass {
      status
      message
    }
  }
`;

interface ActionButtonProps extends Partial<LaunchDetailTypes.LaunchDetails_launch> {}

const CancelTripButton: React.FC<ActionButtonProps> = ({ id }) => {

  const [mutate, { loading, error }] = useMutation(
    CANCEL_TRIP,
    {
      variables: { launchId: id },
      update(cache, { data: { cancelTrip } }) {
        // Update the user's cached list of trips to remove the trip that
        // was just canceled.
        const launch = cancelTrip.launches[0];
        cache.modify({
          id: cache.identify({
            __typename: 'User',
            id: localStorage.getItem('userId'),
          }),
          fields: {
            trips(existingTrips) {
              const launchRef = cache.writeFragment({
                data: launch,
                fragment: gql`
                  fragment RemoveLaunch on Launch {
                    id
                  }
                `
              });
              return existingTrips.filter(
                (tripRef: Reference) => tripRef === launchRef
              );
            }
          }
        });
      }
    }
  );

  const [boardingPass, setBoardingPass] = useState('');

  const { data } = useQuery<BoardingPassTypes.GetBoardingPass>(GET_BOARDING_PASS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <div>
        <Button
          onClick={() => mutate()}
          data-testid={'action-button'}
        >
          Cancel This Trip
        </Button>
      </div><br />
      <div>
        <Button
          onClick={() => {
            if(data) {
              setBoardingPass(data.getBoardingPass.message);
            }
          }}
          data-testid={'action-button'}
        >
          Get Boarding Pass
        </Button>
        {boardingPass !== '' && 
          <div><br /><img src={boardingPass} alt={boardingPass} /></div>
        }
      </div>
    </div>
  );
};

const ToggleTripButton: React.FC<ActionButtonProps> = ({ id }) => {
  const cartItems = useReactiveVar(cartItemsVar);
  const isInCart = id ? cartItems.includes(id) : false;
  return (
    <div>
      <Button
        onClick={() => {
          if (id) {
            cartItemsVar(
              isInCart
                ? cartItems.filter(itemId => itemId !== id)
                : [...cartItems, id]
            );
          }
        }}
        data-testid={'action-button'}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
    </div>
  );
}

const ActionButton: React.FC<ActionButtonProps> =
  ({ isBooked, id }) => (
    isBooked ? <CancelTripButton id={id} /> : <ToggleTripButton id={id} />
  );

export default ActionButton;
