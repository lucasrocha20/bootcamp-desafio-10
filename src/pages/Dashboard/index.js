import React, { useEffect, useMemo, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  DateHeader,
  DateText,
  ListMeetup,
  Content,
  Image,
  Info,
  Title,
  Span,
  TextSpan,
  ButtonContent,
} from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  loadMeetUpRequest,
  subscriptionMeetUpRequest,
} from '~/store/modules/meetup/actions';

import api from '~/services/api';

function Dashboard({ isFocused }) {
  // const meetups = useSelector(state => state.meetup.meetups);
  const [meetups, setMeetups] = useState([]);

  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  // const page = 1;

  // const [newLoad, setNewLoad] = false;

  async function loadlMeetups() {
    // const { page, newLoad } = payload;

    const queryDate = format(date, "yyyy'-'MM'-'dd", { locale: pt });

    const response = await api.get(`meetups/?date=${queryDate}&page=${page}`);

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const data = response.data.map(meetup => {
      const dateNotFormatted = utcToZonedTime(meetup.date, timezone);

      const dateFormatted = format(
        dateNotFormatted,
        "d 'de' MMMM ', às ' H'h'",
        {
          locale: pt,
        }
      );
      return {
        ...meetup,
        dateFormatted,
      };
    });

    setMeetups([...meetups, ...data]);
    setPage(page + 1);
    console.tron.log(data);
  }
  const dispatch = useDispatch();

  const ActualDate = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  // async function loadMeetups() {
  //   // setNewLoad(true);

  //   if (isFocused) {
  //     // setPage(1);
  //     page = 1;

  //     dispatch(
  //       loadMeetUpRequest(
  //         format(date, "yyyy'-'MM'-'dd", { locale: pt }),
  //         page
  //         // newLoad
  //       )
  //     );
  //   }
  // setNewLoad(false);
  // }

  // function refreshLoadMeetups() {
  //   const nextPage = page + 1;

  //   dispatch(
  //     loadMeetUpRequest(
  //       format(date, "yyyy'-'MM'-'dd", { locale: pt }),
  //       nextPage
  //     )
  //   );
  //   // setPage(page + 1);
  // }

  useEffect(() => {
    loadlMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function handleAddDay() {
    setDate(addDays(date, 1));
    setPage(1);
    setMeetups([]);
  }

  function handleSubDay() {
    if (date > new Date()) {
      setDate(subDays(date, 1));
      setPage(1);
      setMeetups([]);
    }
  }

  function handleInscription(id, past) {
    if (!past) dispatch(subscriptionMeetUpRequest(id));
  }

  return (
    <Background>
      <Header />

      <Container>
        <DateHeader>
          <TouchableOpacity onPress={handleSubDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <DateText>{ActualDate}</DateText>

          <TouchableOpacity onPress={handleAddDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateHeader>

        <ListMeetup
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReached={loadlMeetups}
          onEndReachedThreshold={0.2}
          renderItem={({ item }) => (
            <Content>
              <Image
                source={{
                  uri: item.file
                    ? item.file.url
                    : `https://api.adorable.io/avatar/50/${item.title}.png`,
                }}
              />
              <Info>
                <Title>{item.title}</Title>
                <Span>
                  <Icon name="event" size={15} color="#999" />
                  <TextSpan>{item.dateFormatted}</TextSpan>
                </Span>
                <Span>
                  <Icon name="place" size={15} color="#999" />
                  <TextSpan>{item.localization}</TextSpan>
                </Span>
                <Span>
                  <Icon name="person" size={15} color="#999" />
                  <TextSpan>Organizador: {item.User.name}</TextSpan>
                </Span>
              </Info>

              <ButtonContent
                past={item.past}
                onPress={() => handleInscription(item.id, item.past)}
              >
                Realizar inscrição
              </ButtonContent>
            </Content>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
  header: {
    Background: '#000',
    height: '24px',
  },
};

export default withNavigationFocus(Dashboard);
