import produce from 'immer';

const INITIAL_STATE = {
  meetups: [],
  subscriptions: [],
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/LOAD_MEET_UP_SUCCESS': {
        // if (action.payload.newLoad) {
        //   draft.meetups = [...action.payload.meetups];
        // } else {
        // const data = action.payload.meetups.map(m => {
        //   const newMeetups = [];

        //   if (m.id !== draft.meetups.id) {
        //     newMeetups.push(...m);
        //   }

        //   return newMeetups;
        // });
        // draft.meetups.push(...data);
        // // }
        // console.tron.log(data);

        break;
      }
      case '@meetup/ADD_MEET_UP': {
        draft.meetups.push(action.payload.meetup);
        break;
      }
      case '@meetup/UPDATE_MEET_UP_SUCCESS': {
        const id = draft.meetups.findIndex(
          m => m.id === action.payload.meetup.id
        );
        draft.meetups[id] = action.payload.meetup;
        break;
      }
      case '@meetup/DESTROY_MEET_UP_SUCCESS': {
        const id = draft.meetups.findIndex(m => m.id === action.payload.id);
        draft.meetups.splice(id, 1);
        break;
      }
      case '@meetup/SUBSCRIPTION_MEET_UP_SUCCESS': {
        draft.subscriptions = action.payload.meetup;
        break;
      }
      case '@meetup/LOAD_SUBSCRIPTION_MEET_UP_SUCCESS': {
        draft.subscriptions = action.payload.subscriptions;
        break;
      }
      case '@meetup/CANCEL_INSCRIPTION': {
        const id = draft.subscriptions.findIndex(
          s => s.id === action.payload.id
        );
        draft.subscriptions.splice(id, 1);
        break;
      }
      case '@meetup/MEET_UP_FAILED': {
        break;
      }

      default:
    }
  });
}
