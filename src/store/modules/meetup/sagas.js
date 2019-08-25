import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

// import history from '~/services/history';
import api from '~/services/api';

import {
  loadMeetUpSuccess,
  updateMeetUpSuccess,
  destroyMeetUpSuccess,
  meetUpFailed,
  subscriptionMeetUpSuccess,
  loadSubscriptionsMeetUpSuccess,
} from '~/store/modules/meetup/actions';

export function* loadMeetUp({ payload }) {
  try {
    const dateQuery = payload.date;
    const { page } = payload;

    const response = yield call(
      api.get,
      `meetups/?date=${dateQuery}&page=${page}`
    );

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = response.data.map(meetup => {
      const date = utcToZonedTime(meetup.date, timezone);

      const dateFormatted = format(date, "d 'de' MMMM ', às ' H'h'", {
        locale: pt,
      });

      return {
        ...meetup,
        dateFormatted,
      };
    });

    yield put(loadMeetUpSuccess(data));
  } catch (err) {
    Alert.alert('Erro!', 'Erro ao carregar seus meetups');
    yield put(meetUpFailed());
  }
}

export function* addMeetUp({ payload }) {
  try {
    yield call(api.post, 'meetups', payload.meetup);

    Alert.alert('Sucesso!', 'Meetup adicionado com sucesso');

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Erro!', 'Erro ao adicionar o meetup, verifique os dados');
    yield put(meetUpFailed());
  }
}

export function* updateMeetUp({ payload }) {
  try {
    const response = yield call(api.put, `meetups/${payload.id}`, payload.data);

    yield put(updateMeetUpSuccess(response.data));

    Alert.alert('Sucesso!', 'MeetUp Atualizado com sucesso!');

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Erro!', 'Erro ao atualizar!');
    yield put(meetUpFailed());
  }
}

export function* destroyMeetUp({ payload }) {
  try {
    yield call(api.delete, `meetups/${payload.id}`);

    yield put(destroyMeetUpSuccess(payload.id));

    Alert.alert('Sucesso!', 'Meetup cancelado com sucesso!');

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Erro!', 'Erro ao deletar o meetup!');
    yield put(meetUpFailed());
  }
}

export function* subscriptionMeetUp({ payload }) {
  try {
    yield call(api.post, `subscription/${payload.id}`);
    Alert.alert('Sucesso!', 'Inscrição realizada com sucesso!');

    // const response = yield call(api.get, 'subscription');

    // yield put(subscriptionMeetUpSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro!', 'Erro na inscrição!');
    yield put(meetUpFailed());
  }
}

export function* loadSubscriptions() {
  try {
    const response = yield call(api.get, 'subscription');

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = response.data.map(subscription => {
      const date = utcToZonedTime(subscription.Meetup.date, timezone);

      const dateFormatted = format(date, "d 'de' MMMM ', às ' H'h'", {
        locale: pt,
      });

      return {
        ...subscription,
        dateFormatted,
      };
    });

    yield put(loadSubscriptionsMeetUpSuccess(data));
  } catch (err) {
    Alert.alert('Erro!', 'Erro ao carregar as inscrições!');
    yield put(meetUpFailed());
  }
}

export function* cancelInscription({ payload }) {
  try {
    yield call(api.delete, `subscription/${payload.id}`);
    Alert.alert('Sucesso!', 'Inscrição cancelada com sucesso!');
  } catch (err) {
    Alert.alert('Erro!', 'Não foi possível cancelar essa inscrição!');
    yield put(meetUpFailed());
  }
}

export default all([
  takeLatest('@meetup/LOAD_MEET_UP_REQUEST', loadMeetUp),
  takeLatest('@meetup/ADD_MEET_UP', addMeetUp),
  takeLatest('@meetup/UPDATE_MEET_UP_REQUEST', updateMeetUp),
  takeLatest('@meetup/DESTROY_MEET_UP_REQUEST', destroyMeetUp),
  takeLatest('@meetup/SUBSCRIPTION_MEET_UP_REQUEST', subscriptionMeetUp),
  takeLatest('@meetup/LOAD_SUBSCRIPTION_MEET_UP_REQUEST', loadSubscriptions),
  takeLatest('@meetup/CANCEL_INSCRIPTION', cancelInscription),
]);
