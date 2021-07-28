import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'front-end/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Will get replaced in Docker container on runtime if necessary
  host = "http://localhost:8000";
}
