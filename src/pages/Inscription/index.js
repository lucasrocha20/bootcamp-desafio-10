import React, { useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ListMeetup,
  Content,
  Image,
  Info,
  Title,
  Span,
  ButtonContent,
} from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  loadSubscriptionsMeetUpRequest,
  cancelInscription,
} from '~/store/modules/meetup/actions';

function Inscription({ isFocused }) {
  const dispatch = useDispatch();
  const incriptions = useSelector(state => state.meetup.subscriptions);

  useEffect(() => {
    if (isFocused) {
      dispatch(loadSubscriptionsMeetUpRequest());
    }
  }, [dispatch, isFocused]);

  function handleCancelInscription(id) {
    dispatch(cancelInscription(id));
  }

  return (
    <Background>
      <Header />

      <Container>
        <ListMeetup
          data={incriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Content>
              <Image
                source={{
                  uri: item.Meetup.file
                    ? item.Meetup.file.url
                    : `https://api.adorable.io/avatar/50/${item.Meetup.title}.png`,
                }}
                alt="banner"
              />
              <Info>
                <Title>{item.Meetup.title}</Title>
                <Span>
                  <Icon name="event" size={15} color="#999" />
                  {item.dateFormatted}
                </Span>
                <Span>
                  <Icon name="place" size={15} color="#999" />
                  {item.Meetup.localization}
                </Span>
                <Span>
                  <Icon name="person" size={15} color="#999" />
                  Organizador: {item.Meetup.User.name}
                </Span>
              </Info>

              <ButtonContent onPress={() => handleCancelInscription(item.id)}>
                Cancelar Inscrição
              </ButtonContent>
            </Content>
          )}
        />
      </Container>
    </Background>
  );
}

Inscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Inscription);
