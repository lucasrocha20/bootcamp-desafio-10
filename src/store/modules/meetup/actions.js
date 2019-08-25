export function loadMeetUpRequest(date, page) {
  return {
    type: '@meetup/LOAD_MEET_UP_REQUEST',
    payload: { date, page },
  };
}

export function loadMeetUpSuccess(meetups) {
  return {
    type: '@meetup/LOAD_MEET_UP_SUCCESS',
    payload: { meetups },
  };
}
export function addMeetUp(meetup) {
  return {
    type: '@meetup/ADD_MEET_UP',
    payload: { meetup },
  };
}

export function updateMeetUpRequest(id, data) {
  return {
    type: '@meetup/UPDATE_MEET_UP_REQUEST',
    payload: { id, data },
  };
}

export function updateMeetUpSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_MEET_UP_SUCCESS',
    payload: { meetup },
  };
}

export function destroyMeetUpRequest(id) {
  return {
    type: '@meetup/DESTROY_MEET_UP_REQUEST',
    payload: { id },
  };
}

export function destroyMeetUpSuccess(id) {
  return {
    type: '@meetup/DESTROY_MEET_UP_SUCCESS',
    payload: { id },
  };
}

export function subscriptionMeetUpRequest(id) {
  return {
    type: '@meetup/SUBSCRIPTION_MEET_UP_REQUEST',
    payload: { id },
  };
}

export function subscriptionMeetUpSuccess(meetup) {
  return {
    type: '@meetup/SUBSCRIPTION_MEET_UP_SUCCESS',
    payload: { meetup },
  };
}

export function loadSubscriptionsMeetUpRequest() {
  return {
    type: '@meetup/LOAD_SUBSCRIPTION_MEET_UP_REQUEST',
  };
}

export function loadSubscriptionsMeetUpSuccess(subscriptions) {
  return {
    type: '@meetup/LOAD_SUBSCRIPTION_MEET_UP_SUCCESS',
    payload: { subscriptions },
  };
}

export function cancelInscription(id) {
  return {
    type: '@meetup/CANCEL_INSCRIPTION',
    payload: { id },
  };
}

export function meetUpFailed() {
  return {
    type: '@meetup/MEET_UP_FAILED',
  };
}
