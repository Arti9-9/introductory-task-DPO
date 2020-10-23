export interface CalendarModel {
    totalContributions: string;
    colors: string[];
    contributionDays: ContributionCalendarDay[];
}

export interface ContributionCalendarDay {
    color: string;
    contributionCount: number;
    date: string;
}

export interface UserDataModel {
    avatarUrl: string;
    bio?: string;
    company?: string;
    email?: string;
    twitterUsername?: string;
    websiteUrl?: string;
    followers: {
        totalCount: number;
    }
    following: {
        totalCount: number;
    }
    location?: string;
    login: string;
    name: string;
    repositories: {
        nodes: RepoDataModel[];
        totalCount: number;
    }
    starredRepositories: {
        totalCount: number;
    }
}

export interface RepoDataModel {
    name: string;
    description: string;
    forkCount: number;
    stargazerCount: number;
    url: string;
    primaryLanguage: {
        color: string;
        name: string;
    }
}

export interface LanguageOverviewModel {
    color: string;
    name: string;
    countProjects: number;
}

export interface PropsForTable {
    rank: number;
    count: number;
    name: string;
    userLogin: string;
}