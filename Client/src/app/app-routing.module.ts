import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductCreateComponent} from './components/product-create/product-create.component';
import {ProductViewComponent} from './components/product-view/product-view.component';
import {ProductEditComponent} from './components/product-edit/product-edit.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'publisher', component: ProductCreateComponent},
  {path: 'product-view', component: ProductViewComponent},
  {path: 'product-edit', component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
