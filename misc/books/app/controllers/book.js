import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class BooksController extends Controller {
  @tracked newIsbn = "";
  @tracked newTitle = "";

  @service store;

  @action
  async createBook(event) {
    console.log("sdds");
    event.preventDefault();

    // create the new book
    const book = this.store.createRecord("book", {
      title: this.newTitle,
      isbn: this.newIsbn,
    });
    await book.save();
    // clear the input fields
    this.newTitle = "";
    this.newIsbn = "";
  }
}
