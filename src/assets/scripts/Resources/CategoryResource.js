import BaseResource from './BaseResource'
import 'patternfly-bootstrap-treeview'

export default class CategoryResource extends BaseResource {
  constructor($container, options) {
    options['prefix'] = 'categories'
    super($container, options)
    this.flatItems = []

    let self = this

    $.ajax({
      url: self.listingURL,
      type: 'get',
      data: {flat: true},
      headers: {'X-CSRFToken': self.csrf},
      success: function (data) {
        self.flatItems = data
        self.$form.empty()
        self.$form.append($(self.formTemplate({}, self.createURL)))
        $(`#${this.prefix}-parent`).select2()
      },
      error: function (xhr) {
      }
    })


    $(document).on('click', `.categories-edit`, function (e) {
      e.preventDefault()
      self.$form.empty()
      self.$form.append($(self.formTemplate($(this).data('item'), $(this).attr('href'))))
      $(`#${this.prefix}-parent`).select2()
    })

    this.fetchItems()
  }

  itemsListener(v) {
    $('#categories-listing').treeview({
      data: this.formatItems(v),
      levels: 0,
      selectable: false,
      checkable: false,
      onHoverColor: 'transparent',
      backColor: 'transparent',
      emptyIcon: 'fa fa-leaf primary',
      expandIcon: 'fa fa-folder primary',
      collapseIcon: 'fa fa-folder-open primary',
      tags: [
        'available',
        {text: 'not available', class: 'disabled'}
      ],
    })
  }

  containerTemplate(data) {
    return $(`
      ${this.deleteDialog()}
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="card" id="${this.prefix}-form">
              ${this.formTemplate({}, this.createURL)}
            </div>
            <div id="${this.prefix}-listing">
             ${this.listingTemplate()}
            </div>
          </div>
        </div>
      </div>`)
  }

  formatItems(v) {
    return v.map(i => ({
      text: this.getItemName(i),
      nodes: this.formatItems(i.children),
      meta: i
    }))
  }

  getItemName(item) {
    return item.name
      + item.actions.map(action => `<a class="btn btn--primary btn--icon btn--text ${action.class}" data-item='${JSON.stringify(item)}' href="${action.link}"><i class="${action.icon}"></i></a>`).join('')
  }

  formTemplate(item = {}, action = '') {
    return `<form action="${action}" method="post">
      <div class="field-wrapper">
        <label class="field-wrapper__label" for="${this.prefix}-name">Name <abbr>*</abbr></label>
        <div class="field-wrapper__content">
          <input class="field" type="text" placeholder="Category Name" name="name" id="${this.prefix}-name"
             required value="${item.name ? item.name : ''}">
        </div>
        <ul class="field-wrapper__messages" id="categories-name-messages"></ul>
      </div>
      <div class="field-wrapper">
        <label class="field-wrapper__label" for="${this.prefix}-parent">Category Parent</label>
        <div class="field-wrapper__content">
          <select class="field select2" name="parent" id="${this.prefix}-parent">
          <option value="">-- No Parent --</option>
          ${this.flatItems && this.flatItems.map(i => `<option value="${i.id}" ${item && i.id === item.id ? 'selected' : ''}>${i.name}</option>`).join('')}
          </select>
        </div>
        <ul class="field-wrapper__messages" id="categories-parent-messages"></ul>
      </div>
      <div class="ml-auto d-inline-block">
        <button class="btn btn--primary btn--text" type="reset">Cancel</button>
        <button class="btn btn--primary" type="submit">submit</button>
      </div>
    </form>`
  }
}
