import React from 'react';
import axios from "axios";
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import { Container } from './styles';
import { TableRow } from "../../components/";
import { queryCalendarLastMonth } from "../../models/Query";
import { PropsForTable } from "../../models/Models";

import { token } from "../../config";

const Table: React.FC = () => {
    const [userData, setUserData] = React.useState<PropsForTable[]>();
    const [testData, setTestData] = React.useState<any>();
    
    var respData = new Array<PropsForTable>();

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

    React.useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then(resp => {
            resp.data.forEach((element : any) => {
                client.query({
                    query: gql`${queryCalendarLastMonth(element.userLogin)}`
                  })
                  .then(el => {
                      let user : PropsForTable = {name: el.data.user.name, 
                                                  rank: 0,
                                                  count: el.data.user.contributionsCollection.contributionCalendar.totalContributions,
                                                  userLogin: element.userLogin};
                      respData.push(user);
                      respData.sort((a,b) => b.count - a.count);
                      setTestData(user);
                  });
            });
        });
        setUserData(respData);
    },[]);

    return (
      <Container>
          <div>
            <table className="table table-striped" style={{width: `100%`}}>
                 <thead>
                 <tr>
                   <th>Rank</th>
                   <th>Count</th>
                   <th>Name</th>
                   <th>Profile</th>
                 </tr>
                 {userData && userData.map((element, idx) => {
                     return <TableRow 
                                key={idx}
                                rank={idx + 1}
                                name={element.name == null ? element.userLogin : element.name}
                                count={element.count}
                                userLogin={element.userLogin}/>
                 })}
                </thead>
        </table>
      </div>
      </Container>
  );
}

export default Table;