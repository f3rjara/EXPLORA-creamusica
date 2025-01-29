import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridPageComponent } from '@modules/grid/pages/grid-page/grid-page.component';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'musical-grid/:language',
    component: GridPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
