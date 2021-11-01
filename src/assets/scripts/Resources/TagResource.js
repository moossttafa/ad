import BaseResource from "./BaseResource";

export default class TagResource extends BaseResource {
  constructor($container, options) {
    options['prefix'] = 'tags'
    super($container, options)
    this.fetchItems()
    let self = this
    $(document)
      .on('click', `.tags-edit`, function (e) {
        e.preventDefault()
        self.$form.empty()
        self.$form.append($(self.formTemplate($(this).data('data'), $(this).attr('href'))))
      })
  }

  containerTemplate(data) {
    return $(`
      ${this.deleteDialog()}
      <div class="container">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="card" id="tags-form">
            ${this.formTemplate({}, this.createURL)}
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          ${this.searchForm()}
          ${this.listingTemplate()}
          ${this.withPagination ? this.paginationTemplate() : ''}
        </div>
      </div>
    </div>`)
  }

  listingTemplate() {
    console.log('here')
    return `<div class="list list--condensed" id="${this.prefix}-listing">
      ${this.items.map(item => this.itemTemplate(item)).join('')}
    </div>`
  }

  itemTemplate(item) {
    return ` <div class="list-item list-item--one-line">
      <div class="lit-item__content">
        <p>${item.name}</p>
      </div>
      <div class="list-item__actions">
        <div class="dropdown">
          <button class="btn btn--info btn--icon btn--text dropdown__activator">
            <i class="fas fa-ellipsis-h"></i>
          </button>
          <div class="dropdown__content">
            <div class="list">
              ${item.actions.length > 1 ? item.actions.map(action => `<a class="list-item list-item--one-line ${action.class}" href="${action.link}" data-data='${JSON.stringify(item)}'>
                <div class="list-item__avatar"><i class="${action.icon}">${action.name}</i></div>
              </a>`).join('') : ''}
            </div>
          </div>
        </div>
      </div>
    </div>`
  }

  formTemplate(item = {}, action = '') {
    return `<form action="${action}" method="post">
      <div class="field-wrapper">
        <label class="field-wrapper__label" for="${this.prefix}-name">Name <abbr>*</abbr></label>
        <div class="field-wrapper__content">
          <input class="field" type="text" placeholder="Tag Name" name="name" id="${this.prefix}-name"
             required value="${item.name ? item.name : ''}">
        </div>
        <ul class="field-wrapper__messages" id="category-name-messages"></ul>
      </div>
      <div class="ml-auto d-inline-block">
        <button class="btn btn--primary btn--text" type="reset">Cancel</button>
        <button class="btn btn--primary" type="submit">submit</button>
      </div>
    </form>`
  }
}
