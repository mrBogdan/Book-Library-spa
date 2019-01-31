export default class Model {
  constructor (model, props, params) {
    model.forEach((item) => {
      this.attributes[item] = props[item];
    });

    this.url = params.url;
  }
}