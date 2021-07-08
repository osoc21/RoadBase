import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default Controller.extend({
  newTitle: tracked(""),
  newIsbn: tracked(""),

  store: service(),

  createBook: action((event) => {
    event.preventDefault();
    // create the new book
    const book = this.store.createRecord("book", {
      title: this.newTitle,
      isbn: this.newIsbn,
    });
    book.save();
    // clear the input fields
    this.newTitle = "";
    this.newIsbn = "";
  }),
});
