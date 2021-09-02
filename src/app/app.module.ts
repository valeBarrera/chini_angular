import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ContactComponent } from './component/contact/contact.component';
import { HowBuyComponent } from './component/how-buy/how-buy.component';
import { ShippingComponent } from './component/shipping/shipping.component';
import { ProductViewComponent } from './layout/product-view/product-view.component';
import { RatingComponent } from './layout/rating/rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { AdminComponent } from './component/admin/admin.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NotpermisionComponent } from './component/notpermision/notpermision.component';
import { AgregarProductoComponent } from './component/agregar-producto/agregar-producto.component';
import { AgregarCategoriaComponent } from './component/agregar-categoria/agregar-categoria.component';
import { ListarCategoriaComponent } from './component/listar-categoria/listar-categoria.component';
import { ListarMarcaComponent } from './component/listar-marca/listar-marca.component';
import { AgregarMarcaComponent } from './component/agregar-marca/agregar-marca.component';
import { AgregarCaractCategoriaComponent } from './component/agregar-caract-categoria/agregar-caract-categoria.component';
import { ListarCaractCategoriaComponent } from './component/listar-caract-categoria/listar-caract-categoria.component';
import { AgregarTipoCaractCategoriaComponent } from './component/agregar-tipo-caract-categoria/agregar-tipo-caract-categoria.component';
import { ListarTipoCaractCategoriaComponent } from './component/listar-tipo-caract-categoria/listar-tipo-caract-categoria.component';
import { SidebarProfileComponent } from './layout/sidebar-profile/sidebar-profile.component';
import { ProfileAddressComponent } from './component/profile-address/profile-address.component';
import { ProfilePasswordComponent } from './component/profile-password/profile-password.component';
import { ProfileShopComponent } from './component/profile-shop/profile-shop.component';
import { ListarProductoComponent } from './component/listar-producto/listar-producto.component';
import { AgregarTipoImagenComponent } from './component/agregar-tipo-imagen/agregar-tipo-imagen.component';
import { ListarTipoImagenComponent } from './component/listar-tipo-imagen/listar-tipo-imagen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ContactComponent,
    HowBuyComponent,
    ShippingComponent,
    ProductViewComponent,
    RatingComponent,
    ShoppingCartComponent,
    AdminComponent,
    SidebarComponent,
    NotpermisionComponent,
    AgregarProductoComponent,
    AgregarCategoriaComponent,
    ListarCategoriaComponent,
    ListarMarcaComponent,
    AgregarMarcaComponent,
    AgregarCaractCategoriaComponent,
    ListarCaractCategoriaComponent,
    AgregarTipoCaractCategoriaComponent,
    ListarTipoCaractCategoriaComponent,
    SidebarProfileComponent,
    ProfileAddressComponent,
    ProfilePasswordComponent,
    ProfileShopComponent,
    ListarProductoComponent,
    AgregarTipoImagenComponent,
    ListarTipoImagenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
