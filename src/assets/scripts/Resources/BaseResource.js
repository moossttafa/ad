import {openOverlay} from "../overlay";

export default class BaseResource {
  constructor($container, options) {
    // observables
    this.localItems = []
    this.localSearch = ''
    this.localLoading = false

    // properties
    this.prefix = ''
    this.listingURL = ''
    this.createURL = ''
    this.deleteURL = ''
    this.subBuild = null
    this.withPagination = false
    this.paginationType = 'pagination'
    this.csrf = $('meta[name="csrf-token"]').prop('content')
    // elements
    this.$container = $container
    this.$searchBar = null
    this.$itemsList = null
    this.$form = null
    this.$deleteDialog = null


    for (let item in options)
      if (Object.prototype.hasOwnProperty.call(options, item))
        this[item] = options[item]

    this.$container.append(this.containerTemplate())
    this.$itemsList = $(`#${this.prefix}-listing`)
    this.$searchBar = $(`#${this.prefix}-searchbar`)
    this.$form = $(`#${this.prefix}-form`)
    this.$deleteDialog = $(`#${this.prefix}-delete-dialog`)

    this.$searchBar.on('input', e => this.search = e.target.value)

    let self = this

    $(document)
      .on('click', `.${this.prefix}-edit`, function (e) {
        e.preventDefault()
        let parentContainer = $(this).closest('.card')
        self.$form.empty()
        self.$form.append($(self.formTemplate(parentContainer.data('data'), $(this).attr('href'))))
      })
      .on('submit', `#${this.prefix}-form > form`, function (e) {
        e.preventDefault()
        self.submitForm($(this))
        self.fetchItems()

      })
      .on('click', `.${this.prefix}-delete`, function (e) {
        e.preventDefault()
        self.deleteURL = $(this).attr('href')
        openOverlay()
        self.$deleteDialog.addClass('dialog--show')
      })
      .on('click', `.${this.prefix}-confirm-delete`, function (e) {
        e.preventDefault()
        self.confirmDelete()
      })
  }

  get loading() {
    return this.localLoading
  }

  set loading(v) {
    this.localLoading = v
    this.loadingListener(v)
  }

  get items() {
    return this.localItems
  }

  set items(value) {
    this.localItems = value
    this.itemsListener(value)
  }

  get search() {
    return this.localSearch
  }

  set search(value) {
    this.localSearch = value
    this.searchListener(value)
  }

  loadingListener(v) {
    if (v) {
      this.$itemsList.empty()
      this.$itemsList.text('Loading...')
    }
  }

  searchListener(value) {
    this.$searchBar.val(value)
    this.fetchItems({q: value})
  }

  itemsListener(v) {
    this.$itemsList.empty()
    this.$itemsList.append(this.listingTemplate())
  }

  mapErrors(errors) {
    console.log(errors)
    for (let field in errors)
      if (errors.hasOwnProperty(field)) {
        let messages = this.$form.find(`#${this.prefix}-${field}-messages`),
          wrapper = messages.closest('.field-wrapper')
        wrapper.addClass('field-wrapper--error')
        messages.empty()
        messages.append($(errors[field].map(error => `<li>${error}</li>`).join('')))

      }
  }

  fetchItems(data = {}) {
    this.loading = true
    let self = this
    $.ajax({
      url: this.listingURL,
      type: 'get',
      data,
      headers: {'X-CSRFToken': self.csrf},
      success: function (data) {
        self.items = data
        self.loading = false
      },
      error: function (xhr) {
        console.error(xhr)
      }
    })
  }

  submitForm($form) {
    let url = $form.attr('action'),
      data = $form.serialize(),
      self = this

    $.ajax({
      type: 'POST',
      url,
      data,
      headers: {'X-CSRFToken': self.csrf},
      success: () => {
        this.fetchItems()
        this.$form.empty()
        this.$form.append($(this.formTemplate({}, this.createURL)))
      },
      error: (xhr, status, error) => {
        if (xhr.status === 422)
          this.mapErrors(xhr.responseJSON)
      }
    });
  }

  containerTemplate(data) {
    return $(`
      ${this.deleteDialog()}
      <div class="container">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="card" id="${this.prefix}-form">
            ${this.formTemplate({}, this.createURL)}
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          ${this.searchForm()}
          <ul id="${this.prefix}-listing">${this.listingTemplate()}</ul>
          ${this.withPagination ? this.paginationTemplate() : ''}
        </div>
      </div>
    </div>`)
  }

  searchForm() {

    return `

<form method="get">
<div class="field-wrapper">
     <div class="field-wrapper__label">Search</div>
     <div class="field-wrapper__content">
       <input name="q" type="search" class="field" id="${this.prefix}-searchbar">
     </div>
    </div>
</form>`
  }

  paginationTemplate() {
    return `
      <div class="pagination">
        <button class="btn btn--text btn--primary icon--hover" href="#" aria-label="Previous">
        <i class="fas fa-chevron-left pagination-icon"></i></button>
        <button class="btn btn--text btn--primary icon--hover text-1" href="#">1</button>
        <button class="btn btn--text btn--primary icon--hover text-1" href="#">2</button>
        <button class="btn btn--text btn--primary icon--hover text-1" href="#">3</button>
        <button class="btn btn--text btn--primary icon--hover text-1" href="#">...</button>
        <button class="btn btn--text btn--primary icon--hover" href="#" aria-label="Next">
        <i class="fas fa-chevron-right pagination-icon"></i></button>
      </div>
    `

  }

  listingTemplate() {
    return this.items.map(item => this.itemTemplate(item)).join('')
  }

  itemTemplate(item) {
    return `<li>${item.title}</li>`
  }

  formTemplate(item = {}, action = '') {
    return ``
  }

  confirmDelete() {
    let self = this
    $.ajax({
      url: self.deleteURL,
      type: "DELETE",
      headers: {'X-CSRFToken': self.csrf},
      success: function () {
        self.fetchItems()
        self.deleteURL = ''
      },
      error: function (xhr) {

      }
    })
  }

  deleteDialog() {
    return `<div class="dialog" id="${this.prefix}-delete-dialog">
      <div class="card">
        <div class="card__title">
          <h3>You are About to delete this item</h3>
        </div>
        <div class="card__body">
            <p class="body">If you deleted it you will never be able to retreive it</p>
            <p class="body bold">Are you sure</p>
        </div>
        <div class="card__footer">
          <button class="btn btn--text btn--danger close-dialog">Cancel</button>
          <button class="btn btn--primary close-dialog ${this.prefix}-confirm-delete">Confirm</button>
        </div>
      </div>
    </div>`
  }

  build() {
    this.fetchItems()
  }
}
