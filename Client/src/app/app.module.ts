import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product/product.service';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import {CategoryService} from './services/category/category.service';
import {FormsModule} from '@angular/forms';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductViewComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient(), ProductService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
