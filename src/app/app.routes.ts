import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Detail } from './detail/detail';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'detail/:day',
        component: Detail,
        title: 'Weather Detail'
    }
];
