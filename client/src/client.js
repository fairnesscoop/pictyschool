import * as sapper from '@sapper/app';
import { useLocalStorage, settings } from './store';
import './i18n';

useLocalStorage('flashimages:settings', settings);

sapper.start({
  target: document.querySelector('#sapper'),
});
