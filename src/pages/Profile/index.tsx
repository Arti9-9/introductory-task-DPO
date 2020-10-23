import React from 'react';
import { useParams } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import {
  Container,
  Main,
  LeftSide,
  RightSide,
  Repos,
  Heading,
  RepoIcon,
  Tab,
  ActivitiesHead,
  Languages
} from './styles';

import { ProfileData, RepoCard, CalendarWidget, LanguageCard } from '../../components';
import { queryAboutUser, queryCalendarUser } from "../../models/Query";
import { CalendarModel, ContributionCalendarDay, LanguageOverviewModel, UserDataModel } from "../../models/Models";

import { token } from "../../config";

const Profile: React.FC = () => {
  const { username = 'Arti9-9' } = useParams<any>();
  const [calendar, setCalendar] = React.useState<CalendarModel>();
  const [userData, setUserData] = React.useState<UserDataModel>();
  const [languageData, setLanguageData] = React.useState<LanguageOverviewModel[]>();
  const [error, setError] = React.useState<string>();

  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: (operation) => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    }
  });

  React.useEffect(()=>{
    client.query({
      query: gql`${queryAboutUser(username)}`
    })
    .then(resp => {
      var data : UserDataModel = resp.data.user;
      setUserData(data);
      var result = new Array<LanguageOverviewModel>();
      for (let iter = 0; iter < data.repositories.nodes.length; iter++) {
        let name = data.repositories.nodes[iter].primaryLanguage?.name;
        let finded = result.filter(el => el.name == name);
        if (finded.length) {
          finded[0].countProjects = finded[0].countProjects + 1;
        }
        else {
          if (name) {
            result.push({name: name, countProjects: 1, color: data.repositories.nodes[iter].primaryLanguage?.color});            
          }
        }
      }
      result.sort((a,b) => b.countProjects - a.countProjects);
      setLanguageData(result);
    }).catch(e => 
      setError(e.message)
    );
    client.query({
      query: gql`${queryCalendarUser(username)}`
      })
      .then(resp => {
        var calendarData : CalendarModel = resp.data.user.contributionsCollection.contributionCalendar;
        calendarData.contributionDays = new Array<ContributionCalendarDay>();
        resp.data.user.contributionsCollection.contributionCalendar.weeks.forEach((element: { contributionDays: any[]; }) => {
        element.contributionDays.forEach((day: ContributionCalendarDay) => {
            let calendarDay : ContributionCalendarDay = day;
            calendarData.contributionDays.push(calendarDay);
        });
        });
        setCalendar(calendarData);
      }).catch(e => 
        setError(e.message)
      );
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!userData || !calendar) {
    return <h1>Loading...</h1>;
  }

  const TabContent = () => (
    <div className="content">
      <RepoIcon />
      <span className="label">Repositories</span>
      <span className="number">{userData.repositories.totalCount}</span>
    </div>
  );

  return (
    <Container>
      <Tab className="desktop">
        <div className="wrapper">
          <span className="offset" />
          <TabContent />
        </div>

        <span className="line" />
      </Tab>

      <Main>
        <LeftSide>
          <ProfileData
            username={userData.login}
            name={userData.name}
            avatarUrl={userData.avatarUrl}
            followers={userData.followers.totalCount}
            following={userData.following.totalCount}
            company={userData.company}
            location={userData.location}
            email={userData.email}
            blog={userData.bio}
            starCount={userData.starredRepositories.totalCount}
            twitterUsername={userData.twitterUsername}
            websiteUrl={userData.websiteUrl}
          />
        </LeftSide>

        <RightSide>
          <Tab className="mobile">
            <TabContent />
            <span className="line" />
          </Tab>

          <Repos>
            <h2>Random repos</h2>
            {
              userData.repositories.nodes.length > 0 ? <div>
              {userData.repositories.nodes.slice(0, Math.min(6, userData.repositories.nodes.length)).map((item, index) => (
                <RepoCard
                  key={item.name}
                  username={username}
                  reponame={item.name}
                  description={item.description}
                  language={item.primaryLanguage == null ? "Other" : item.primaryLanguage.name}
                  color={item.primaryLanguage == null ? "" : item.primaryLanguage.color}
                  stars={item.stargazerCount}
                  forks={item.forkCount}
                />
              ))}
            </div> : <div>Репозиториев не найдено</div>
            }
            
          </Repos>

          <Heading>
            ACTIVITY CHART
          </Heading>

          <div>
            <ActivitiesHead>
              {calendar.totalContributions} activities
            </ActivitiesHead>
            <span> in the last year</span>
          </div>

          <CalendarWidget calendar={calendar}/>

          <Heading>
            LANGUAGE OVERVIEW
          </Heading>

          {
            languageData && languageData.length > 0 ? <Languages>
            <div>
              {languageData?.slice(0, languageData?.length).map(item => (
                <LanguageCard
                  key={item.name + item.color + item.countProjects}
                  countProjects={item.countProjects}
                  name={item.name == null ? "Неопознан" : item.name}
                  color={item.color == null ? "" : item.color}
                />
              ))}
            </div>
          </Languages> : <div>Репозиториев с языками не найдено</div>
          }
          
        </RightSide>
      </Main>
    </Container>
  );
};

export default Profile;
