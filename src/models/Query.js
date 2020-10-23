export const queryAboutUser = (userName) => 
{
    const query = `
    query {
        user(login: "${userName}") {
        avatarUrl
        name
        login
        email
        bio
        company
        twitterUsername
        websiteUrl
        location
        followers(first: 100) {
          totalCount
        }
        following(first: 100) {
          totalCount
        }
        starredRepositories(first: 100)
        {
          totalCount
        }
        repositories(first: 100, isFork: false) {
          totalCount
          nodes {
            name
            url
            description
            primaryLanguage {
              name
              color
            }
            createdAt
            forkCount
            stargazerCount
          }
        }
      }
    }
    `;
    return query; 
}

export const queryCalendarUser = (userName) =>
{
  var date = new Date();
  var endDate = date.toISOString();
  var startDate = date.toISOString(date.setFullYear(date.getFullYear() - 1));
  const query = `
  query {
    user (login: "${userName}") {
      contributionsCollection(from: "${startDate}", to: "${endDate}") {
        contributionCalendar {
          totalContributions
          colors
          weeks {
            contributionDays {
              date
              color
              contributionCount
            }
          }
        }
      }
    }
  }
  `;
  return query;
}

export const queryCalendarLastMonth = (userName) =>
{
  var date = new Date();
  var endDate = date.toISOString();
  var startDate = date.toISOString(date.setMonth(date.getMonth() - 1));
  const query = `
  query {
    user (login: "${userName}") {
      name
      login
      contributionsCollection(from: "${startDate}", to: "${endDate}") {
        contributionCalendar {
          totalContributions
          colors
          weeks {
            contributionDays {
              date
              color
              contributionCount
            }
          }
        }
      }
    }
  }
  `;
  return query;
}