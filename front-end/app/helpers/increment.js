import { helper } from '@ember/component/helper';

export default helper(function increment([initial, value] /*, named*/) {
  return initial + value;
});
