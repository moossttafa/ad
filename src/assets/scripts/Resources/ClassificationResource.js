import BaseResource from "./BaseResource";

export default class ClassificationResource extends BaseResource {
  constructor($container, options) {
    options['prefix'] = 'classifications'
    super($container, options)
    this.fetchItems()
  }

  itemTemplate(item) {
    return ` <div class="card" data-data='${JSON.stringify(item)}'>
      <div class="card__header" >
        <h4 class='title-5 my-0'>${item.name}</h4>
        <div class="d-flex card__tools">
          <div class="dropdown dropdown__activator">
            <button class="btn btn--info btn--icon btn--text dropdown--btn">
              <i class="fas fa-ellipsis-h"></i>
            </button>
            <div class="dropdown__content">
                    <div class="list">
                ${item.actions.length > 1 ? item.actions.map(action => `<a class="list-item list-item--one-line ${action.class}" href="${action.link}">
                  <div class="list-item__avatar"><i class="${action.icon}">${action.name}</i></div>
                </a>`) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card__content">
        <p>${item.description}</p>
      </div>
    </div>`
  }

  formTemplate(item = {}, action = '') {
    return `<form action="${action}" method="post">
      <div class="field-wrapper">
        <label class="field-wrapper__label" for="classifications-name">Name <abbr>*</abbr></label>
        <div class="field-wrapper__content">
          <input
             class="field"
             type="text"
             placeholder="Classification"
             name="name"
             id="classifications-name"
             required
             value="${item.name ? item.name : ''}">
        </div>
        <ul class="field-wrapper__messages"></ul>
      </div>
      <div class="field-wrapper">
        <label class="field-wrapper__label" for="classifications-description">Score</label>
        <div class="field-wrapper__content">
          <input
            type="number"
            class="field"
            name="score"
            id="classifications-description"
            placeholder="Classification Score"
             value="${item.score ? item.score : 0}">
        </div>
        <ul class="field-wrapper__messages"></ul>
      </div>
      <div class="ml-auto d-inline-block">
        <button class="btn btn--primary btn--text" type="reset">Cancel</button>
        <button class="btn btn--primary" type="submit">submit</button>
      </div>
    </form>`
  }
}
