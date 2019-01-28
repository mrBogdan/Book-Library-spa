import { Model, Collection } from 'vue-mc'

/**
 * User model
 */
class User extends Model {
  defaults() {
    return {
      id: null,
      first_name: '',
      surname: '',
      email: '',
      telephone: '',
      birthdate: new Date()
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      first_name: String,
      surname: String,
      email: String,
      telephone: String,
      birthdate: Date
    }
  }

  routes() {
    return {
      fetch: 'ms.bogdan.store/user/:id'
    }
  }
}

class UserCollection extends Collection {
  model() {
    return User;
  }

  routes() {
    return {
      fetch: 'ms.bogdan.store/user/all'
    }
  }
}

export {
  User,
  UserCollection
};