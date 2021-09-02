import { AgregarTipoImagenComponent } from './component/agregar-tipo-imagen/agregar-tipo-imagen.component';
import { ListarTipoImagenComponent } from './component/listar-tipo-imagen/listar-tipo-imagen.component';
import { ListarProductoComponent } from './component/listar-producto/listar-producto.component';
import { ProfileShopComponent } from './component/profile-shop/profile-shop.component';
import { ProfilePasswordComponent } from './component/profile-password/profile-password.component';
import { ProfileAddressComponent } from './component/profile-address/profile-address.component';
import { ListarTipoCaractCategoriaComponent } from './component/listar-tipo-caract-categoria/listar-tipo-caract-categoria.component';
import { AgregarTipoCaractCategoriaComponent } from './component/agregar-tipo-caract-categoria/agregar-tipo-caract-categoria.component';
import { ListarCaractCategoriaComponent } from './component/listar-caract-categoria/listar-caract-categoria.component';
import { AgregarCaractCategoriaComponent } from './component/agregar-caract-categoria/agregar-caract-categoria.component';
import { ListarMarcaComponent } from './component/listar-marca/listar-marca.component';
import { AgregarMarcaComponent } from './component/agregar-marca/agregar-marca.component';
import { ListarCategoriaComponent } from './component/listar-categoria/listar-categoria.component';
import { AgregarCategoriaComponent } from './component/agregar-categoria/agregar-categoria.component';
import { AgregarProductoComponent } from './component/agregar-producto/agregar-producto.component';
import { NotpermisionComponent } from './component/notpermision/notpermision.component';
import { AdminComponent } from './component/admin/admin.component';
import { AuthGuard } from './guard/auth.guard';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { ShippingComponent } from './component/shipping/shipping.component';
import { HowBuyComponent } from './component/how-buy/how-buy.component';
import { ContactComponent } from './component/contact/contact.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile-address', component: ProfileAddressComponent, canActivate: [AuthGuard] },
  { path: 'profile-password', component: ProfilePasswordComponent, canActivate: [AuthGuard] },
  { path: 'profile-shop', component: ProfileShopComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'how-buy', component: HowBuyComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'vendedor'] },
  },
  {
    path: 'admin/list/product',
    component: ListarProductoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'vendedor'] },
  },
  {
    path: 'admin/add/product',
    component: AgregarProductoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/list/image-type',
    component: ListarTipoImagenComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'vendedor'] },
  },
  {
    path: 'admin/add/image-type',
    component: AgregarTipoImagenComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/add/category',
    component: AgregarCategoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/list/category',
    component: ListarCategoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'vendedor'] },
  },
  {
    path: 'admin/add/brand',
    component: AgregarMarcaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/list/brand',
    component: ListarMarcaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'vendedor'] },
  },
  {
    path: 'admin/add/charact-category',
    component: AgregarCaractCategoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/list/charact-category',
    component: ListarCaractCategoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'vendedor'] },
  },
  {
    path: 'admin/add/type-charact-category',
    component: AgregarTipoCaractCategoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/list/type-charact-category',
    component: ListarTipoCaractCategoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'vendedor'] },
  },
  { path: 'not-authorize', component: NotpermisionComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
