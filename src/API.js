import SignIn from './api/sign-in';
import Users from './api/users';
import Words from './api/words';
import UsersWords from './api/users-words';
import UsersAggregatedWords from './api/users-aggregated-words';
import UsersStatistic from './api/users-statistic';
class Api {
  constructor() {
    this.signInMethods = new SignIn();
    this.usersMethods = new Users();
    this.wordsMethods = new Words();
    this.usersWordsMethods = new UsersWords();
    this.usersAggregatedWordsMethods = new UsersAggregatedWords();
    this.usersStatisticMethods = new UsersStatistic();
  }
}

export default Api;
