import TagResource from "./Resources/TagResource";
import CategoryResource from "./Resources/CategoryResource";
import RecommendationResource from "./Resources/RecommendationResource";
import ClassificationResource from "./Resources/ClassificationResource";

const mapErrors = (app, $form, errors) => {
  for (let field in errors)
    if (Object.prototype.hasOwnProperty.call(field, errors))
      $form.find(`#${app}-${field}-messages`)
        .empty()
        .append($(errors[field].map(error => `<li>${error}</li>`).join('')))
}

const categories = $('#categories-list')
if (categories.length > 0) {
  new CategoryResource(categories, {
    listingURL: categories.data('listing-url'),
    createURL: categories.data('create-url'),
  })
}

const tags = $('#tags-list')
if (tags.length > 0) {
  new TagResource(tags, {
    listingURL: tags.data('listing-url'),
    createURL: tags.data('create-url'),
  })
}

const recommendations = $('#recommendations-list')
if (recommendations.length > 0) {
  new RecommendationResource(recommendations, {
    listingURL: recommendations.data('listing-url'),
    createURL: recommendations.data('create-url'),
  })
}

const classifications = $('#classifications-list')
if (classifications.length > 0) {
  new ClassificationResource(classifications, {
    listingURL: classifications.data('listing-url'),
    createURL: classifications.data('create-url'),
  })
}
