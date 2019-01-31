import Model from './Model'

export default class UserModel extends Model {
  constructor (data, params) {
    const model = [
      'id',
      'first_name',
      'surname',
      'email',
      'telephone',
      'birthdate'
    ];

    super(model, data, params);
  }
}